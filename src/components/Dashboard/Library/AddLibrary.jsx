import {
  PicCenterOutlined,
  PlusOutlined,
  InboxOutlined,
} from "@ant-design/icons";

import { Button, Input, message, Upload, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASEURL, LIBRARY, UPLOAD } from "../../../utils/api";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibrary } from "../../../rtk/features/library/actGetLibrary";
import { useNavigate } from "react-router-dom";
import { fetchTags } from "../../../rtk/features/tag/actGetTags";
import { fetchCategories } from "../../../rtk/features/categories/actGetCategories";
import { fetchSubCategories } from "../../../rtk/features/subCategories/actGetSubCategories";
const { Dragger } = Upload;

const AddLibrary = () => {
  const [type, setType] = useState("");
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const tagsState = useSelector((state) => state.tags);
  const categoriesState = useSelector((state) => state.categories);
  const subCategoriesState = useSelector((state) => state.sub_category);
  const { tags } = tagsState;
  const { categories } = categoriesState;
  const { sub_categories } = subCategoriesState;
  const [categoryId, setCategoryId] = useState("");

  const [subCategoryId, setSubCategoryId] = useState("");

  const [tagsSelected, setTagsSelected] = useState([]);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    if (!title) {
      setLoading(false);
      return message.error("please enter title library");
    }
    if (!type) {
      setLoading(false);
      return message.error("please enter type library");
    }
    if (!file) {
      setLoading(false);
      return message.error(
        "please provide (file docs or pdfs or video or images) library"
      );
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("file", file.originFileObj);
    try {
      const res = await axios.post(
        `${BASEURL}/${LIBRARY}/${UPLOAD}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );
      message.success(res.data.msg);
      await dispatch(fetchLibrary());
      setLoading(false);
      nav("/admin-dashboard/library");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, [dispatch]);

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
        اضافة مكتبة جديدة{" "}
      </h4>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label htmlFor="title">عنوان المكتبة</label>
          <Input
            id="title"
            size="large"
            placeholder="عنوان المكتبة"
            prefix={<PicCenterOutlined />}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="type">نوع</label>
          <Select
            id="type"
            name="type"
            placeholder="النوع"
            optionFilterProp="label"
            onChange={(e) => setType(e)}
            options={[
              {
                value: "image",
                label: "image",
              },
              {
                value: "video",
                label: "video",
              },
              {
                value: "document",
                label: "document",
              },
              {
                value: "pdf",
                label: "pdf",
              },
              {
                value: "other",
                label: "other",
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Dragger
            name="file"
            customRequest={() => {}}
            showUploadList={false}
            onChange={(info) => {
              if (info.file) {
                setFile(info.file);
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
              Click or drag file (image, PDF, video, docs) to this area to
              upload
            </p>
            <p className="ant-upload-hint">
              Only images, PDFs, and videos are allowed.
            </p>
          </Dragger>
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
            اضافة المكتبة
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddLibrary;
