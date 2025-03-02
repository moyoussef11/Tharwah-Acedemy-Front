import iconSearch from "../assets/ui-icons.svg";
import CardCategoryByClassName from "../components/Cards/CardCategoryByClassName";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import CardQuestions from "../components/Cards/CardQuestions";
import Skeleton from "react-loading-skeleton";
import useQuestions from "../hooks/useQuestions";

const QuestionsPage = () => {
  const {
    categories,
    searchValue,
    setSearchValue,
    filteredData,
    catSlug,
    setCatSlug,
    setCatId,
    category,
    subCat,
    catId,
    setSelectedSubCat,
    selectedSubCat,
    showSub,
    setShowSub,
    dataQuestions,
  } = useQuestions();

  return (
    <>
      {" "}
      <section
        id="hero"
        className="px-[20px] lg:px-[144px] py-[48px]  rounded-[16px]"
      >
        <div className="flex flex-col items-center gap-[19px]">
          <h4 className="text-[#143A53] text-[48px] font-semibold leading-[57.6px] tracking-[-1.44px] text-center">
            الأسئلة الشائعة
          </h4>
          <p className="text-[18px] text-[#143A53] font-[400] leading-[27px] tracking-[-0.36px] opacity-60 text-center">
            هذه هي الأسئلة الأكثر شيوعًا. لا تستطيع العثور على ما تبحث عنه؟ أضف
            سؤالك
          </p>
          <form>
            <div className="bg-[#FFFFFF] relative sm:w-[650px] border border-[#FD9708] rounded-[12px] py-[8px] pr-[8px] pl-[16px] flex items-center">
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
                      to={"/questions"}
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
        </div>
        <div className="categories my-[32px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[20px]">
          {categories ? (
            categories.map((item, index) => (
              <CardCategoryByClassName
                key={index}
                name={item.name}
                image={item.image}
                className={`${
                  item.slug === catSlug ? "border-b-[#FD9708]" : ""
                } border-b-[6px]`}
                onClick={() => {
                  setCatSlug(item.slug);
                  setCatId(item._id);
                }}
              />
            ))
          ) : (
            <Skeleton />
          )}
        </div>

        <div className="articles flex flex-col md:flex-row gap-[16px]">
          <div className="subCategory bg-[#fff] text-[#143A53] w-[354px] h-fit py-[20px] px-[16px] hidden md:flex flex-col gap-[24px] rounded-[12px] border border-[#E4E7EC]">
            <h4 className="text-[20px] font-black tracking-[0.4px] leading-[22px] text-center md:text-start">
              {category && Object.keys(catSlug).length > 0 ? (
                category.name
              ) : (
                <Skeleton />
              )}
            </h4>
            <ul className="flex flex-col gap-[14px]">
              {subCat &&
              subCat.length > 0 &&
              subCat.some((item) => item.categoryId === catId)
                ? subCat
                    .filter((item) => item.categoryId === catId)
                    .map((item, index) => (
                      <li
                        key={index}
                        onClick={() => setSelectedSubCat(item._id)}
                        className={`text-[18px] leading-[22.5px] ${
                          item._id === selectedSubCat
                            ? "text-white bg-[#143A53] opacity-100"
                            : ""
                        } text-[#0C111D] opacity-70 font-medium rounded-[8px] py-[14px] px-[12px] flex items-center gap-[20px] hover:bg-[#143A53] hover:text-[#fff] hover:opacity-100 cursor-pointer duration-200`}
                      >
                        {item.name}
                      </li>
                    ))
                : ""}
            </ul>
          </div>
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
                {category && Object.keys(catSlug).length > 0 ? (
                  category.name
                ) : (
                  <Skeleton />
                )}{" "}
              </h4>
            </div>
            <ul
              className={`duration-100 grid grid-cols-1 gap-[14px] ${
                !showSub ? "-mt-[1000px]" : ""
              } `}
            >
              {subCat &&
              subCat.length > 0 &&
              subCat.some((item) => item.categoryId === catId) ? (
                subCat
                  .filter((item) => item.categoryId === catId)
                  .map((item, index) => (
                    <li
                      key={index}
                      onClick={() => setSelectedSubCat(item._id)}
                      className={`text-[18px] leading-[22.5px] ${
                        item._id === selectedSubCat
                          ? "text-white bg-[#143A53] opacity-100"
                          : ""
                      } text-[#0C111D] opacity-70 font-medium rounded-[8px] py-[14px] px-[12px] flex items-center gap-[20px] hover:bg-[#143A53] hover:text-[#fff] hover:opacity-100 cursor-pointer duration-200`}
                    >
                      {item.name}
                    </li>
                  ))
              ) : (
                <li className="text-gray-500 text-[18px] py-[14px]">No Data</li>
              )}
            </ul>
          </div>
          <div className="allQuetions w-full grid grid-cols-1 mx-auto gap-[16px]">
            {dataQuestions.length > 0 ? (
              <CardQuestions
                title={`أسئلة (${dataQuestions.length})`}
                questions={dataQuestions}
                to={"/questions"}
              />
            ) : (
              <>
                <div className="p-[16px] w-full bg-white border border-[#E4E7EC] rounded-[12px] flex flex-col gap-[20px]">
                  <p className="text-center text-gray-500 text-[18px] py-[20px]">
                    لا توجد أسئلة متاحة لهذا التصنيف الفرعي.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default QuestionsPage;
