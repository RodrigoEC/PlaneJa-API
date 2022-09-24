import fs from "fs";
import pdf from "pdf-parse";

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
