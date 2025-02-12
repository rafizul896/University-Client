import CreateAdmin from "@/pages/admin/userManagement/CreateAdmin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateFaculty from "@/pages/admin/userManagement/CreateFaculty";
import CreateStudent from "@/pages/admin/userManagement/CreateStudent";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Faculty",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Create Member",
        path: "create-member",
        element: <CreateStudent />,
      },
    ],
  },
];
