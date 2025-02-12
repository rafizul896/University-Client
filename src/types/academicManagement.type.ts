export type TAcademicSemester = {
  _id: string;
  name: string;
  year: number;
  code: string;
  endMonth: string;
  startMonth: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: TAcademicFaculty;
  createdAt: string;
  updatedAt: string;
};