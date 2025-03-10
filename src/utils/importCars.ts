
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
    
    // URL de l'API Take.app - ajoutons un timeout et des options supplémentaires
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
    
    const response = await fetch('https://takeapp-export.vercel.app/api/cars', {
      signal: controller.signal,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      cache: 'no-cache',
      mode: 'cors'
    });
    
    clearTimeout(timeoutId);
    
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
    
    // Si l'erreur est due à un problème réseau, fournir des données de démonstration
    // Cela permet aux utilisateurs de tester l'interface même si le service Take.app n'est pas disponible
    if (error instanceof Error && 
       (error.message.includes('Load failed') || 
        error.message.includes('network') || 
        error.message.includes('abort') ||
        error.message.includes('timeout'))) {
      console.log('Utilisation des données de démonstration suite à une erreur réseau...');
      return getDemoCarsList();
    }
    
    throw error;
  }
};

// Fonction pour générer des données de démonstration en cas d'erreur réseau
function getDemoCarsList(): Car[] {
  const demoCars: Car[] = [
    {
      id: "demo-1",
      brand: "Peugeot",
      model: "3008",
      type: "SUV",
      year: 2022,
      mileage: 15000,
      price: 36900,
      fuel: "Diesel",
      transmission: "Automatique",
      power: 130,
      description: "Peugeot 3008 BlueHDi 130 GT Line, état impeccable, entretien complet, première main.",
      features: ["Toit panoramique", "GPS", "Caméra de recul", "Sièges chauffants"],
      images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1470&auto=format&fit=crop"],
      color: "Gris Platinium",
      doors: 5,
      isAvailable: true,
      featured: true
    },
    {
      id: "demo-2",
      brand: "Renault",
      model: "Clio",
      type: "Citadine",
      year: 2021,
      mileage: 22000,
      price: 18500,
      fuel: "Essence",
      transmission: "Manuelle",
      power: 90,
      description: "Renault Clio TCe 90 Intens, parfait état, carnet d'entretien à jour, faible kilométrage.",
      features: ["Bluetooth", "Régulateur de vitesse", "Climatisation", "Écran tactile"],
      images: ["https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1470&auto=format&fit=crop"],
      color: "Rouge Flamme",
      doors: 5,
      isAvailable: true,
      featured: true
    },
    {
      id: "demo-3",
      brand: "Volkswagen",
      model: "Golf",
      type: "Berline",
      year: 2020,
      mileage: 35000,
      price: 24900,
      fuel: "Essence",
      transmission: "Automatique",
      power: 150,
      description: "Volkswagen Golf TSI 150 R-Line DSG, excellent état, toutes options, garantie constructeur.",
      features: ["Système audio premium", "Jantes alliage 18\"", "Phares LED", "Start/Stop"],
      images: ["https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?q=80&w=1632&auto=format&fit=crop"],
      color: "Blanc Pur",
      doors: 5,
      isAvailable: true,
      featured: true
    },
    {
      id: "demo-4",
      brand: "Audi",
      model: "A3",
      type: "Berline",
      year: 2021,
      mileage: 18000,
      price: 32500,
      fuel: "Hybride",
      transmission: "Automatique",
      power: 204,
      description: "Audi A3 40 TFSI e S line, hybride rechargeable, finition haut de gamme, sous garantie.",
      features: ["Virtual cockpit", "Matrix LED", "Bang & Olufsen", "Alcantara"],
      images: ["https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1374&auto=format&fit=crop"],
      color: "Noir Mythic",
      doors: 5,
      isAvailable: true,
      featured: true
    },
    {
      id: "demo-5",
      brand: "BMW",
      model: "X3",
      type: "SUV",
      year: 2022,
      mileage: 12000,
      price: 58900,
      fuel: "Diesel",
      transmission: "Automatique",
      power: 190,
      description: "BMW X3 xDrive20d M Sport, parfait état, pack technologie, garantie constructeur.",
      features: ["Toit ouvrant", "Affichage tête haute", "Suspension adaptative", "Hayon électrique"],
      images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1374&auto=format&fit=crop"],
      color: "Bleu Phytonic",
      doors: 5,
      isAvailable: true,
      featured: true
    },
    {
      id: "demo-6",
      brand: "Mercedes",
      model: "Classe C",
      type: "Berline",
      year: 2021,
      mileage: 20000,
      price: 45900,
      fuel: "Essence",
      transmission: "Automatique",
      power: 197,
      description: "Mercedes-Benz C200 AMG Line, état irréprochable, entretien complet, première main.",
      features: ["Sièges électriques", "Ambiance lumineuse", "Keyless-Go", "Carplay/Android Auto"],
      images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1470&auto=format&fit=crop"],
      color: "Gris Sélénite",
      doors: 4,
      isAvailable: true,
      featured: true
    },
    {
      id: "demo-7",
      brand: "Toyota",
      model: "Yaris",
      type: "Citadine",
      year: 2022,
      mileage: 8000,
      price: 21900,
      fuel: "Hybride",
      transmission: "Automatique",
      power: 116,
      description: "Toyota Yaris Hybride 116h Collection, comme neuve, faible consommation, garantie constructeur.",
      features: ["Caméra 360°", "Chargeur smartphone à induction", "JBL Premium", "Feux adaptatifs"],
      images: ["https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1536&auto=format&fit=crop"],
      color: "Bi-ton Rouge/Noir",
      doors: 5,
      isAvailable: true,
      featured: true
    },
    {
      id: "demo-8",
      brand: "Citroën",
      model: "C5 Aircross",
      type: "SUV",
      year: 2020,
      mileage: 30000,
      price: 29900,
      fuel: "Diesel",
      transmission: "Automatique",
      power: 130,
      description: "Citroën C5 Aircross BlueHDi 130 EAT8 Shine, confort exceptionnel, très bien entretenu.",
      features: ["Suspensions à butées hydrauliques", "Sièges Advanced Comfort", "ConnectedCAM", "Grip Control"],
      images: ["https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?q=80&w=1470&auto=format&fit=crop"],
      color: "Blanc Nacré",
      doors: 5,
      isAvailable: true,
      featured: true
    }
  ];
  
  return demoCars;
}

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
