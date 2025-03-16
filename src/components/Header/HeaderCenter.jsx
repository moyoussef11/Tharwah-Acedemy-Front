import PropTypes from "prop-types";
import icon1 from "../../assets/Sidebar icons.png";
import icon2 from "../../assets/oui_training.png";
import icon3 from "../../assets/Sidebar icons question.png";
import icon4 from "../../assets/proicons_library.png";
import { Link, useLocation } from "react-router-dom";

const HeaderCenter = ({ toggle, setToggle }) => {
  const location = useLocation().pathname.split("/")[1];

  return (
    <>
      <nav className="hidden md:block">
        <ul className="flex items-center lg:gap-[16px]">
          <li className="p-[12px]">
            <Link className="flex items-center gap-1" to="/">
              <img src={icon1} alt="icons" />
              <span
                className={`text-[#A3A8B5] ${
                  location === ""
                    ? "text-[#FFFFFF] border-b-2 border-[#FD9708]"
                    : ""
                } py-[12px] hover:text-[#FFFFFF] duration-200`}
              >
                الرئيسية
              </span>
            </Link>
          </li>
        
          <li className="p-[12px]">
            {" "}
            <Link className="flex items-center gap-1" to="/articles">
              <img src={icon2} alt="icons" />
              <span
                className={`text-[#A3A8B5]  ${
                  location === "articles"
                    ? "text-[#FFFFFF] border-b-2 border-[#FD9708]"
                    : ""
                } hover:text-[#FFFFFF] duration-200 py-[12px]`}
              >
                 المقالات
              </span>
            </Link>
          </li>
          <li className="p-[12px]">
            <Link className="flex items-center gap-1" to="/questions">
              <img src={icon3} alt="icons" />
              <span
                className={`text-[#A3A8B5] ${
                  location === "questions"
                    ? "text-[#FFFFFF] border-b-2 border-[#FD9708]"
                    : ""
                } hover:text-[#FFFFFF] duration-200 py-[12px]`}
              >
                 الأسئلة
              </span>
            </Link>
          </li>
          <li className="p-[12px]">
            <Link className="flex items-center gap-1" to="/libraries">
              <img src={icon4} alt="icons" />
              <span
                className={`text-[#A3A8B5] ${
                  location === "libraries"
                    ? "text-[#FFFFFF] border-b-2 border-[#FD9708]"
                    : ""
                } hover:text-[#FFFFFF] duration-200 py-[12px]`}
              >
                المكتبة
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <nav
        className={`absolute left-0 w-full z-40 ${
          toggle ? "top-[70px]" : "top-[-1500px]"
        } bg-[#143A53] duration-200 md:hidden`}
      >
        <ul className="flex items-center flex-col lg:gap-[16px]">
          <li className="p-[12px]">
            <Link
              onClick={() => setToggle(false)}
              className="flex items-center gap-1"
              to="/"
            >
              <img src={icon1} alt="icons" />
              <span
                className={`text-[#A3A8B5] ${
                  location === ""
                    ? "text-[#FFFFFF] border-b-2 border-[#FD9708]"
                    : ""
                } py-[12px] hover:text-[#FFFFFF] duration-200`}
              >
                الرئيسية
              </span>
            </Link>
          </li>
          <li className="p-[12px]">
            {" "}
            <Link
              onClick={() => setToggle(false)}
              className="flex items-center gap-1"
              to="/articles"
            >
              <img src={icon2} alt="icons" />
              <span
                className={`text-[#A3A8B5]  ${
                  location === "articles"
                    ? "text-[#FFFFFF] border-b-2 border-[#FD9708]"
                    : ""
                } hover:text-[#FFFFFF] duration-200 py-[12px]`}
              >
                 المقالات
              </span>
            </Link>
          </li>

         
          <li className="p-[12px]">
            <Link
              onClick={() => setToggle(false)}
              className="flex items-center gap-1"
              to="/questions"
            >
              <img src={icon3} alt="icons" />
              <span
                className={`text-[#A3A8B5] ${
                  location === "questions"
                    ? "text-[#FFFFFF] border-b-2 border-[#FD9708]"
                    : ""
                } hover:text-[#FFFFFF] duration-200 py-[12px]`}
              >
                 الأسئلة
              </span>
            </Link>
          </li>
          <li className="p-[12px]">
            <Link
              onClick={() => setToggle(false)}
              className="flex items-center gap-1"
              to="/libraries"
            >
              <img src={icon4} alt="icons" />
              <span
                className={`text-[#A3A8B5] ${
                  location === "libraries"
                    ? "text-[#FFFFFF] border-b-2 border-[#FD9708]"
                    : ""
                } hover:text-[#FFFFFF] duration-200 py-[12px]`}
              >
                المكتبة
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

HeaderCenter.propTypes = {
  toggle: PropTypes.bool,
  setToggle: PropTypes.func,
};

export default HeaderCenter;
