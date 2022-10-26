import { createSlice } from '@reduxjs/toolkit';

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: { value: 'light' },
    reducers: {
        changeMode(state, action) {
            state.value = action.payload;
        },
    },
});

export const { changeMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
