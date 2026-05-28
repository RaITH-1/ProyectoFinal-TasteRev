import { createSlice } from '@reduxjs/toolkit';
import { login } from '../actions/authAction';

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { 
    logout: (state) => {          
      state.user  = null;
      state.token = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
         state.loading = true; state.error = null;
      })
      .addCase(login.fulfilled,  (state, { payload }) => {
        state.loading = false;
        state.user    = payload.user;
        state.token   = payload.token;
      })
      .addCase(login.rejected,   (state, { payload }) => {
        state.loading = false;
        state.error   = payload;
      });
  },
});

export const selectToken = (state) => state.auth.token;

export const { logout } = authSlice.actions;
export default authSlice.reducer;