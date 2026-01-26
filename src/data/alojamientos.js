export const alojamientos = [
  // LOS 6 ORIGINALES
  {
    id: 1,
    nombre: "Cabaña del Bosque",
    descripcion: "Acogedora cabaña de madera rodeada de naturaleza en pleno corazón de los Picos de Europa.",
    precio: 120,
    ubicacion: "Cangas de Onís",
    imagen: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=2070&auto=format&fit=crop",
    categoria: "Rural",
    rating: 4.8,
    destacado: true
  },
  {
    id: 2,
    nombre: "Apartamentos Playa del Silencio",
    descripcion: "Despierta con el sonido del mar en estos modernos apartamentos con vistas al Cantábrico.",
    precio: 150,
    ubicacion: "Cudillero",
    imagen: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
    categoria: "Costa",
    rating: 4.5,
    destacado: true
  },
  {
    id: 3,
    nombre: "Casa Rural La Tierrina",
    descripcion: "Experiencia auténtica asturiana con huerto propio y animales de granja. Ideal familias.",
    precio: 90,
    ubicacion: "Llanes",
    imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    categoria: "Rural",
    rating: 4.2,
    destacado: false
  },
  {
    id: 4,
    nombre: "Mirador del Naranjo",
    descripcion: "Vistas espectaculares al Naranjo de Bulnes. Paz absoluta y desconexión digital.",
    precio: 200,
    ubicacion: "Cabrales",
    imagen: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2070&auto=format&fit=crop",
    categoria: "Montaña",
    rating: 4.9,
    destacado: true
  },
  {
    id: 5,
    nombre: "El Refugio del Sella",
    descripcion: "A orillas del río Sella, perfecto para amantes del descenso en canoa y la pesca.",
    precio: 85,
    ubicacion: "Arriondas",
    imagen: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?q=80&w=2070&auto=format&fit=crop",
    categoria: "Aventura",
    rating: 4.0,
    destacado: false
  },
  {
    id: 6,
    nombre: "Casona de Indianos",
    descripcion: "Lujo histórico en una mansión restaurada del siglo XIX con jardines exóticos.",
    precio: 250,
    ubicacion: "Ribadesella",
    imagen: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
    categoria: "Lujo",
    rating: 4.7,
    destacado: true
  },
  // NUEVOS ALOJAMIENTOS (Del 7 al 20)
  {
    id: 7,
    nombre: "Glamping Picos",
    descripcion: "Duerme bajo las estrellas en domos transparentes de lujo.",
    precio: 180,
    ubicacion: "Potes",
    imagen: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop",
    categoria: "Glamping",
    rating: 4.6,
    destacado: false
  },
  {
    id: 8,
    nombre: "Hostal El Peregrino",
    descripcion: "Parada obligatoria en el Camino del Norte. Ambiente familiar y económico.",
    precio: 45,
    ubicacion: "Villaviciosa",
    imagen: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop",
    categoria: "Hostal",
    rating: 4.1,
    destacado: false
  },
  {
    id: 9,
    nombre: "Eco-Lodge Somiedo",
    descripcion: "Cabañas sostenibles en pleno Parque Natural. Avistamiento de osos.",
    precio: 135,
    ubicacion: "Somiedo",
    imagen: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop",
    categoria: "Ecológico",
    rating: 4.9,
    destacado: false
  },
  {
    id: 10,
    nombre: "Loft Urbano Gijón",
    descripcion: "Moderno loft en el centro de Gijón, a 5 minutos de la playa de San Lorenzo.",
    precio: 110,
    ubicacion: "Gijón",
    imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
    categoria: "Urbano",
    rating: 4.4,
    destacado: false
  },
  {
    id: 11,
    nombre: "Hotel Rural El Hórreo",
    descripcion: "Tradición y confort en una aldea tranquila. Desayunos caseros increíbles.",
    precio: 75,
    ubicacion: "Taramundi",
    imagen: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
    categoria: "Rural",
    rating: 4.3,
    destacado: false
  },
  {
    id: 12,
    nombre: "Apartamentos Bufones",
    descripcion: "Escucha el rugir del mar junto a los Bufones de Pría.",
    precio: 140,
    ubicacion: "Llanes",
    imagen: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=2070&auto=format&fit=crop",
    categoria: "Costa",
    rating: 4.7,
    destacado: false
  },
  {
    id: 13,
    nombre: "La Casina de la Abuela",
    descripcion: "Pequeña casa de piedra restaurada ideal para parejas.",
    precio: 65,
    ubicacion: "Lastres",
    imagen: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=2070&auto=format&fit=crop",
    categoria: "Rural",
    rating: 4.0,
    destacado: false
  },
  {
    id: 14,
    nombre: "Palacio de Merás",
    descripcion: "Hotel boutique en un edificio histórico del siglo XVI.",
    precio: 195,
    ubicacion: "Tineo",
    imagen: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    categoria: "Lujo",
    rating: 4.6,
    destacado: false
  },
  {
    id: 15,
    nombre: "Camping Playa de Vega",
    descripcion: "Para los amantes del surf y la naturaleza. Acceso directo a la playa.",
    precio: 40,
    ubicacion: "Ribadesella",
    imagen: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop",
    categoria: "Camping",
    rating: 4.2,
    destacado: false
  },
  {
    id: 16,
    nombre: "Casa de Aldea El Texu",
    descripcion: "Rodeada de bosques de tejos milenarios. Silencio absoluto.",
    precio: 88,
    ubicacion: "Caso",
    imagen: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    categoria: "Montaña",
    rating: 4.5,
    destacado: false
  },
  {
    id: 17,
    nombre: "Villas del Cantábrico",
    descripcion: "Villas modernas con piscina privada y vistas al mar.",
    precio: 300,
    ubicacion: "Colunga",
    imagen: "https://images.unsplash.com/photo-1600596542815-2250657d2f96?q=80&w=2075&auto=format&fit=crop",
    categoria: "Lujo",
    rating: 4.9,
    destacado: true
  },
  {
    id: 18,
    nombre: "Albergue Ruta del Cares",
    descripcion: "Punto de partida ideal para la famosa Ruta del Cares.",
    precio: 35,
    ubicacion: "Poncebos",
    imagen: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
    categoria: "Hostal",
    rating: 4.3,
    destacado: false
  },
  {
    id: 19,
    nombre: "Hotel Balneario Las Caldas",
    descripcion: "Relájate en nuestras aguas termales a solo unos minutos de Oviedo.",
    precio: 160,
    ubicacion: "Oviedo",
    imagen: "https://images.unsplash.com/photo-1571896349842-6e5a51335022?q=80&w=2080&auto=format&fit=crop",
    categoria: "Wellness",
    rating: 4.7,
    destacado: false
  },
  {
    id: 20,
    nombre: "Cabañas en los Árboles",
    descripcion: "Una aventura única durmiendo a 5 metros de altura.",
    precio: 130,
    ubicacion: "Villanueva",
    imagen: "https://images.unsplash.com/photo-1488462237308-aec80204ce25?q=80&w=2070&auto=format&fit=crop",
    categoria: "Aventura",
    rating: 4.8,
    destacado: true
  }
];