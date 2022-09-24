import fs from "fs";
import pdf from "pdf-parse";

export async function extractPDFText(pdfPath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(pdfPath);
  const { text } = await pdf(dataBuffer);
  return text.replace(/(\r\n|\n|\r)/gm, "");
}

export function extractClassName(text: string): string {
  let lastUpperCaseLetter = text.length;
  for (let i = 0; i < text.length - 1; i++) {
    if (text[i + 1].toUpperCase() !== text[i + 1]) {
      lastUpperCaseLetter = i - 1;
      break;
    }
  }

  return text.substring(0, lastUpperCaseLetter + 1).trim();
}
