import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth(); // Sacamos la función login del contexto
  const navigate = useNavigate(); // Para redirigir al usuario
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación simple
    if (!formData.email || !formData.password) {
      alert("¡Oye! Rellena los datos para entrar a Asturias.");
      return;
    }
    
    // Llamamos al contexto
    login(formData);
    
    // Redirigimos al usuario (por ejemplo, a Explorar)
    navigate('/explorar');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-4xl">🍏</span>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">Bienvenido Viajero</h2>
          <p className="text-gray-500">Accede a tu cuenta Astur</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="pelayo@covadonga.com"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-astur-blue"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Contraseña</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-astur-blue"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-astur-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="text-astur-blue font-bold hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;