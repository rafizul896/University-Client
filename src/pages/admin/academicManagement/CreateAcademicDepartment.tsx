import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "@/schemas/academicManagement.schema";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultyQuery,
} from "@/redux/features/admin/academicManagement.api";
import PHInput from "@/components/form/PHInput";
import { toast } from "sonner";
import { TResponse } from "@/types";
import { TAcademicDepartment } from "@/types/academicManagement.type";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data, isLoading } = useGetAcademicFacultyQuery(undefined);

  if (isLoading) {
    return <p>Loading..!</p>;
  }

  const academicFacultyOptions = data?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating..!");

    const academicDepartmentData = {
      name: data?.name,
      academicFaculty: data?.academicFaculty,
    };

    console.log(typeof academicDepartmentData.academicFaculty);

    try {
      const res = (await addAcademicDepartment(
        academicDepartmentData
      )) as TResponse<TAcademicDepartment[]>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic Department is creatrd Success", {
          id: toastId,
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err?.message, { id: toastId });
      }
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span="8">
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PHInput name="name" label="Name" type="text" />
          <PHSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions!}
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
