// Classes Offered interfaces
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

// Record interfaces
export interface StudentStatus {
  mandatory: [currentAmount: string, max: string];
  optative: [currentAmount: string, max: string];
  complementary: [currentAmount: string, max: string];
}

export interface StudentSubject {
  id: number;
  name: string;
  type: string;
  credits: number;
  workload: number;
  grade: number;
  status: string;
  semester: string;
}

export interface Record {
  name: string;
  enrollment_number: string;
  course: string;
  status: StudentStatus;
  progress: string;
  classes: StudentSubject[];
}
