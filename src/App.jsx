import { Route, Routes, useLocation } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { Home } from "./pages/Home";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard";
import Articles from "./components/Dashboard/Articles/Articles";
import AddArticles from "./components/Dashboard/Articles/AddArticles";
import Questions from "./components/Dashboard/Questions/Questions";
import AddQuestions from "./components/Dashboard/Questions/AddQuestions.JSX";
import Library from "./components/Dashboard/Library/Library";
import AddLibrary from "./components/Dashboard/Library/AddLibrary";
import Categories from "./components/Dashboard/Categories/Categories";
import AddCategories from "./components/Dashboard/Categories/AddCategories";
import SubCategories from "./components/Dashboard/Categories/SubCategories";
import AddSubCategories from "./components/Dashboard/Categories/AddSubCategories";
import LoginAdmin from "./pages/LoginAdmin";
import RequireAuth from "./requireAuth/RequireAuth";
import Tags from "./components/Dashboard/Tags/Tags";
import AddTags from "./components/Dashboard/Tags/AddTags";
import QuestionsPage from "./pages/Questions";
import ArticlesPage from "./pages/Articles";
import Libraries from "./pages/Libraries";
import ArticleDetalis from "./pages/ArticleDetalis";
import Error404 from "./pages/Error404";

function App() {
  const location = useLocation();
  const hideHeadAndFooter =
    location.pathname.includes("admin-dashboard") ||
    location.pathname.includes("login-admin") ||
    (![
      "/",
      "/questions",
      "/articles",
      "/libraries",
      "login-admin",
      "admin-dashboard",
    ].includes(location.pathname) &&
      !location.pathname.startsWith("/articles/article-details/"));

  return (
    <>
      {!hideHeadAndFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route
          path="/articles/article-details/:id"
          element={<ArticleDetalis />}
        />
        <Route path="/libraries" element={<Libraries />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="*" element={<Error404 />} />
        <Route element={<RequireAuth />}>
          <Route path="/admin-dashboard" element={<Dashboard />}>
            <Route path="articles" element={<Articles />} />
            <Route path="articles/add-article" element={<AddArticles />} />
            <Route path="questions" element={<Questions />} />
            <Route path="questions/add-questions" element={<AddQuestions />} />
            <Route path="library" element={<Library />} />
            <Route path="library/add-library" element={<AddLibrary />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/add-category" element={<AddCategories />} />
            <Route path="tags" element={<Tags />} />
            <Route path="tags/add-tag" element={<AddTags />} />
            <Route
              path="categories/sub-categories"
              element={<SubCategories />}
            />
            <Route
              path="categories/add-sub-category"
              element={<AddSubCategories />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
