import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <div className="flex justify-center items-center bg-[#143a53] h-screen">
        <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md text-center">
          <h1 className="mb-8 font-bold text-gray-800 text-4xl">
            404 - Page Not Found
          </h1>
          <p className="mb-6 text-gray-600">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#143a53] hover:bg-white px-6 py-3 rounded-lg font-semibold text-white hover:text-main duration-300"
          >
            Go back to homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error404;
