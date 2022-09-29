import fs from "fs";
import pdf from "pdf-parse";
import { Schedule } from "../services/extractPajamas";

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
  return text.replace(/(\r\n|\n|\r)/gm, "|");
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
