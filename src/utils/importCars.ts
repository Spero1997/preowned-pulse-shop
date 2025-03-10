
import { Car, CarType, FuelType, TransmissionType } from "../types/car";

// Types pour la structure des données du site d'origine
interface TakeAppCar {
  id: string;
  title: string; // Contient généralement marque + modèle
  description: string;
  price: string;
  images: string[];
  details?: {
    [key: string]: string;
  };
}

// Fonction pour extraire les détails d'une voiture depuis l'API de take.app
export const fetchCarsFromTakeApp = async (): Promise<Car[]> => {
  try {
    // L'URL précédente était incorrecte, on utilise des données factices pour démonstration
    // Dans un environnement réel, vous devrez utiliser votre API réelle
    console.log('Tentative de récupération des données depuis Take.app...');
    
    // Création d'exemples de voitures
    const mockData: TakeAppCar[] = [
      {
        id: "001",
        title: "Peugeot 308",
        description: "Magnifique Peugeot 308 en parfait état. Faible kilométrage et bien entretenue.",
        price: "16990€",
        images: [
          "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1536&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1592805723127-40218a47f5d8?q=80&w=1470&auto=format&fit=crop"
        ],
        details: {
          année: "2019",
          kilométrage: "45000",
          carburant: "Diesel",
          boîte: "Manuelle",
          catégorie: "Berline",
          portes: "5",
          couleur: "Gris",
          puissance: "130",
          équipements: "Climatisation, GPS, Bluetooth, Régulateur de vitesse, Aide au stationnement"
        }
      },
      {
        id: "002",
        title: "Renault Clio",
        description: "Renault Clio IV en excellent état. Idéale pour la ville et économique.",
        price: "12500€",
        images: [
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1470&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1470&auto=format&fit=crop"
        ],
        details: {
          année: "2020",
          kilométrage: "32000",
          carburant: "Essence",
          boîte: "Manuelle",
          catégorie: "Citadine",
          portes: "5",
          couleur: "Rouge",
          puissance: "90",
          équipements: "Climatisation, Bluetooth, Régulateur de vitesse, Vitres électriques"
        }
      },
      {
        id: "003",
        title: "Citroen C3",
        description: "Citroën C3 récente avec faible kilométrage. Très bon état général.",
        price: "14500€",
        images: [
          "https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=1470&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1570356528233-b442cf2de345?q=80&w=1470&auto=format&fit=crop"
        ],
        details: {
          année: "2021",
          kilométrage: "18000",
          carburant: "Essence",
          boîte: "Automatique",
          catégorie: "Citadine",
          portes: "5",
          couleur: "Bleu",
          puissance: "110",
          équipements: "Climatisation automatique, Caméra de recul, GPS, Bluetooth, Régulateur adaptatif"
        }
      },
      {
        id: "004",
        title: "Dacia Duster",
        description: "Dacia Duster robuste et économique. Idéal pour une utilisation polyvalente.",
        price: "15900€",
        images: [
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1470&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1470&auto=format&fit=crop"
        ],
        details: {
          année: "2018",
          kilométrage: "55000",
          carburant: "Diesel",
          boîte: "Manuelle",
          catégorie: "SUV",
          portes: "5",
          couleur: "Blanc",
          puissance: "115",
          équipements: "Climatisation, Bluetooth, Régulateur de vitesse, Barres de toit"
        }
      }
    ];
    
    console.log('Données factices créées pour démonstration:', mockData);
    
    // Transformer les données en notre format de voiture
    const importedCars: Car[] = mockData.map((carData: TakeAppCar, index: number) => {
      // Extraction de la marque et du modèle à partir du titre
      const titleParts = carData.title.split(' ');
      const brand = titleParts[0] || "Inconnu";
      const model = titleParts.slice(1).join(' ') || "Inconnu";
      
      // Extraction des détails
      const details = carData.details || {};
      const year = parseInt(details.year || details.année || "2020");
      const mileage = parseFloat(details.mileage?.replace(/\D/g, '') || 
                               details.kilométrage?.replace(/\D/g, '') || "0");
      const fuelType = mapFuelType(details.fuel || details.carburant || "Essence");
      const transmission = mapTransmissionType(details.transmission || details.boîte || "Manuelle");
      const type = mapCarType(details.type || details.catégorie || "Berline");
      const doors = parseInt(details.doors || details.portes || "4");
      const color = details.color || details.couleur || "Non spécifié";
      const power = parseInt(details.power?.replace(/\D/g, '') || 
                           details.puissance?.replace(/\D/g, '') || "100");
      
      // Extraction des caractéristiques
      const featuresString = details.features || details.équipements || "";
      const features = featuresString.split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0);
      
      // Extraction du prix
      const price = parseFloat(carData.price.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
      
      return {
        id: carData.id || `imported-${index}`,
        brand,
        model,
        type,
        year,
        mileage,
        price,
        fuel: fuelType,
        transmission,
        power,
        description: carData.description || "Aucune description disponible",
        features: features.length > 0 ? features : ["Non spécifié"],
        images: carData.images || [],
        color,
        doors,
        isAvailable: true,
        featured: index < 3 // Les 3 premières voitures seront mises en avant
      };
    });
    
    console.log('Voitures importées:', importedCars);
    return importedCars;
  } catch (error) {
    console.error('Erreur lors de l\'importation des voitures:', error);
    throw error;
  }
};

// Fonctions de mappage pour les types énumérés
const mapFuelType = (fuel: string): FuelType => {
  fuel = fuel.toLowerCase();
  if (fuel.includes('diesel')) return 'Diesel';
  if (fuel.includes('hybride') || fuel.includes('hybrid')) return 'Hybride';
  if (fuel.includes('électrique') || fuel.includes('electric')) return 'Électrique';
  if (fuel.includes('gpl')) return 'GPL';
  return 'Essence';
};

const mapTransmissionType = (transmission: string): TransmissionType => {
  transmission = transmission.toLowerCase();
  if (transmission.includes('auto') || transmission.includes('cvt') || transmission.includes('dsg')) {
    return 'Automatique';
  }
  return 'Manuelle';
};

const mapCarType = (type: string): CarType => {
  type = type.toLowerCase();
  if (type.includes('suv')) return 'SUV';
  if (type.includes('berline')) return 'Berline';
  if (type.includes('city') || type.includes('citadine')) return 'Citadine';
  if (type.includes('break')) return 'Break';
  if (type.includes('coupé') || type.includes('coupe')) return 'Coupé';
  if (type.includes('cabriolet') || type.includes('convertible')) return 'Cabriolet';
  if (type.includes('monospace') || type.includes('minivan')) return 'Monospace';
  if (type.includes('utilitaire') || type.includes('utility')) return 'Utilitaire';
  return 'Berline';
};
