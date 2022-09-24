import fs from "fs";
import pdf from "pdf-parse";
import { Schedule } from "../services/extractPajamas";

/**
 *
 * @param pdfPath
 * @returns
 */
export async function extractPDFText(pdfPath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(pdfPath);
  const { text } = await pdf(dataBuffer);
  return text.replace(/(\r\n|\n|\r)/gm, "");
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
