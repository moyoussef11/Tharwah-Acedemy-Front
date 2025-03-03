import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASEURL, LIBRARY } from "../utils/api";
import { message } from "antd";
import { fetchLibrary } from "../rtk/features/library/actGetLibrary";

const useLibrary = () => {
  const dispatch = useDispatch();
  const libraryState = useSelector((state) => state.library);
  const { library } = libraryState;
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selected, setSelected] = useState("all");
  const searchRef = useRef(null);

  async function searchQuestionByName() {
    try {
      const res = await axios.get(
        `${BASEURL}/${LIBRARY}/searchLibraryByName/${searchValue}`
      );
      setFilteredData(res.data.library);
    } catch (error) {
      message.error(error?.message);
    }
  }

  useEffect(() => {
    if (!searchValue) {
      setFilteredData([]);
      return;
    }

    const delay = setTimeout(() => {
      searchQuestionByName();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchValue]);

  useEffect(() => {
    dispatch(fetchLibrary());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchValue("");
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const options = [
    { id: "all", label: "الجميع" },
    { id: "video", label: "الفيديوهات" },
    { id: "image", label: "الصور" },
    { id: "pdf", label: "PDF" },
    { id: "document", label: "DOC" },
  ];

  const dataFilterd = [...library].filter((item) => item.type === selected);

  const showData = dataFilterd.length > 0 ? dataFilterd : library;

  return {
    searchValue,
    setSearchValue,
    filteredData,
    library,
    showData,
    options,
    setSelected,
    selected,
    searchRef,
  };
};

export default useLibrary;
