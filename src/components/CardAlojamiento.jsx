import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart } from 'lucide-react'; 
import { useFavorites } from '../context/FavoritesContext';

const CardAlojamiento = ({ item }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavoriteClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); // Evita que se active el enlace de la imagen o del "ver más"
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  const FALLBACK_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Lagos_de_Covadonga_%28Asturias%29.jpg/640px-Lagos_de_Covadonga_%28Asturias%29.jpg";

  return (
    <div className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 relative group">
      
      {/* --- ZONA IMAGEN --- */}
      <div className="h-48 overflow-hidden relative">
        
        {/* 🔗 AQUI EL CAMBIO: Envolvemos la imagen en un Link que ocupa todo el espacio */}
        <Link to={`/alojamiento/${item.id}`} state={{ item }} className="block w-full h-full">
          <img 
            src={item.imagen} 
            alt={item.nombre} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = FALLBACK_IMAGE;
            }}
          />
        </Link>

        {/* Etiqueta Categoría (Encima del Link gracias a absolute y z-index implícito) */}
        <span className="absolute top-2 left-2 bg-astur-blue/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md font-bold uppercase shadow-sm pointer-events-none">
            {item.categoria}
        </span>

        {/* Botón Favorito (Encima del Link) */}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white dark:bg-gray-900/60 dark:hover:bg-gray-900 transition shadow-sm backdrop-blur-sm z-10"
          title={isFavorite(item.id) ? "Quitar de favoritos" : "Guardar en favoritos"}
        >
          <Heart 
            size={20} 
            className={`transition-colors duration-300 ${
              isFavorite(item.id) 
                ? "fill-red-500 text-red-500" 
                : "text-gray-600 dark:text-gray-300 hover:text-red-500"
            }`}
          />
        </button>
      </div>

      {/* --- ZONA INFO --- */}
      <div className="p-4 flex flex-col h-[calc(100%-12rem)] justify-between">
        <div>
            {/* Título y Rating */}
            <div className="flex justify-between items-start mb-2">
                <Link to={`/alojamiento/${item.id}`} state={{ item }} className="hover:text-astur-blue transition-colors min-w-0">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white truncate pr-2" title={item.nombre}>
                        {item.nombre}
                    </h3>
                </Link>
                <div className="flex items-center gap-1 text-astur-yellow font-bold text-sm shrink-0">
                    <span>★</span>
                    <span>{item.rating}</span>
                </div>
            </div>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2 h-10 leading-snug">
                {item.descripcion}
            </p>

            <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-xs mb-4">
                <MapPin size={14} />
                <span className="truncate">{item.ubicacion}</span>
            </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t dark:border-gray-700 pt-4 mt-auto">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {typeof item.precio === 'number' ? `${item.precio}€` : item.precio}
              {typeof item.precio === 'number' && <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/noche</span>}
            </span>
            
            <Link 
              to={`/alojamiento/${item.id}`} 
              state={{ item }}
              className="bg-astur-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-bold text-sm shadow-md"
            >
              Ver más
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CardAlojamiento;