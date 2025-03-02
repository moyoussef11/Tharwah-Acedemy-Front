import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { PicCenterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASEURL, QUESTIONS } from "../../../utils/api";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import {
  fetchQuestion,
  fetchQuestions,
} from "../../../rtk/features/questions/actGetQuestions";
const EditQuestion = ({ id, setOpen }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");
  const nav = useNavigate();

  const getQuestion = async () => {
    const result = await dispatch(fetchQuestion(id));
    setQuestion(result.payload.question.question);
    setAnswer(result.payload.question.answer);
  };

  useEffect(() => {
    getQuestion();
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `${BASEURL}/${QUESTIONS}/${id}`,
        {
          question,
          answer,
        },
        { headers: { Authorization: "Bearer " + token } }
      );
      message.success(res.data.msg);
      await dispatch(fetchQuestions());
      setLoading(false);
      setOpen(false);
      nav("/admin-dashboard/questions");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h4 className="mb-10 text-3xl text-center md:text-start">تعديل سؤال </h4>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label htmlFor="question">السؤال</label>
          <Input
            id="question"
            size="large"
            placeholder="السؤال"
            prefix={<PicCenterOutlined />}
            onChange={(e) => setQuestion(e.target.value)}
            name="question"
            value={question}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="answer">الاجابة</label>
          <Input
            id="answer"
            size="large"
            placeholder="الاجابة"
            prefix={<PicCenterOutlined />}
            onChange={(e) => setAnswer(e.target.value)}
            name="answer"
            value={answer}
          />
        </div>

        <div className="my-5">
          <Button
            type="primary"
            loading={loading}
            icon={<PlusOutlined />}
            htmlType="submit"
          >
            تعديل السؤال
          </Button>
        </div>
      </form>
    </div>
  );
};

EditQuestion.propTypes = {
  id: PropTypes.string,
  setOpen: PropTypes.func,
};

export default EditQuestion;
