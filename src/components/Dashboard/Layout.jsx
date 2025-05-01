import { useEffect, useState } from "react";
import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import IndexDashboard from "./Index";
import SideBar from "./SideBar";
import HeaderDash from "./Header";

const LayoutAdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const nav = useNavigate();
  const isAdmin = user.role === "admin" ? true : false;

  useEffect(() => {
    if (!isAdmin) {
      nav("/");
    }
  }, [isAdmin]);

  return (
    <Layout>
      <SideBar collapsed={collapsed} />
      <Layout>
        <HeaderDash collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="contant min-h-screen my-[24px] mx-[16px] p-[24px] rounded-xl bg-white">
          {window.location.pathname === "/admin-dashboard" ||
          window.location.pathname === "/admin-dashboard/" ? (
            <IndexDashboard />
          ) : (
            <Outlet />
          )}
        </div>
      </Layout>
    </Layout>
  );
};

export default LayoutAdminDashboard;
