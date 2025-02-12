import { z } from "zod";

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last Name is required" }),
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's Name is required" }),
  fatherOccupation: z.string().min(1, { message: "Father's Occupation is required" }),
  fatherContactNo: z.string().min(1, { message: "Father's Contact No is required" }),
  motherName: z.string().min(1, { message: "Mother's Name is required" }),
  motherOccupation: z.string().min(1, { message: "Mother's Occupation is required" }),
  motherContactNo: z.string().min(1, { message: "Mother's Contact No is required" }),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: "Local Guardian's Name is required" }),
  occupation: z.string().min(1, { message: "Local Guardian's Occupation is required" }),
  contactNo: z.string().min(1, { message: "Local Guardian's Contact No is required" }),
  address: z.string().min(1, { message: "Local Guardian's Address is required" }),
});

export const createStudentValidationSchema = z.object({
  name: createUserNameValidationSchema,
  gender: z.enum(["male", "female", "other"], {
    message: "Gender is required",
  }),
  dateOfBirth: z.string().optional(),
  email: z.string().min(1, { message: "Email is required" }),
  contactNo: z.string().min(1, { message: "Contact No is required" }),
  emergencyContactNo: z.string().min(1, { message: "Emergency Contact No is required" }),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    message: "Blood Group is required",
  }),
  presentAddress: z.string().min(1, { message: "Present Address is required" }),
  permanentAddress: z.string().min(1, { message: "Permanent Address is required" }),
  guardian: createGuardianValidationSchema,
  localGuardian: createLocalGuardianValidationSchema,
  admissionSemester: z.string().min(1, { message: "Admission Semester is required" }),
  academicDepartment: z.string().min(1, { message: "Academic Department is required" }),
});
