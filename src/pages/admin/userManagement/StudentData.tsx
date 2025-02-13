import { Button, Pagination, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParam, TStudent } from "@/types";
import { useGetAllStudentsQuery } from "@/redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";

export type TTableData = Pick<TStudent, "fullName" | "id" | "email">;

const StudentData = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const metaData = studentData?.meta;

  const tabelData = studentData?.data?.map(({ _id, fullName, id, email }) => ({
    key: _id,
    id,
    fullName,
    email,
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
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Action",
      align: "center",
      key: "x",
      render: (item) => {
        console.log(item)
        return (
          <Space>
            <Link to={`/admin/student-data/${item.key}`}>
            <Button>Details</Button>
            </Link>
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
    <>
      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tabelData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <Pagination
        align="end"
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
        style={{ marginTop: "8px" }}
      />
    </>
  );
};

export default StudentData;
