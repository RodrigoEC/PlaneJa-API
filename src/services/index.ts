import fs from "fs";
import pdf from "pdf-parse";
import { GradClass } from "../types";

export async function extractPDFText(pdfPath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(pdfPath);
  const { text } = await pdf(dataBuffer);
  const formatedText = text.replace(/(\r\n|\n|\r)/gm, "");

  return formatedText;
}

export function regexRecord(text: string): Array<GradClass> {
  const regex =
    /([0-9]{7})([A-Z].*?)(Obrigatória|Optativa|Extracurricular)(\d)(\d{2})((?:\d{1,2},\d|-))(Dispensa|Aprovado|Reprovado|Trancado)(\d{4}\.\d)/gi;

  const regexData = [...text.matchAll(regex)];
  return regexData.map(
    ([, id, name, type, credits, time, grade, status, semester]) => {
      return {
        id,
        name: extractClassName(name),
        type,
        credits,
        time,
        grade,
        status,
        semester,
      };
    }
  );
}

export function extractClassName(text: string): string {
  let lastUpperCaseLetter = text.length - 1;

  for (let i = 0; i < text.length; i++) {
    if (
      text[i].toUpperCase() === text[i] &&
      text[i + 1] &&
      text[i + 1].toUpperCase() !== text[i + 1]
    ) {
      lastUpperCaseLetter = i - 1;
      break;
    }
  }
  return text.substring(0, lastUpperCaseLetter + 1).trim();
}
