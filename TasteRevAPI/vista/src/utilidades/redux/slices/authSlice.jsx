import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/authAction"; 

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        usuario: null 
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.usuario = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.usuario = action.payload.usuario; 
        });
    }
});

export const { logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token; 

export default authSlice.reducer;