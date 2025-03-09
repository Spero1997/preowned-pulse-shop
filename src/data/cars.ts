
import { Car } from "../types/car";

export const cars: Car[] = [
  {
    id: "1",
    brand: "Fiat",
    model: "500",
    type: "Citadine",
    year: 2020,
    mileage: 25000,
    price: 12500,
    fuel: "Essence",
    transmission: "Manuelle",
    power: 70,
    description: "Fiat 500 en excellent état. Parfaite pour la ville avec sa petite taille et sa consommation économique.",
    features: ["Climatisation", "Bluetooth", "Vitres électriques", "Jantes alliage"],
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1470&auto=format&fit=crop"
    ],
    color: "Blanc",
    doors: 3,
    isAvailable: true,
    featured: true
  },
  {
    id: "2",
    brand: "Alfa Romeo",
    model: "Giulia",
    type: "Berline",
    year: 2019,
    mileage: 45000,
    price: 28900,
    fuel: "Diesel",
    transmission: "Automatique",
    power: 150,
    description: "Alfa Romeo Giulia élégante avec un moteur diesel puissant et économique. Confort et performances au rendez-vous.",
    features: ["GPS", "Sièges cuir", "Caméra de recul", "Régulateur de vitesse adaptatif", "Toit ouvrant"],
    images: [
      "https://images.unsplash.com/photo-1617814065893-00757125efab?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550829434-8c9e4e7d4c19?q=80&w=1470&auto=format&fit=crop"
    ],
    color: "Rouge",
    doors: 4,
    isAvailable: true,
    discount: 1000
  },
  {
    id: "3",
    brand: "Jeep",
    model: "Renegade",
    type: "SUV",
    year: 2021,
    mileage: 15000,
    price: 23500,
    fuel: "Essence",
    transmission: "Manuelle",
    power: 120,
    description: "Jeep Renegade robuste et polyvalent. Parfait pour les aventures du quotidien et les escapades du week-end.",
    features: ["Bluetooth", "Climatisation automatique", "Jantes alliage", "Barres de toit", "Aide au stationnement"],
    images: [
      "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607603750909-408e193868c7?q=80&w=1470&auto=format&fit=crop"
    ],
    color: "Bleu",
    doors: 5,
    isAvailable: true
  },
  {
    id: "4",
    brand: "Lancia",
    model: "Ypsilon",
    type: "Citadine",
    year: 2018,
    mileage: 38000,
    price: 9800,
    fuel: "Essence",
    transmission: "Manuelle",
    power: 69,
    description: "Lancia Ypsilon compacte et économique. Idéale pour la ville avec son style distinctif et sa maniabilité.",
    features: ["Climatisation", "Radio USB", "Vitres électriques", "Direction assistée"],
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1470&auto=format&fit=crop"
    ],
    color: "Gris",
    doors: 5,
    isAvailable: true,
    discount: 500
  },
  {
    id: "5",
    brand: "Maserati",
    model: "Ghibli",
    type: "Berline",
    year: 2017,
    mileage: 60000,
    price: 45000,
    fuel: "Essence",
    transmission: "Automatique",
    power: 330,
    description: "Maserati Ghibli luxueuse et puissante. Une berline sportive italienne alliant performance et raffinement.",
    features: ["Sièges cuir", "Système audio premium", "GPS", "Suspension adaptative", "Caméra 360°", "Sièges chauffants"],
    images: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1528&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602783219520-2f10bd948a7a?q=80&w=1470&auto=format&fit=crop"
    ],
    color: "Noir",
    doors: 4,
    isAvailable: true,
    featured: true
  },
  {
    id: "6",
    brand: "Ferrari",
    model: "Portofino",
    type: "Cabriolet",
    year: 2019,
    mileage: 12000,
    price: 185000,
    fuel: "Essence",
    transmission: "Automatique",
    power: 600,
    description: "Ferrari Portofino décapotable en excellent état. Le rêve italien incarné dans une voiture d'exception.",
    features: ["Toit rétractable", "Intérieur cuir", "Système de navigation", "Jantes forgées", "Mode de conduite", "Sièges sport"],
    images: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=1470&auto=format&fit=crop"
    ],
    color: "Rouge",
    doors: 2,
    isAvailable: true,
    featured: true
  }
];

export const brands = Array.from(new Set(cars.map(car => car.brand))).sort();
export const carTypes = Array.from(new Set(cars.map(car => car.type))).sort();
export const fuelTypes = Array.from(new Set(cars.map(car => car.fuel))).sort();
export const transmissionTypes = Array.from(new Set(cars.map(car => car.transmission))).sort();

export const minPrice = Math.min(...cars.map(car => car.price));
export const maxPrice = Math.max(...cars.map(car => car.price));
export const minYear = Math.min(...cars.map(car => car.year));
export const maxYear = Math.max(...cars.map(car => car.year));
