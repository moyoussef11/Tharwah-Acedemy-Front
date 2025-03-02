import PropTypes from "prop-types";

const CardCategoryByClassName = ({ image, name, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white hover:-translate-y-3 cursor-pointer duration-300 flex flex-col items-center justify-center py-[16px] px-[20px] gap-[14px] rounded-[12px] border border-[#EEEAE8] ${className}`}
    >
      <img src={image} className="h-[58px] w-[58px]" alt="icons" />
      <h4 className="text-[#143A53] text-[18px] font-[700] text-center">
        {name}
      </h4>
    </div>
  );
};

CardCategoryByClassName.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  num: PropTypes.string,
  onClick: PropTypes.func,
};

export default CardCategoryByClassName;
