import { configureStore } from '@reduxjs/toolkit';
import searchArticleReducer from './features/searchArticleSlice';
import darkModeReducer from './features/darkModeSlice';

export const store = configureStore({
    reducer: {
        searchArticle: searchArticleReducer,
        darkMode: darkModeReducer,
    },
});
