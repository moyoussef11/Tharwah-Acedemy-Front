import { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import EditModels from "../../Model/EditModels";
import DeleteModels from "../../Model/DeleteModels";
import EditLibrary from "./EditLibrary";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibrary } from "../../../rtk/features/library/actGetLibrary";
import { LIBRARY } from "../../../utils/api";

const Library = () => {
  const dispatch = useDispatch();
  const libraryState = useSelector((state) => state.library);
  const { library } = libraryState;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchLibrary());
  }, [dispatch]);

  const columns = [
    {
      title: "العنوان",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title?.length - b.title?.length,
      sortDirections: ["descend"],
    },
    {
      title: "القسم الرئيسي",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (category) =>
        typeof category === "object" ? category?.name : "غير متوفر",
    },
    {
      title: "القسم الفرعي",
      dataIndex: "sub_CategoryId",
      key: "sub_CategoryId",
      render: (subCategory) =>
        typeof subCategory === "object" ? subCategory?.name : "غير متوفر",
    },
    {
      title: "التاجات",
      dataIndex: "tags",
      key: "tags",
      render: (tags) =>
        Array.isArray(tags) && tags.length > 0
          ? tags.map((tag, index) => <Tag key={index}>{tag.name || tag}</Tag>)
          : "لا توجد تاجات",
    },
    {
      title: "الملف",
      dataIndex: "url",
      key: "url",
      render: (src) => {
        const fileExtension = src.split(".").pop().toLowerCase();
        const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(
          fileExtension
        );
        const isVideo = ["mp4", "webm", "ogg"].includes(fileExtension);

        if (isImage) {
          return (
            <img
              src={src}
              alt="pic"
              style={{ width: 50, height: 50, borderRadius: 5 }}
            />
          );
        } else if (isVideo) {
          return (
            <video
              src={src}
              controls
              style={{ width: 50, height: 50, borderRadius: 5 }}
            />
          );
        } else {
          return (
            <a
              href={src}
              download
              target="_blank"
              style={{ textDecoration: "none", color: "green" }}
            >
              📎 تحميل الملف
            </a>
          );
        }
      },
    },
    {
      title: "النوع",
      dataIndex: "type",
      key: "type",
    },
    {
      title: " format",
      dataIndex: "format",
      key: "format",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditModels id={record.key}>
            <EditLibrary id={record.key} />
          </EditModels>
          <DeleteModels
            url={`${LIBRARY}`}
            getData={() => dispatch(fetchLibrary())}
            id={record.key}
          />
        </Space>
      ),
    },
  ];
  const data = library.map((item) => ({ ...item, key: item._id }));

  return <Table columns={columns} dataSource={data} />;
};

export default Library;
