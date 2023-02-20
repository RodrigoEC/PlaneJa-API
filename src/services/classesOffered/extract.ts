import { regexClassesOffered, regexHeadCourseData } from "../../util/const";
import { CourseNotFound, ExtractError } from "../../util/errors";
import { SubjectSchedule, Semester, Subject } from "../../util/interfaces";
import { getMostRecentSubject } from "../../util/util";
import { getSubjectsCourse, insertClassesOffered } from "./db";

/**
 * Function that formats a list of schedule informations into a list of schedules of
 * the type SubjectSchedule (src/util/interfaces.ts)
 * 
 * @param rawScheduleItems schedule items that are going to be formated
 * @returns SubjectSchedule[]
 */
const formatSubjectSchedule = (rawScheduleItems: string[]): SubjectSchedule[] => {
  const subjectSchedules: SubjectSchedule[] = [];

  const pace = 3;
  rawScheduleItems.forEach((_: string, i: number) => {
    if (i % pace === 0 && rawScheduleItems[i]) {
      const [day, init_time, end_time] = rawScheduleItems.slice(i, i + pace);
      subjectSchedules.push({ day, init_time, end_time });
    }
  });

  return subjectSchedules;
};

/**
 * This function transforms the regexList passed as parameter into a list of Subjects
 *
 * @param subjectsList List of the regex resulted from the features extracting.
 * @returns A list of Subjects.
 */
const formatSubjectsList = (rawSubjectsList: RegExpMatchArray[]): Subject[] => {
  const formatedSubjects = rawSubjectsList.map((subjectData) => {
    const [, id, name, class_num, credits, workload, ...scheduleItems] = subjectData;
    const schedule = formatSubjectSchedule(scheduleItems);

    return {
      id,
      name: name.substring(0, name.length).trim(),
      class_num,
      credits: +credits,
      workload: +workload,
      schedule,
    };
  });

  return formatedSubjects;
};

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

  const rawSubjectsList = [...text.matchAll(regexClassesOffered)];

  const subjects = formatSubjectsList(rawSubjectsList);
  if (!subjects)
    throw new ExtractError("Disciplinas do arquivo de turmas ofertadas");

  const [semesterHeadData] = [...text.matchAll(regexHeadCourseData)];
  if (!semesterHeadData) throw new ExtractError("Nome do curso e semestre");

  const semester: Semester = {
    name: semesterHeadData[1].toLocaleLowerCase(),
    semester: semesterHeadData[2],
    subjects,
  };

  await insertClassesOffered(semester);
  return semester;
}

export const extractUniqueSubjects = async (name: string) => {
  const allSubjects = await getSubjectsCourse(name);

  const recentSubject = getMostRecentSubject(allSubjects);

  if (!recentSubject) throw new CourseNotFound(name, "");
  const uniqueSubjects: string[] = [];

  recentSubject?.classes.forEach((subject: Subject) => {
    if (!uniqueSubjects.includes(subject.name)) {
      uniqueSubjects.push(subject.name);
    }
  });

  return { semester: recentSubject.semester, classes: uniqueSubjects };
};
