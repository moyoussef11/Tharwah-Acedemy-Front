import PropTypes from "prop-types";
import {
  PicCenterOutlined,
  PlusOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Input, message, Upload } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ARTICLES, BASEURL } from "../../../utils/api";
import {
  fetchArticle,
  fetchArticles,
} from "../../../rtk/features/articles/actGetArticles";
const { Dragger } = Upload;
const EditArticle = ({ id, setOpen }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");
  const nav = useNavigate();
  const [content, setContent] = useState("");
  const [pic, setPic] = useState("");
  const [title, setTitle] = useState("");

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

  const getArticle = async () => {
    const result = await dispatch(fetchArticle(id));
    setTitle(result.payload.article.title);
    setContent(result.payload.article.content);
  };

  useEffect(() => {
    getArticle();
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", pic.originFileObj);
      const res = await axios.put(`${BASEURL}/${ARTICLES}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      message.success(res.data.msg);
      await dispatch(fetchArticles());
      setLoading(false);
      setOpen(false);
      nav("/admin-dashboard/articles");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full">
      <h4 className="mb-10 text-3xl text-center md:text-start">
        تعديل المقال{" "}
      </h4>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label htmlFor="title">عنوان المقالة</label>
          <Input
            id="title"
            size="large"
            value={title}
            placeholder="عنوان المقالة"
            prefix={<PicCenterOutlined />}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
          />
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
            تعديل المقال
          </Button>
        </div>
      </form>
    </div>
  );
};

EditArticle.propTypes = {
  id: PropTypes.string,
  setOpen: PropTypes.func,
};

export default EditArticle;
