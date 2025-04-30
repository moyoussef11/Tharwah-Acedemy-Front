import PropTypes from "prop-types";
import icon5 from "../../assets/si_add-duotone.png";
import { MenuOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { message, Modal } from "antd";
import check from "../../assets/check-circle.svg";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { BASEURL, QUESTIONS } from "../../utils/api";
import { Link } from "react-router-dom";
const HeaderRight = ({ toggle, setToggle }) => {
  const categoryState = useSelector((state) => state.categories);
  const { categories } = categoryState;
  const [open, setOpen] = useState(false);
  const [checkModel, setCheckModel] = useState(false);
  const [allow, setAllow] = useState(false);
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const subCategoriesState = useSelector((state) => state.sub_category);
  const { sub_categories } = subCategoriesState;
  const [subCat, setSubCat] = useState([]);
  const [subCatID, setSubCatID] = useState("");

  const showSubCat = subCat?.filter((sub) => sub.categoryId === category);


  const handleOpenModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (question && category) {
      setAllow(true);
    } else {
      setAllow(false);
    }
  }, [question, category]);

  async function sendQuestion(e) {
    e.preventDefault();
    if (!question) {
      return message.error("please enter your question");
    }
    if (!category) {
      return message.error("please enter your category");
    }
    try {
      const res = await axios.post(
        `${BASEURL}/${QUESTIONS}/send-new-question`,
        { question, categoryId: category }
      );
      if (res.data.status === "Success") {
        setCheckModel(true);
      }
    } catch (error) {
      message.error(error);
    }
  }

  const [modalWidth, setModalWidth] = useState(
    window.innerWidth < 768 ? "100%" : "50%"
  );

  useEffect(() => {
    const handleResize = () => {
      setModalWidth(window.innerWidth < 768 ? "100%" : "50%");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (sub_categories) {
      setSubCat(sub_categories);
    }
  }, [sub_categories]);

  return (
    <>
      <div>
        <button
          onClick={handleOpenModal}
          className="text-center leading-[19.2px] text-[#FFFFFF] flex items-center justify-center p-2 gap-2 md:py-[12px] md:px-[16px] cursor-pointer rounded-[8px] bg-[#FD9708]"
        >
          <img src={icon5} alt="icon" />
          <span> إضافة سؤال جديد</span>
        </button>
      </div>

      {/* sign up */}
      {/* <div>
        <Link
          to="/login"
          className="text-center leading-[19.2px] text-[#FFFFFF] flex items-center justify-center p-2 gap-2 md:py-[12px] md:px-[16px] cursor-pointer rounded-[8px] bg-[#FD9708]"
        >
          <UserOutlined /> <span>تسجيل الدخول </span>
        </Link>
      </div> */}
      <div className="z-20 md:hidden">
        {!toggle ? (
          <MenuOutlined
            style={{ fontSize: "30px", cursor: "pointer", color: "#FFFFFF" }}
            onClick={() => setToggle(true)}
          />
        ) : (
          <CloseOutlined
            style={{ fontSize: "30px", cursor: "pointer", color: "#FFFFFF" }}
            onClick={() => setToggle(false)}
          />
        )}
      </div>

      <Modal
        open={open}
        width={modalWidth}
        title={
          <div
            style={{
              color: "#143A53",
              fontWeight: "bold",
              paddingBottom: "10px",
              borderBottom: "1px solid #EEEAE8",
            }}
          >
            إضافة سؤال جديد{" "}
          </div>
        }
        style={{ color: "#143A53" }}
        onCancel={() => {
          setOpen(false);
          setQuestion("");
          setCategory("");
        }}
        footer={null}
      >
        <div className="flex flex-col gap-4">
          <form onSubmit={sendQuestion}>
            <div className="flex flex-col gap-4">
              <label htmlFor="question" className="text-[#143A53]">
                سؤال
              </label>
              <input
                type="text"
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="اكتب سوالك"
                className="py-[10px] px-[14px] rounded-[8px] border border-[#BDC0C9]"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h5 className="text-[#143A53]">اختر الفئة</h5>
              <div className="categories grid grid-cols-2 md:grid-cols-3 gap-[14px]">
                {categories && categories.length > 0 ? (
                  categories.map((item) => (
                    <div
                      onClick={() => setCategory(item._id)}
                      key={item._id}
                      className={`cursor-pointer py-[12px] pr-[20px] pl-[12px] rounded-[14px] border border-[#EEEAE8] ${
                        category === item._id ? "border-[#fd9708]" : ""
                      } flex items-center gap-[14px]`}
                    >
                      <img
                        src={item.image}
                        className="w-[32px] h-[32px] object-contain"
                        alt="icon"
                      />
                      <span>{item.name}</span>
                    </div>
                  ))
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
            <div className="flex flex-col my-3 gap-4">
              <h5 className="text-[#143A53]"> اختر الفئة الفرعية </h5>
              <div className="categories grid grid-cols-2 md:grid-cols-3 gap-[14px]">
                {showSubCat && showSubCat.length > 0
                  ? showSubCat.map((item) => (
                      <div
                        onClick={() => setSubCatID(item._id)}
                        key={item._id}
                        className={`cursor-pointer py-[12px] pr-[20px] pl-[12px] rounded-[14px] border border-[#EEEAE8] ${
                          subCatID === item._id ? "border-[#fd9708]" : ""
                        } flex items-center gap-[14px]`}
                      >
                        <span>{item.name}</span>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
            <div dir="ltr" className="flex items-center gap-3 mt-10">
              <button
                type="submit"
                className={`rounded-[8px] cursor-pointer border ${
                  allow
                    ? "border-[#FD9708] bg-[#FD9708]"
                    : "border-[#C3C5C8] bg-[#C3C5C8] cursor-not-allowed pointer-events-none"
                } text-white flex items-center gap-[8px] py-[10px] px-[12px]`}
              >
                إرسال
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setQuestion("");
                  setCategory("");
                }}
                className="rounded-[8px] cursor-pointer border border-[#D9DAE0] flex items-center gap-[8px] py-[10px] px-[12px]"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        open={checkModel}
        width={380}
        style={{ color: "#143A53" }}
        footer={null}
        onCancel={() => {
          setCheckModel(false);
          setOpen(false);
          setQuestion("");
          setCategory("");
        }}
      >
        <div className="flex items-center justify-center py-[20px]">
          <div className="flex flex-col items-center justify-center gap-1">
            <img src={check} alt="check" className="h-[40px] w-[40px] mb-2 " />
            <h4 className="font-[700] text-[18px] text-[#143A53] text-center">
              تم الإرسال بنجاح!
            </h4>
            <span className="font-[400] text-center text-[#2A465E]">
              تم تقديم سؤالك بنجاح.
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

HeaderRight.propTypes = {
  toggle: PropTypes.bool,
  setToggle: PropTypes.func,
};

export default HeaderRight;
