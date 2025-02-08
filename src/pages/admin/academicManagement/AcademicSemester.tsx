import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "@/redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "@/types/academicManagement.type";
import { useState } from "react";
import { TQueryParam } from "@/types";

export type TTableData = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: semesterData, isFetching } = useGetAllSemestersQuery(params);

  const tabelData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
    },
    {
      title: "Year",
      key: "year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
    },
    {
      title: "Start Month",
      key: "startMonth",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      key: "endMonth",
      dataIndex: "endMonth",
    },
    {
      title: 'Action',
      key: 'x',
      render: () => {
        return <div><Button>Update</Button></div>
      }
    }
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

export default AcademicSemester;
