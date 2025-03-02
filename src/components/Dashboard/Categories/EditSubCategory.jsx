import PropTypes from "prop-types";
import { PicCenterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import axios from "axios";
import { BASEURL, CATEGORIES, SUB_CATEGORIES } from "../../../utils/api";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchSubCategories,
  fetchSubCategory,
} from "../../../rtk/features/subCategories/actGetSubCategories";
const EditSubCategory = ({ id, setOpen }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get("token");
  async function fetchSubCat() {
    try {
      const result = await dispatch(fetchSubCategory({ slug: id }));
      if (result.payload) {
        setName(result.payload.subCategory.name);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSubCat();
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    try {
      if (!id) {
        return message.error("subcategory not found ");
      }
      const res = await axios.put(
        `${BASEURL}/${CATEGORIES}/${SUB_CATEGORIES}/${id}`,
        { name },
        { headers: { Authorization: "Bearer " + token } }
      );
      message.success(res.data.msg);
      await dispatch(fetchSubCategories());
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
            تعديل القسم
          </Button>
        </div>
      </form>
    </div>
  );
};

EditSubCategory.propTypes = {
  id: PropTypes.string,
  setOpen: PropTypes.func,
};

export default EditSubCategory;
