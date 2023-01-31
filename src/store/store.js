import { configureStore } from "@reduxjs/toolkit";
import { authSlice, bugSlice } from "./slices";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        bug: bugSlice.reducer
    }
})