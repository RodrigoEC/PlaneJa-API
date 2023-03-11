import { StudentSubject, Subject } from "../util/interfaces";

export const recommendSubjects = async (
  studentSubjects: StudentSubject[],
  requiredSubjects: string[]
): Promise<Subject[][]> => {
  return [
    [
      {
        id: "1411320",
        name: "ADMINISTRACAO DE SISTEMAS",
        class_num: "01",
        credits: 4,
        workload: 60,
        schedule: [
          {
            day: "2",
            init_time: "14:00",
            end_time: "16:00",
          },
          {
            day: "4",
            init_time: "16:00",
            end_time: "18:00",
          },
        ],
      },
      {
        id: "1301123",
        name: "ADMINISTRACAO E EMPREENDEDORISMO",
        class_num: "01",
        credits: 4,
        workload: 60,
        schedule: [
          {
            day: "4",
            init_time: "14:00",
            end_time: "16:00",
          },
          {
            day: "6",
            init_time: "16:00",
            end_time: "18:00",
          },
        ],
      },
      {
        id: "1109049",
        name: "ALGEBRA LINEAR I",
        class_num: "01",
        credits: 4,
        workload: 60,
        schedule: [
          {
            day: "3",
            init_time: "08:00",
            end_time: "10:00",
          },
          {
            day: "5",
            init_time: "10:00",
            end_time: "12:00",
          },
        ],
      },
      {
        id: "1411321",
        name: "ALGORITMOS AVANCADOS I",
        class_num: "01",
        credits: 4,
        workload: 60,
        schedule: [
          {
            day: "3",
            init_time: "14:00",
            end_time: "16:00",
          },
          {
            day: "5",
            init_time: "16:00",
            end_time: "18:00",
          },
        ],
      },
      {
        id: "1411182",
        name: "LAB.DE ORG.E ARQUITETURA DE COMPUTADORES",
        class_num: "01",
        credits: 4,
        workload: 60,
        schedule: [
          {
            day: "3",
            init_time: "10:00",
            end_time: "12:00",
          },
          {
            day: "6",
            init_time: "08:00",
            end_time: "10:00",
          },
        ],
      },
    ],
    [
      {
        id: "1411321",
        name: "ALGORITMOS AVANCADOS I",
        class_num: "02",
        credits: 4,
        workload: 60,
        schedule: [
          {
            day: "2",
            init_time: "18:00",
            end_time: "22:00",
          },
        ],
      },
      {
        id: "1411313",
        name: "ANALISE DE SISTEMAS",
        class_num: "01",
        credits: 4,
        workload: 60,
        schedule: [
          {
            day: "2",
            init_time: "08:00",
            end_time: "10:00",
          },
          {
            day: "4",
            init_time: "10:00",
            end_time: "12:00",
          },
        ],
      },
      {
        id: "1411187",
        name: "ANÁLISE E TÉCNICA DE ALGORITMOS",
        class_num: "01",
        credits: 4,
        workload: 60,
        schedule: [
          {
            day: "3",
            init_time: "14:00",
            end_time: "16:00",
          },
          {
            day: "5",
            init_time: "16:00",
            end_time: "18:00",
          },
        ],
      },
      {
        id: "1411193",
        name: "BANCO DE DADOS I",
        class_num: "01",
        credits: 4,
        workload: 60,
        schedule: [
          {
            day: "4",
            init_time: "08:00",
            end_time: "10:00",
          },
          {
            day: "6",
            init_time: "10:00",
            end_time: "12:00",
          },
        ],
      },
    ],
  ];
};
