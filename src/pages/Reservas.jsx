import React from 'react';
import { Link } from 'react-router-dom';
import { useReservas } from '../context/ReservasContext';
import { Calendar, MapPin, Trash2 } from 'lucide-react';

const Reservas = () => {
  const { reservas, removeReserva } = useReservas();

  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <Calendar className="text-astur-blue" /> Mis Próximos Viajes
      </h1>

      {reservas.length === 0 ? (
        // ESTADO VACÍO (0 reservas)
        <div className="text-center py-16 bg-blue-50 rounded-xl border-2 border-dashed border-blue-200">
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No tienes reservas activas</h3>
            <p className="text-gray-500 mb-6">¿A qué esperas para descubrir el paraíso?</p>
            <Link to="/explorar" className="bg-astur-blue text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
                Buscar Alojamiento
            </Link>
        </div>
      ) : (
        // LISTADO DE RESERVAS
        <div className="space-y-6">
          {reservas.map((reserva) => (
            <div key={reserva.idReserva} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col md:flex-row hover:shadow-xl transition">
                {/* Imagen */}
                <div className="md:w-1/3 h-48 md:h-auto relative">
                    <img 
                        src={reserva.alojamiento.imagen} 
                        alt={reserva.alojamiento.nombre} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Lagos_de_Covadonga_%28Asturias%29.jpg/640px-Lagos_de_Covadonga_%28Asturias%29.jpg"; }}
                    />
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                        CONFIRMADA
                    </div>
                </div>
                
                {/* Info */}
                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="text-2xl font-bold text-gray-800">{reserva.alojamiento.nombre}</h3>
                            <span className="text-xl font-bold text-astur-blue">{reserva.total}€</span>
                        </div>
                        <p className="text-gray-500 mt-1 flex items-center gap-1">
                            <MapPin size={16} /> {reserva.alojamiento.ubicacion}
                        </p>
                        
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <div>
                                <p className="font-bold text-gray-500 text-xs uppercase">Llegada</p>
                                <p className="font-medium text-lg">{new Date(reserva.fechaEntrada).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-500 text-xs uppercase">Salida</p>
                                <p className="font-medium text-lg">{new Date(reserva.fechaSalida).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <Link to={`/alojamiento/${reserva.alojamiento.id}`} className="text-astur-blue font-bold hover:underline py-2">
                            Ver detalles
                        </Link>
                        <button 
                            onClick={() => {
                                if(window.confirm("¿Seguro que quieres cancelar este viaje a Asturias? 😢")) {
                                    removeReserva(reserva.idReserva);
                                }
                            }}
                            className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition"
                        >
                            <Trash2 size={18} /> Cancelar
                        </button>
                    </div>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservas;