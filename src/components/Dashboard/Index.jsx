import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../rtk/features/categories/actGetCategories";
import { fetchLibrary } from "../../rtk/features/library/actGetLibrary";
import { fetchQuestions } from "../../rtk/features/questions/actGetQuestions";
import { fetchArticles } from "../../rtk/features/articles/actGetArticles";

const IndexDashboard = () => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.categories);
  const libraryState = useSelector((state) => state.library);
  const questionsState = useSelector((state) => state.questions);
  const articlesState = useSelector((state) => state.articles);
  const { questions } = questionsState;
  const { categories } = categoryState;
  const { library } = libraryState;
  const { articles } = articlesState;




  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCategories());
    dispatch(fetchLibrary());
    dispatch(fetchQuestions());
    dispatch(fetchArticles());
  }, [dispatch]);

  const data = [
    {
      name: "المقالات",
      num: `${articles.length ? articles.length : 0}`,
      to: "/admin-dashboard/articles",
    },
    {
      name: "الاسئلة",
      num: `${questions.length ? questions.length : 0}`,
      to: "/admin-dashboard/questions",
    },
    {
      name: "الفئات",
      num: `${categories.length ? categories.length : 0}`,
      to: "/admin-dashboard/categories",
    },
    {
      name: "المكتبة",
      num: `${library.length ? library.length : 0}`,
      to: "/admin-dashboard/library",
    },
  ];

  return (
    <main>
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-2xl text-center md:text-start">
            مرحبا بك في لوحة التحكم{" "}
            <span className="text-[#143a53] text-xl capitalize font-bold">
              thawrah academy
            </span>
          </h2>
        </div>
        <div>
          <h4 className="text-3xl border-b-2 w-fit py-2 mx-auto">احصائيات</h4>
          <div className="cards grid grid-cols-1 md:grid-cols-2 gap-5 my-10">
            {data.map((item, index) => (
              <div
                key={index}
                className="card flex flex-col gap-3 items-center justify-center text-2xl bg-gray-100 rounded-2xl py-4 px-2 shadow-2xl hover:-translate-y-4 duration-300"
              >
                <h2>{item.name}</h2>
                <strong className="text-[#143a53]">{item.num}</strong>
                <Link className="flex items-center gap-1" to={`${item.to}`}>
                  <EyeOutlined /> مشاهدة
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndexDashboard;
