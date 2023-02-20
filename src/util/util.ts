import fs from "fs";
import pdf from "pdf-parse";
import {
  defaultSemester,
  Schedule,
  Semester,
} from "../services/classesOffered/extract";

/**
 * This function uses pdf-parse lib (https://www.npmjs.com/package/pdf-parse) to extract
 * text from a pdf path that's passed as parameter to the function
 *
 * @param pdfPath: File path of where the pdf file that's going to have the data extracted is
 * @returns The text (string) extract from the PDF
 */
export async function extractPDFText(pdfPath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(pdfPath);
  const { text } = await pdf(dataBuffer);
  return text;
}

export const compareSubject = (
  schedule1: Schedule,
  schedule2: Schedule
): boolean => {
  return (
    schedule1.day === schedule2.day &&
    schedule1.init_time === schedule2.init_time &&
    schedule1.end_time === schedule2.end_time
  );
};

export const capitalize = (string: string): string => {
  const words = string.split(" ");
  const wordsCapitalized = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  return wordsCapitalized.join(" ");
};

export const getMostRecentSubject = (subjects: Semester[]) => {
  if (subjects.length === 0) return defaultSemester;

  let recentSubject = subjects[0];
  const [mostRecentYearString, mostRecentSemesterString] =
    subjects[0].semester.split(".");
  let mostRecentYear = Number(mostRecentYearString);
  let mostRecentSemester = Number(mostRecentSemesterString);

  subjects.forEach((subject) => {
    const [yearString, semesterString] = subject.semester.split(".");
    const year = Number(yearString);
    const semester = Number(semesterString);

    if (year > mostRecentYear) {
      mostRecentYear = year;
      recentSubject = subject;
    } else if (year === mostRecentYear && semester > mostRecentSemester) {
      mostRecentSemester = semester;
      recentSubject = subject;
    }
  });

  return recentSubject;
};
