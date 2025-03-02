import { useEffect, useState } from "react";
import { PicCenterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../rtk/features/categories/actGetCategories";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL, CATEGORIES, SUB_CATEGORIES } from "../../../utils/api";
import { fetchSubCategories } from "../../../rtk/features/subCategories/actGetSubCategories";

const AddSubCategories = () => {
  const category = useSelector((state) => state.categories).categories;
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState("");
  const [selected, setSelected] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");
  const nav = useNavigate();

  const optionSelect = category.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    if (!name) {
      setLoading(false);
      return message.error("please enter name  sub category");
    }
    if (!selected) {
      setLoading(false);
      return message.error("please enter category main");
    }
    try {
      const res = await axios.post(
        `${BASEURL}/${CATEGORIES}/${SUB_CATEGORIES}`,
        { name, categoryId: selected },
        { headers: { Authorization: "Bearer " + token } }
      );
      message.success(res.data.msg);
      await dispatch(fetchSubCategories());
      nav("/admin-dashboard/categories/sub-categories");
    } catch (error) {
      console.log(error);
      message.error(error?.message);
    }
  }
  return (
    <div>
      <h4 className="mb-10 text-3xl text-center md:text-start">
        اضافة قسم فرعية جديد{" "}
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
          <label htmlFor="categoryId">تابع للقسم الرئيسي</label>
          <Select
            id="categoryId"
            name="categoryId"
            placeholder="اختر من الاقسام الرئيسية"
            optionFilterProp="label"
            onChange={(e) => setSelected(e)}
            disabled={optionSelect.length === 0}
            options={optionSelect}
          />
        </div>

        <div className="my-5">
          <Button
            loading={loading}
            type="primary"
            icon={<PlusOutlined />}
            htmlType="submit"
          >
            اضافة القسم الفرعي
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSubCategories;
