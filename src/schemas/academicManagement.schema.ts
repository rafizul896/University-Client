import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "This fiend is required!" }),
  year: z.string({ required_error: "This fiend is required!" }),
  startMonth: z.string({ required_error: "This fiend is required!" }),
  endMonth: z.string({ required_error: "This fiend is required!" }),
});

export const academicFacultySchema = z.object({
  name: z.string({ required_error: "Academic Faculty name is required!" }),
});
