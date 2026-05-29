import { createSlice } from "@reduxjs/toolkit";
import { EliminadoUsuario, GuardarUsuario, listarUsuarios } from "../actions/usuariosAction";

const initialState = {
    usuarios: [],
    usuario: {},
    loading: false,
    error: null
};
const usuarioSlice = createSlice({
    name: "Usuarios",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listarUsuarios.pending, state => {
                state.loading = true;
            })
            .addCase(listarUsuarios.fulfilled, (state, action) => {
                state.loading = false;
                state.usuarios = action.payload;
            })
            .addCase(listarUsuarios.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error;
            })
            .addCase(GuardarUsuario.pending, state => {
                state.loading = true;
            })
            .addCase(GuardarUsuario.fulfilled, (state, action) => {
                state.loading = false;
                state.usuario = action.payload;
            })
            .addCase(GuardarUsuario.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error;
            })
            .addCase(EliminadoUsuario.pending, state => {
                state.loading = true;
            })
            .addCase(EliminadoUsuario.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(EliminadoUsuario.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error;
            })
    }
})
export const usuariosReducer = usuarioSlice.reducer;