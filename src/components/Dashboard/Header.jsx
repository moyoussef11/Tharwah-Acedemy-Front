import PropTypes from "prop-types";
import { Button, Layout, Dropdown, Typography, Flex } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DesktopOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const { Header } = Layout;
const { Text } = Typography;

const HeaderDash = ({ collapsed, setCollapsed }) => {
  const nav = useNavigate();
  const menu = [
    {
      key: "website",
      icon: <DesktopOutlined />,
      label: <Link to="/">الموقع</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "تسجيل الخروج",
      onClick: () => {
        const cookies = new Cookies();
        cookies.remove("token");
        window.localStorage.removeItem("token");
        nav("/login-admin");
      },
    },
  ];
  return (
    <Header
      style={{
        padding: 0,
        backgroundColor: "#143A53",
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        style={{ padding: "0 16px" }}
      >
        <Button
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined style={{ color: "white" }} />
            ) : (
              <MenuFoldOutlined style={{ color: "white" }} />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            color: "white",
            backgroundColor: "#143A53",
          }}
        />
        <Dropdown menu={{ items: menu }} trigger={["click"]}>
          <Text
            style={{
              color: "green",
              backgroundColor: "white",
              padding: 10,
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: 20,
            }}
          >
            <span className="capitalize">admin dashboard</span>
          </Text>
        </Dropdown>
      </Flex>
    </Header>
  );
};
HeaderDash.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};

export default HeaderDash;
