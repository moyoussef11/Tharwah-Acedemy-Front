import { Link } from "react-router-dom";
import logo from "../../assets/Group 1000001855.png";

const HeaderLeft = () => {
  return (
    <Link to={"/"}>
      <img src={logo} alt="logo" />
    </Link>
  );
};

export default HeaderLeft;
