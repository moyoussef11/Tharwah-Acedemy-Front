import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";
import { Button, Input, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { AUTH, BASEURL, REGISTER } from "../../../utils/api";
import { fetchUsers } from "../../../rtk/features/users/actGetUsers";
const AddUser = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState("");
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    if (!name) {
      setLoading(false);
      return message.error("please enter user name ");
    }
    if (!email) {
      setLoading(false);
      return message.error("please enter user email ");
    }
    try {
      const res = await axios.post(`${BASEURL}/${AUTH}/${REGISTER}`, {
        email,
        name,
        password,
      });
      console.log(res);

      message.success(res.data.msg);
      await dispatch(fetchUsers());
      setLoading(false);
      nav("/admin-dashboard/users");
    } catch (error) {
      message.error("Email already exists");
      setLoading(false);
    }
  }

  return (
    <div>
      <h4 className="mb-10 text-3xl text-center md:text-start">
        اضافة مستخدم جديد{" "}
      </h4>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label htmlFor="name"> الاسم </label>
          <Input
            id="name"
            size="large"
            placeholder=" اسم المستخدم"
            prefix={<UserOutlined />}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="email"> الايميل </label>
          <Input
            id="email"
            size="large"
            placeholder="الايميل"
            autoComplete="email"
            prefix={<UserOutlined />}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password"> الباسورد </label>
          <Input.Password
            autoComplete="current-password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <Button
            type="primary"
            loading={loading}
            icon={<PlusOutlined />}
            htmlType="submit"
          >
            اضافة المستخدم
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
