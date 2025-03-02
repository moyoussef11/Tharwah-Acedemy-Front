import PropTypes from "prop-types";

const CardCategory = ({ image, name }) => {
  return (
    <div className="bg-white hover:-translate-y-3 duration-300 flex flex-col items-center justify-center py-[16px] px-[20px] gap-[14px] rounded-[12px] border border-[#EEEAE8]">
      <img src={image} className="h-[58px] w-[58px] object-contain" alt="icons" />
      <h4 className="text-[#143A53] text-[18px] font-[700] text-center">
        {name}
      </h4>
    </div>
  );
};

CardCategory.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  
};

export default CardCategory;
