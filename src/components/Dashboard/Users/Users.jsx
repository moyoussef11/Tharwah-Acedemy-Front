import { useEffect } from "react";
import { Space, Table } from "antd";
import DeleteModels from "../../Model/DeleteModels";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../rtk/features/users/actGetUsers";
import EditModels from "../../Model/EditModels";
import EditrUserRole from "./EditrUserRole";

const Users = () => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

 
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchUsers());
  }, [dispatch]);

  const columns = [
    {
      title: "الاسم ",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name?.length + b.name?.length,
      sortDirections: ["descend"],
    },
    {
      title: "الايميل ",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email?.length - b.email?.length,
      sortDirections: ["descend"],
    },
    {
      title: "الصلاحية",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        if (record.role !== "admin") {
          return (
            <Space size="middle">
              <EditModels id={record.key}>
                <EditrUserRole id={record.key} />
              </EditModels>
              <DeleteModels
                url="users"
                getData={() => dispatch(fetchUsers())}
                id={record.key}
              />
            </Space>
          );
        }
        return null;
      },
    },
  ];
  const data = users.map((item) => ({ ...item, key: item._id }));

  return <Table columns={columns} dataSource={data} />;
};

export default Users;
