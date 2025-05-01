import PropTypes from "prop-types";
import { Layout, Menu } from "antd";
import {
  FileTextOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  QuestionCircleFilled,
  QuestionCircleTwoTone,
  BorderlessTableOutlined,
  AlignLeftOutlined,
  HomeOutlined,
  CreditCardTwoTone,
  TagFilled,
  TagsTwoTone,
  UserOutlined,
  UserAddOutlined,
  PullRequestOutlined,
} from "@ant-design/icons";
import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const SideBar = ({ collapsed }) => {
  const menuItems = [
    {
      key: "0",
      icon: <HomeOutlined />,
      label: <Link to="/admin-dashboard"> الصفحة الرئسية</Link>,
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: "المستخدمين",
      children: [
        {
          key: "all-users",
          icon: <UserOutlined />,
          label: <Link to="/admin-dashboard/users">جميع المستخدمين</Link>,
        },
        {
          key: "add-user",
          icon: <UserAddOutlined />,
          label: (
            <Link to="/admin-dashboard/users/add-user">إضافة مستخدم جديد</Link>
          ),
        },
      ],
    },
    {
      key: "articles",
      icon: <FileTextOutlined />,
      label: "المقالات",
      children: [
        {
          key: "all-articles",
          icon: <UnorderedListOutlined />,
          label: <Link to="/admin-dashboard/articles">جميع المقالات</Link>,
        },
        {
          key: "add-article",
          icon: <PlusOutlined />,
          label: (
            <Link to="/admin-dashboard/articles/add-article">
              إضافة مقال جديد
            </Link>
          ),
        },
      ],
    },
    {
      key: "questions",
      icon: <QuestionCircleFilled />,
      label: "الاسئلة",
      children: [
        {
          key: "all-questions",
          icon: <QuestionCircleTwoTone />,
          label: <Link to="/admin-dashboard/questions">جميع الاسئلة</Link>,
        },
        {
          key: "add-question",
          icon: <PlusOutlined />,
          label: (
            <Link to="/admin-dashboard/questions/add-questions">
              إضافة سؤال جديد
            </Link>
          ),
        },
        {
          key: "request-questions",
          icon: <PullRequestOutlined />,
          label: (
            <Link to="/admin-dashboard/questions/request-questions">
              جميع طلبات الاسئلة
            </Link>
          ),
        },
      ],
    },
    {
      key: "categories",
      icon: <CreditCardTwoTone />,
      label: "الفئات",
      children: [
        {
          key: "all-categories",
          icon: <AlignLeftOutlined />,
          label: <Link to="/admin-dashboard/categories">جميع الفئات</Link>,
        },
        {
          key: "add-category",
          icon: <PlusOutlined />,
          label: (
            <Link to="/admin-dashboard/categories/add-category">
              إضافة فئة جديدة
            </Link>
          ),
        },
        {
          key: "all-sub-categories",
          icon: <AlignLeftOutlined />,
          label: (
            <Link to="/admin-dashboard/categories/sub-categories">
              {" "}
              الفئات المتفرعة
            </Link>
          ),
        },
        {
          key: "add-sub-category",
          icon: <PlusOutlined />,
          label: (
            <Link to="/admin-dashboard/categories/add-sub-category">
              إضافة فئة متفرعة
            </Link>
          ),
        },
      ],
    },
    {
      key: "library",
      icon: <BorderlessTableOutlined />,
      label: "المكتبة",
      children: [
        {
          key: "all-library",
          icon: <AlignLeftOutlined />,
          label: <Link to="/admin-dashboard/library">جميع المكتبات</Link>,
        },
        {
          key: "add-library",
          icon: <PlusOutlined />,
          label: (
            <Link to="/admin-dashboard/library/add-library">إضافة مكتبة</Link>
          ),
        },
      ],
    },
    {
      key: "tags",
      icon: <TagFilled />,
      label: "tags",
      children: [
        {
          key: "all-tags",
          icon: <TagsTwoTone />,
          label: <Link to="/admin-dashboard/tags">جميع التاجات</Link>,
        },
        {
          key: "add-tag",
          icon: <PlusOutlined />,
          label: <Link to="/admin-dashboard/tags/add-tag">إضافة تاج </Link>,
        },
      ],
    },
  ];
  return (
    <Sider
      style={{
        padding: 0,
        backgroundColor: "#143A53",
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Link to={"/admin-dashboard"} className="demo-logo-vertical my-20 w-fit">
        <img src={logo} className="mx-auto my-6" alt="logo" />
      </Link>
      <Menu
        theme="light"
        style={{
          padding: 0,
          backgroundColor: "white",
        }}
        mode="inline"
        defaultSelectedKeys={["0"]}
        items={menuItems}
      />
    </Sider>
  );
};
SideBar.propTypes = {
  collapsed: PropTypes.bool,
};

export default SideBar;
