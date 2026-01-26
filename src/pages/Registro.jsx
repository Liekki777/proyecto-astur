import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Registro = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.nombre) {
      alert("Por favor, rellena todos los datos.");
      return;
    }
    // Simulamos registro logueando directamente
    login(formData);
    navigate('/perfil'); // Al registrarse, vamos al perfil
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Únete a la Aventura</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Nombre</label>
            <input 
              type="text" 
              placeholder="Tu nombre"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-astur-blue"
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input 
              type="email" 
              placeholder="tucorreo@ejemplo.com"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-astur-blue"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-astur-blue"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button className="w-full bg-astur-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
            Crear Cuenta
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          ¿Ya tienes cuenta? <Link to="/login" className="text-astur-blue font-bold">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;