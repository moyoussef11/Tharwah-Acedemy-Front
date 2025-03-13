import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchCategory,
} from "../rtk/features/categories/actGetCategories";
import { fetchQuestions } from "../rtk/features/questions/actGetQuestions";
import { fetchSubCategories } from "../rtk/features/subCategories/actGetSubCategories";
import axios from "axios";
import { BASEURL, QUESTIONS } from "../utils/api";
import { message } from "antd";

const useQuestions = () => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.categories);
  const questionsState = useSelector((state) => state.questions);
  const subCategoryState = useSelector((state) => state.sub_category);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const { categories } = categoryState;
  const [catId, setCatId] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [category, setCategory] = useState({});
  const { sub_categories } = subCategoryState;
  const { questions } = questionsState;
  const [subCat, setSubCat] = useState([]);
  const [selectedSubCat, setSelectedSubCat] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    function handleHideResult(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchValue("");
      }
    }

    window.addEventListener("mousedown", handleHideResult);

    return () => removeEventListener("mousedown", handleHideResult);
  }, []);
  useEffect(() => {
    if (categories.length > 0) {
      setCatSlug(categories[0]?.slug);
      setCatId(categories[0]?._id);
    }
    if (sub_categories.length > 0) {
      setSubCat(sub_categories);
      setSelectedSubCat(sub_categories[0]?._id);
    }
  }, [categories, subCat, sub_categories]);

  async function getCat() {
    const res = await dispatch(fetchCategory({ slug: catSlug }));
    setCategory(res.payload.category);
  }

  useEffect(() => {
    if (!catId || sub_categories.length === 0) return;

    const relatedSubCategories = sub_categories.filter(
      (sub) => sub.categoryId === catId
    );

    if (relatedSubCategories.length > 0) {
      setSelectedSubCat((prev) =>
        prev && relatedSubCategories.some((sub) => sub._id === prev)
          ? prev
          : relatedSubCategories[0]._id
      );
    } else {
      setSelectedSubCat("");
    }
  }, [catId, sub_categories]);

  const filteredQuestions = selectedSubCat
    ? questions.filter(
        (question) => question.categoryId?._id === catId
      )
    : [];

  const dataQuestions =
    filteredQuestions.length > 0 ? filteredQuestions : [];

  useEffect(() => {
    if (catSlug) {
      getCat();
    }
  }, [catSlug]);

  useEffect(() => {
    if (catId) {
      dispatch(fetchQuestions());
    }
  }, [dispatch, catId, selectedSubCat]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchQuestions());
    dispatch(fetchSubCategories());
    dispatch(fetchQuestions());
  }, [dispatch]);

  async function searchQuestionByName() {
    try {
      const res = await axios.get(
        `${BASEURL}/${QUESTIONS}/searchQuestionByName/${searchValue}`
      );
      setFilteredData(res.data.questions);
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
  return {
    categories,
    searchValue,
    setSearchValue,
    filteredData,
    catSlug,
    setCatSlug,
    setCatId,
    category,
    subCat,
    catId,
    setSelectedSubCat,
    selectedSubCat,
    showSub,
    setShowSub,
    dataQuestions,
    searchRef,
  };
};

export default useQuestions;
