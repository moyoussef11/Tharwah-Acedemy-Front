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
import { fetchSubCategories } from "../rtk/features/subCategories/actGetSubCategories";

const useArticles = () => {
  const dispatch = useDispatch();

  const articlesState = useSelector((state) => state.articles);
  const { articles, articlesLatest } = articlesState;

  const categoriesState = useSelector((state) => state.categories);
  const { categories } = categoriesState;

  const subCategoryState = useSelector((state) => state.sub_category);
  const { sub_categories } = subCategoryState;

  const [searchValueArticle, setSearchValueArticle] = useState("");
  const [filteredDataArticles, setFilteredDataArticles] = useState([]);

  const [indexId, setIndexId] = useState(0); // لإبراز الكاتيجوري المختار
  const [indexIdSubCat, setIndexIdSubCat] = useState(0); // لإبراز السب كاتيجوري المختار

  const [catId, setCatId] = useState("");
  const [subId, setSubId] = useState("");

  const [showSub, setShowSub] = useState(false);

  const searchRef = useRef(null);

  // ✅ البحث عن المقالات بالاسم
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

  // ✅ فلترة المقالات حسب السب كاتيجوري
  const filteredDataArticlesNew = subId
    ? articles.filter((article) => article?.sub_CategoryId?._id === subId)
    : [];

  const finalDataArticles = filteredDataArticlesNew;

  // ✅ التحكم في البحث
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

  // ✅ استدعاء البيانات الأساسية
  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchArticlesLatest());
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, [dispatch]);

  // ✅ إخفاء نتيجة البحث عند الضغط خارج حقل البحث
  useEffect(() => {
    function handleHideResult(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchValueArticle("");
      }
    }

    window.addEventListener("mousedown", handleHideResult);
    return () => window.removeEventListener("mousedown", handleHideResult);
  }, []);

  // ✅ عند تغيير الكاتيجوري، اختار أول سب كاتيجوري مرتبط به
  useEffect(() => {
    if (!catId || sub_categories.length === 0) return;

    const relatedSubCategories = sub_categories.filter(
      (sub) => sub.categoryId === catId
    );

    if (relatedSubCategories.length > 0) {
      setSubId((prev) =>
        prev && relatedSubCategories.some((sub) => sub._id === prev)
          ? prev
          : relatedSubCategories[0]._id
      );
      setIndexIdSubCat(0);
    } else {
      setSubId("");
    }
  }, [catId, sub_categories]);

  // ✅ أول كاتيجوري تلقائيًا بعد تحميل الكاتيجوريز
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
    subId,
    sub_categories,
  };
};

export default useArticles;
