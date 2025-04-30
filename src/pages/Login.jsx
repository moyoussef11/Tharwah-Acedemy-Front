import { Link } from "react-router-dom";
import logo from "../assets/LogoLog.svg";
import heroImg from "../assets/logoT.png";
import { Input } from "antd";
const Login = () => {
  return (
    <div
      dir="ltr"
      className="min-h-screen flex flex-col items-center justify-center bg-[#f8fbff]"
    >
      <div className="mb-4">
        <Link
          to="/"
          className="flex cursor-pointer border border-[#1469B0] text-blue-400 rounded-full p-1  items-center space-x-2  "
        >
          <span className="rounded-full p-1">←</span>
          <span className="text-sm font-medium">GO BACK</span>
        </Link>
      </div>
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden flex items-center">
        {/* Left: Login Form */}
        <div className="w-full p-5  md:w-1/2 md:p-10">
          <img src={logo} alt="Tharwah Logo" className="h-10 mb-6" />

          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Login to your account
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Welcome back! Please enter your details.
          </p>

          <form>
            <input
              type="email"
              autoComplete="email"
              placeholder="mazhar.shf@gmail.com"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative mb-4">
              <Input.Password
                autoComplete="current-password"
                className="!px-4 !py-2 !mb-4"
                placeholder="input password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#073b4c] cursor-pointer text-white py-2 rounded-full hover:opacity-70 transition"
            >
              LOGIN
            </button>
          </form>
        </div>

        {/* Right: Image + Text */}
        <div className="w-1/2 relative hidden bg-[#073b4c] text-white md:flex flex-col justify-center items-center">
          <div className="w-full -mb-10 px-5 py-2">
            <p className="text-[25px] tracking-wider text-gray-200">
              WE’RE PROUD
            </p>
            <p className="text-[30px]">THAT YOU’RE PART OF</p>
            <p className="text-4xl font-bold">OUR TEAM</p>
          </div>
          <img
            src={heroImg}
            alt="Team"
            className="w-full h-[350px] mt-20 rounded-t-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
