import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { PlusOutlined, TagFilled } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import axios from "axios";
import { BASEURL, TAGS } from "../../../utils/api";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTag, fetchTags } from "../../../rtk/features/tag/actGetTags";

const EditTag = ({ id, setOpen }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const nav = useNavigate();
  const dispatch = useDispatch();
  const getTag = async () => {
    try {
      const result = await dispatch(fetchTag(id));
      setName(result.payload.tag.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTag();
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!token) {
        return message.error("please log in");
      }
      const res = await axios.put(
        `${BASEURL}/${TAGS}/${id}`,
        { name },
        { headers: { Authorization: "Bearer " + token } }
      );
      if (res.status === 200) {
        message.success(res.data.msg);
        setLoading(false);
        setOpen(false);
        await dispatch(fetchTags());
        nav("/admin-dashboard/tags");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h4 className="mb-10 text-3xl text-center md:text-start">
        تعديل التاج id: {id}{" "}
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
            value={name}
          />
        </div>

        <div className="my-5">
          <Button
            type="primary"
            loading={loading}
            icon={<PlusOutlined />}
            htmlType="submit"
          >
            تعديل التاج
          </Button>
        </div>
      </form>
    </div>
  );
};

EditTag.propTypes = {
  id: PropTypes.string,
  setOpen: PropTypes.func,
};

export default EditTag;
