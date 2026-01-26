import React from 'react';
import { Link } from 'react-router-dom';
import { CloudFog } from 'lucide-react'; // Icono de niebla

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
      <div className="text-astur-blue mb-6 animate-pulse">
        <CloudFog size={120} />
      </div>
      
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-600 mb-4">¡Vaya! Te has perdido en la niebla 🌫️</h2>
      <p className="text-gray-500 max-w-md mb-8">
        Parece que el sendero que buscas no existe o ha quedado cubierto por la "orbayu". Mejor volvamos al refugio.
      </p>
      
      <Link 
        to="/" 
        className="bg-astur-blue text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg"
      >
        Volver a la Civilización
      </Link>
    </div>
  );
};

export default NotFound;