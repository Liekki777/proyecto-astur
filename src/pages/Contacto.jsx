import React from 'react';

const Contacto = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-astur-blue mb-4 text-center">Contacta con nosotros</h1>
        <p className="text-center text-gray-600 mb-8">
            ¿Tienes dudas sobre tu viaje a Asturias? ¿Quieres listar tu propiedad? Escríbenos.
        </p>

        <form className="bg-white shadow-lg rounded-xl p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Nombre</label>
                    <input type="text" className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-astur-blue outline-none" placeholder="Tu nombre" />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="email" className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-astur-blue outline-none" placeholder="tucorreo@ejemplo.com" />
                </div>
            </div>
            
            <div>
                <label className="block text-gray-700 font-bold mb-2">Asunto</label>
                <select className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-astur-blue outline-none">
                    <option>Información general</option>
                    <option>Problemas con una reserva</option>
                    <option>Soy propietario</option>
                </select>
            </div>

            <div>
                <label className="block text-gray-700 font-bold mb-2">Mensaje</label>
                <textarea className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-astur-blue outline-none h-32" placeholder="¿En qué podemos ayudarte?"></textarea>
            </div>

            <button className="w-full bg-astur-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
                Enviar Mensaje 📨
            </button>
        </form>
      </div>
    </div>
  );
};

export default Contacto;