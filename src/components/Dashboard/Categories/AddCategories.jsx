import { useState } from "react";
import {
  PicCenterOutlined,
  PlusOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Upload } from "antd";
import axios from "axios";
import { BASEURL, CATEGORIES } from "../../../utils/api";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const { Dragger } = Upload;

const AddCategories = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState("");

  const cookies = new Cookies();
  const token = cookies.get("token");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    if (!name) {
      setLoading(false);
      return message.error("please enter name category");
    }
    if (!image) {
      setLoading(false);
      return message.error("please enter image category");
    }
    try {
      if (!token) {
        return message.error("please log in");
      }
      if (!image) {
        return message.error("please provide image category");
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image.originFileObj);
      const res = await axios.post(`${BASEURL}/${CATEGORIES}`, formData, {
        headers: { Authorization: "Bearer " + token },
      });
      if (res.status === 201) {
        message.success(res.data.msg);
        setLoading(false);
        nav("/admin-dashboard/categories");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h4 className="mb-10 text-3xl text-center md:text-start">
        اضافة قسم رئيسي جديد{" "}
      </h4>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label htmlFor="name">اسم القسم </label>
          <Input
            id="name"
            size="large"
            placeholder="اسم القسم"
            prefix={<PicCenterOutlined />}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="image">صورة الفئة</label>
          <Dragger
            id="image"
            name="image"
            customRequest={() => {}}
            showUploadList={false}
            onChange={(info) => {
              if (info.file) {
                setImage(info.file);
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
              Click or drag Image category to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single . Strictly prohibited from uploading category
              image .
            </p>
          </Dragger>
        </div>
        <div className="my-5">
          <Button
            loading={loading}
            type="primary"
            icon={<PlusOutlined />}
            htmlType="submit"
          >
            اضافة القسم
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCategories;
