import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const listarResenas = createAsyncThunk("resenas/listar",
    async (_, {rejectWithValue}) => {
        const response = await api.get("Resenas");
        return response.data;
    }
);

export const guardarResena = createAsyncThunk("resenas/guardar",
    async (data, {rejectWithValue}) => {
        const response = await api.post("Resenas", data);
        return response.data; 
    }
);

export const modificarResena = createAsyncThunk("resenas/modificar",
    async (data, {rejectWithValue}) => {
        const response = await api.put("Resenas/" + data.id, data); 
        return response.data;
    }
);

export const eliminarResena = createAsyncThunk("resenas/eliminar",
    async (id, {rejectWithValue}) => {
        await api.delete("Resenas/" + id);
        return id;
    }
);