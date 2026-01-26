import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Leemos del disco o iniciamos vacío
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('asturFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar en disco cada vez que cambien
  useEffect(() => {
    localStorage.setItem('asturFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Añadir (evitando duplicados)
  const addFavorite = (item) => {
    if (!favorites.some(fav => fav.id === item.id)) {
      setFavorites([...favorites, item]);
    }
  };

  // Eliminar
  const removeFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  // Comprobar si ya es favorito (para pintar el corazón rojo)
  const isFavorite = (id) => {
    return favorites.some(item => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);