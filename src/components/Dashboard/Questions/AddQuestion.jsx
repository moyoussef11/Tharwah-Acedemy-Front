import { useEffect, useState } from "react";
import { PicCenterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../../rtk/features/tag/actGetTags";
import { fetchCategories } from "../../../rtk/features/categories/actGetCategories";
import { fetchSubCategories } from "../../../rtk/features/subCategories/actGetSubCategories";
import axios from "axios";
import { BASEURL, QUESTIONS } from "../../../utils/api";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { fetchQuestions } from "../../../rtk/features/questions/actGetQuestions";

const AddQuestion = () => {
  const tagsState = useSelector((state) => state.tags);
  const categoriesState = useSelector((state) => state.categories);
  const subCategoriesState = useSelector((state) => state.sub_category);
  const dispatch = useDispatch();
  const { tags } = tagsState;
  const { categories } = categoriesState;
  const { sub_categories } = subCategoriesState;
  const [loading, setLoading] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [tagsSelected, setTagsSelected] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const nav = useNavigate();
  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, [dispatch]);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    if (!question) {
      setLoading(false);
      return message.error("please enter question");
    }
    if (!answer) {
      setLoading(false);
      return message.error("please enter answer");
    }
    if (tagsSelected.length <= 0) {
      setLoading(false);
      return message.error("please enter tags");
    }
    if (!categoryId) {
      setLoading(false);
      return message.error("please enter category main");
    }
    if (!subCategoryId) {
      setLoading(false);
      return message.error("please enter subCategory");
    }
    try {
      const res = await axios.post(
        `${BASEURL}/${QUESTIONS}`,
        {
          question,
          answer,
          categoryId,
          sub_CategoryId: subCategoryId,
          tags: tagsSelected,
        },
        { headers: { Authorization: "Bearer " + token } }
      );
      message.success(res.data.msg);
      await dispatch(fetchQuestions());
      setLoading(false);
      nav("/admin-dashboard/questions");
    } catch (error) {
      console.log(error);
    }
  }
  const options = tags.map((tag) => ({ value: tag._id, label: tag.name }));
  const optionsCategories = categories.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const filterSubCategories = sub_categories.filter(
    (sub) => sub.categoryId === categoryId
  );


  const optionsSubCategories = filterSubCategories.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  return (
    <div>
      <h4 className="mb-10 text-3xl text-center md:text-start">
        اضافة سؤال جديد{" "}
      </h4>
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
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="tags"> tags</label>
          <Select
            id="tags"
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Tags Mode"
            onChange={(value) => setTagsSelected(value)}
            options={options}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {" "}
          <div className="flex flex-col gap-3">
            <label htmlFor="category">الفئة الاساسية</label>
            <Select
              id="category"
              placeholder="الفئة الاساسية"
              optionFilterProp="label"
              onChange={(e) => setCategoryId(e)}
              options={optionsCategories}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="subCategory">الفئة الفرعية</label>
            <Select
              id="subCategory"
              placeholder="الفئة الفرعية"
              optionFilterProp="label"
              onChange={(e) => setSubCategoryId(e)}
              options={optionsSubCategories}
              disabled={!categoryId ? true : false}
            />
          </div>
        </div>

        <div className="my-5">
          <Button
            type="primary"
            loading={loading}
            icon={<PlusOutlined />}
            htmlType="submit"
          >
            اضافة السؤال
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
