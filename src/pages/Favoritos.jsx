import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import CardAlojamiento from '../components/CardAlojamiento';
import { Link } from 'react-router-dom';

const Favoritos = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="text-red-500">♥</span> Mis Guapinos
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-2xl mb-4">¡Aún no tienes favoritos!</p>
          <p className="text-gray-500 mb-6">Explora Asturias y guarda lo que más te preste.</p>
          <Link to="/explorar" className="bg-astur-blue text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">
            Ir a Explorar
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((item) => (
            <CardAlojamiento key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;