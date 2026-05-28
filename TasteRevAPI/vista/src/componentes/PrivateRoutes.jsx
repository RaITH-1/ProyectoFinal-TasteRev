import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectToken } from '../utilidades/redux/slices/authSlice';

export const PrivateRoute = () => {
  const isAuthenticated = selectToken ? true : false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};