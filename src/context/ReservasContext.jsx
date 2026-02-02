import React, { createContext, useState, useContext, useEffect } from 'react';

const ReservasContext = createContext();

export const ReservasProvider = ({ children }) => {
  const [reservas, setReservas] = useState(() => {
    const saved = localStorage.getItem('asturReservas');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('asturReservas', JSON.stringify(reservas));
  }, [reservas]);

  // Añadir UNA reserva (individual)
  const addReserva = (reserva) => {
    setReservas((prev) => [...prev, { ...reserva, idReserva: Date.now() }]);
  };

  // ✅ NUEVA FUNCIÓN: Añadir VARIAS reservas de golpe (para el carrito)
  const addVariasReservas = (listaReservas) => {
    // Procesamos la lista para darles un ID único a cada una
    const nuevasConId = listaReservas.map((item, index) => ({
      ...item,
      // Usamos Date.now() + index para asegurar que ningún ID se repita jamás
      idReserva: Date.now() + index 
    }));

    // Usamos la versión funcional (prev) para no perder nada
    setReservas((prev) => [...prev, ...nuevasConId]);
  };

  const removeReserva = (idReserva) => {
    setReservas((prev) => prev.filter(r => r.idReserva !== idReserva));
  };

  return (
    // Exportamos la nueva función addVariasReservas
    <ReservasContext.Provider value={{ reservas, addReserva, addVariasReservas, removeReserva }}>
      {children}
    </ReservasContext.Provider>
  );
};

export const useReservas = () => useContext(ReservasContext);