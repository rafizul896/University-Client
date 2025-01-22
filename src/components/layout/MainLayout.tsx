import { Layout } from "antd";
const { Header, Content } = Layout;
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { MdLogout } from "react-icons/md";

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }}>
          <button
            onClick={handleLogout}
            className="text-red-500 flex items-center gap-1 absolute right-5"
          >
            <MdLogout /> Logout
          </button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
