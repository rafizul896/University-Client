import { useGetAcademicFacultyQuery } from "@/redux/features/admin/academicManagement.api";

const AcademicFaculty = () => {
    const {data} = useGetAcademicFacultyQuery(undefined);

    console.log(data)
  return <div>AcademicFaculty</div>;
};

export default AcademicFaculty;
