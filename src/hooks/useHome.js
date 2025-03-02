import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARTICLES, BASEURL, QUESTIONS } from "../utils/api";
import {
  fetchQuestions,
  fetchQuestionsLatest,
} from "../rtk/features/questions/actGetQuestions";
import { fetchCategories } from "../rtk/features/categories/actGetCategories";
import {
  fetchArticles,
  fetchArticlesLatest,
} from "../rtk/features/articles/actGetArticles";

const useHome = () => {
  const dispatch = useDispatch();
  const questionsState = useSelector((state) => state.questions);
  const articlesState = useSelector((state) => state.articles);
  const categoryState = useSelector((state) => state.categories);

  // حالات التحميل
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [mode, setMode] = useState("questions");
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchValueArticle, setSearchValueArticle] = useState("");
  const [filteredDataArticles, setFilteredDataArticles] = useState([]);
  const [questionsViewsOver, setQuestionsViewsOver] = useState([]);
  const [articlesViewsOver, setArticlesViewsOver] = useState([]);

  const { questions, questionsLatest } = questionsState;
  const { categories } = categoryState;
  const { articles, articlesLatest } = articlesState;

  function getViewsQuestions() {
    setQuestionsViewsOver([...questions].sort((a, b) => b.views - a.views));
  }

  function getViewsArticles() {
    setArticlesViewsOver([...articles].sort((a, b) => b.views - a.views));
  }

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
    if (questions) {
      getViewsQuestions();
    }
    if (articles) {
      getViewsArticles();
    }
  }, [questions, articles]);

  useEffect(() => {
    setSearchValue("");
  }, [mode]);

  useEffect(() => {
    setLoadingQuestions(true);
    setLoadingArticles(true);
    setLoadingCategories(true);

    Promise.all([
      dispatch(fetchQuestions()).finally(() => setLoadingQuestions(false)),
      dispatch(fetchQuestionsLatest()),
      dispatch(fetchCategories()).finally(() => setLoadingCategories(false)),
      dispatch(fetchArticles()).finally(() => setLoadingArticles(false)),
      dispatch(fetchArticlesLatest()),
    ]);
  }, [dispatch]);

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

  return {
    mode,
    setMode,
    searchValueArticle,
    setSearchValueArticle,
    filteredDataArticles,
    searchValue,
    setSearchValue,
    filteredData,
    categories,
    questions,
    questionsLatest,
    questionsViewsOver,
    articles,
    articlesLatest,
    articlesViewsOver,
    loadingQuestions,
    loadingArticles,
    loadingCategories,
  };
};

export default useHome;
