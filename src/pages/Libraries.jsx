import iconSearch from "../assets/ui-icons.svg";
import imagePdf from "../assets/icons8-pdf.png";
import imageDocs from "../assets/icons8-doc.png";
import Skeleton from "react-loading-skeleton";
import useLibrary from "../hooks/useLibrary";

const Libraries = () => {
  const {
    searchValue,
    setSearchValue,
    filteredData,
    library,
    showData,
    options,
    setSelected,
    selected,
    searchRef,
  } = useLibrary();



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
                className="w-full border-none focus:outline-none"
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
                      لا توجد نتائج
                    </p>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="filters my-[32px] ">
          <div className="flex items-center flex-wrap gap-[8px]">
            {options.map((option) => (
              <div
                key={option.id}
                className="flex w-fit items-center gap-2 bg-white rounded-[8px] border border-[#D9DAE0] py-2 px-3 cursor-pointer"
                onClick={() => setSelected(option.id)}
              >
                {/* ✅ Hidden Input */}
                <input type="radio" name="filter" className="hidden" />
                {/* ✅ Custom Checkbox */}
                <div
                  className={`h-5 w-5 flex items-center justify-center rounded border-2 transition-all ${
                    selected === option.id
                      ? "bg-[#FD9708] border-[#FD9708]"
                      : "border-[#D9DAE0]"
                  }`}
                >
                  {selected === option.id && (
                    <svg
                      className="w-4 h-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                {/* ✅ Label */}
                <label className="text-sm font-medium text-[#143A53] cursor-pointer">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="library w-full bg-white flex flex-col gap-[20px] rounded-[12px] border border-[#E4E7EC] p-[16px]">
          <h2 className="text-[#0C111D] font-medium text-[20px] leading-[25px]">
            {" "}
            ({showData?.length}) الجميع
          </h2>
          <div className="libraries grid gap-[20px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {library && library?.length > 0 ? (
              showData.map((item) => {
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
      </section>
    </>
  );
};

export default Libraries;
