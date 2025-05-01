import { useEffect } from "react";
import { message, Space, Table, Tag } from "antd";
import DeleteModels from "../../Model/DeleteModels";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionsRequests } from "../../../rtk/features/questions/actGetQuestions";
import { BASEURL } from "../../../utils/api";
import axios from "axios";

const RequestsQuestions = () => {
  const questionsState = useSelector((state) => state.questions);
  const dispatch = useDispatch();
  const { requestsQuestions } = questionsState;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchQuestionsRequests());
  }, [dispatch]);

  async function approveQuestion(id) {
    const res = await axios.get(`${BASEURL}/request-add-question/${id}`);
    dispatch(fetchQuestionsRequests());
    message.success(res.data.msg);
  }

  const columns = [
    {
      title: "السؤال",
      dataIndex: "question",
      key: "question",
      sorter: (a, b) => a.question?.length - b.question?.length,
      sortDirections: ["descend"],
    },
    {
      title: "الاجابة",
      dataIndex: "answer",
      key: "answer",
      sorter: (a, b) => a.answer?.length - b.answer?.length,
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
          <button
            onClick={() => approveQuestion(record.key)}
            className="bg-green-500 text-white capitalize p-2 font-semibold rounded-2xl cursor-pointer"
          >
            approve
          </button>
          <DeleteModels
            url={`request-add-question`}
            getData={() => dispatch(fetchQuestionsRequests())}
            id={record.key}
          />
        </Space>
      ),
    },
  ];
  const data = requestsQuestions.map((item) => ({ ...item, key: item._id }));

  return <Table columns={columns} dataSource={data} />;
};

export default RequestsQuestions;
