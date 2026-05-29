import { createSlice } from "@reduxjs/toolkit";
import { listarSeries } from "../actions/seriesAction";

export const seriesSlice = createSlice({
    name: "series",
    initialState: { series: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listarSeries.fulfilled, (state, action) => {
            state.series = action.payload;
        });
    }
});
export default seriesSlice.reducer;