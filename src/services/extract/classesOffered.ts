import { regexPajamaContent, regexSemesterCourse } from "../../util/const";
import { CourseNotFound, ExtractError } from "../../util/errors";
import { capitalize, getMostRecentSubject } from "../../util/util";
import { getClassesOffered, getSubjectsCourse, insertClassesOffered } from "../db";

export interface Semester {
  name: string;
  semester: string;
  classes: Subject[];
}

export interface Subject {
  id: number;
  name: string;
  class_num: number;
  credits: number;
  workload: number;
  schedule: Schedule[];
}

export interface Schedule {
  day: string;
  init_time: string;
  end_time: string;
}

export const defaultSemester: Semester = {
  name: '',
  semester: '',
  classes: []
}

/**
 * This function recieves the text that's going to be extracted from the PDF uploaded
 * and extract data related to the Subject and Schedule.
 *
 * Obs: Some subjects differ only on the professor but has the same schedules, because
 * of that I had to filter duplicated schedules.
 *
 * @param text Text that's going to have data extracted.
 * @returns A list of the type Subject with the info that was retrieved.
 */
export async function extractClassesOffered(text: string): Promise<Semester> {
  text = text.replace(/(\r\n|\n|\r)/gm, " ");

  const regexData = [...text.matchAll(regexPajamaContent)];
  const classes = createClassesList(regexData);
  if (!classes) throw new ExtractError("Cadeiras do pijama");

  const [semesterData] = [...text.matchAll(regexSemesterCourse)];
  if (!semesterData) throw new ExtractError("Nome do curso e semestre");
  const semester: Semester = {
    name: capitalize(semesterData[1]),
    semester: semesterData[2],
    classes,
  };

  return semester;
}

/**
 * Function that estracts the text enteties and insert the classes
 * offered in the database.
 *
 * @param text Text that's going to have their properties extracted
 * @returns Object of the type Semester
 */
export const registerClassesOffered = async (
  text: string
): Promise<Semester> => {
  const classesOffered = await extractClassesOffered(text);
  await insertClassesOffered(classesOffered as Semester);

  return classesOffered;
};

/**
 * This function transforms the regexList passed as parameter into a list of Subjects
 *
 * @param regexList List of the regex resulted from the features extracting in the function above.
 * @returns A list of Subjects.
 */
const createClassesList = (regexList: RegExpMatchArray[]): Subject[] => {
  return regexList.map(
    ([, id, name, classNum, credits, workload, ...schedule]) => {
      const subjectSchedule = createScheduleList(schedule);

      return {
        id: +id,
        name: capitalize(name.substring(0, name.length).trim()),
        class_num: +classNum,
        credits: +credits,
        workload: +workload,
        schedule: subjectSchedule,
      };
    }
  );
};

const createScheduleList = (schedule: string[]): Schedule[] => {
  const subjectSchedule: Schedule[] = [];

  for (let i = 0; i < schedule.length; i += 3) {
    if (schedule[i]) {
      const currentSchedule: Schedule = {
        day: schedule[i],
        init_time: schedule[i + 1],
        end_time: schedule[i + 2],
      };
      subjectSchedule.push(currentSchedule);
    }
  }

  return subjectSchedule;
};

export const getUniqueSubjects = async (name: string) => {
  const allSubjects = await getSubjectsCourse(name);

  const recentSubject = getMostRecentSubject(allSubjects)
  
  if (!recentSubject) throw new CourseNotFound(name, '')
  const uniqueSubjects: string[] = []
  
  recentSubject?.classes.forEach((subject: Subject) => {
    if (!uniqueSubjects.includes(subject.name)) {
      uniqueSubjects.push(subject.name)
    }
  })

  return uniqueSubjects
};