import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Ahora aceptamos "coordenadasExplicitas"
const MapaDetalle = ({ ubicacionTexto, coordenadasExplicitas }) => {
  
  // Coordenadas por defecto (Centro de Asturias aprox)
  const defaultPos = [43.3619, -5.8494]; 
  
  // Si nos pasan coordenadas, las usamos. Si no, las default.
  const position = coordenadasExplicitas || defaultPos;

  return (
    <div className="h-full w-full rounded-lg overflow-hidden z-0">
      {/* Usamos 'key' con la latitud para forzar al mapa a redibujarse si cambia la ubicación */}
      <MapContainer key={position[0]} center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {ubicacionTexto} <br /> 
            {coordenadasExplicitas ? "Ubicación exacta" : "(Ubicación aproximada)"}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapaDetalle;