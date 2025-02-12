import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAcademicDepartmentsQuery } from "@/redux/features/admin/academicManagement.api";

export type TTableData = {
  name: string;
  academicFacultyName: string;
};

const AcademicDepartment = () => {
  const { data, isFetching } = useGetAcademicDepartmentsQuery(undefined);

  const tabelData = data?.data?.map(({ _id, name, academicFaculty }) => ({
    key: _id,
    name,
    academicFacultyName: academicFaculty.name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },

    {
      title: "Academic Faculty",
      key: "academicFaculty",
      dataIndex: "academicFacultyName",
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

export default AcademicDepartment;
