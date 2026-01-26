import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Crear el Contexto
const AuthContext = createContext();

// 2. Crear el Proveedor
export const AuthProvider = ({ children }) => {
  // Inicializamos el estado leyendo de localStorage (si existe)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('asturUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Función de Login (Simulada)
  const login = (userData) => {
    // Simulamos que recibimos datos del usuario
    const usuarioSimulado = {
      nombre: userData.email.split('@')[0], // Usamos la parte antes del @ como nombre
      email: userData.email,
      avatar: "https://ui-avatars.com/api/?name=" + userData.email + "&background=007FC7&color=fff",
      rol: "viajero"
    };
    
    setUser(usuarioSimulado);
    localStorage.setItem('asturUser', JSON.stringify(usuarioSimulado)); // Guardar en disco
  };

  // Función de Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('asturUser'); // Borrar del disco
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook personalizado para usar el contexto (Opcional pero recomendado)
export const useAuth = () => useContext(AuthContext);