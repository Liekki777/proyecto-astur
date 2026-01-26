import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { alojamientos } from '../data/alojamientos';
import MapaDetalle from '../components/MapaDetalle';
import BookingForm from '../components/BookingForm';
import { useFavorites } from '../context/FavoritesContext';
import defaultImage from '../assets/asturias-default.jpg';
import { Heart } from 'lucide-react'; // <--- IMPORTANTE: Importar el icono

const Detalle = () => {
  const { id } = useParams();
  const location = useLocation();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  const [item, setItem] = useState(null);
  const [cargando, setCargando] = useState(true);

  const API_MUSEOS_QUERY = "https://sig.asturias.es/servicios/rest/services/Visor/Cultura/MapServer/9/query";

  useEffect(() => {
    // 1. ESTRATEGIA MOCHILA
    if (location.state?.item) {
      setItem(location.state.item);
      setCargando(false);
      return;
    }

    // 2. ESTRATEGIA RESCATE (Recarga de página)
    const cargarDatos = async () => {
      setCargando(true);
      
      if (id.toString().startsWith('museo-')) {
        try {
          const objectId = id.split('-')[1];
          const url = `${API_MUSEOS_QUERY}?objectIds=${objectId}&outFields=*&returnGeometry=true&outSR=4326&f=json`;
          const resp = await fetch(url);
          const data = await resp.json();

          if (data.features && data.features.length > 0) {
            const attr = data.features[0].attributes;
            const geom = data.features[0].geometry;

            const museoRecuperado = {
              id: id,
              nombre: attr.nombre || "Museo Asturiano",
              descripcion: `Espacio cultural situado en ${attr.ayto}.`,
              precio: "Consultar entrada",
              ubicacion: attr.ayto,
              categoria: attr.tipo || "Cultura",
              imagen: defaultImage,
              rating: 4.5,
              coordenadas: geom ? [geom.y, geom.x] : null
            };
            setItem(museoRecuperado);
          } else {
            setItem(null);
          }
        } catch (error) {
          console.error("Error cargando museo:", error);
          setItem(null);
        }
      } else {
        setTimeout(() => {
          const encontrado = alojamientos.find(a => a.id === parseInt(id));
          setItem(encontrado);
        }, 500);
      }
      
      setCargando(false);
    };

    cargarDatos();
  }, [id, location.state]);

  if (cargando) return <div className="text-center py-20 text-2xl animate-pulse">Buscando en la tierrina... 🌲</div>;
  if (!item) return <div className="text-center py-20">¡Vaya! No encontramos ese lugar. 😔</div>;

  // Lógica Favoritos
  const toggleFavorite = () => {
    isFavorite(item.id) ? removeFavorite(item.id) : addFavorite(item);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navegación */}
      <Link 
        to={id.toString().startsWith('museo-') ? "/museos" : "/explorar"} 
        className="text-astur-blue hover:underline mb-4 inline-block font-bold"
      >
        ← Volver al listado
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Columna Izquierda: Imagen */}
        <div>
          <img 
            src={item.imagen} 
            alt={item.nombre} 
            className="w-full h-96 object-cover rounded-xl shadow-lg border border-gray-100"
            onError={(e) => { e.target.src = defaultImage; }} 
          />
        </div>

        {/* Columna Derecha: Info */}
        <div className="space-y-4">
          
          {/* HEADER: TÍTULO + CORAZÓN */}
          <div className="flex justify-between items-start">
             <div>
                <h1 className="text-3xl font-bold text-gray-800 leading-tight">{item.nombre}</h1>
                <span className="bg-astur-yellow text-xs px-3 py-1 rounded-full font-bold uppercase mt-2 inline-block">
                    {item.categoria}
                </span>
             </div>

             {/* ❤️ BOTÓN FAVORITO GRANDE */}
             <button 
                onClick={toggleFavorite}
                className="p-3 rounded-full hover:bg-gray-100 transition shadow-sm border border-gray-100 ml-4"
                title={isFavorite(item.id) ? "Quitar de favoritos" : "Guardar en favoritos"}
             >
                <Heart 
                    size={32} 
                    className={`transition-colors duration-300 ${
                        isFavorite(item.id) 
                            ? "fill-red-500 text-red-500" 
                            : "text-gray-300 hover:text-red-500"
                    }`}
                />
             </button>
          </div>
          
          <p className="text-xl font-bold text-astur-blue mt-2">📍 {item.ubicacion}</p>
          <p className="text-gray-600 leading-relaxed text-lg">{item.descripcion}</p>
          
          <div className="flex items-center gap-2 text-yellow-500 text-lg">
            {'★'.repeat(Math.round(item.rating))} 
            <span className="text-gray-400 text-sm">({item.rating}/5)</span>
          </div>

          <div className="border-t pt-4 mt-4">
            <span className="text-3xl font-bold">{item.precio}</span>
            {typeof item.precio === 'number' && <span className="text-gray-500"> / noche</span>}
          </div>

          {/* ZONA DE ACCIÓN */}
          <div className="mt-6">
            {id.toString().startsWith('museo-') ? (
               // CASO MUSEO: Botón simple
               <button className="w-full bg-astur-blue text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition shadow-md text-lg">
                 Planificar Visita
               </button>
            ) : (
               // CASO ALOJAMIENTO: Formulario Completo
               <BookingForm alojamiento={item} />
            )}
          </div>
          
          {/* Mapa */}
          <div className="h-64 rounded-lg shadow-md border overflow-hidden mt-8 z-0 relative">
             <MapaDetalle 
                ubicacionTexto={item.ubicacion} 
                coordenadasExplicitas={item.coordenadas}
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle;