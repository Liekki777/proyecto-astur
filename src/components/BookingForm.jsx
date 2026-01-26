import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useReservas } from '../context/ReservasContext';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ alojamiento }) => {
  const { user } = useAuth();
  const { addReserva } = useReservas();
  const navigate = useNavigate();

  // Estados del formulario
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [habitacionesLibres, setHabitacionesLibres] = useState(null);
  const [mensajeDisponibilidad, setMensajeDisponibilidad] = useState('');
  const [precioTotal, setPrecioTotal] = useState(0);

  // 1. SIMULACIÓN DE DATOS DEL ALOJAMIENTO
  // Generamos una capacidad aleatoria entre 2 y 5 (fijo por alojamiento según su ID)
  // Usamos el ID para que siempre sea el mismo número para el mismo hotel
  const capacidadTotal = (parseInt(alojamiento.id) % 4) + 2; 

  // 2. EFECTO: Calcular disponibilidad cuando cambian las fechas
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

      // LÓGICA DE NEGOCIO FICTICIA (Enero y Febrero están llenos)
      const mes = entrada.getMonth(); // 0 = Enero, 1 = Febrero
      let ocupadas = 0;

      if (mes === 0 || mes === 1) {
        // En Enero/Febrero simulamos mucha ocupación (aleatoria pero alta)
        ocupadas = Math.floor(Math.random() * (capacidadTotal + 1)); 
      } else {
        // El resto del año está más libre
        ocupadas = Math.floor(Math.random() * 2);
      }

      const libres = capacidadTotal - ocupadas;
      setHabitacionesLibres(libres);

      // Calcular precio
      const diffTime = Math.abs(salida - entrada);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      // Aseguramos que el precio sea numérico (quitamos el '€' si viene como texto)
      const precioNoche = typeof alojamiento.precio === 'number' ? alojamiento.precio : parseInt(alojamiento.precio);
      setPrecioTotal(diffDays * precioNoche);

      if (libres === 0) {
        setMensajeDisponibilidad("⛔ ¡Completo! No quedan habitaciones esas fechas.");
      } else if (libres === 1) {
        setMensajeDisponibilidad("🔥 ¡Date prisa! Solo queda 1 habitación.");
      } else {
        setMensajeDisponibilidad(`✅ Disponible. Quedan ${libres} habitaciones.`);
      }

    }
  }, [fechaEntrada, fechaSalida, alojamiento]);

  // 3. MANEJAR RESERVA
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
    navigate('/reservas'); // Nos lleva a mis reservas
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
        📅 Reservar Disponibilidad
      </h3>
      
      <form onSubmit={handleReserva} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Llegada</label>
            <input 
              type="date" 
              className="w-full border p-2 rounded focus:ring-2 focus:ring-astur-blue outline-none"
              value={fechaEntrada}
              onChange={(e) => setFechaEntrada(e.target.value)}
              min={new Date().toISOString().split('T')[0]} // No permitir pasado
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Salida</label>
            <input 
              type="date" 
              className="w-full border p-2 rounded focus:ring-2 focus:ring-astur-blue outline-none"
              value={fechaSalida}
              onChange={(e) => setFechaSalida(e.target.value)}
              min={fechaEntrada || new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </div>

        {/* FEEDBACK DE DISPONIBILIDAD */}
        {fechaEntrada && fechaSalida && (
            <div className={`p-3 rounded-lg text-sm font-bold text-center ${habitacionesLibres > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {mensajeDisponibilidad}
            </div>
        )}

        {/* RESUMEN DE PRECIO */}
        {habitacionesLibres > 0 && precioTotal > 0 && (
            <div className="flex justify-between items-center py-2 border-t mt-2">
                <span className="text-gray-600">Total</span>
                <span className="text-2xl font-bold text-gray-900">{precioTotal}€</span>
            </div>
        )}

        <button 
          type="submit"
          disabled={!fechaEntrada || !fechaSalida || habitacionesLibres === 0}
          className={`w-full py-3 rounded-lg font-bold text-white transition
            ${(!fechaEntrada || !fechaSalida || habitacionesLibres === 0) 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-astur-blue hover:bg-blue-700 shadow-md transform hover:scale-[1.02]'}`}
        >
          Confirmar Reserva
        </button>
      </form>
      
      <p className="text-xs text-center text-gray-400 mt-4">
        No se te cobrará nada todavía. Cancelación gratuita.
      </p>
    </div>
  );
};

export default BookingForm;