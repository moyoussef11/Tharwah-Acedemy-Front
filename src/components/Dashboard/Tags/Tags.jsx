import { useEffect } from "react";
import { Space, Table } from "antd";
import EditModels from "../../Model/EditModels";
import DeleteModels from "../../Model/DeleteModels";
import EditTag from "./EditTag";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../../rtk/features/tag/actGetTags";
import { TAGS } from "../../../utils/api";

const Tags = () => {
  const dispatch = useDispatch();
  const tagState = useSelector((state) => state.tags);
  const { tags } = tagState;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchTags());
  }, [dispatch]);

  const columns = [
    {
      title: "اسم التاج ",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name?.length + b.name?.length,
      sortDirections: ["descend"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditModels id={record.key}>
            <EditTag id={record.key} />
          </EditModels>
          <DeleteModels
            url={`${TAGS}`}
            getData={() => dispatch(fetchTags())}
            id={record.key}
          />
        </Space>
      ),
    },
  ];
  const data = tags.map((tag) => ({ ...tag, key: tag._id }));

  return <Table columns={columns} dataSource={data} />;
};

export default Tags;
