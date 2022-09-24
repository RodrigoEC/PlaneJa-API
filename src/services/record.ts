import { regexRecord } from "../util/const";

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
        name: name.substring(0, name.length - 1).trim(),
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
