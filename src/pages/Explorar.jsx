import React, { useState, useEffect } from 'react';
import { alojamientos } from '../data/alojamientos';
import CardAlojamiento from '../components/CardAlojamiento';
import { Search, SlidersHorizontal, ArrowDown } from 'lucide-react';

const Explorar = () => {
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('relevancia');
  const [pagina, setPagina] = useState(1);
  const [cargandoMas, setCargandoMas] = useState(false);
  
  const ITEMS_POR_PAGINA = 6;

  // LÓGICA (Igual que antes)
  const alojamientosFiltrados = alojamientos.filter(item => 
    item.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    item.ubicacion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const alojamientosOrdenados = [...alojamientosFiltrados].sort((a, b) => {
    switch (orden) {
      case 'precio-asc': return a.precio - b.precio;
      case 'precio-desc': return b.precio - a.precio;
      case 'rating': return b.rating - a.rating;
      case 'nombre': return a.nombre.localeCompare(b.nombre);
      default: return 0;
    }
  });

  const itemsVisibles = alojamientosOrdenados.slice(0, pagina * ITEMS_POR_PAGINA);

  useEffect(() => {
    const handleScroll = () => {
      const tocandoFondo = window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight;
      const hayMas = itemsVisibles.length < alojamientosOrdenados.length;

      if (tocandoFondo && hayMas && !cargandoMas) {
        setCargandoMas(true);
        setTimeout(() => {
            setPagina((prev) => prev + 1);
            setCargandoMas(false);
        }, 1000); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [itemsVisibles.length, alojamientosOrdenados.length, cargandoMas]);

  const handleReset = () => {
    setPagina(1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* CABECERA */}
      <div className="mb-8">
        {/* Título adaptable */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 transition-colors">
            Explora Asturias
        </h1>
        
        {/* BARRA DE HERRAMIENTAS (Fondo oscuro en dark mode) */}
        <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 sticky top-4 z-10 transition-colors">
          
          {/* Input Buscador */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="¿Dónde quieres ir? (Ej: Llanes, Cangas...)"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-astur-blue 
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                handleReset();
              }}
            />
          </div>

          {/* Select Ordenar */}
          <div className="relative min-w-[200px]">
            <div className="absolute left-3 top-3 text-gray-400 pointer-events-none">
                <SlidersHorizontal size={18} />
            </div>
            <select 
                className="w-full pl-10 pr-8 py-2 border rounded-lg appearance-none cursor-pointer font-medium 
                           bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-astur-blue
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                value={orden}
                onChange={(e) => {
                    setOrden(e.target.value);
                    handleReset();
                }}
            >
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Precio: Más barato primero</option>
                <option value="precio-desc">Precio: Más caro primero</option>
                <option value="rating">Mejor valorados (★)</option>
                <option value="nombre">Nombre (A-Z)</option>
            </select>
            <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                <ArrowDown size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* GRID DE RESULTADOS */}
      {itemsVisibles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {itemsVisibles.map((item) => (
            <CardAlojamiento key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 dark:text-gray-400">No encontramos alojamientos con esa búsqueda.</p>
          <button onClick={() => setBusqueda('')} className="mt-4 text-astur-blue font-bold hover:underline">
            Ver todos
          </button>
        </div>
      )}

      {/* SPINNER */}
      {cargandoMas && (
        <div className="py-12 text-center flex flex-col items-center justify-center animate-fadeIn">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 dark:border-gray-700 border-t-astur-blue mb-3"></div>
            <p className="text-astur-blue font-bold animate-pulse">Buscando más alojamientos...</p>
        </div>
      )}

      {/* FIN DE LISTA */}
      {!cargandoMas && itemsVisibles.length === alojamientosOrdenados.length && itemsVisibles.length > 0 && (
        <div className="py-10 text-center text-gray-400 dark:text-gray-500 border-t dark:border-gray-800 mt-8">
            <p>🍏 Has llegado al final. ¡No hay más casas por ahora!</p>
        </div>
      )}
    </div>
  );
};

export default Explorar;