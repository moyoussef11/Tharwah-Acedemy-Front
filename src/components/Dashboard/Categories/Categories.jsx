import { useEffect } from "react";
import { Space, Table } from "antd";
import EditModels from "../../Model/EditModels";
import DeleteModels from "../../Model/DeleteModels";
import EditCategory from "./EditCategory";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../rtk/features/categories/actGetCategories";
import { CATEGORIES } from "../../../utils/api";

const Categories = () => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.categories);
  const { categories } = categoryState;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCategories());
  }, [dispatch]);

  const columns = [
    {
      title: " القسم الرئيسي",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name?.length - b.name?.length,
      sortDirections: ["descend"],
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditModels id={record.slug}>
            <EditCategory id={record.slug} />
          </EditModels>
          <DeleteModels
            url={`${CATEGORIES}`}
            getData={() => dispatch(fetchCategories())}
            id={record.slug}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={categories.map((cat) => ({
        ...cat,
        key: cat.slug,
      }))}
    />
  );
};

export default Categories;
