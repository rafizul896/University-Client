import PHDatePicker from "@/components/form/PHDatePicker";
import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import PHSelect from "@/components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import {
  useGetAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from "@/redux/features/admin/academicManagement.api";
import { useAddAStudentMutation } from "@/redux/features/admin/userManagement.api";
import { createStudentValidationSchema } from "@/schemas/userManagement.schema";
import { TResponse } from "@/types";
import { TStudent } from "@/types/userManagement.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues } from "react-hook-form";
import { toast } from "sonner";

const defaultValue = {
  name: {
    firstName: "I am ",
    middleName: "Student",
    lastName: "Number 1",
  },
  gender: "male",
  email: "student2@gmail.com",
  contactNo: "1235678",
  emergencyContactNo: "987-654-3210",
  bloodGroup: "A+",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",
  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-222-3333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "444-555-6666",
  },
  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "777-888-9999",
    address: "789 Pine St, Villageton",
  },
};

const CreateStudent = () => {
  const [createStudent] = useAddAStudentMutation();
  const { data: semesterData, isLoading: sIsLoading } =
    useGetAllSemestersQuery(undefined);
  const { data: departmentData, isLoading: dIsLoading } =
    useGetAcademicDepartmentsQuery(undefined, { skip: sIsLoading });

  const semesterOptions = semesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}-${item.year}`,
  }));

  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("creating..!");
    const formData = new FormData();

    const studentData = {
      password: "student123",
      student: data,
    };

    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);

    //! THis is for development --> just for checking
    // console.log(Object.fromEntries(formData));

    try {
      const res = (await createStudent(formData)) as TResponse<TStudent>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Student is Created successfully", { id: toastId });
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err?.message, { id: toastId });
      }
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          defaultValues={defaultValue}
          resolver={zodResolver(createStudentValidationSchema)}
        >
          <Divider>Personal Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood Group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          <Divider>Contact Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact Number" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          <Divider>Guardian Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father Contact Number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother Contact Number"
              />
            </Col>
          </Row>

          <Divider>Local Guardian Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact Number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>

          <Divider>Academic Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
