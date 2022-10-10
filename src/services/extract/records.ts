import {
  progressParameter,
  regexCourseNameRecord,
  regexRecord,
} from "../../util/const";
import { ExtractError } from "../../util/errors";
import { capitalize } from "../../util/util";

export interface StudentRecord {
  course: string;
  progress: string;
  subjects_progress: SubjectTypes;
  subjects: GradRecord[];
}

export interface SubjectTypes {
  compulsory: number;
  optional: number;
  complementary: number;
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
  const course = capitalize([...text.matchAll(regexCourseNameRecord)][0][1]);

  const subjects_progress = countSubjectTypes(subjects);
  const progress = calculateStudentProgress(
    subjects_progress.compulsory + subjects_progress.optional,
    course
  );
  return {
    course,
    progress,
    subjects_progress,
    subjects,
  };
};

const calculateStudentProgress = (workload: number, course: string): string => {
  const couseProgress: [] = progressParameter[course] || { workload };

  const sumTotalWorkload = Object.values(couseProgress).reduce(
    (partialSum, a) => partialSum + a,
    0
  );

  return (workload / sumTotalWorkload).toFixed(1);
};

const countSubjectTypes = (subjects: GradRecord[]): SubjectTypes => {
  const subjectsTypes = {
    Obrigatória: 0,
    Optativa: 0,
    Complementar: 0,
  };
  subjects.forEach((subject) => {
    if (subject.status === "Aprovado" || subject.status === "Dispensa") {
      subjectsTypes[subject.type] += subject.credits;
    }
  });

  return {
    compulsory: subjectsTypes["Obrigatória"],
    optional: subjectsTypes["Optativa"],
    complementary: subjectsTypes["Complementar"],
  };
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
  const resultGrade = {};
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
  if (result.length === 0) throw new ExtractError("Cadeiras do histórico");
  return result;
}
