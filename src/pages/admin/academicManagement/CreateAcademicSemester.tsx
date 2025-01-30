import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import { Button } from "antd";
import { FieldValues } from "react-hook-form";

const CreateAcademicSemester = () => {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <PHForm onSubmit={onSubmit}>
      <PHInput type="text" name="name" />
      <PHInput type="text" name="name" />
      <PHInput type="text" name="name" />
      <Button htmlType="submit">Submit</Button>
    </PHForm>
  );
};

export default CreateAcademicSemester;
