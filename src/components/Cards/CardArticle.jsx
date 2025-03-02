import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CardArticle = ({ image, title, id }) => {
  return (
    <Link
      to={`/articles/article-details/${id}`}
      className="article flex flex-col h-fit gap-[16px] p-[12px] bg-[#fff] rounded-[8px] border border-[#E4E7EC] hover:-translate-y-1.5 duration-200"
    >
      <img
        src={image}
        className="w-[321.839px] h-[214.667px] rounded-[8px]"
        alt="imageArticle"
      />

      <h4 className="text-[#191A1B] font-medium leading-[20px] tracking-[-0.48px]">
        {title}
      </h4>
    </Link>
  );
};

CardArticle.propTypes = {
  image: PropTypes.string,
  time: PropTypes.string,
  createdAt: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
};

export default CardArticle;
