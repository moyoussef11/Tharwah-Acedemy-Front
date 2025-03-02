import { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import EditModels from "../../Model/EditModels";
import DeleteModels from "../../Model/DeleteModels";
import EditQuestion from "./EditQuestion";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../../rtk/features/questions/actGetQuestions";
import { QUESTIONS } from "../../../utils/api";

const Questions = () => {
  const questionsState = useSelector((state) => state.questions);
  const dispatch = useDispatch();
  const { questions } = questionsState;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchQuestions());
  }, [dispatch]);

  const columns = [
    {
      title: "السؤال",
      dataIndex: "question",
      key: "question",
      sorter: (a, b) => a.question?.length - b.question?.length,
      sortDirections: ["descend"],
    },
    {
      title: "الفئة الرئيسية",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (category) =>
        typeof category === "object" ? category?.name : "غير متوفر",
    },
    {
      title: "الفئة الفرعية",
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
            <EditQuestion id={record.key} />
          </EditModels>
          <DeleteModels
            url={`${QUESTIONS}`}
            getData={() => dispatch(fetchQuestions())}
            id={record.key}
          />
        </Space>
      ),
    },
  ];
  const data = questions.map((item) => ({ ...item, key: item._id }));

  return <Table columns={columns} dataSource={data} />;
};

export default Questions;
