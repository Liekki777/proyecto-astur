import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCarrito } from '../context/CarritoContext'; // ✅ 1. Importar el contexto
import { User, Heart, Sun, Moon, ShoppingBag } from 'lucide-react'; // ✅ 2. Importar icono ShoppingBag

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  // ✅ 3. ESTA ES LA LÍNEA QUE FALTABA:
  const { carrito } = useCarrito(); 

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl animate-bounce">🍏</span>
            <span className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-astur-blue transition">
                Proyecto<span className="text-astur-blue">Astur</span>
            </span>
        </Link>

        {/* MENÚ CENTRAL */}
        <div className="hidden md:flex gap-6">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-astur-blue font-medium transition">Inicio</Link>
            <Link to="/explorar" className="text-gray-600 dark:text-gray-300 hover:text-astur-blue font-medium transition">Explorar</Link>
            <Link to="/museos" className="text-gray-600 dark:text-gray-300 hover:text-astur-blue font-medium transition">Museos</Link>
            <Link to="/contacto" className="text-gray-600 dark:text-gray-300 hover:text-astur-blue font-medium transition">Contacto</Link>
        </div>

        {/* ZONA DERECHA */}
        <div className="flex items-center gap-4">
            
            {/* 🌗 BOTÓN DÍA/NOCHE */}
            <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-yellow-300 transition"
                title="Cambiar tema"
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* 🛒 BOTÓN CARRITO (NUEVO) */}
            <Link to="/carrito" className="text-gray-600 dark:text-gray-300 hover:text-astur-blue transition relative mr-2">
                <ShoppingBag size={24} />
                {/* Solo mostramos el punto rojo si hay cosas en el carrito */}
                {carrito && carrito.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-astur-blue text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900 animate-bounce">
                        {carrito.length}
                    </span>
                )}
            </Link>

            {/* Icono Favoritos */}
            <Link to="/favoritos" className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition relative">
                <Heart size={24} />
            </Link>

            {/* Usuario */}
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/perfil" className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 py-1 px-2 rounded-lg transition group">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200 hidden sm:block group-hover:text-astur-blue">
                    {user.nombre}
                  </span>
                  <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-astur-blue" />
                </Link>
                <button onClick={logout} className="text-xs text-red-500 font-bold border border-red-200 dark:border-red-900 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                  Salir
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 bg-astur-blue text-white px-4 py-2 rounded-full hover:bg-blue-700 transition text-sm font-bold">
                <User size={16} />
                <span>Entrar</span>
              </Link>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;