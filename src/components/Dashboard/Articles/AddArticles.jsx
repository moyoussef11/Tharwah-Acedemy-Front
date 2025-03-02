import {
  PicCenterOutlined,
  PlusOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { Button, Input, message, Upload, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { fetchTags } from "../../../rtk/features/tag/actGetTags";
import { fetchCategories } from "../../../rtk/features/categories/actGetCategories";
import { fetchSubCategories } from "../../../rtk/features/subCategories/actGetSubCategories";
import axios from "axios";
import { ARTICLES, BASEURL } from "../../../utils/api";
import { fetchArticles } from "../../../rtk/features/articles/actGetArticles";
const { Dragger } = Upload;
const AddArticles = () => {
  const tagsState = useSelector((state) => state.tags);
  const categoriesState = useSelector((state) => state.categories);
  const subCategoriesState = useSelector((state) => state.sub_category);
  const dispatch = useDispatch();
  const { tags } = tagsState;
  const { categories } = categoriesState;
  const { sub_categories } = subCategoriesState;
  const [loading, setLoading] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");
  const nav = useNavigate();
  const [content, setContent] = useState("");
  const [pic, setPic] = useState("");
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [tagsSelected, setTagsSelected] = useState([]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }, { direction: "ltr" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "left"] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, [dispatch]);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    if (!title) {
      setLoading(false);
      return message.error("please enter title article");
    }
    if (!content) {
      setLoading(false);
      return message.error("please enter content article");
    }
    if (!categoryId) {
      setLoading(false);
      return message.error("please enter category main article");
    }
    if (!subCategoryId) {
      setLoading(false);
      return message.error("please enter subCategory  article");
    }
    if (!pic) {
      setLoading(false);
      return message.error("please enter image  article");
    }
    if (tagsSelected.length <= 0) {
      setLoading(false);
      return message.error("please enter tags article");
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", pic.originFileObj);
      formData.append("categoryId", categoryId);
      formData.append("sub_CategoryId", subCategoryId);
      formData.append("tags", JSON.stringify(tagsSelected));
      const res = await axios.post(`${BASEURL}/${ARTICLES}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      message.success(res.data.msg);
      await dispatch(fetchArticles());
      setLoading(false);
      nav("/admin-dashboard/articles");
    } catch (error) {
      console.log(error);
    }
  }
  const options = tags.map((tag) => ({ value: tag._id, label: tag.name }));
  const optionsCategories = categories.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const optionsSubCategories = sub_categories.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  return (
    <div>
      <h4 className="mb-10 text-3xl text-center md:text-start">
        اضافة مقال جديد{" "}
      </h4>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label htmlFor="title">عنوان المقالة</label>
          <Input
            id="title"
            size="large"
            placeholder="عنوان المقالة"
            prefix={<PicCenterOutlined />}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
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
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="image">صورة المقال</label>
          <Dragger
            id="image"
            name="image"
            customRequest={() => {}}
            showUploadList={false}
            onChange={(info) => {
              if (info.file) {
                setPic(info.file);
                message.success(
                  `${info.file.name} file uploaded successfully.`
                );
              }
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag Image article to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single . Strictly prohibited from uploading article
              image .
            </p>
          </Dragger>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="contant">محتوي المقال</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            className="h-[500px] mb-10"
          />
        </div>

        <div className="my-5">
          <Button
            type="primary"
            loading={loading}
            icon={<PlusOutlined />}
            htmlType="submit"
          >
            اضافة المقال
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddArticles;
