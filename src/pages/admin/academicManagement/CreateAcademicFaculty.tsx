import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import { useAddAcademicFacultyMutation } from "@/redux/features/admin/academicManagement.api";
import { academicFacultySchema } from "@/schemas/academicManagement.schema";
import { TResponse } from "@/types";
import { TAcademicFaculty } from "@/types/academicManagement.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating..!");

    try {
      const res = (await addAcademicFaculty(
        data
      )) as TResponse<TAcademicFaculty>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err?.message, { id: toastId });
      }
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHInput label="Name" name="name" type="text" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
