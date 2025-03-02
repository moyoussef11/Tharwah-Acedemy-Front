import { useState } from "react";
import HeaderLeft from "./HeaderLeft";
import HeaderCenter from "./HeaderCenter";
import HeaderRight from "./HeaderRight";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <header
      className="bg-[#143A53] py-[16px] md:py-[5px] px-[20px] md:px-[40px] flex items-center justify-between"
    >
      <HeaderLeft />
      <HeaderCenter toggle={toggle} setToggle={setToggle} />
      <HeaderRight toggle={toggle} setToggle={setToggle} />
    </header>
  );
};

export default Header;
