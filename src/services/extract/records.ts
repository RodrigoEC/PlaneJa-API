import {
  progressParameter,
  regexRecord,
  regexStudentData,
  regexStudentStatus,
} from "../../util/const";
import { ExtractError } from "../../util/errors";
import { capitalize } from "../../util/util";

export interface Status {
  mandatory: string[];
  optative: string[];
  complementary: string[];
}

export interface Record {
  name: string;
  enrollment_number: string;
  course: string;
  status: Status;
  progress: string;
  classes: GradRecord[];
}

export interface GradRecord {
  id: number;
  name: string;
  type: string;
  credits: number;
  workload: number;
  grade: number;
  status: string;
  semester: string;
}

const calculateStudentProgress = (progresses: RegExpMatchArray[]): string => {
  let current = 0;
  let max = 0;

  progresses.forEach((progress) => {
    current += Number(progress[0]);
    max += Number(progress[1]);
  });

  return (current / max).toFixed(2);
};

/**
 * This function recieves the text that's going to be extracted from the PDF uploaded
 * and extract data related to the Subject and Schedule.
 *
 * @param text Text that's going to have data extracted.
 * @returns A list of the type GradRecord with the info that was retrieved.
 */
export function extractRegexRecord(text: string): Record {
  text = text.replace(/(\r\n|\n|\r)/gm, " |");

  const regexData = [...text.matchAll(regexRecord)];
  const resultGrade: any = {};
  regexData.forEach(
    ([
      ,
      id,
      name,
      professors,
      type,
      creditsOne,
      workloadOne,
      gradeOne,
      creditsTwo,
      workloadTwo,
      gradeTwo,
      creditsThree,
      workloadThree,
      gradeThree,
      creditsFour,
      workloadFour,
      gradeFour,
      status,
      semester,
    ]) => {
      const professorsList = professors ? professors.split(" |") : [];
      const subjectData = {
        id: +id,
        name: name.substring(0, name.length).trim(),
        professors: professorsList,
        type,
        credits: +(creditsOne || creditsTwo || creditsThree || creditsFour),
        workload: +(
          workloadOne ||
          workloadTwo ||
          workloadThree ||
          workloadFour
        ),
        grade: +(gradeOne || gradeTwo || gradeThree || gradeFour).replace(
          ",",
          "."
        ),
        status: status.replace(/ \|/g, " ").trim(),
        semester,
      };

      const subjectName = subjectData.name;
      if (
        (subjectName in Object.values(resultGrade) &&
          resultGrade[subjectName].status !== "Aprovado") ||
        !(subjectName in Object.values(resultGrade))
      ) {
        resultGrade[subjectName] = subjectData;
      }
    }
  );

  const result: GradRecord[] = Object.values(resultGrade);
  if (result.length === 0) throw new ExtractError("Cadeiras do hist??rico");

  const [studentData] = [...text.matchAll(regexStudentData)];
  const status = extractStudentStatus(text, capitalize(studentData[3]));

  return {
    name: capitalize(studentData[2]),
    enrollment_number: studentData[1],
    course: capitalize(studentData[3]),
    progress: calculateStudentProgress(Object.values(status)),
    status,
    classes: result,
  };
}

const extractStudentStatus = (text: string, course: string): Status => {
  const studentStatus = [...text.matchAll(regexStudentStatus)];
  return {
    mandatory: sliptProgress(studentStatus[0], "mandatory", course),
    optative: sliptProgress(studentStatus[1], "optative", course),
    complementary: sliptProgress(studentStatus[2], "complementary", course),
  };
};

const sliptProgress = (
  progressArray: string[],
  type: string,
  course: string
): string[] => {
  const progress = progressArray[1].trim();
  const maxProgress = progressParameter[course][type];

  return [progress.split(maxProgress)[1], maxProgress];
};
