import { regexRecord } from "../util/const";
import { ExtractError } from "../util/errors";

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

/**
 * This function recieves the text that's going to be extracted from the PDF uploaded
 * and extract data related to the Subject and Schedule.
 *
 * @param text Text that's going to have data extracted.
 * @returns A list of the type GradRecord with the info that was retrieved.
 */
export function extractRegexRecord(text: string): GradRecord[] {
  const regexData = [...text.matchAll(regexRecord)];
  const result = regexData.map(
    ([, id, name, type, credits, workload, grade, status, semester]) => {
      return {
        id: +id,
        name: name.substring(0, name.length - 1).trim(),
        type,
        credits: +credits,
        workload: +workload,
        grade: +grade.replace(",", "."),
        status,
        semester,
      };
    }
  );

  if (result.length === 0) throw new ExtractError();
  return result;
}
