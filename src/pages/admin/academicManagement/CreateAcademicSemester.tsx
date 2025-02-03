import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import { monthOptions } from "@/constants/global";
import { nameOptions } from "@/constants/semester";
import { Button, Col, Flex } from "antd";
import { FieldValues } from "react-hook-form";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const onSubmit = (data: FieldValues) => {
    const name = nameOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data?.name,
    };
    console.log(semesterData,data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span="6">
        <PHForm onSubmit={onSubmit}>
          <PHSelect name="name" label="Name" options={nameOptions} />
          <PHSelect name="year" label="Year" options={yearOptions} />
          <PHSelect
            name="startMonth"
            label="Start Month"
            options={monthOptions}
          />
          <PHSelect name="endMonth" label="End Month" options={monthOptions} />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
