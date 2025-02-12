import { Button, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParam, TStudent } from "@/types";
import { useGetAllStudentsQuery } from "@/redux/features/admin/userManagement.api";

export type TTableData = Pick<TStudent, "fullName" | "id">;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: studentData, isFetching } = useGetAllStudentsQuery(params);

  const tabelData = studentData?.data?.map(({ _id, fullName, id }) => ({
    key: _id,
    id,
    fullName,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Roll No",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Action",
      align: "center",
      key: "x",
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
    console.log({ filters, extra });
    if (extra.action === "filter") {
      const queryParans: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParans.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) => {
        queryParans.push({ name: "year", value: item });
      });

      setParams(queryParans);
    }
  };

  return (
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tabelData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default StudentData;
