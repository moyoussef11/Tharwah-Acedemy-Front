import iconSearch from "../assets/ui-icons.svg";
import CardCategoryByClassName from "../components/Cards/CardCategoryByClassName";
import CardArticle from "../components/Cards/CardArticle";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import useArticles from "../hooks/useArticles";
const ArticlesPage = () => {
  const {
    searchValueArticle,
    setSearchValueArticle,
    filteredDataArticles,
    articlesLatest,
    categories,
    setIndexId,
    setCatId,
    indexId,
    setIndexIdSubCat,
    setSubId,
    indexIdSubCat,
    showSub,
    setShowSub,
    articles,
    finalDataArticles,
  } = useArticles();

  return (
    <>
      <section
        id="hero"
        className="px-[20px] lg:px-[144px] py-[32px] rounded-[16px]"
      >
        <div className="flex items-center flex-col gap-5 md:flex-row justify-between">
          <h2 className="text-[32px] font-bold leading-[35.2px] tracking-[0.64px] text-[#0C111D]">
            المقالات
          </h2>
          <form>
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
        </div>
        {articlesLatest && articlesLatest.length > 0 ? (
          <div className="latestArticle my-[32px] flex flex-col md:flex-row gap-[48px] items-center">
            <div className="w-full md:w-1/2">
              <img
                src={articlesLatest[0].image}
                alt="article"
                className="rounded-xl w-full h-full"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-[19px] ">
              <span className="font-medium leading-[20px] text-[#242423]">
                {articlesLatest[0].createdAt.split("T")[0]}
              </span>
              <h2 className="text-2xl md:text-[48px] -tracking-[1.44px] leading-[57.6px] text-[#143A53]">
                {articlesLatest[0].title}
              </h2>
              <Link to={`/articles/article-details/${articlesLatest[0]._id}`}>
                <div
                  className="font-medium leading-[27px] text-center md:text-start tracking-[-0.36px] text-[18px] text-[#143A53]"
                  dangerouslySetInnerHTML={{
                    __html: `${articlesLatest[0].content.substring(0, 300)}...`,
                  }}
                />
              </Link>
              <div className="info flex items-center gap-[24px]">
                <span className="text-[10px] text-[#143A53] font-normal leading-[13px] py-[4px] px-[6px] gap-[10px] rounded-[4px] bg-[#EEEAE8]">
                  {articlesLatest[0].sub_CategoryId.name}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <Skeleton className="latestArticle h-[400px] my-[32px] flex flex-col md:flex-row gap-[48px] items-center" />
        )}
        <div className="categories my-[32px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[20px]">
          {categories && categories.length > 0 ? (
            categories.map((item, index) => (
              <CardCategoryByClassName
                key={index}
                name={item.name}
                image={item.image}
                onClick={() => {
                  setIndexId(index);
                  setCatId(item._id);
                }}
                className={`${
                  index === indexId ? "border-b-[#FD9708] border-b-[6px]" : ""
                }`}
              />
            ))
          ) : (
            <>
              <Skeleton className="bg-white h-[150px] hover:-translate-y-3 cursor-pointer duration-300 flex flex-col items-center justify-center py-[16px] px-[20px] gap-[14px] rounded-[12px] border border-[#EEEAE8]" />
              <Skeleton className="bg-white h-[150px] hover:-translate-y-3 cursor-pointer duration-300 flex flex-col items-center justify-center py-[16px] px-[20px] gap-[14px] rounded-[12px] border border-[#EEEAE8]" />
              <Skeleton className="bg-white h-[150px] hover:-translate-y-3 cursor-pointer duration-300 flex flex-col items-center justify-center py-[16px] px-[20px] gap-[14px] rounded-[12px] border border-[#EEEAE8]" />
              <Skeleton className="bg-white h-[150px] hover:-translate-y-3 cursor-pointer duration-300 flex flex-col items-center justify-center py-[16px] px-[20px] gap-[14px] rounded-[12px] border border-[#EEEAE8]" />
              <Skeleton className="bg-white h-[150px] hover:-translate-y-3 cursor-pointer duration-300 flex flex-col items-center justify-center py-[16px] px-[20px] gap-[14px] rounded-[12px] border border-[#EEEAE8]" />
              <Skeleton className="bg-white h-[150px] hover:-translate-y-3 cursor-pointer duration-300 flex flex-col items-center justify-center py-[16px] px-[20px] gap-[14px] rounded-[12px] border border-[#EEEAE8]" />
            </>
          )}
        </div>

        <div className="articles flex flex-col md:flex-row gap-[16px]">
          {categories && categories.length > 0 ? (
            <div className="subCategory bg-[#fff] text-[#143A53] w-[354px] h-fit py-[20px] px-[16px] hidden md:flex flex-col gap-[24px] rounded-[12px] border border-[#E4E7EC]">
              <h4 className="text-[20px] font-black tracking-[0.4px] leading-[22px] text-center md:text-start">
                {categories[indexId].name}
              </h4>
              <ul className="flex flex-col gap-[14px]">
                {categories[indexId].subCategory.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setIndexIdSubCat(index);
                      setSubId(item._id);
                    }}
                    className={`text-[18px] leading-[22.5px] ${
                      index === indexIdSubCat
                        ? "text-white opacity-100 bg-[#143A53]"
                        : "text-[#0C111D]"
                    }  opacity-70 font-medium rounded-[8px] py-[14px] px-[12px] flex items-center gap-[20px] hover:bg-[#143A53] hover:text-[#fff] hover:opacity-100 cursor-pointer duration-200`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Skeleton className="subCategory bg-[#fff] text-[#143A53] h-[500px] px-[130px] py-[20px]  hidden md:flex flex-col gap-[24px] rounded-[12px] border border-[#E4E7EC]" />
          )}

          {categories && categories.length > 0 ? (
            <div
              className={`subCategory overflow-hidden bg-white  text-[#143A53] w-full ${
                !showSub ? "h-[70px]" : "h-fit"
              }  py-[20px] px-[16px] flex md:hidden flex-col gap-[24px] rounded-[12px] border border-[#E4E7EC] duration-200`}
            >
              <div className="flex items-center justify-between z-10">
                {!showSub ? (
                  <CaretDownOutlined
                    onClick={() => setShowSub(true)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <CaretUpOutlined
                    onClick={() => setShowSub(false)}
                    style={{ cursor: "pointer" }}
                  />
                )}

                <h4 className="text-[20px] font-black tracking-[0.4px] leading-[22px] text-center md:text-start">
                  {categories[indexId]?.name}{" "}
                </h4>
              </div>
              <ul
                className={`duration-100 grid grid-cols-1 gap-[14px] ${
                  !showSub ? "-mt-[1000px]" : ""
                } `}
              >
                {categories[indexId].subCategory.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setIndexIdSubCat(index);
                      setSubId(item._id);
                      setShowSub(false);
                    }}
                    className={`text-[18px] leading-[22.5px] ${
                      index === indexIdSubCat
                        ? "text-white opacity-100 bg-[#143A53]"
                        : "text-[#0C111D]"
                    }  opacity-70 font-medium rounded-[8px] py-[14px] px-[12px] flex items-center gap-[20px] hover:bg-[#143A53] hover:text-[#fff] hover:opacity-100 cursor-pointer duration-200`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Skeleton className="subCategory bg-[#fff] text-[#143A53] h-[500px] px-[130px] py-[20px]  hidden md:flex flex-col gap-[24px] rounded-[12px] border border-[#E4E7EC]" />
          )}
          <div className="allArticles grid grid-cols-1 mx-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
            {articles && articles.length > 0 ? (
              finalDataArticles.map((item, index) => (
                <CardArticle
                  key={index}
                  image={item.image}
                  title={item.title}
                  id={item._id}
                />
              ))
            ) : (
              <>
                <Skeleton className="article flex flex-col gap-[16px] h-[150px] px-[120px] bg-[#fff] rounded-[8px] border border-[#E4E7EC] hover:-translate-y-1.5 duration-200" />
                <Skeleton className="article flex flex-col gap-[16px] h-[150px] px-[120px] bg-[#fff] rounded-[8px] border border-[#E4E7EC] hover:-translate-y-1.5 duration-200" />
                <Skeleton className="article flex flex-col gap-[16px] h-[150px] px-[120px] bg-[#fff] rounded-[8px] border border-[#E4E7EC] hover:-translate-y-1.5 duration-200" />
                <Skeleton className="article flex flex-col gap-[16px] h-[150px] px-[120px] bg-[#fff] rounded-[8px] border border-[#E4E7EC] hover:-translate-y-1.5 duration-200" />
                <Skeleton className="article flex flex-col gap-[16px] h-[150px] px-[120px] bg-[#fff] rounded-[8px] border border-[#E4E7EC] hover:-translate-y-1.5 duration-200" />
                <Skeleton className="article flex flex-col gap-[16px] h-[150px] px-[120px] bg-[#fff] rounded-[8px] border border-[#E4E7EC] hover:-translate-y-1.5 duration-200" />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ArticlesPage;
