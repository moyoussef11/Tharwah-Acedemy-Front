import person1 from "../assets/arabsstock_P18218_large.png";
import person2 from "../assets/arabsstock_P36753_large.png";
import person3 from "../assets/arabsstock_P60252_large.png";
import person4 from "../assets/Designer (1).png";
import iconCircle from "../assets/Group (3).svg";
import icon2 from "../assets/oui_training.png";
import iconWhite from "../assets/Sidebar icons white.png";
import iconSearch from "../assets/ui-icons.svg";
import search from "../assets/Sidebar icons (2).png";
import CardQuestions from "../components/Cards/CardQuestions";
import CardCategory from "../components/Cards/CardCategory";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import CardArticleHome from "../components/Cards/CardArticleHome";
import useHome from "../hooks/useHome";
import { Empty } from "antd";
export const Home = () => {
  const {
    mode,
    setMode,
    searchValueArticle,
    setSearchValueArticle,
    filteredDataArticles,
    searchValue,
    setSearchValue,
    filteredData,
    categories,
    questions,
    questionsLatest,
    questionsViewsOver,
    articles,
    articlesLatest,
    articlesViewsOver,
    loadingQuestions,
    loadingArticles,
    loadingCategories,
    searchRef,
  } = useHome();

  return (
    <>
      <section
        id="hero"
        className="px-[20px] lg:px-[144px] py-[48px]  rounded-[16px]"
      >
        <div className="bg-[#143A53] rounded-[16px] py-[80px] px-4 md:px-0 flex flex-col items-center justify-center relative">
          <img
            src={person1}
            className="w-[100px] border-2 border-white rounded-xl absolute right-1 sm:right-24 bottom-5"
            alt="image"
          />
          <img
            src={iconCircle}
            className="w-[100px] rounded-xl absolute left-0 bottom-0"
            alt="image"
          />
          <img
            src={person2}
            className="w-[100px] border-2 border-white rounded-xl absolute left-1 sm:left-20 top-0"
            alt="image"
          />
          <img
            src={person3}
            className="w-[120px] border-2 border-white rounded-xl absolute right-1 top-5 sm:right-7 sm:top-14"
            alt="image"
          />
          <img
            src={person4}
            className="w-[120px] border-2 border-white rounded-xl absolute left-1 sm:left-20 bottom-7"
            alt="image"
          />

          <div className="flex flex-col space-y-3 items-center justify-center gap-[8px] z-10">
            <h2 className="text-2xl sm:text-3xl md:text-[44px] text-center text-[#FFF]">
              احصل على الدعم الذي تحتاجه
            </h2>
            <div className="tabs w-fit mx-auto bg-[#FFFFFF] p-[8px] rounded-[12px] flex items-center gap-[8px]">
              <div
                onClick={() => setMode("questions")}
                className={`flex items-center gap-1 ${
                  mode === "questions"
                    ? "bg-[#FD9708] text-white"
                    : "text-[#777F92]"
                }  py-[10px] hover:bg-[#FD9708] duration-200 px-[12px] rounded-[8px] cursor-pointer w-fit`}
              >
                <span
                  className={`${
                    mode === "questions" ? "text-[#FFF]" : "text-[#777F92]"
                  }`}
                >
                  ابحث في الأسئلة
                </span>
                <img
                  src={mode === "questions" ? iconWhite : search}
                  alt="icon"
                />
              </div>
              <div
                onClick={() => setMode("articles")}
                className={`flex items-center gap-1 ${
                  mode === "articles" ? "bg-[#FD9708] text-white" : ""
                } hover:bg-[#FD9708] duration-150 group py-[10px] px-[12px] rounded-[8px] cursor-pointer w-fit`}
              >
                <span
                  className={`text-[#777F92] ${
                    mode === "articles" ? "text-white" : ""
                  } group-hover:text-white`}
                >
                  {" "}
                  ابحث في المقالات
                </span>
                <img src={icon2} alt="icon" />
              </div>
            </div>
            {mode === "questions" ? (
              <form ref={searchRef}>
                <div className="bg-[#FFFFFF] relative sm:w-[550px] border border-[#FD9708] rounded-[12px] py-[8px] pr-[8px] pl-[16px] flex items-center">
                  <input
                    type="text"
                    value={searchValue}
                    className="w-full border-none focus:outline-none"
                    placeholder={"ابحث عن سؤالك هنا"}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <img
                    src={iconSearch}
                    alt="iconSearch"
                    className="p-[12px] rounded-[8px] bg-[#FD9708] cursor-pointer"
                  />
                  {searchValue && (
                    <div className="absolute top-full z-10 left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg p-2">
                      {filteredData?.length > 0 ? (
                        <CardQuestions
                          title={searchValue}
                          questions={filteredData}
                          to={"/"}
                        />
                      ) : (
                        <p className="text-center py-2 text-[#143A53]">
                          لا توجد نتائج
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </form>
            ) : (
              <form ref={searchRef}>
                <div className="bg-[#FFFFFF] relative sm:w-[550px] border border-[#FD9708] rounded-[12px] py-[8px] pr-[8px] pl-[16px] flex items-center">
                  <input
                    type="text"
                    value={searchValueArticle}
                    className="w-full border-none focus:outline-none"
                    placeholder={"ابحث عن المقالة هنا"}
                    onChange={(e) => setSearchValueArticle(e.target.value)}
                  />
                  <img
                    src={iconSearch}
                    alt="iconSearch"
                    className="p-[12px] rounded-[8px] bg-[#FD9708] cursor-pointer"
                  />
                  {searchValueArticle && (
                    <div className="absolute top-full z-10 left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg p-2">
                      {filteredDataArticles?.length > 0 ? (
                        filteredDataArticles.map((item, index) => (
                          <div
                            className="flex gap-[10px] bg-[#fff] text-[#143A53] py-[12px] px-[24px] flex-col"
                            key={index}
                          >
                            <Link
                              to={`/articles/article-details/${item._id}`}
                              className="flex flex-col text-[#143A53] font-medium"
                            >
                              {item.title}
                            </Link>
                          </div>
                        ))
                      ) : (
                        <p className="text-center py-2 text-[#143A53]">
                          لا توجد نتائج
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {mode === "questions" ? (
        <section
          id="categories_Questions"
          className="px-[20px] lg:px-[144px] my-[48px] md:my-0 rounded-[16px]"
        >
          <div className="cards grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {loadingCategories ? (
              <>
                <Skeleton className="h-[150px] rounded-[12px] border border-[#EEEAE8]" />
                <Skeleton className="h-[150px] rounded-[12px] border border-[#EEEAE8]" />
                <Skeleton className="h-[150px] rounded-[12px] border border-[#EEEAE8]" />
                <Skeleton className="h-[150px] rounded-[12px] border border-[#EEEAE8]" />
                <Skeleton className="h-[150px] rounded-[12px] border border-[#EEEAE8]" />
              </>
            ) : categories?.length > 0 ? (
              categories.map((item) => (
                <CardCategory
                  key={item._id}
                  name={item.name}
                  image={item.image}
                />
              ))
            ) : (
              <p className="text-center col-span-full text-[#143A53]">
                <Empty description="لا توجد فئات متاحة" />
              </p>
            )}
          </div>
        </section>
      ) : (
        <section
          id="categories_Articles"
          className="px-[20px] lg:px-[144px] my-[48px] md:my-0 rounded-[16px]"
        >
          <div className="cards grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {loadingCategories ? (
              <>
                <Skeleton className="h-[150px] rounded-[12px] border border-[#EEEAE8]" />
                <Skeleton className="h-[150px] rounded-[12px] border border-[#EEEAE8]" />
                <Skeleton className="h-[150px] rounded-[12px] border border-[#EEEAE8]" />
                <Skeleton className="h-[150px] rounded-[12px] border border-[#EEEAE8]" />
                <Skeleton className="h-[150px] rounded-[12px] border border-[#EEEAE8]" />
              </>
            ) : categories?.length > 0 ? (
              categories.map((item) => (
                <CardCategory
                  key={item._id}
                  name={item.name}
                  image={item.image}
                />
              ))
            ) : (
              <p className="text-center col-span-full text-[#143A53]">
                <Empty description="لا توجد فئات متاحة" />
              </p>
            )}
          </div>
        </section>
      )}

      {mode === "questions" ? (
        <section
          id="Questions"
          className="px-[20px] lg:px-[144px] my-[48px] rounded-[16px]"
        >
          <h4 className="text-[#0C111D] text-[32px] font-[700] text-center">
            أسئلة
          </h4>
          <div className="cards my-[32px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {loadingQuestions ? (
              <>
                <Skeleton className="h-[150px] rounded-[12px] border border-[#EEEAE8]" />
                <Skeleton className="h-[150px] rounded-[12px] border border-[#EEEAE8]" />
                <Skeleton className="h-[150px] rounded-[12px] border border-[#EEEAE8]" />
              </>
            ) : questions?.length > 0 ? (
              <>
                <CardQuestions
                  title="استناداً إلى الكلمات الرئيسية"
                  questions={questions.slice(0, 6)}
                  to="/"
                />
                <CardQuestions
                  title="أحدث الأسئلة"
                  questions={questionsLatest}
                  to="/"
                />
                <CardQuestions
                  title="أكثر الأسئلة قراءة"
                  questions={questionsViewsOver.slice(0, 6)}
                  to="/"
                />
              </>
            ) : (
              <p className="text-center col-span-full text-[#143A53]">
                <Empty description="لا توجد أسئلة متاحة" />
              </p>
            )}
          </div>
        </section>
      ) : (
        <section
          id="Articles"
          className="px-[20px] lg:px-[144px] my-[48px] rounded-[16px]"
        >
          <h4 className="text-[#0C111D] text-[32px] font-[700] text-center">
            المقالات
          </h4>
          <div className="cards my-[32px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
            {loadingArticles ? (
              <>
                <Skeleton className="h-[200px] rounded-[12px] border border-[#EEEAE8]" />
                <Skeleton className="h-[200px] rounded-[12px] border border-[#EEEAE8]" />
                <Skeleton className="h-[200px] rounded-[12px] border border-[#EEEAE8]" />
              </>
            ) : articles?.length > 0 ? (
              <>
                <CardArticleHome
                  title="استنادًا إلى الكلمات الرئيسية"
                  articles={articles}
                />
                <CardArticleHome
                  title="أحدث المقالات"
                  articles={articlesLatest}
                />
                <CardArticleHome
                  title="المقالات الأكثر قراءة"
                  articles={articlesViewsOver}
                />
              </>
            ) : (
              <p className="text-center col-span-full text-[#143A53]">
                <Empty description="لا توجد مقالات متاحة" />
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
};
