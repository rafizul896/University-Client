import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllRegisteredSemesterQuery } from "@/redux/features/admin/courseManagement.api";
import { TSemester } from "@/types/courseManagement.type";

export type TTableData = Pick<
  TSemester,
  "academicSemester" | "status" | "startDate" | "endDate"
>;

const RegisteredSemesters = () => {
  const { data: semesters, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);

  const tabelData = semesters?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester?.name}-${academicSemester?.year}`,
      status,
      startDate,
      endDate,
    })
  );

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
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
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
