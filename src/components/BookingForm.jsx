import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext'; // Importamos el contexto del Carrito
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ alojamiento }) => {
  const { user } = useAuth(); // Para saber si el usuario está logueado
  const { addToCarrito } = useCarrito(); // Función para añadir al carrito
  const navigate = useNavigate(); // Para redirigir de página

  // --- 1. FUNCIONES AUXILIARES PARA FECHAS ---
  // Obtiene la fecha de hoy en formato YYYY-MM-DD (necesario para el input type="date")
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  
  // Obtiene una fecha futura sumando 'days' a hoy
  const getFutureDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  // --- 2. ESTADOS DEL FORMULARIO ---
  // Inicializamos con Hoy y Pasado Mañana por defecto
  const [fechaEntrada, setFechaEntrada] = useState(getTodayDate());
  const [fechaSalida, setFechaSalida] = useState(getFutureDate(2));
  
  // Estados para la lógica de negocio (Disponibilidad y Precio)
  const [habitacionesLibres, setHabitacionesLibres] = useState(null);
  const [mensajeDisponibilidad, setMensajeDisponibilidad] = useState('');
  const [precioTotal, setPrecioTotal] = useState(0);

  // Simulamos una capacidad fija por alojamiento basada en su ID (para que no cambie al recargar)
  // (ID % 4) + 2 da un número entre 2 y 5 habitaciones.
  const capacidadTotal = (parseInt(alojamiento.id) % 4) + 2; 

  // --- 3. EFECTO: CÁLCULO EN TIEMPO REAL ---
  // Se ejecuta cada vez que cambian las fechas o el alojamiento
  useEffect(() => {
    if (fechaEntrada && fechaSalida) {
      const entrada = new Date(fechaEntrada);
      const salida = new Date(fechaSalida);

      // Validación: Salida debe ser después de Entrada
      if (entrada >= salida) {
        setMensajeDisponibilidad("La fecha de salida debe ser posterior.");
        setHabitacionesLibres(0);
        setPrecioTotal(0);
        return;
      }

      // --- SIMULACIÓN DE OCUPACIÓN ---
      const mes = entrada.getMonth(); // 0 = Enero, 1 = Febrero, etc.
      let ocupadas = 0;

      // Si es Enero (0) o Febrero (1), simulamos que está muy lleno
      if (mes === 0 || mes === 1) { 
        ocupadas = Math.floor(Math.random() * (capacidadTotal + 1)); 
      } else {
        // El resto del año está más libre (0 o 1 ocupadas)
        ocupadas = Math.floor(Math.random() * 2);
      }

      const libres = capacidadTotal - ocupadas;
      setHabitacionesLibres(libres);

      // --- CÁLCULO DE PRECIO ---
      const diffTime = Math.abs(salida - entrada);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir ms a días
      
      // Aseguramos que el precio sea número (por si viene como texto en museos)
      const precioNoche = typeof alojamiento.precio === 'number' ? alojamiento.precio : parseInt(alojamiento.precio);
      setPrecioTotal(diffDays * precioNoche);

      // --- MENSAJES DE ESTADO ---
      if (libres === 0) {
        setMensajeDisponibilidad("⛔ ¡Completo! No quedan habitaciones esas fechas.");
      } else if (libres === 1) {
        setMensajeDisponibilidad("🔥 ¡Date prisa! Solo queda 1 habitación.");
      } else {
        setMensajeDisponibilidad(`✅ Disponible. Quedan ${libres} habitaciones.`);
      }

    }
  }, [fechaEntrada, fechaSalida, alojamiento]);

  // --- 4. MANEJADOR DEL ENVÍO (AÑADIR AL CARRITO) ---
  const handleReserva = (e) => {
    e.preventDefault();
    
    // Si no está logueado, lo mandamos al login
    if (!user) {
      if(window.confirm("Necesitas iniciar sesión para reservar. ¿Ir al login?")) {
          navigate('/login');
      }
      return;
    }

    // Creamos el objeto de la reserva temporal
    const nuevaReserva = {
      alojamiento: alojamiento, // Guardamos todo el objeto del alojamiento (foto, nombre, etc.)
      fechaEntrada,
      fechaSalida,
      total: precioTotal,
      fechaCreacion: new Date().toLocaleDateString()
    };

    // La mandamos al Contexto del Carrito
    addToCarrito(nuevaReserva);

    // UX: Preguntamos al usuario qué quiere hacer
    if(window.confirm("¡Añadido al carrito correctamente! 🛒\n\n¿Quieres ir a finalizar la compra ahora?")) {
        navigate('/carrito');
    } else {
        // Si dice cancelar, se queda en la página para seguir mirando
    }
  };

  return (
    // Contenedor principal con soporte para MODO OSCURO (dark:)
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mt-6 transition-colors duration-300">
      
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b dark:border-gray-700 pb-2">
        📅 Reservar Disponibilidad
      </h3>
      
      <form onSubmit={handleReserva} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          
          {/* INPUT LLEGADA */}
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Llegada</label>
            <input 
              type="date" 
              className="w-full border p-2 rounded focus:ring-2 focus:ring-astur-blue outline-none 
                         bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
              value={fechaEntrada}
              onChange={(e) => setFechaEntrada(e.target.value)}
              min={getTodayDate()} // No permite fechas pasadas
              required
            />
          </div>

          {/* INPUT SALIDA */}
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Salida</label>
            <input 
              type="date" 
              className="w-full border p-2 rounded focus:ring-2 focus:ring-astur-blue outline-none 
                         bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
              value={fechaSalida}
              onChange={(e) => setFechaSalida(e.target.value)}
              min={fechaEntrada || getTodayDate()} // La salida debe ser >= entrada
              required
            />
          </div>
        </div>

        {/* FEEDBACK VISUAL DE DISPONIBILIDAD */}
        {fechaEntrada && fechaSalida && (
            <div className={`p-3 rounded-lg text-sm font-bold text-center transition-colors
              ${habitacionesLibres > 0 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {mensajeDisponibilidad}
            </div>
        )}

        {/* RESUMEN DE PRECIO (Solo si hay sitio) */}
        {habitacionesLibres > 0 && precioTotal > 0 && (
            <div className="flex justify-between items-center py-2 border-t dark:border-gray-700 mt-2">
                <span className="text-gray-600 dark:text-gray-400">Total estancia</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{precioTotal}€</span>
            </div>
        )}

        {/* BOTÓN DE ACCIÓN */}
        <button 
          type="submit"
          // Desactivamos el botón si faltan fechas o no hay sitio
          disabled={!fechaEntrada || !fechaSalida || habitacionesLibres === 0}
          className={`w-full py-3 rounded-lg font-bold text-white transition shadow-md
            ${(!fechaEntrada || !fechaSalida || habitacionesLibres === 0) 
                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' 
                : 'bg-astur-blue hover:bg-blue-700 transform hover:scale-[1.02]'}`}
        >
          {habitacionesLibres === 0 ? "No disponible" : "Añadir al Carrito 🛒"}
        </button>
      </form>
      
      <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4">
        No se te cobrará nada hasta confirmar en el carrito.
      </p>
    </div>
  );
};

export default BookingForm;