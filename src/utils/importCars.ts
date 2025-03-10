
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
      try {
        // Extraction de la marque et du modèle à partir du titre
        const titleParts = carData.title.split(' ');
        const brand = titleParts[0] || "Inconnu";
        const model = titleParts.slice(1).join(' ') || "Inconnu";
        
        // Extraction des détails
        const details = carData.details || {};
        
        // Extraction de l'année - rechercher différentes clés possibles
        let year = 2020;
        if (details.year) year = parseInt(details.year);
        else if (details.année) year = parseInt(details.année);
        else if (details["Année"]) year = parseInt(details["Année"]);
        
        // Extraction du kilométrage - rechercher différentes clés possibles
        let mileage = 0;
        if (details.mileage) mileage = parseFloat(details.mileage.replace(/\D/g, ''));
        else if (details.kilométrage) mileage = parseFloat(details.kilométrage.replace(/\D/g, ''));
        else if (details["Kilométrage"]) mileage = parseFloat(details["Kilométrage"].replace(/\D/g, ''));
        
        // Extraction du type de carburant - rechercher différentes clés possibles
        let fuelTypeStr = "Essence";
        if (details.fuel) fuelTypeStr = details.fuel;
        else if (details.carburant) fuelTypeStr = details.carburant;
        else if (details["Carburant"]) fuelTypeStr = details["Carburant"];
        const fuelType = mapFuelType(fuelTypeStr);
        
        // Extraction du type de transmission - rechercher différentes clés possibles
        let transmissionStr = "Manuelle";
        if (details.transmission) transmissionStr = details.transmission;
        else if (details.boîte) transmissionStr = details.boîte;
        else if (details["Boîte"]) transmissionStr = details["Boîte"];
        const transmission = mapTransmissionType(transmissionStr);
        
        // Extraction du type de voiture - rechercher différentes clés possibles
        let typeStr = "Berline";
        if (details.type) typeStr = details.type;
        else if (details.catégorie) typeStr = details.catégorie;
        else if (details["Type"]) typeStr = details["Type"];
        else if (details["Catégorie"]) typeStr = details["Catégorie"];
        const type = mapCarType(typeStr);
        
        // Extraction du nombre de portes - rechercher différentes clés possibles
        let doors = 4;
        if (details.doors) doors = parseInt(details.doors);
        else if (details.portes) doors = parseInt(details.portes);
        else if (details["Portes"]) doors = parseInt(details["Portes"]);
        
        // Extraction de la couleur - rechercher différentes clés possibles
        let color = "Non spécifié";
        if (details.color) color = details.color;
        else if (details.couleur) color = details.couleur;
        else if (details["Couleur"]) color = details["Couleur"];
        
        // Extraction de la puissance - rechercher différentes clés possibles
        let power = 100;
        if (details.power) power = parseInt(details.power.replace(/\D/g, ''));
        else if (details.puissance) power = parseInt(details.puissance.replace(/\D/g, ''));
        else if (details["Puissance"]) power = parseInt(details["Puissance"].replace(/\D/g, ''));
        
        // Extraction des caractéristiques - rechercher différentes clés possibles
        let featuresString = "";
        if (details.features) featuresString = details.features;
        else if (details.équipements) featuresString = details.équipements;
        else if (details["Équipements"]) featuresString = details["Équipements"];
        
        // Séparation des caractéristiques (peuvent être séparées par virgules ou points-virgules)
        const features = featuresString.split(/[,;]/)
          .map(f => f.trim())
          .filter(f => f.length > 0);
        
        // Extraction du prix
        const priceText = carData.price || "0";
        const price = parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
        
        // Génération d'un ID si non présent
        const id = carData.id || `imported-${index}`;
        
        return {
          id,
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
          images: carData.images && carData.images.length > 0 ? carData.images : [
            "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1536&auto=format&fit=crop"
          ],
          color,
          doors,
          isAvailable: true,
          featured: index < 10 // Les 10 premières voitures seront mises en avant
        };
      } catch (err) {
        console.error(`Erreur lors du traitement de la voiture ${carData.id || index}:`, err);
        
        // Retourner une voiture avec des valeurs par défaut en cas d'erreur
        return {
          id: carData.id || `error-${index}`,
          brand: carData.title?.split(' ')[0] || "Inconnu",
          model: carData.title?.split(' ').slice(1).join(' ') || "Inconnu",
          type: "Berline",
          year: 2020,
          mileage: 0,
          price: 0,
          fuel: "Essence",
          transmission: "Manuelle",
          power: 100,
          description: carData.description || "Erreur lors de l'importation",
          features: ["Non spécifié"],
          images: carData.images && carData.images.length > 0 ? carData.images : [
            "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1536&auto=format&fit=crop"
          ],
          color: "Non spécifié",
          doors: 4,
          isAvailable: true,
          featured: false
        };
      }
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
