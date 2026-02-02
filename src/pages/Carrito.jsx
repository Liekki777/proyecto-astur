import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useReservas } from '../context/ReservasContext';
import { Trash2, ShoppingBag, CheckCircle } from 'lucide-react';

const Carrito = () => {
  const { carrito, removeFromCarrito, clearCarrito } = useCarrito();
  const { addReserva } = useReservas();
  const { addVariasReservas } = useReservas();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Calcular total del carrito
  const totalCarrito = carrito.reduce((acc, item) => acc + item.total, 0);

  const handleCheckout = () => {
    // SOLUCIÓN: En lugar de un bucle, pasamos todo el paquete de golpe
    addVariasReservas(carrito);

    // 2. Vaciamos carrito
    clearCarrito();

    // 3. Mostramos modal de éxito
    setShowModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[70vh]">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
        <ShoppingBag className="text-astur-blue" /> Tu Carrito
      </h1>

      {carrito.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-dashed border-gray-300 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Tu carrito está vacío</h3>
            <p className="text-gray-500 mb-6">Parece que aún no te has decidido por ningún paraíso.</p>
            <Link to="/explorar" className="bg-astur-blue text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
                Explorar Destinos
            </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* LISTA DE ITEMS */}
            <div className="lg:w-2/3 space-y-4">
                {carrito.map((item) => (
                    <div key={item.idTemp} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border dark:border-gray-700 flex gap-4 items-center">
                        <img 
                            src={item.alojamiento.imagen} 
                            alt={item.alojamiento.nombre} 
                            className="w-24 h-24 object-cover rounded-lg hidden sm:block"
                            onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Lagos_de_Covadonga_%28Asturias%29.jpg/640px-Lagos_de_Covadonga_%28Asturias%29.jpg"}
                        />
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.alojamiento.nombre}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(item.fechaEntrada).toLocaleDateString()} - {new Date(item.fechaSalida).toLocaleDateString()}
                            </p>
                            <p className="text-astur-blue font-bold mt-1">{item.total}€</p>
                        </div>
                        <button 
                            onClick={() => removeFromCarrito(item.idTemp)}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                            title="Eliminar"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {/* RESUMEN DE PAGO */}
            <div className="lg:w-1/3">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border dark:border-gray-700 sticky top-24">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Resumen</h3>
                    <div className="flex justify-between mb-2 text-gray-600 dark:text-gray-400">
                        <span>Subtotal</span>
                        <span>{totalCarrito}€</span>
                    </div>
                    <div className="flex justify-between mb-4 text-gray-600 dark:text-gray-400">
                        <span>Impuestos (incluidos)</span>
                        <span>0€</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t dark:border-gray-700 text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        <span>Total</span>
                        <span>{totalCarrito}€</span>
                    </div>

                    <button 
                        onClick={handleCheckout}
                        className="w-full bg-astur-blue text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg transform hover:scale-[1.02]"
                    >
                        Confirmar y Pagar
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-4">Pago seguro cifrado con sidra asturiana 🍏</p>
                </div>
            </div>
        </div>
      )}

      {/* POPUP DE ÉXITO (MODAL) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform scale-100 animate-bounceIn">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">¡Reserva Confirmada!</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Tus reservas se han guardado correctamente. ¡Prepara las maletas!
                </p>
                <button 
                    onClick={() => navigate('/reservas')}
                    className="w-full bg-astur-blue text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                    Ver mis Reservas
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;