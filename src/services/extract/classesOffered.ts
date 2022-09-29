import { regexPajamaContent, regexSemesterCourse } from "../../util/const";
import { ExtractError } from "../../util/errors";
import { compareSubject } from "../../util/util";

export interface Schedule {
  day: string;
  init_time: string;
  end_time: string;
}

export interface Subject {
  id: number;
  name: string;
  credits: number;
  workload: number;
  schedule: Array<Schedule[]>;
}

export interface Semester {
  name: string;
  semester: string;
  classes: Subject[];
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
    name: semesterData[1],
    semester: semesterData[2],
    classes,
  };

  return semester;
}

/**
 * This function transforms the regexList passed as parameter into a list of Subjects
 *
 * @param regexList List of the regex resulted from the features extracting in the function above.
 * @returns A list of Subjects.
 */
const createClassesList = (regexList: RegExpMatchArray[]): Subject[] => {
  const filteredSubjects = {};
  regexList.forEach(([, id, name, credits, workload, ...schedule]) => {
    const subjectSchedule = [
      { day: schedule[0], init_time: schedule[1], end_time: schedule[2] },
      { day: schedule[3], init_time: schedule[4], end_time: schedule[5] },
    ];

    if (id in filteredSubjects) {
      let hasSubjects = false;
      filteredSubjects[id].schedule.forEach((element) => {
        if (
          (compareSubject(element[0], subjectSchedule[0]),
          compareSubject(element[1], subjectSchedule[1]))
        ) {
          hasSubjects = true;
        }
      });
      if (!hasSubjects) filteredSubjects[id].schedule.push(subjectSchedule);
    } else {
      filteredSubjects[id] = {
        id: +id,
        name: name.substring(0, name.length).trim(),
        credits: +credits,
        workload: +workload,
        schedule: [subjectSchedule],
      };
    }
  });

  return Object.values(filteredSubjects);
};
