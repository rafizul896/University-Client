import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { FieldValues } from "react-hook-form";

const CreateAcademicSemester = () => {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const nameOptions = [
    { value: "Auton", label: "Auton" },
    { value: "Summer", label: "Summer" },
    { value: "Fall", label: "Fall" },
  ];

  return (
    <Flex justify="center" align="center">
      <Col span="6">
        <PHForm onSubmit={onSubmit}>
          <PHSelect name="Name" label="Name" options={nameOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
