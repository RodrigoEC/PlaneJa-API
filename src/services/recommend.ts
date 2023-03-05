import { StudentSubject } from "../util/interfaces";

export const recommendSubjects = async (
  studentSubjects: StudentSubject[],
  requiredSubjects: string[]
): Promise<string[][]> => {
  const subjects = [
    ["1305219.03", "1109049.01", "1411322.01", "1411323.02"],
    ["1411320.01", "1411192.01", "1411356.01", "1411350.01"],
  ];

  return subjects;
};