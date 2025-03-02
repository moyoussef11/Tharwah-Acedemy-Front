import PropTypes from "prop-types";
import {
  PicCenterOutlined,
  PlusOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Upload, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASEURL, LIBRARY } from "../../../utils/api";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import {
  fetchALibrary,
  fetchLibrary,
} from "../../../rtk/features/library/actGetLibrary";
import { useNavigate } from "react-router-dom";
const { Dragger } = Upload;

const EditLibrary = ({ id, setOpen }) => {
  const [type, setType] = useState("");
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const dispatch = useDispatch();
  const nav = useNavigate();

  async function getALibrary() {
    const result = await dispatch(fetchALibrary(id));
    setTitle(result.payload.library.title);
    setType(result.payload.library.type);
  }

  useEffect(() => {
    getALibrary();
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("file", file.originFileObj);
    try {
      const res = await axios.put(`${BASEURL}/${LIBRARY}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      message.success(res.data.msg);
      await dispatch(fetchLibrary());
      setLoading(false);
      setOpen(false);
      nav("/admin-dashboard/library");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h4 className="mb-10 text-3xl text-center md:text-start">
        تعديل المكتبة : <span>{id}</span>{" "}
      </h4>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label htmlFor="title">عنوان المكتبة</label>
          <Input
            id="title"
            size="large"
            value={title}
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
            value={type}
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

        <div className="my-5">
          <Button
            type="primary"
            loading={loading}
            icon={<PlusOutlined />}
            htmlType="submit"
          >
            تعديل المكتبة
          </Button>
        </div>
      </form>
    </div>
  );
};

EditLibrary.propTypes = {
  id: PropTypes.string,
  setOpen: PropTypes.func,
};

export default EditLibrary;
