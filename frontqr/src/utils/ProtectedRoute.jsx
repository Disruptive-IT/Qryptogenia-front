import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return;
 }

  // Validacion de rol
  if (!roles.some(role => role === user.rol)) {
    return <Navigate to="/login" replace />; 
  }

  return children || <Outlet />;
};
