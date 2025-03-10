
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
    console.log('Tentative de récupération des données depuis Take.app...');
    
    // URL de l'API Take.app
    const response = await fetch('https://takeapp-export.vercel.app/api/cars');
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des données: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Données brutes récupérées:`, data);
    
    // Vérifier si nous avons des données valides
    if (!data || !Array.isArray(data)) {
      throw new Error('Format de données invalide reçu de Take.app');
    }
    
    console.log(`Nombre d'éléments récupérés: ${data.length}`);
    
    // Transformer les données en notre format de voiture
    const importedCars: Car[] = data.map((carData: TakeAppCar, index: number) => {
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
        featured: index < 20 // Les 20 premières voitures seront mises en avant
      };
    });
    
    console.log(`Voitures importées: ${importedCars.length}`);
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
