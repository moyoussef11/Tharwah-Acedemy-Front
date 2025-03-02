import { useState } from "react";
import { PlusOutlined, TagFilled } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import axios from "axios";
import { BASEURL, TAGS } from "../../../utils/api";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const AddTags = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    if (!name) {
      setLoading(false);
      return message.error("please enter tag name");
    }
    try {
      if (!token) {
        return message.error("please log in");
      }
      const res = await axios.post(
        `${BASEURL}/${TAGS}`,
        { name },
        { headers: { Authorization: "Bearer " + token } }
      );
      if (res.status === 201) {
        message.success(res.data.msg);
        setLoading(false);
        nav("/admin-dashboard/tags");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h4 className="mb-10 text-3xl text-center md:text-start">
        اضافة تاج جديدة{" "}
      </h4>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label htmlFor="name">اسم التاج </label>
          <Input
            id="name"
            size="large"
            placeholder="اسم التاج"
            prefix={<TagFilled />}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
        </div>

        <div className="my-5">
          <Button
            type="primary"
            loading={loading}
            icon={<PlusOutlined />}
            htmlType="submit"
          >
            اضافة تاج
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTags;
