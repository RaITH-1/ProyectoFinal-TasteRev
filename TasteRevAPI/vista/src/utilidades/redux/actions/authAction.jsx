import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const login = createAsyncThunk("auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post("auth/iniciar-sesion", data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message ?? "Error al iniciar sesión");
        }
    }
);