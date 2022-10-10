import { progressParameter, regexRecord } from "../../util/const";
import { ExtractError } from "../../util/errors";

export interface StudentRecord {
  progress: string;
  compulsorySubjects: number;
  optionalSubjects: number;
  subjects: GradRecord[];
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

export const getStudentRecord = (text: string): StudentRecord => {
  const subjects = extractRegexRecord(text);

  const [compulsory, optional] = countSubjectTypes(subjects);
  const progress = calculateStudentProgress(compulsory + optional);
  return {
    progress,
    compulsorySubjects: compulsory,
    optionalSubjects: optional,
    subjects,
  };
};

const calculateStudentProgress = (workload: number): string => {
  const sumTotalWorkload = Object.values(
    progressParameter["Ciência Da Computação"]
  ).reduce((partialSum, a) => partialSum + a, 0);

  return (workload / sumTotalWorkload).toFixed(1);
};

const countSubjectTypes = (subjects: GradRecord[]): number[] => {
  let compulsory = 0;
  let optional = 0;
  subjects.forEach((subject) => {
    if (subject.status === "Aprovado" || subject.status === "Dispensa") {
      if (subject.type === "Obrigatória") compulsory += subject.credits;
      else if (subject.type === "Optativa") optional += subject.credits;
    }
  });

  return [compulsory, optional];
};

/**
 * This function recieves the text that's going to be extracted from the PDF uploaded
 * and extract data related to the Subject and Schedule.
 *
 * @param text Text that's going to have data extracted.
 * @returns A list of the type GradRecord with the info that was retrieved.
 */
export function extractRegexRecord(text: string): GradRecord[] {
  text = text.replace(/(\r\n|\n|\r)/gm, " |");

  const regexData = [...text.matchAll(regexRecord)];
  const result = regexData.map(
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

      return {
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
    }
  );

  if (result.length === 0) throw new ExtractError("Cadeiras do histórico");
  return result;
}
