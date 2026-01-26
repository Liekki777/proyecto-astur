import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useReservas } from '../context/ReservasContext'; // 1. IMPORTAMOS EL CONTEXTO
import { Link } from 'react-router-dom';

const Perfil = () => {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const { reservas } = useReservas(); // 2. SACAMOS LAS RESERVAS

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Cabecera del Perfil */}
        <div className="bg-astur-blue h-32 relative">
            <div className="absolute -bottom-16 left-8">
                <img 
                    src={user.avatar} 
                    alt={user.nombre} 
                    className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white object-cover"
                />
            </div>
        </div>

        {/* Datos del Usuario */}
        <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 capitalize">{user.nombre}</h1>
                    <p className="text-gray-500">{user.email}</p>
                    <span className="mt-2 inline-block bg-astur-yellow text-xs px-2 py-1 rounded-full font-bold uppercase">
                        {user.rol}
                    </span>
                </div>
                <button 
                    onClick={logout} 
                    className="text-red-500 font-bold border border-red-200 px-4 py-2 rounded hover:bg-red-50 transition"
                >
                    Cerrar Sesión
                </button>
            </div>

            {/* Estadísticas Rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <StatCard number={favorites.length} label="Favoritos" />
                
                {/* 3. AQUI ESTÁ EL CAMBIO: Usamos reservas.length en vez de "0" */}
                <StatCard number={reservas.length} label="Reservas" />
                
                <StatCard number="0" label="Reseñas" /> {/* Esto sigue pendiente */}
                <StatCard number="12" label="Puntos Astur" />
            </div>

            {/* Accesos Directos */}
            <div className="mt-10 border-t pt-8">
                <h2 className="text-xl font-bold mb-4">Tu Panel de Control</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Link to="/favoritos" className="block p-4 border rounded-lg hover:border-astur-blue hover:bg-blue-50 transition group">
                        <span className="text-lg font-bold group-hover:text-astur-blue">♥ Mis Guapinos</span>
                        <p className="text-gray-500 text-sm">Gestiona tu lista de deseos ({favorites.length})</p>
                    </Link>
                    <Link to="/reservas" className="block p-4 border rounded-lg hover:border-astur-blue hover:bg-blue-50 transition group">
                        <span className="text-lg font-bold group-hover:text-astur-blue">📅 Mis Reservas</span>
                        <p className="text-gray-500 text-sm">Consulta tus próximos viajes ({reservas.length})</p>
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para las cajitas de números
const StatCard = ({ number, label }) => (
    <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-100">
        <span className="block text-2xl font-bold text-astur-blue">{number}</span>
        <span className="text-xs text-gray-500 uppercase font-bold">{label}</span>
    </div>
);

export default Perfil;