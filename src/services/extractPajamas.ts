import { regexPajamaContent } from "../util/const";
import { compareSubject } from "../util/util";

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
  schedule: Array<Schedule[]>;
}

export function extractPajamaSubjects(text: string): Subject[] {
  const regexData = [...text.matchAll(regexPajamaContent)];
  const filteredSubjects = {};

  regexData.forEach(([, id, name, credits, workload, ...schedule]) => {
    const subjectSchedule = [
      { day: schedule[0], init_time: schedule[1], end_time: schedule[2] },
      { day: schedule[3], init_time: schedule[4], end_time: schedule[5] },
    ];

    if (id in filteredSubjects) {
      let hasSubjects = false;
      filteredSubjects[id].schedule.forEach((element) => {
        if (
          (compareSubject(element[0], subjectSchedule[0]),
          compareSubject(element[1], subjectSchedule[1]))
        ) {
          hasSubjects = true;
        }
      });
      if (!hasSubjects) filteredSubjects[id].schedule.push(subjectSchedule);
    } else {
      filteredSubjects[id] = {
        id: +id,
        name: name.substring(0, name.length).trim(),
        credits: +credits,
        workload: +workload,
        schedule: [subjectSchedule],
      };
    }
  });

  return Object.values(filteredSubjects);
}
