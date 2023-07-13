import {
  regexRecord,
  regexStudentData,
  regexStudentStatus,
} from "../util/const";
import { ExtractError } from "../util/errors";
import {
  Record,
  StudentStatus,
  StudentSubject,
  Subject,
} from "../util/interfaces";
import { calculateProgress } from "../util/util";
import { getClassesOffered } from "./classesOffered/db";
import { getDependencies } from "./dependencies";

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
export async function extractRegexRecord(
  text: string,
  requiredItems: string[]
): Promise<Record> {
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

      if (Object.keys(resultGrade).includes(subjectName)) {
        resultGrade[subjectName].status = subjectData.status;
        resultGrade[subjectName].professors = subjectData.professors;
        resultGrade[subjectName].semester = subjectData.semester;
      } else {
        resultGrade[subjectName] = subjectData;
      }
    }
  );

  const result: StudentSubject[] = Object.values(resultGrade);
  if (result.length === 0) throw new ExtractError("Cadeiras do histórico");

  const [studentData] = [...text.matchAll(regexStudentData)];
  const status = extractStudentStatus(text);

  const studentRecord: Record = {
    name: studentData[2].toLocaleLowerCase(),
    enrollment_number: studentData[1],
    course: studentData[3].toLocaleLowerCase(),
    progress: calculateStudentProgress(Object.values(status)),
    status: status,
    subjects: result,
  };

  if (requiredItems.length > 0) {
    Object.keys(studentRecord).forEach((key: string) => {
      if (!requiredItems.includes(key)) {
        delete studentRecord[key as keyof Record];
      }
    });
  }

  return studentRecord as Record;
}

const extractStudentStatus = (text: string): StudentStatus => {
  const studentStatus = [...text.matchAll(regexStudentStatus)];
  return {
    mandatory: calculateProgress(studentStatus[0][1]),
    optative: calculateProgress(studentStatus[1][1]),
    complementary: calculateProgress(studentStatus[2][1]),
  };
};

export const getAvailableSubjects = async (
  studentSubjects: Array<StudentSubject>,
  course: string
): Promise<{ semester: string; available_subjects: Array<any> }> => {
  const { dependencies } = await getDependencies("ciência da computação");

  const { subjects, semester } = await getClassesOffered(course);

  const filteredRecord = studentSubjects.filter(
    (subject: StudentSubject) => subject?.status === "Aprovado"
  );
  const finishedSubjectsId = filteredRecord.map(
    (subject: StudentSubject) => subject.id
  );
  const nonTakenSUbs = subjects.filter(
    (subject: Subject) => !finishedSubjectsId.includes(subject.id)
  );

  const availableSubs = nonTakenSUbs.map((subject: Subject) => {
    const dependenciesTaken = dependencies[subject.id].dependencias.map(
      (dep: string) => finishedSubjectsId.includes(dep)
    );

    return {
      ...subject,
      available: dependenciesTaken.every(
        (isTaken: Boolean | null) => isTaken === true
      ),
    };
  });

  return { semester, available_subjects: availableSubs };
};
