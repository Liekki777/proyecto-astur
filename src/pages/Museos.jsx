import React, { useState, useEffect } from 'react';
import CardAlojamiento from '../components/CardAlojamiento';
import defaultImage from '../assets/asturias-default.jpg'; // Tu imagen local

const Museos = () => {
  const [museos, setMuseos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // IMÁGENES DE ESTADO
  const IMG_BUSCANDO = "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"; 
  const IMG_GENERICA = defaultImage;

  // 🌍 API PRINCIPADO: Añadimos returnGeometry=true y outSR=4326 (para coordenadas GPS reales)
  const API_ASTURIAS = "https://sig.asturias.es/servicios/rest/services/Visor/Cultura/MapServer/9/query?where=1%3D1&outFields=*&returnGeometry=true&outSR=4326&f=json";

  // 🧠 FUNCIÓN WIKIPEDIA MEJORADA: Busca FOTO + TEXTO
  const buscarDatosWikipedia = async (nombre) => {
    try {
      const nombreLimpio = nombre.split('(')[0].trim(); 
      const busqueda = encodeURIComponent(`${nombreLimpio} Asturias`);
      
      // Pedimos 'pageimages' (foto) y 'extracts' (resumen de texto)
      const url = `https://es.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=0&gsrlimit=1&gsrsearch=${busqueda}&prop=pageimages|extracts&pithumbsize=500&exintro&explaintext&exchars=400`;

      const resp = await fetch(url);
      const data = await resp.json();
      
      const pages = data.query?.pages;
      if (pages) {
        const firstPageId = Object.keys(pages)[0];
        const page = pages[firstPageId];
        
        return {
          imagen: page.thumbnail?.source || null,
          texto: page.extract || null // El resumen de Wikipedia
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ASTURIAS);
        if (!response.ok) throw new Error('Error en API Asturias');
        const data = await response.json();

        // 1. CARGA INICIAL (Con coordenadas pero sin Wiki aún)
        const listaInicial = data.features.map((item, index) => {
          const attr = item.attributes;
          const geom = item.geometry; // Aquí vienen las coordenadas (x, y)

          return {
            id: `museo-${attr.objectid || index}`,
            nombre: attr.nombre || "Museo desconocido",
            // Descripción temporal
            descripcion: `Situado en ${attr.ayto}. Cargando información detallada...`,
            precio: "Entrada libre",
            ubicacion: attr.ayto || "Asturias",
            categoria: attr.tipo || "Cultura",
            rating: 4.5,
            imagen: IMG_BUSCANDO,
            
            // 📍 GUARDAMOS LAS COORDENADAS (Leaflet usa [Latitud, Longitud], la API da [x, y])
            // ArcGIS devuelve x=Longitud, y=Latitud. Hacemos el cambio:
            coordenadas: geom ? [geom.y, geom.x] : null,
            
            destacado: false
          };
        });

        setMuseos(listaInicial);
        setCargando(false);

        // 2. HIDRATACIÓN (Buscar fotos y textos)
        const listaFinal = await Promise.all(
          listaInicial.map(async (museo) => {
            const datosWiki = await buscarDatosWikipedia(museo.nombre);
            
            return {
              ...museo,
              // Si hay foto Wiki la usamos, si no la Genérica
              imagen: datosWiki?.imagen ? datosWiki.imagen : IMG_GENERICA,
              // Si hay texto Wiki lo usamos, si no dejamos el básico del concejo
              descripcion: datosWiki?.texto ? datosWiki.texto : `Espacio cultural situado en el concejo de ${museo.ubicacion}. Un lugar ideal para conocer el patrimonio de la zona.`
            };
          })
        );

        setMuseos(listaFinal);

      } catch (err) {
        console.error(err);
        setError("Error cargando museos.");
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-astur-blue mb-2">Museos de Asturias</h1>
        <p className="text-gray-600">
          Red oficial de museos. Información enriquecida con Wikipedia.
        </p>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {cargando ? (
        <div className="text-center py-20 animate-pulse">
          <div className="text-4xl mb-2">🔍</div>
          <p className="text-gray-500">Localizando coordenadas y buscando historias...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {museos.slice(0, 15).map((item) => (
            <CardAlojamiento key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Museos;