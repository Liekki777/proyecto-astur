import React from 'react';
import { Link } from 'react-router-dom';
import { alojamientos } from '../data/alojamientos';
import CardAlojamiento from '../components/CardAlojamiento';
import { Map, Wind, Sun, Coffee, Landmark } from 'lucide-react'; // Asegúrate de tener Landmark importado

const Home = () => {
  const destacados = alojamientos.filter(item => item.destacado).slice(0, 3); // Limitamos a 3 para la home

  return (
    <div>
      {/* 1. HERO SECTION (Se mantiene igual porque el texto es blanco sobre foto oscura) */}
      <div 
        className="relative h-[600px] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
            Siente la llamada de <span className="text-astur-yellow">Asturias</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Desde los Picos de Europa hasta el mar Cantábrico. Encuentra tu refugio en el paraíso natural.
          </p>
          <Link 
            to="/explorar" 
            className="bg-astur-blue hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-full transition transform hover:scale-105 shadow-xl text-lg"
          >
            Explorar Alojamientos
          </Link>
        </div>
      </div>

      {/* 2. CATEGORÍAS RÁPIDAS (Adaptado a Dark Mode) */}
      <div className="py-12 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800 transition-colors">
        <div className="container mx-auto px-4">
            <p className="text-center text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-8">¿Qué buscas hoy?</p>
            <div className="flex flex-wrap justify-center gap-8">
                <Link to="/explorar"><CategoriaItem icon={<Map size={32} />} label="Rutas" /></Link>
                <Link to="/explorar"><CategoriaItem icon={<Wind size={32} />} label="Costa" /></Link>
                <Link to="/museos"><CategoriaItem icon={<Landmark size={32} />} label="Museos" /></Link>
                <Link to="/explorar"><CategoriaItem icon={<Sun size={32} />} label="Rural" /></Link>
                <Link to="/explorar"><CategoriaItem icon={<Coffee size={32} />} label="Gastronomía" /></Link>
            </div>
        </div>
      </div>

      {/* 3. SECCIÓN DE DESTACADOS */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
            <div>
                {/* Títulos adaptados */}
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white transition-colors">Los Favoritos de la Tierrina</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Alojamientos mejor valorados por nuestros viajeros.</p>
            </div>
            <Link to="/explorar" className="text-astur-blue font-bold hover:underline hidden sm:block">
                Ver todos →
            </Link>
        </div>

        {/* Grid de Destacados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destacados.map((item) => (
                <CardAlojamiento key={item.id} item={item} />
            ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
            <Link to="/explorar" className="text-astur-blue font-bold">Ver todos</Link>
        </div>
      </div>

      {/* 4. BANNER FINAL */}
      <div className="bg-astur-blue py-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">¿Tienes una casa rural con encanto?</h2>
        <p className="mb-8 max-w-2xl mx-auto opacity-90">Únete a Proyecto Astur y empieza a recibir huéspedes de todo el mundo.</p>
        <button className="bg-white text-astur-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition shadow-lg">
            Conviértete en Anfitrión
        </button>
      </div>
    </div>
  );
};

// Componente CategoriaItem ADAPTADO
const CategoriaItem = ({ icon, label }) => (
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
        {/* El círculo blanco ahora se oscurece en dark mode */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-md group-hover:bg-astur-blue group-hover:text-white transition duration-300 text-gray-600 dark:text-gray-200 border border-transparent dark:border-gray-700">
            {icon}
        </div>
        <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-astur-blue transition">{label}</span>
    </div>
);

export default Home;