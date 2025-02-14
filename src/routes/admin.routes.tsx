import AcademicSemester from "@/pages/admin/academicManagement/AcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAcademicSemester from "@/pages/admin/academicManagement/CreateAcademicSemester";
import CreateAcademicFaculty from "@/pages/admin/academicManagement/CreateAcademicFaculty";
import AcademicFaculty from "@/pages/admin/academicManagement/AcademicFaculty";
import CreateAcademicDepartment from "@/pages/admin/academicManagement/CreateAcademicDepartment";
import AcademicDepartment from "@/pages/admin/academicManagement/AcademicDepartment";
import CreateAdmin from "@/pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "@/pages/admin/userManagement/CreateFaculty";
import CreateStudent from "@/pages/admin/userManagement/CreateStudent";
import StudentData from "@/pages/admin/userManagement/StudentData";
import StudentUpdate from "@/pages/admin/userManagement/StudentUpdate";
import StudentDetails from "@/pages/admin/userManagement/StudentDetails";
import SemesterRegistration from "@/pages/admin/courseManagement/SemesterRegistration";
import RegisteredSemesters from "@/pages/admin/courseManagement/RegisteredSemesters";
import CreateCourses from "@/pages/admin/courseManagement/CreateCourses";
import Courses from "@/pages/admin/courseManagement/Courses";
import OfferCourse from "@/pages/admin/courseManagement/OfferCourse";
import OfferedCourses from "@/pages/admin/courseManagement/OfferedCourses";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Students",
        path: "student-data",
        element: <StudentData />,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
      {
        name: "Student Update",
        path: "student-update",
        element: <StudentUpdate />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Semester Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered Semesters",
        path: "registered-semesters",
        element: <RegisteredSemesters />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourses />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },
      {
        name: "Offer Course",
        path: "offer-course",
        element: <OfferCourse />,
      },
      {
        name: "Offered Courses",
        path: "offered-courses",
        element: <OfferedCourses />,
      },
    ],
  },
];
