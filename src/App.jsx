// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Museos from './pages/Museos';

// Importamos las 10 páginas
import Home from "./pages/Home";
import Explorar from "./pages/Explorar";
import Detalle from "./pages/Detalle";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import Favoritos from "./pages/Favoritos";
import Reservas from "./pages/Reservas";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Aquí irá el Navbar más adelante */}
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Rutas Públicas */}
    <Route path="/" element={<Home />} />
          <Route path="/explorar" element={<Explorar />} />
          <Route path="/museos" element={<Museos />} /> 
          <Route path="/alojamiento/:id" element={<Detalle />} />
          {/* Ruta dinámica */}
          <Route path="/contacto" element={<Contacto />} />
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          {/* Rutas Privadas (Protegidas por el Guardián) */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favoritos"
            element={
              <ProtectedRoute>
                <Favoritos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservas"
            element={
              <ProtectedRoute>
                <Reservas />
              </ProtectedRoute>
            }
          />
          {/* Error 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer Temporal */}
      <footer className="bg-slate-800 text-white p-4 text-center mt-auto">
        © 2026 Proyecto Astur - Hecho con amor y sidra 🍏
      </footer>
    </div>
  );
}

export default App;
