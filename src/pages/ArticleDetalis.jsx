import { Link } from "react-router-dom";
import braedCrumbArrow from "../assets/chevron-right.png";
import share from "../assets/ion_share-outline.svg";
import exportIcon from "../assets/export.svg";
import ellipseIcon from "../assets/Ellipse 341.png";
import { message, Skeleton } from "antd";
import useArticlePage from "../hooks/useArticlePage";

const ArticleDetalis = () => {
  const { article, articleRef } = useArticlePage();

  return (
    <>
      <section
        id="hero"
        className="px-[20px] lg:px-[144px] py-[32px]  rounded-[16px]"
      >
        <div>
          <div className="head w-full flex flex-col-reverse gap-5 md:flex-row items-center justify-between">
            <div className="text-[#191A1B] flex items-center gap-[12px]">
              <span className="text-[14px] text-[#191A1B] leading-[20px] opacity-60">
                الرئيسية
              </span>
              <Link to={"/"}>
                <img
                  className="rotate-180 w-[12px] h-[12px] opacity-60 text-[#191A1B]"
                  src={braedCrumbArrow}
                  alt="braedCrumb"
                />
              </Link>
              <h4 className="text-[14px]">
                {article && Object.keys(article).length > 0 ? (
                  article.title
                ) : (
                  <Skeleton active paragraph={false} title={{ width: 100 }} />
                )}
              </h4>
            </div>
            <div className="btns flex items-center gap-[8px]">
              <button
                onClick={() => window.print()}
                className="py-[10px] px-[12px] gap-[8px] rounded-[8px] bg-[#143A53] border border-[#143A53] cursor-pointer flex items-center"
              >
                <span className="font-medium text-white">طباعه</span>
                <img src={exportIcon} alt="icon" />
              </button>

              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(
                      `${window.location.origin}/articles/article-details/${article._id}`
                    )
                    .then(() => {
                      message.success("تم نسخ لينك المقالة بنجاح ");
                    });
                }}
                className="py-[10px] px-[12px] gap-[8px] rounded-[8px] border border-[#D9DAE0] cursor-pointer flex items-center"
              >
                <span className="font-medium text-[#143A53]">مشاركة</span>
                <img src={share} alt="icon" />
              </button>
            </div>
          </div>
          <div className="articleDetails px-[10px] md:px-[50px] lg:px-[200px] flex flex-col gap-[40px] rounded-[16px] text-[#191A1B] bg-[#F8F6F5] my-[40px]">
            <div className="head flex flex-col items-center md:items-start gap-[20px]">
              {article && Object.keys(article).length > 0 ? (
                <div className="text-[#191A1B] opacity-60 font-medium flex items-center gap-[20px] leading-[22.4px] tracking-[-0.32px]">
                  <span>{article.categoryId.name}</span>
                  <img
                    src={ellipseIcon}
                    className="w-[5px] h-[5px]"
                    alt="ellipseIcon"
                  />
                  <span> {article.createdAt.split("T")[0]}</span>
                </div>
              ) : (
                <Skeleton active paragraph={false} title={{ width: 100 }} />
              )}
              <div>
                <h2 className="text-3xl text-center mb-[13px] md:mb-[40px] md:text-start lg:text-[52px] font-bold text-[#212326] w-full leading-[62.4px] tracking-[-1.56px]">
                  {article.title}
                </h2>
                <img
                  src={article.image}
                  className="w-full md:w-[760px] h-[320.52px]"
                  alt={article.title}
                />
              </div>
            </div>
            <div
              ref={articleRef}
              dangerouslySetInnerHTML={{ __html: article.content }}
              className="flex flex-col gap-3 items-center md:items-start"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ArticleDetalis;
