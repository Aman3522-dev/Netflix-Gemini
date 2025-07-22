import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: "config",
    initialState: {
        lang: "eng"
    },
    reducers: {
        changeLangauage: (state, action) =>{
            state.lang = action.payload;
        },
    },
});

export const { changeLangauage } = configSlice.actions;

export default configSlice.reducer;