import { regexPajamaContent } from "../util/const";

export interface Schedule {
  day: string;
  init_time: string;
  end_time: string;
}

export interface Subject {
  id: number;
  name: string;
  credits: number;
  workload: number;
  schedule: Schedule[];
}

export function extractPajamaSubjects(text: string): Subject[] {
  const regexData = [...text.matchAll(regexPajamaContent)];
  return regexData.map(([, id, name, credits, workload, ...schedule]) => {
    const schedules: Schedule[] = [
      { day: schedule[0], init_time: schedule[1], end_time: schedule[2] },
      { day: schedule[3], init_time: schedule[4], end_time: schedule[5] },
    ];

    return {
      id: +id,
      name: name.substring(0, name.length - 1).trim(),
      credits: +credits,
      workload: +workload,
      schedule: schedules,
    };
  });
}
