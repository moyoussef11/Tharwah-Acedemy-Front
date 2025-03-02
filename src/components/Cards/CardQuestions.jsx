import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { message, Modal } from "antd";
import cop from "../../assets/Custom Icons.svg";
import checkCop from "../../assets/true.png";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { fetchQuestion } from "../../rtk/features/questions/actGetQuestions";

const CardQuestions = ({ title, questions, to }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [question, setQuestion] = useState({});
  const [id, setId] = useState("");
  const handleOpenModal = (question) => {
    setOpen(true);
    setId(question);
  };
  const getAQuestion = async (id) => {
    const result = await dispatch(fetchQuestion(id));
    setQuestion(result.payload.question);
  };
  useEffect(() => {
    if (id) {
      getAQuestion(id);
    }
  }, [id]);


  function handleCopyAnswer(answer) {
    if (Object.keys(question).length > 0) {
      navigator.clipboard
        .writeText(answer)
        .then(() => {
          setCopied(true);
          message.success("تم النسخ بنجاح!");
        })
        .catch(() => message.error("حدث خطأ أثناء النسخ"));
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




  return (
    <>
      <div className="p-[16px] w-full bg-white border border-[#E4E7EC] rounded-[12px] flex flex-col gap-[20px]">
        <h3 className="text-[20px] font-[600] text-[#0C111D]">
          {title ? title : <Skeleton />}{" "}
        </h3>
        <ul className="flex flex-col gap-[10px]">
          {questions?.length > 0 ? (
            questions.map((item, index) => (
              <li
                key={index}
                className="bg-[#F5F5F5] rounded-[8px] py-[10px] px-[14px] shadow cursor-pointer"
                onClick={() => handleOpenModal(item._id)}
              >
                <Link to={`${to}`} className="text-[#143A53]">
                  {item.question}
                </Link>
              </li>
            ))
          ) : (
            <Skeleton className="h-[40px]" count={6} />
          )}
        </ul>
      </div>

      {/* model */}

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
            إجابة على سؤالك
          </div>
        }
        style={{ color: "#143A53" }}
        onCancel={() => {
          setOpen(false);
          setCopied(false);
          setQuestion({});
        }}
        footer={() => (
          <>
            <div dir="ltr" className="flex items-center gap-3 mt-10">
              <button
                onClick={() => handleCopyAnswer(question.answer)}
                className="rounded-[8px] cursor-pointer border border-[#FD9708] bg-[#FD9708] text-white flex items-center gap-[8px] py-[10px] px-[12px]"
              >
                {copied ? (
                  <>
                    <span>تم النسخ!</span>
                    <img
                      src={checkCop}
                      alt="checkCop"
                      className="h-[10px] w-[10px]"
                    />
                  </>
                ) : (
                  <>
                    <span>نسخ</span>
                    <img src={cop} alt="icon" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[8px]">
            <h4 className="font-[500px]">الفئة</h4>
            {question && Object.keys(question).length > 0 ? (
              <div className="bg-[#fff] rounded-[12px] p-[12px] flex items-center gap-[8px] border border-[#EEEAE8] w-fit">
                <img
                  src={question?.categoryId?.image}
                  className="h-[32px] w-[32px]"
                  alt="icon"
                />
                <h4 className="font-[500] text-[16px]">
                  {" "}
                  {question?.categoryId?.name}
                </h4>
              </div>
            ) : (
              <Skeleton className="h-[30px]" />
            )}
          </div>
          <div className="flex flex-col gap-[8px]">
            <h4 className="font-[500px]">سؤال</h4>
            {question && Object.keys(question).length > 0 ? (
              <div className="bg-[#F5F5F5] rounded-[12px] p-[12px] flex items-center gap-[8px] border border-[#EEEAE8] w-fit">
                <h4 className="font-[400] text-[16px]">{question.question}</h4>
              </div>
            ) : (
              <Skeleton className="h-[30px]" />
            )}
          </div>
          <div className="flex flex-col gap-[8px]">
            <h4 className="font-[500px]">إجابة</h4>
            {question && Object.keys(question).length > 0 ? (
              <div className="bg-[#F5F5F5] rounded-[12px] p-[12px] flex items-center gap-[8px] border border-[#EEEAE8] w-fit">
                <h4 className="font-[400] text-[16px]">{question.answer}</h4>
              </div>
            ) : (
              <Skeleton className="h-[100px]" />
            )}
          </div>{" "}
        </div>
      </Modal>
    </>
  );
};

CardQuestions.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
  questions: PropTypes.array,
};

export default CardQuestions;
