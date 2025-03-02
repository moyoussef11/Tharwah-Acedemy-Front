import { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import EditArticle from "./EditArticle";
import DeleteModels from "../../Model/DeleteModels";
import EditModels from "../../Model/EditModels";
import { fetchArticles } from "../../../rtk/features/articles/actGetArticles";
import { useDispatch, useSelector } from "react-redux";
import { ARTICLES } from "../../../utils/api";

const Articles = () => {
  const dispatch = useDispatch();
  const articlesState = useSelector((state) => state.articles);
  const { articles } = articlesState;


  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchArticles());
  }, [dispatch]);

  const columns = [
    {
      title: "العنوان",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.name?.length - b.name?.length,
      sortDirections: ["descend"],
    },

    {
      title: "الصورة",
      dataIndex: "image",
      key: "image",
      render: (src) => (
        <img src={src} alt="pic" style={{ width: 50, height: 50 }} />
      ),
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditModels id={record.key}>
            <EditArticle id={record.key} />
          </EditModels>
          <DeleteModels
            url={`${ARTICLES}`}
            getData={() => dispatch(fetchArticles())}
            id={record.key}
          />
        </Space>
      ),
    },
  ];
  const data = articles.map((item) => ({ ...item, key: item._id }));

  return <Table columns={columns} dataSource={data} />;
};

export default Articles;
