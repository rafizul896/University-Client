import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { FieldValues } from "react-hook-form";

const nameOptions = [
  { value: "01", label: "Autumn" },
  { value: "02", label: "Summer" },
  { value: "03", label: "Fall" },
];

const CreateAcademicSemester = () => {
  const onSubmit = (data: FieldValues) => {
    const name = nameOptions[Number(data.name)-1].label;
    const semesterData = {
      name,
      code: data?.name,
    };
    console.log(semesterData);
  };

  return (
    <Flex justify="center" align="center">
      <Col span="6">
        <PHForm onSubmit={onSubmit}>
          <PHSelect name="name" label="Name" options={nameOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
