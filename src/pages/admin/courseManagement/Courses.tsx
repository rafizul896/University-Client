import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/admin/courseManagement.api";
import { useGetAllFacultiesQuery } from "@/redux/features/admin/userManagement.api";
import { TCourse, TResponse } from "@/types";
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const Courses = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}${code}`,
  }));

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item: any) => {
        return <AddFacultyModal courseData={item} />;
      },
    },
  ];

  return (
    <Table loading={isFetching} columns={columns} dataSource={tableData} />
  );
};

const AddFacultyModal = ({ courseData }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [addFaculties] = useAddFacultiesMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const facultiesOption = facultiesData?.data?.map((item) => ({
    value: item?._id,
    label: item?.fullName,
  }));

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating..!");

    const facultyData = {
      courseId: courseData,
      data,
    };

    try {
      const res = (await addFaculties(facultyData)) as TResponse<TCourse>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Faculty is Added", { id: toastId });
        setIsModalOpen(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err?.message, { id: toastId });
      }
    }
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOption}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
