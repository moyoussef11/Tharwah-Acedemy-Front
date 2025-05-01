import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./features/categories/categoriesSlice";
import subcategoriesReducer from "./features/subCategories/subcategoriesSlice";
import libraryReducer from "./features/library/librarySlice";
import tagsReducer from "./features/tag/tagSlice";
import questionsReducer from "./features/questions/questionsSlice";
import articlesReducer from "./features/articles/articlesSlice";
import usersReducer from "./features/users/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoriesReducer,
    sub_category: subcategoriesReducer,
    library: libraryReducer,
    tags: tagsReducer,
    questions: questionsReducer,
    articles: articlesReducer,
  },
});
