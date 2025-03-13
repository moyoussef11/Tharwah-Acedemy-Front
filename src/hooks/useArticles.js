import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARTICLES, BASEURL } from "../utils/api";
import { message } from "antd";
import {
  fetchArticles,
  fetchArticlesLatest,
} from "../rtk/features/articles/actGetArticles";
import { fetchCategories } from "../rtk/features/categories/actGetCategories";

const useArticles = () => {
  const dispatch = useDispatch();
  const articlesState = useSelector((state) => state.articles);
  const { articles, articlesLatest } = articlesState;
  const categoriesState = useSelector((state) => state.categories);
  const { categories } = categoriesState;
  const [searchValueArticle, setSearchValueArticle] = useState("");
  const [filteredDataArticles, setFilteredDataArticles] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [indexId, setIndexId] = useState(0);
  const [indexIdSubCat, setIndexIdSubCat] = useState(0);
  const [catId, setCatId] = useState(0);
  const [subId, setSubId] = useState("");
  const searchRef = useRef(null);

  async function searchArticlesByName() {
    try {
      const res = await axios.get(
        `${BASEURL}/${ARTICLES}/searchArticleByName/${searchValueArticle}`
      );
      setFilteredDataArticles(res.data.articles);
    } catch (error) {
      message.error(error?.message);
    }
  }

  const filteredDataArticlesNew = articles.filter(
    (article) => article?.categoryId?._id === catId
  );

  const finalDataArticles =
    filteredDataArticlesNew.length > 0 ? filteredDataArticlesNew : [];

  useEffect(() => {
    if (!searchValueArticle) {
      setFilteredDataArticles([]);
      return;
    }

    const delaySearch = setTimeout(() => {
      searchArticlesByName();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchValueArticle]);

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchArticlesLatest());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    function handleHideResult(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchValueArticle("");
      }
    }

    window.addEventListener("mousedown", handleHideResult);

    return () => removeEventListener("mousedown", handleHideResult);
  }, []);

  useEffect(() => {
    if (indexId) {
      setIndexIdSubCat(0);
    }
  }, [indexId]);

  useEffect(() => {
    if (categories.length > 0) {
      setIndexId(0);
      setCatId(categories[0]._id);
    }
  }, [categories]);

  return {
    searchValueArticle,
    setSearchValueArticle,
    filteredDataArticles,
    articlesLatest,
    categories,
    setIndexId,
    setCatId,
    indexId,
    setIndexIdSubCat,
    setSubId,
    indexIdSubCat,
    showSub,
    setShowSub,
    articles,
    finalDataArticles,
    searchRef,
  };
};

export default useArticles;
