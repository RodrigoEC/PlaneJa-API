export interface Semester {
  name: string;
  semester: string;
  subjects: Subject[];
}

export interface Subject {
  id: string;
  name: string;
  class_num: string;
  credits: number;
  workload: number;
  schedule: SubjectSchedule[];
}

export interface SubjectSchedule {
  day: string;
  init_time: string;
  end_time: string;
}

export const defaultSemester: Semester = {
  name: "",
  semester: "",
  subjects: [],
};
