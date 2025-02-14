import { Button, Dropdown, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import {
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisteredSemesterMutation,
} from "@/redux/features/admin/courseManagement.api";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import { TResponse, TSemester } from "@/types";

export type TTableData = {
  name: string;
  status: string;
  startDate: string;
  endDate: string;
};

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState("");
  const { data: semesters, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);
  const [upsateSemesterStatus] = useUpdateRegisteredSemesterMutation();

  const tabelData = semesters?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester?.name}-${academicSemester?.year}`,
      status,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
    })
  );

  const handleStatusUpsate = async (data: any) => {
    const toastId = toast.loading("creating..!");

    const updateData = {
      id: semesterId,
      data: { status: data.key },
    };

    try {
      const res = (await upsateSemesterStatus(
        updateData
      )) as TResponse<TSemester>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Status update is successfully", { id: toastId });
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err?.message, { id: toastId });
      }
    }
  };

  const menyProps = {
    items,
    onClick: handleStatusUpsate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;

        if (item === "UPCOMING") {
          color = "blue";
        } else if (item === "ONGOING") {
          color = "green";
        } else {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menyProps} trigger={["click"]}>
            <Button
              onClick={() => {
                setSemesterId(item.key);
              }}
            >
              Update
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tabelData}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default RegisteredSemesters;
