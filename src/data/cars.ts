
import { Car } from "../types/car";

export const cars: Car[] = [
  {
    id: "1",
    brand: "Peugeot",
    model: "308",
    type: "Berline",
    year: 2019,
    mileage: 45000,
    price: 16990,
    fuel: "Diesel",
    transmission: "Manuelle",
    power: 130,
    description: "Magnifique Peugeot 308 en parfait état. Faible kilométrage et bien entretenue.",
    features: ["Climatisation", "GPS", "Bluetooth", "Régulateur de vitesse", "Aide au stationnement"],
    images: [
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1536&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592805723127-40218a47f5d8?q=80&w=1470&auto=format&fit=crop"
    ],
    color: "Gris",
    doors: 5,
    isAvailable: true,
    featured: true
  },
  {
    id: "2",
    brand: "Renault",
    model: "Clio",
    type: "Citadine",
    year: 2020,
    mileage: 32000,
    price: 12500,
    fuel: "Essence",
    transmission: "Manuelle",
    power: 90,
    description: "Renault Clio IV en excellent état. Idéale pour la ville et économique.",
    features: ["Climatisation", "Bluetooth", "Régulateur de vitesse", "Vitres électriques"],
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1470&auto=format&fit=crop"
    ],
    color: "Rouge",
    doors: 5,
    isAvailable: true,
    discount: 500
  },
  {
    id: "3",
    brand: "Citroen",
    model: "C3",
    type: "Citadine",
    year: 2021,
    mileage: 18000,
    price: 14500,
    fuel: "Essence",
    transmission: "Automatique",
    power: 110,
    description: "Citroën C3 récente avec faible kilométrage. Très bon état général.",
    features: ["Climatisation automatique", "Caméra de recul", "GPS", "Bluetooth", "Régulateur adaptatif"],
    images: [
      "https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570356528233-b442cf2de345?q=80&w=1470&auto=format&fit=crop"
    ],
    color: "Bleu",
    doors: 5,
    isAvailable: true
  },
  {
    id: "4",
    brand: "Dacia",
    model: "Duster",
    type: "SUV",
    year: 2018,
    mileage: 55000,
    price: 15900,
    fuel: "Diesel",
    transmission: "Manuelle",
    power: 115,
    description: "Dacia Duster robuste et économique. Idéal pour une utilisation polyvalente.",
    features: ["Climatisation", "Bluetooth", "Régulateur de vitesse", "Barres de toit"],
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1470&auto=format&fit=crop"
    ],
    color: "Blanc",
    doors: 5,
    isAvailable: true
  },
  {
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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
    id: "9",
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
    id: "10",
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
  },
  {
    id: "11",
    brand: "BMW",
    model: "Serie 3",
    type: "Berline",
    year: 2020,
    mileage: 30000,
    price: 32500,
    fuel: "Diesel",
    transmission: "Automatique",
    power: 190,
    description: "BMW Série 3 élégante et dynamique. Véritable référence dans sa catégorie avec un équilibre parfait entre confort et performance.",
    features: ["Cuir", "GPS", "Sièges chauffants", "Caméra de recul", "Régulateur adaptatif", "Toit ouvrant"],
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?q=80&w=1470&auto=format&fit=crop"
    ],
    color: "Noir",
    doors: 4,
    isAvailable: true,
    featured: true
  },
  {
    id: "12",
    brand: "Audi",
    model: "A4",
    type: "Berline",
    year: 2021,
    mileage: 22000,
    price: 35800,
    fuel: "Diesel",
    transmission: "Automatique",
    power: 150,
    description: "Audi A4 sophistiquée et technologique. Un habitacle raffiné et des finitions de haute qualité pour cette berline allemande.",
    features: ["Cuir", "GPS", "Bang & Olufsen", "Matrix LED", "Virtual Cockpit", "Assistant de conduite"],
    images: [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1472&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1470&auto=format&fit=crop"
    ],
    color: "Blanc",
    doors: 4,
    isAvailable: true
  },
  {
    id: "13",
    brand: "Volkswagen",
    model: "Golf",
    type: "Berline",
    year: 2020,
    mileage: 25000,
    price: 24500,
    fuel: "Essence",
    transmission: "Manuelle",
    power: 130,
    description: "Volkswagen Golf 8 compacte et polyvalente. La référence des compactes, alliant qualité, fiabilité et plaisir de conduite.",
    features: ["Climatisation", "GPS", "Car Play", "Régulateur", "Capteurs de stationnement"],
    images: [
      "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=1470&auto=format&fit=crop"
    ],
    color: "Gris",
    doors: 5,
    isAvailable: true
  },
  {
    id: "14",
    brand: "Mercedes",
    model: "Classe C",
    type: "Berline",
    year: 2019,
    mileage: 40000,
    price: 36900,
    fuel: "Essence",
    transmission: "Automatique",
    power: 184,
    description: "Mercedes Classe C luxueuse et confortable. Le meilleur du savoir-faire allemand dans une berline élégante.",
    features: ["Cuir Nappa", "COMAND Online", "Burmester", "Suspension pneumatique", "Toit panoramique"],
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1374&auto=format&fit=crop"
    ],
    color: "Argent",
    doors: 4,
    isAvailable: true,
    discount: 2000
  },
  {
    id: "15",
    brand: "Toyota",
    model: "RAV4",
    type: "SUV",
    year: 2022,
    mileage: 15000,
    price: 32900,
    fuel: "Hybride",
    transmission: "Automatique",
    power: 218,
    description: "Toyota RAV4 Hybrid efficace et spacieux. Un SUV familial hybride offrant une consommation réduite et de belles prestations.",
    features: ["JBL Audio", "Caméra 360°", "Chargeur sans fil", "Hayon électrique", "Toyota Safety Sense"],
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1528&auto=format&fit=crop"
    ],
    color: "Bleu",
    doors: 5,
    isAvailable: true,
    featured: true
  },
  {
    id: "16",
    brand: "Nissan",
    model: "Qashqai",
    type: "SUV",
    year: 2021,
    mileage: 20000,
    price: 25900,
    fuel: "Essence",
    transmission: "Manuelle",
    power: 140,
    description: "Nissan Qashqai moderne et confortable. Un crossover qui combine style, technologie et praticité pour tous vos trajets.",
    features: ["ProPILOT", "NissanConnect", "Bose audio", "Around View Monitor", "Toit panoramique"],
    images: [
      "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576220258822-2a6ecce9b616?q=80&w=1364&auto=format&fit=crop"
    ],
    color: "Gris",
    doors: 5,
    isAvailable: true
  },
  {
    id: "17",
    brand: "Hyundai",
    model: "Tucson",
    type: "SUV",
    year: 2022,
    mileage: 18000,
    price: 28900,
    fuel: "Hybride",
    transmission: "Automatique",
    power: 230,
    description: "Hyundai Tucson au design futuriste et à la motorisation efficiente. Un SUV qui ne passe pas inaperçu.",
    features: ["Bluelink", "Krell audio", "Toit panoramique", "Sièges ventilés", "SmartSense"],
    images: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1528&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1374&auto=format&fit=crop"
    ],
    color: "Vert",
    doors: 5,
    isAvailable: true
  },
  {
    id: "18",
    brand: "Ford",
    model: "Puma",
    type: "SUV",
    year: 2021,
    mileage: 22000,
    price: 23500,
    fuel: "Essence",
    transmission: "Manuelle",
    power: 125,
    description: "Ford Puma agile et pratique. Un crossover compact au coffre ingénieux et au comportement routier dynamique.",
    features: ["SYNC 3", "B&O audio", "MegaBox", "Co-Pilot 360", "Massage seats"],
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1470&auto=format&fit=crop"
    ],
    color: "Bleu",
    doors: 5,
    isAvailable: true
  },
  {
    id: "19",
    brand: "Volvo",
    model: "XC60",
    type: "SUV",
    year: 2020,
    mileage: 35000,
    price: 42500,
    fuel: "Diesel",
    transmission: "Automatique",
    power: 190,
    description: "Volvo XC60 sécuritaire et scandinave. Un SUV premium où sécurité rime avec luxe et élégance nordique.",
    features: ["Sensus Navigation", "Harman Kardon", "Pilot Assist", "Toit panoramique", "City Safety"],
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1536&auto=format&fit=crop"
    ],
    color: "Noir",
    doors: 5,
    isAvailable: true,
    featured: true
  },
  {
    id: "20",
    brand: "Porsche",
    model: "911",
    type: "Coupé",
    year: 2018,
    mileage: 25000,
    price: 98500,
    fuel: "Essence",
    transmission: "Automatique",
    power: 450,
    description: "Porsche 911 Carrera iconique et performante. La référence des sportives, entre tradition et modernité.",
    features: ["PCM", "Burmester", "PASM", "Chrono Package", "Sièges adaptatifs"],
    images: [
      "https://images.unsplash.com/photo-1584345604476-8ec5f452d1f2?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=1470&auto=format&fit=crop"
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
