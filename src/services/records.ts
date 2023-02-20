import {
  regexRecord,
  regexStudentData,
  regexStudentStatus,
} from "../util/const";
import { ExtractError } from "../util/errors";
import { Record, StudentStatus, StudentSubject } from "../util/interfaces";
import { calculateProgress, capitalize } from "../util/util";

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
        id: id,
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

      const { name: subjectName } = subjectData;
      if (
        (subjectName in Object.values(resultGrade) &&
          resultGrade[subjectName].status !== "Aprovado") ||
        !(subjectName in Object.values(resultGrade))
      ) {
        resultGrade[subjectName] = subjectData;
      }
    }
  );

  const result: StudentSubject[] = Object.values(resultGrade);
  if (result.length === 0) throw new ExtractError("Cadeiras do histórico");

  const [studentData] = [...text.matchAll(regexStudentData)];
  const status = extractStudentStatus(text);

  return {
    name: studentData[2].toLocaleLowerCase(),
    enrollment_number: studentData[1],
    course: studentData[3].toLocaleLowerCase(),
    progress: calculateStudentProgress(Object.values(status)),
    status,
    classes: result,
  };
}

const extractStudentStatus = (text: string): StudentStatus => {
  const studentStatus = [...text.matchAll(regexStudentStatus)];
  return {
    mandatory: calculateProgress(studentStatus[0][1]),
    optative: calculateProgress(studentStatus[1][1]),
    complementary: calculateProgress(studentStatus[2][1]),
  };
};


