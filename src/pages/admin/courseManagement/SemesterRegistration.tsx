import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { FieldValues } from "react-hook-form";
import { useGetAllSemestersQuery } from "@/redux/features/admin/academicManagement.api";
import PHDatePicker from "@/components/form/PHDatePicker";
import PHInput from "@/components/form/PHInput";
import { toast } from "sonner";
import { useAddRegisteredSemesterMutation } from "@/redux/features/admin/courseManagement.api";
import { TResponse } from "@/types";

const status = ["UPCOMING", "ONGOING", "ENDED"];
const statedOptions = status?.map((item) => ({
  value: item,
  label: item,
}));

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemesters } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemesters?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}-${item.year}`,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating..!");

    const semesterRegistrationData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit)
    };

    try {
      const res = (await addSemester(
        semesterRegistrationData
      )) as TResponse<any>;

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
      <Col span="8">
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            name="academicSemester"
            label="Academic Semester"
            options={academicSemesterOptions}
          />

          <PHSelect name="status" label="Status" options={statedOptions} />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput name="minCredit" label="Min Credit" type="number" />
          <PHInput name="maxCredit" label="Max Credit" type="number" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
