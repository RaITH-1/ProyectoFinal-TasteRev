import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const listarUsuarios = createAsyncThunk("usuarios/listar",
    async (data, {rejectWithValue}) => {
        const response = await api.get("Usuarios");
        return response.data;
    }
);

export const GuardarUsuario = createAsyncThunk("usuarios/guardar",
    async (data, {rejectWithValue}) => {
        const response = await api.post("Usuarios", data);
        return response.data; 
    }
);

export const ModificarUsuario = createAsyncThunk("usuarios/modificar",
    async (data, {rejectWithValue}) => {
        const response = await api.put("Usuarios/" + data.id, data); 
        return response.data;
    }
);

export const EliminadoUsuario = createAsyncThunk("usuarios/eliminar",
    async (data, {rejectWithValue}) => {
        const response = await api.delete("Usuarios/" + data);
        return data;
    }
)