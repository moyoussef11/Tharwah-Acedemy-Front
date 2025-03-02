import { useEffect, useRef, useState } from "react";
import { fetchArticle } from "../rtk/features/articles/actGetArticles";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const useArticlePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const articleRef = useRef();

  async function getArticle() {
    const result = await dispatch(fetchArticle(id));
    setArticle(result.payload.article);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getArticle();
  }, [id]);
  return { article, articleRef };
};

export default useArticlePage;
