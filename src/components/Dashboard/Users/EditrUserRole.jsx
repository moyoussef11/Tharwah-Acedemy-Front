import PropTypes from "prop-types";
import { useState } from "react";
import {  PlusOutlined } from "@ant-design/icons";
import { Button, Select, message } from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASEURL } from "../../../utils/api";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../../rtk/features/users/actGetUsers";
const EditrUserRole = ({ id, setOpen }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState("");
  const [role, setRole] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");
  const nav = useNavigate();

 
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `${BASEURL}/users/${id}`,
        {
          role,
        },
        { headers: { Authorization: "Bearer " + token } }
      );
      message.success(res.data.msg);
      await dispatch(fetchUsers());
      setLoading(false);
      setOpen(false);
      nav("/admin-dashboard/users");
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (value) => {
    setRole(value);
  };

  return (
    <div>
      <h4 className="mb-10 text-3xl text-center md:text-start">
        تعديل الصلاحية{" "}
      </h4>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label htmlFor="question">السؤال</label>
          <Select
            defaultValue="user"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "admin", label: "admin" },
              { value: "user", label: "user" },
            ]}
          />
        </div>

        <div className="my-5">
          <Button
            type="primary"
            loading={loading}
            icon={<PlusOutlined />}
            htmlType="submit"
          >
            تعديل الصلاحية
          </Button>
        </div>
      </form>
    </div>
  );
};

EditrUserRole.propTypes = {
  id: PropTypes.string,
  setOpen: PropTypes.func,
};

export default EditrUserRole;
