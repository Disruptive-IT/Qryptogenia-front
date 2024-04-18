import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return;
  }

  // Determinar usuario basado en is_staff
  const userRole = user.is_staff ? 'admin' : 'user';

  // Validacion de rol
  if (!roles.some(role => role === userRole)) {
    return <Navigate to="/login" replace />; 
  }

  return children || <Outlet />;
};
