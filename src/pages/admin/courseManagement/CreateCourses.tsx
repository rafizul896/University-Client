import PHForm from "@/components/form/PHForm";
import { Button, Col, Flex } from "antd";
import { FieldValues } from "react-hook-form";
import PHInput from "@/components/form/PHInput";
import { toast } from "sonner";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/admin/courseManagement.api";
import PHSelect from "@/components/form/PHSelect";
import { TCourse, TResponse } from "@/types";

const CreateCourses = () => {
  const [addCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const courseOptions = courses?.data?.map((course) => ({
    value: course._id,
    label: course.title,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating..!");

    const courseData = {
      ...data,
      isDeleted: false,
      code: Number(data.code),
      credits: Number(data.credits),
      preRequisiteCourses: data?.preRequisiteCourses?.map((item: string) => ({
        course: item,
        isDeleted: false,
      })),
    };

    try {
      const res = (await addCourse(
        courseData
      )) as TResponse<TCourse>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course is created successfully", { id: toastId });
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
          <PHInput name="title" label="Title" type="text" />
          <PHInput name="prefix" label="Prefix" type="text" />
          <PHInput name="code" label="Code" type="number" />
          <PHInput name="credits" label="Credits" type="number" />
          <PHSelect
            name="preRequisiteCourses"
            label="preRequisiteCourses"
            options={courseOptions}
            mode="multiple"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourses;
