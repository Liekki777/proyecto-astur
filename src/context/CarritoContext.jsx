import React, { createContext, useState, useContext, useEffect } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem('asturCarrito');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('asturCarrito', JSON.stringify(carrito));
  }, [carrito]);

  // Añadir al carrito
  const addToCarrito = (item) => {
    // Generamos ID temporal para el carrito
    const itemConId = { ...item, idTemp: Date.now() };
    setCarrito([...carrito, itemConId]);
  };

  // Eliminar del carrito
  const removeFromCarrito = (idTemp) => {
    setCarrito(carrito.filter(item => item.idTemp !== idTemp));
  };

  // Vaciar carrito (al comprar)
  const clearCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{ carrito, addToCarrito, removeFromCarrito, clearCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);