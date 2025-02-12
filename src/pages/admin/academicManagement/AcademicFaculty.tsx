import { useGetAcademicFacultyQuery } from "@/redux/features/admin/academicManagement.api";
import { Button, Table, TableColumnsType } from "antd";

export type TTableData = { name: string };

const AcademicFaculty = () => {
  const { data, isFetching } = useGetAcademicFacultyQuery(undefined);

  const tabelData = data?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
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
    />
  );
};

export default AcademicFaculty;
