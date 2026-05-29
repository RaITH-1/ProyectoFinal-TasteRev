import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import authReducer from './slices/authSlice';
import { usuariosReducer } from './slices/usuariosSlice';
import seriesReducer from "./slices/seriesSlice";
import resenasReducer from "./slices/resenasSlice";

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token'], // Solo persiste estos campos
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    usuarios: usuariosReducer,
    series: seriesReducer, 
    resenas: resenasReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);