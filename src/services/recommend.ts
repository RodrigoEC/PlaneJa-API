import { StudentSubject, WeekSchedule } from "../util/interfaces";

export const recommendSubjects = async (
  studentSubjects: StudentSubject[],
  requiredSubjects: string[]
): Promise<WeekSchedule[]> => {
  const subjects: WeekSchedule[] = [
    {
      seg: {
        name: "segunda-feira",
        subs: [
          {
            title: "Fundamentos de matemática para ciência da computação II",
            variant: "cyan",
            position: 2,
            locked: true,
          },
        ],
      },
      ter: {
        name: "terça-feira",
        subs: [
          {
            title: "Banco De Dados Ii",
            variant: "lightOrange",
            position: 4,
            locked: true,
          },
        ],
      },
      quar: { name: "quarta-feira", subs: [] },
      qui: { name: "quinta-feira", subs: [] },
      sex: { name: "sexta-feira", subs: [] },
      sab: { name: "sábado", subs: [] },
    },
    {
      seg: {
        name: "segunda-feira",
        subs: [
          {
            title: "Fundamentos de matemática para ciência da computação II",
            variant: "cyan",
            position: 3,
            locked: true,
          },
        ],
      },
      ter: {
        name: "terça-feira",
        subs: [
          {
            title: "Fundamentos de matemática para ciência da computação II",
            variant: "cyan",
            position: 1,
            locked: true,
          },
        ],
      },
      quar: { name: "quarta-feira", subs: [] },
      qui: { name: "quinta-feira", subs: [] },
      sex: { name: "sexta-feira", subs: [] },
      sab: { name: "sábado", subs: [] },
    },
  ];

  return subjects;
};
