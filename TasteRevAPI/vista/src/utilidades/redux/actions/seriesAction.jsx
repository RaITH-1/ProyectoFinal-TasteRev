import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const listarSeries = createAsyncThunk("series/listar",
    async (_, {rejectWithValue}) => {
        const response = await api.get("Series");
        return response.data;
    }
);

export const guardarSerie = createAsyncThunk("series/guardar",
    async (data, {rejectWithValue}) => {
        const response = await api.post("Series", data);
        return response.data; 
    }
);

export const modificarSerie = createAsyncThunk("series/modificar",
    async (data, {rejectWithValue}) => {
        const response = await api.put("Series/" + data.id, data); 
        return response.data;
    }
);

export const eliminarSerie = createAsyncThunk("series/eliminar",
    async (id, {rejectWithValue}) => {
        await api.delete("Series/" + id);
        return id;
    }
);