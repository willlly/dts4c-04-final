import { createSlice } from '@reduxjs/toolkit';

const searchArticleSlice = createSlice({
    name: 'searchArticle',
    initialState: { value: '' },
    reducers: {
        yangDicari(state, action) {
            state.value = action.payload;
        },
    },
});

export const { yangDicari } = searchArticleSlice.actions;
export default searchArticleSlice.reducer;
