import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const CardArticleHome = ({ title, articles }) => {
  return (
    <div className="card card p-[16px] flex flex-col gap-[20px] bg-[#FFF] border border-[#E4E7EC] rounded-[12px]">
      <div className="head flex items-center justify-between">
        <h4 className="text-[20px] font-[500] text-[#0C111D]">
          {title ? title : <Skeleton />}
        </h4>
        <Link className="text-[14px] font-[400] underline" to={"/articles"}>
          عرض الكل
        </Link>
      </div>
      {articles && articles.length > 0 ? (
        articles.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="article w-full max-w-[437px] p-[12px] flex gap-[16px] rounded-[8px] bg-[#fff] border border-[#E4E7EC]"
          >
            <div className="w-[120px] h-[80px] flex-none flex flex-col items-center justify-center">
              <img
                src={item.image}
                className="w-full h-full pr-[0.06px] flex items-center justify-center shrink-0 rounded-[4px] bg-[#fff]"
                alt={item.title}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-[12px]">
              <Link
                to={`/articles/article-details/${item._id}`}
                className="text-[#191A1B] font-[500]"
              >
                {item.title}
              </Link>
            </div>
          </div>
        ))
      ) : (
        <>
          <Skeleton className="article p-[12px] h-[100px] flex gap-[16px] rounded-[8px] bg-[#fff] border border-[#E4E7EC]" />
          <Skeleton className="article p-[12px] h-[100px] flex gap-[16px] rounded-[8px] bg-[#fff] border border-[#E4E7EC]" />
          <Skeleton className="article p-[12px] h-[100px] flex gap-[16px] rounded-[8px] bg-[#fff] border border-[#E4E7EC]" />
        </>
      )}
    </div>
  );
};

CardArticleHome.propTypes = {
  title: PropTypes.string,
  articles: PropTypes.array,
};

export default CardArticleHome;
