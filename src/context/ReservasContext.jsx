import React, { createContext, useState, useContext, useEffect } from 'react';

const ReservasContext = createContext();

export const ReservasProvider = ({ children }) => {
  // Inicializamos leyendo del localStorage (persistencia)
  const [reservas, setReservas] = useState(() => {
    const saved = localStorage.getItem('asturReservas');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('asturReservas', JSON.stringify(reservas));
  }, [reservas]);

  // Función para AÑADIR reserva
  const addReserva = (reserva) => {
    // Generamos un ID único para la reserva (basado en fecha)
    const nuevaReserva = { ...reserva, idReserva: Date.now() };
    setReservas([...reservas, nuevaReserva]);
  };

  // Función para CANCELAR reserva
  const removeReserva = (idReserva) => {
    setReservas(reservas.filter(r => r.idReserva !== idReserva));
  };

  return (
    <ReservasContext.Provider value={{ reservas, addReserva, removeReserva }}>
      {children}
    </ReservasContext.Provider>
  );
};

export const useReservas = () => useContext(ReservasContext);