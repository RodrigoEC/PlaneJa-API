import { regexRecord } from "../util/const";
import { extractClassName } from "../util/util";

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

export function extractRegexRecord(text: string): Array<GradRecord> {
  const regexData = [...text.matchAll(regexRecord)];
  return regexData.map(
    ([, id, name, type, credits, workload, grade, status, semester]) => {
      return {
        id: +id,
        name: extractClassName(name),
        type,
        credits: +credits,
        workload: +workload,
        grade: +grade,
        status,
        semester,
      };
    }
  );
}
