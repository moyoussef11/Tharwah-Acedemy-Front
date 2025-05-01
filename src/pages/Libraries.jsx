import iconSearch from "../assets/ui-icons.svg";
import imagePdf from "../assets/icons8-pdf.png";
import imageDocs from "../assets/icons8-doc.png";
import Skeleton from "react-loading-skeleton";
import useLibrary from "../hooks/useLibrary";
import CardCategoryByClassName from "../components/Cards/CardCategoryByClassName";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import {
  fetchCategories,
  fetchCategory,
} from "../rtk/features/categories/actGetCategories";
import { fetchSubCategories } from "../rtk/features/subCategories/actGetSubCategories";
import { fetchLibrary } from "../rtk/features/library/actGetLibrary";

const Libraries = () => {
  const {
    searchValue,
    setSearchValue,
    filteredData,
    library,
    searchRef,
    // categories,
  } = useLibrary();
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.categories);
  const subCategoryState = useSelector((state) => state.sub_category);
  const [showSub, setShowSub] = useState(false);
  const { categories } = categoryState;
  const [catId, setCatId] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [category, setCategory] = useState({});
  const { sub_categories } = subCategoryState;
  const [subCat, setSubCat] = useState([]);
  const [selectedSubCat, setSelectedSubCat] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      setCatSlug(categories[0]?.slug);
      setCatId(categories[0]?._id);
    }
    if (sub_categories.length > 0) {
      setSubCat(sub_categories);
      setSelectedSubCat(sub_categories[0]?._id);
    }
  }, [categories, subCat, sub_categories]);

  async function getCat() {
    const res = await dispatch(fetchCategory({ slug: catSlug }));
    setCategory(res.payload.category);
  }

  useEffect(() => {
    if (!catId || sub_categories.length === 0) return;

    const relatedSubCategories = sub_categories.filter(
      (sub) => sub.categoryId === catId
    );

    if (relatedSubCategories.length > 0) {
      setSelectedSubCat((prev) =>
        prev && relatedSubCategories.some((sub) => sub._id === prev)
          ? prev
          : relatedSubCategories[0]._id
      );
    } else {
      setSelectedSubCat("");
    }
  }, [catId, sub_categories]);

  const filteredQuestions = selectedSubCat
    ? library.filter(
        (question) => question.sub_CategoryId?._id === selectedSubCat
      )
    : [];

  const dataQuestions = filteredQuestions.length > 0 ? filteredQuestions : [];

  useEffect(() => {
    if (catSlug) {
      getCat();
    }
  }, [catSlug]);

  useEffect(() => {
    if (catId) {
      dispatch(fetchLibrary());
    }
  }, [dispatch, catId, selectedSubCat]);

  return (
    <>
      {" "}
      <section
        id="hero"
        className="px-[20px] lg:px-[144px] py-[32px] rounded-[16px]"
      >
        <div className="flex items-center flex-col gap-5 md:flex-row justify-between">
          <h2 className="text-[32px] font-bold leading-[35.2px] tracking-[0.64px] text-[#0C111D]">
            المكتبة
          </h2>
          <form ref={searchRef} className="">
            <div className="bg-[#FFFFFF] relative sm:w-[550px] border border-[#FD9708] rounded-[12px] py-[8px] pr-[8px] pl-[16px] flex items-center">
              <input
                type="text"
                value={searchValue}
                className="w-full border-none focus:outline-none p-[12px]"
                placeholder="ابحث عن المكتبة هنا"
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
                    filteredData.map((item) => {
                      if (item.type === "image") {
                        return (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={item.url}
                            className="library rounded-[8px] border border-[#E4E7EC] p-[12px] flex flex-row justify-between items-center gap-[16px]"
                          >
                            <img
                              src={item.url}
                              alt={item.title}
                              className="h-10 rounded-[10.733px]"
                            />
                            <h4 className="font-medium leading-[20px] tracking-[-0.48px] text-[#191A1B]">
                              {item.title}
                            </h4>
                            <span className="text-[12px] font-[400] text-[#505F75] leading-[15px] tracking-[-0.36px]">
                              {item.createdAt.split("T")[0]}
                            </span>
                          </a>
                        );
                      } else if (item.type === "pdf") {
                        return (
                          <a
                            key={item.url}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="library rounded-[8px] border border-[#E4E7EC] p-[12px] flex justify-between items-center gap-[16px]"
                          >
                            <div className="bg-[#F4F4F4] rounded-[10.733px] flex items-center justify-center">
                              <img
                                src={imagePdf}
                                alt="pdfImage"
                                className="w-[62px] h-[62px] rounded-[10.733px]"
                              />
                            </div>
                            <h4 className="font-medium leading-[20px] tracking-[-0.48px] text-[#191A1B]">
                              {item.title}
                            </h4>
                            <span className="text-[12px] font-[400] text-[#505F75] leading-[15px] tracking-[-0.36px]">
                              {item.createdAt.split("T")[0]}
                            </span>
                          </a>
                        );
                      } else if (item.type === "document") {
                        return (
                          <a
                            key={item.url}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="library rounded-[8px] border border-[#E4E7EC] p-[12px] flex items-center justify-between gap-[16px]"
                          >
                            <div className="bg-[#F4F4F4] rounded-[10.733px] flex items-center justify-center">
                              <img
                                src={imageDocs}
                                alt="imageDocs"
                                className="w-[62px] h-[62px] rounded-[10.733px]"
                              />
                            </div>
                            <h4 className="font-medium leading-[20px] tracking-[-0.48px] text-[#191A1B]">
                              {item.title}
                            </h4>
                            <span className="text-[12px] font-[400] text-[#505F75] leading-[15px] tracking-[-0.36px]">
                              {item.createdAt.split("T")[0]}
                            </span>
                          </a>
                        );
                      } else if (item.type === "video") {
                        return (
                          <div
                            key={item.url}
                            className="library rounded-[8px] border border-[#E4E7EC] p-[12px] flex flex-row items-center justify-between gap-[16px]"
                          >
                            <video
                              className="h-[100px] rounded-[10.733px]"
                              controls
                            >
                              <source src={item.url} type="video/mp4" />
                              <source src={item.url} type="video/ogg" />
                              Your browser does not support the video tag.
                            </video>
                            <h4 className="font-medium leading-[20px] tracking-[-0.48px] text-[#191A1B]">
                              {item.title}
                            </h4>
                            <span className="text-[12px] font-[400] text-[#505F75] leading-[15px] tracking-[-0.36px]">
                              {item.createdAt.split("T")[0]}
                            </span>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={item.url}
                            className="library rounded-[8px] border border-[#E4E7EC] p-[12px] flex flex-row items-center justify-between gap-[16px]"
                          >
                            <img
                              src={item.url}
                              alt={item.title}
                              className="md:w-[321.839px] h-[214.667px] rounded-[10.733px]"
                            />
                            <h4 className="font-medium leading-[20px] tracking-[-0.48px] text-[#191A1B]">
                              {item.title}
                            </h4>
                            <span className="text-[12px] font-[400] text-[#505F75] leading-[15px] tracking-[-0.36px]">
                              {item.createdAt.split("T")[0]}
                            </span>
                          </div>
                        );
                      }
                    })
                  ) : (
                    <p className="text-center py-2 text-[#143A53]">
                      لا توجد نتائج بهذا التاج
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

        <div className="flex flex-col md:flex-row gap-[16px]">
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

          <div className="library w-full bg-white flex flex-col gap-[20px] rounded-[12px] border border-[#E4E7EC] p-[16px]">
            <h2 className="text-[#0C111D] font-medium text-[20px] leading-[25px]">
              {" "}
              ({dataQuestions?.length}) الجميع
            </h2>
            <div className="libraries grid gap-[20px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {library && library?.length > 0 ? (
                dataQuestions.map((item) => {
                  if (item.type === "image") {
                    return (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={item.url}
                        className="library rounded-[8px] border border-[#E4E7EC] p-[12px] flex flex-col gap-[16px]"
                      >
                        <img
                          src={item.url}
                          alt={item.title}
                          className="md:w-[321.839px] h-[214.667px] rounded-[10.733px]"
                        />
                        <h4 className="font-medium leading-[20px] tracking-[-0.48px] text-[#191A1B]">
                          {item.title}
                        </h4>
                        <span className="text-[12px] font-[400] text-[#505F75] leading-[15px] tracking-[-0.36px]">
                          {item.createdAt.split("T")[0]}
                        </span>
                      </a>
                    );
                  } else if (item.type === "pdf") {
                    return (
                      <a
                        key={item.url}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="library rounded-[8px] border border-[#E4E7EC] p-[12px] flex flex-col gap-[16px]"
                      >
                        <div className="h-[214.667px] bg-[#F4F4F4] rounded-[10.733px] flex items-center justify-center">
                          <img
                            src={imagePdf}
                            alt="pdfImage"
                            className="w-[62px] h-[62px] rounded-[10.733px]"
                          />
                        </div>
                        <h4 className="font-medium leading-[20px] tracking-[-0.48px] text-[#191A1B]">
                          {item.title}
                        </h4>
                        <span className="text-[12px] font-[400] text-[#505F75] leading-[15px] tracking-[-0.36px]">
                          {item.createdAt.split("T")[0]}
                        </span>
                      </a>
                    );
                  } else if (item.type === "document") {
                    return (
                      <a
                        key={item.url}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="library rounded-[8px] border border-[#E4E7EC] p-[12px] flex flex-col gap-[16px]"
                      >
                        <div className="h-[214.667px] bg-[#F4F4F4] rounded-[10.733px] flex items-center justify-center">
                          <img
                            src={imageDocs}
                            alt="imageDocs"
                            className="w-[62px] h-[62px] rounded-[10.733px]"
                          />
                        </div>
                        <h4 className="font-medium leading-[20px] tracking-[-0.48px] text-[#191A1B]">
                          {item.title}
                        </h4>
                        <span className="text-[12px] font-[400] text-[#505F75] leading-[15px] tracking-[-0.36px]">
                          {item.createdAt.split("T")[0]}
                        </span>
                      </a>
                    );
                  } else if (item.type === "video") {
                    return (
                      <div
                        key={item.url}
                        className="library rounded-[8px] border border-[#E4E7EC] p-[12px] flex flex-col gap-[16px]"
                      >
                        <video
                          className="md:w-[321.839px] h-[214.667px] rounded-[10.733px] shrink-0 flex-none"
                          controls
                        >
                          <source src={item.url} type="video/mp4" />
                          <source src={item.url} type="video/ogg" />
                          Your browser does not support the video tag.
                        </video>
                        <h4 className="font-medium leading-[20px] tracking-[-0.48px] text-[#191A1B]">
                          {item.title}
                        </h4>
                        <span className="text-[12px] font-[400] text-[#505F75] leading-[15px] tracking-[-0.36px]">
                          {item.createdAt.split("T")[0]}
                        </span>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.url}
                        className="library rounded-[8px] border border-[#E4E7EC] p-[12px] flex flex-col gap-[16px]"
                      >
                        <img
                          src={item.url}
                          alt={item.title}
                          className="md:w-[321.839px] h-[214.667px] rounded-[10.733px]"
                        />
                        <h4 className="font-medium leading-[20px] tracking-[-0.48px] text-[#191A1B]">
                          {item.title}
                        </h4>
                        <span className="text-[12px] font-[400] text-[#505F75] leading-[15px] tracking-[-0.36px]">
                          {item.createdAt.split("T")[0]}
                        </span>
                      </div>
                    );
                  }
                })
              ) : (
                <>
                  <Skeleton className="library h-[200px] rounded-[8px] border border-[#E4E7EC] p-[12px] flex flex-col gap-[16px]" />
                  <Skeleton className="library h-[200px] rounded-[8px] border border-[#E4E7EC] p-[12px] flex flex-col gap-[16px]" />
                  <Skeleton className="library h-[200px] rounded-[8px] border border-[#E4E7EC] p-[12px] flex flex-col gap-[16px]" />
                  <Skeleton className="library h-[200px] rounded-[8px] border border-[#E4E7EC] p-[12px] flex flex-col gap-[16px]" />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Libraries;
