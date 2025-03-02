import { useEffect } from "react";
import { Space, Table } from "antd";
import EditModels from "../../Model/EditModels";
import DeleteModels from "../../Model/DeleteModels";
import EditSubCategory from "./EditSubCategory";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategories } from "../../../rtk/features/subCategories/actGetSubCategories";
import { CATEGORIES, SUB_CATEGORIES } from "../../../utils/api";

const SubCategories = () => {
  const subCategories = useSelector((state) => state.sub_category);
  const dispatch = useDispatch();
  const { sub_categories } = subCategories;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSubCategories());
  }, [dispatch]);

  const columns = [
    {
      title: "اسم القسم ",
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
          <EditModels id={record.key}>
            <EditSubCategory id={record.key} />
          </EditModels>
          <DeleteModels
            url={`${CATEGORIES}/${SUB_CATEGORIES}`}
            getData={() => dispatch(fetchSubCategories())}
            id={record.key}
          />
        </Space>
      ),
    },
  ];
  const data = sub_categories.map((item) => ({ ...item, key: item.slug }));

  return <Table columns={columns} dataSource={data} />;
};

export default SubCategories;
