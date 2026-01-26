import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Si no hay usuario, lo mandamos al Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, le dejamos pasar (renderizamos el hijo)
  return children;
};

export default ProtectedRoute;