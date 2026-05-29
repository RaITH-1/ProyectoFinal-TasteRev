import { createSlice } from "@reduxjs/toolkit";
import { listarResenas } from "../actions/resenasAction";

export const resenasSlice = createSlice({
    name: "resenas",
    initialState: { resenas: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listarResenas.fulfilled, (state, action) => {
            state.resenas = action.payload;
        });
    }
});
export default resenasSlice.reducer;