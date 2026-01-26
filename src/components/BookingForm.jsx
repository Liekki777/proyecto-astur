import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useReservas } from '../context/ReservasContext';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ alojamiento }) => {
  const { user } = useAuth();
  const { addReserva } = useReservas();
  const navigate = useNavigate();

  // 1. FUNCIONES PARA CALCULAR FECHAS POR DEFECTO
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const getFutureDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  // Estados del formulario (Inicializados con HOY y HOY+2)
  const [fechaEntrada, setFechaEntrada] = useState(getTodayDate());
  const [fechaSalida, setFechaSalida] = useState(getFutureDate(2));
  
  const [habitacionesLibres, setHabitacionesLibres] = useState(null);
  const [mensajeDisponibilidad, setMensajeDisponibilidad] = useState('');
  const [precioTotal, setPrecioTotal] = useState(0);

  const capacidadTotal = (parseInt(alojamiento.id) % 4) + 2; 

  useEffect(() => {
    if (fechaEntrada && fechaSalida) {
      const entrada = new Date(fechaEntrada);
      const salida = new Date(fechaSalida);

      if (entrada >= salida) {
        setMensajeDisponibilidad("La fecha de salida debe ser posterior.");
        setHabitacionesLibres(0);
        setPrecioTotal(0);
        return;
      }

      const mes = entrada.getMonth(); 
      let ocupadas = 0;

      if (mes === 0 || mes === 1) { // Enero/Febrero
        ocupadas = Math.floor(Math.random() * (capacidadTotal + 1)); 
      } else {
        ocupadas = Math.floor(Math.random() * 2);
      }

      const libres = capacidadTotal - ocupadas;
      setHabitacionesLibres(libres);

      const diffTime = Math.abs(salida - entrada);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      const precioNoche = typeof alojamiento.precio === 'number' ? alojamiento.precio : parseInt(alojamiento.precio);
      setPrecioTotal(diffDays * precioNoche);

      if (libres === 0) {
        setMensajeDisponibilidad("⛔ ¡Completo! No quedan habitaciones.");
      } else if (libres === 1) {
        setMensajeDisponibilidad("🔥 ¡Date prisa! Solo queda 1 habitación.");
      } else {
        setMensajeDisponibilidad(`✅ Disponible. Quedan ${libres} habitaciones.`);
      }

    }
  }, [fechaEntrada, fechaSalida, alojamiento]);

  const handleReserva = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Debes iniciar sesión para reservar.");
      navigate('/login');
      return;
    }

    const nuevaReserva = {
      alojamiento: alojamiento,
      fechaEntrada,
      fechaSalida,
      total: precioTotal,
      fechaCreacion: new Date().toLocaleDateString()
    };

    addReserva(nuevaReserva);
    navigate('/reservas');
  };

  return (
    // CAMBIO DARK: Fondo oscuro y borde oscuro para el contenedor
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mt-6 transition-colors duration-300">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b dark:border-gray-700 pb-2">
        📅 Reservar Disponibilidad
      </h3>
      
      <form onSubmit={handleReserva} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Llegada</label>
            {/* CAMBIO DARK: Inputs oscuros */}
            <input 
              type="date" 
              className="w-full border p-2 rounded focus:ring-2 focus:ring-astur-blue outline-none 
                         bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
              value={fechaEntrada}
              onChange={(e) => setFechaEntrada(e.target.value)}
              min={getTodayDate()} 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Salida</label>
            {/* CAMBIO DARK: Inputs oscuros */}
            <input 
              type="date" 
              className="w-full border p-2 rounded focus:ring-2 focus:ring-astur-blue outline-none 
                         bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
              value={fechaSalida}
              onChange={(e) => setFechaSalida(e.target.value)}
              min={fechaEntrada || getTodayDate()}
              required
            />
          </div>
        </div>

        {/* FEEDBACK DE DISPONIBILIDAD */}
        {fechaEntrada && fechaSalida && (
            <div className={`p-3 rounded-lg text-sm font-bold text-center 
              ${habitacionesLibres > 0 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {mensajeDisponibilidad}
            </div>
        )}

        {/* RESUMEN DE PRECIO */}
        {habitacionesLibres > 0 && precioTotal > 0 && (
            <div className="flex justify-between items-center py-2 border-t dark:border-gray-700 mt-2">
                <span className="text-gray-600 dark:text-gray-400">Total</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{precioTotal}€</span>
            </div>
        )}

        <button 
          type="submit"
          disabled={!fechaEntrada || !fechaSalida || habitacionesLibres === 0}
          className={`w-full py-3 rounded-lg font-bold text-white transition
            ${(!fechaEntrada || !fechaSalida || habitacionesLibres === 0) 
                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' 
                : 'bg-astur-blue hover:bg-blue-700 shadow-md transform hover:scale-[1.02]'}`}
        >
          Confirmar Reserva
        </button>
      </form>
      
      <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4">
        No se te cobrará nada todavía. Cancelación gratuita.
      </p>
    </div>
  );
};

export default BookingForm;