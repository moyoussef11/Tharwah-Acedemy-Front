import PropTypes from "prop-types";
import { PicCenterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import axios from "axios";
import { BASEURL, CATEGORIES } from "../../../utils/api";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCategories,
  fetchCategory,
} from "../../../rtk/features/categories/actGetCategories";

const EditCategory = ({ id, setOpen }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get("token");

  async function fetchCat() {
    try {
      const result = await dispatch(fetchCategory({ slug: id }));
      if (result.payload) {
        setName(result.payload.category.name);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCat();
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    try {
      if (!id) {
        return message.error("category not found ");
      }
      const res = await axios.put(
        `${BASEURL}/${CATEGORIES}/${id}`,
        { name },
        { headers: { Authorization: "Bearer " + token } }
      );
      message.success(res.data.msg);
      await dispatch(fetchCategories());
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      تعديل القسم : <span className="text-green-500">{id}</span>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label htmlFor="name">اسم الفئة </label>
          <Input
            id="name"
            size="large"
            value={name}
            placeholder="اسم الفئة"
            prefix={<PicCenterOutlined />}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
        </div>

        <div className="my-5">
          <Button type="primary" icon={<PlusOutlined />} htmlType="submit">
            تعديل الفئة
          </Button>
        </div>
      </form>
    </div>
  );
};

EditCategory.propTypes = {
  id: PropTypes.string,
  setOpen: PropTypes.func,
};

export default EditCategory;
