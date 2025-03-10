
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
    
    // Modèles de marques pour générer plus de voitures
    const brands = [
      "Peugeot", "Renault", "Citroen", "Dacia", "Audi", "BMW", "Mercedes", 
      "Volkswagen", "Ford", "Toyota", "Nissan", "Hyundai", "Kia", "Fiat", 
      "Seat", "Skoda", "Opel", "Volvo", "Mazda", "Mini"
    ];
    
    const models = {
      "Peugeot": ["108", "208", "308", "508", "2008", "3008", "5008"],
      "Renault": ["Twingo", "Clio", "Captur", "Megane", "Arkana", "Kadjar", "Scenic", "Talisman"],
      "Citroen": ["C1", "C3", "C4", "C5", "C3 Aircross", "C5 Aircross", "Berlingo", "SpaceTourer"],
      "Dacia": ["Sandero", "Duster", "Logan", "Spring", "Jogger"],
      "Audi": ["A1", "A3", "A4", "A5", "A6", "Q3", "Q5", "Q7", "TT"],
      "BMW": ["Serie 1", "Serie 3", "Serie 5", "X1", "X3", "X5", "Z4"],
      "Mercedes": ["Classe A", "Classe C", "Classe E", "GLA", "GLC", "GLE"],
      "Volkswagen": ["Polo", "Golf", "Passat", "T-Roc", "Tiguan", "Touran", "Touareg"],
      "Ford": ["Fiesta", "Focus", "Puma", "Kuga", "Mondeo", "Mustang"],
      "Toyota": ["Aygo", "Yaris", "Corolla", "C-HR", "RAV4", "Camry"],
      "Nissan": ["Micra", "Juke", "Qashqai", "X-Trail", "Leaf"],
      "Hyundai": ["i10", "i20", "i30", "Kona", "Tucson", "Santa Fe"],
      "Kia": ["Picanto", "Rio", "Ceed", "Sportage", "Stonic", "Niro"],
      "Fiat": ["500", "Panda", "Tipo", "500X"],
      "Seat": ["Ibiza", "Leon", "Arona", "Ateca", "Tarraco"],
      "Skoda": ["Fabia", "Scala", "Octavia", "Kamiq", "Karoq", "Kodiaq"],
      "Opel": ["Corsa", "Astra", "Crossland", "Grandland", "Insignia"],
      "Volvo": ["XC40", "XC60", "XC90", "S60", "V60"],
      "Mazda": ["2", "3", "6", "CX-3", "CX-30", "CX-5", "MX-5"],
      "Mini": ["One", "Cooper", "Countryman", "Clubman"]
    };
    
    const types: CarType[] = ["SUV", "Berline", "Citadine", "Break", "Coupé", "Cabriolet", "Monospace", "Utilitaire"];
    const fuels: FuelType[] = ["Essence", "Diesel", "Hybride", "Électrique", "GPL"];
    const transmissions: TransmissionType[] = ["Manuelle", "Automatique"];
    const colors = ["Noir", "Blanc", "Gris", "Bleu", "Rouge", "Vert", "Jaune", "Orange", "Marron", "Beige"];
    
    const features = [
      "Climatisation", "GPS", "Bluetooth", "Régulateur de vitesse", "Aide au stationnement",
      "Vitres électriques", "Sièges chauffants", "Toit ouvrant", "Jantes alliage", "Caméra de recul",
      "Capteurs de stationnement", "Système d'alarme", "Système audio premium", "Keyless Go", 
      "Démarrage sans clé", "Ordinateur de bord", "Volant multifonction", "Feux LED",
      "Phares antibrouillard", "Limiteur de vitesse", "Assistant au maintien de voie",
      "Reconnaissance des panneaux", "Apple CarPlay", "Android Auto"
    ];
    
    const years = Array.from({ length: 10 }, (_, i) => 2015 + i);
    
    // Création de nombreuses voitures factices
    const mockData: TakeAppCar[] = [];
    let idCounter = 1;
    
    // Nombre voulu de voitures (environ 200)
    const targetCarCount = 215;
    
    // Ajouter les 4 voitures existantes pour garder une consistance avec les tests précédents
    mockData.push({
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
    });
    
    mockData.push({
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
    });
    
    mockData.push({
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
    });
    
    mockData.push({
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
    });
    
    idCounter = 5; // Commencer à partir de 5 puisque nous avons déjà 4 voitures
    
    // Images de voitures diverses pour les nouvelles voitures générées
    const carImages = [
      ["https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1470&auto=format&fit=crop", 
       "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1470&auto=format&fit=crop"],
      ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1470&auto=format&fit=crop", 
       "https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=1470&auto=format&fit=crop"],
      ["https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1525&auto=format&fit=crop", 
       "https://images.unsplash.com/photo-1592005849958-1bdcee39bede?q=80&w=1349&auto=format&fit=crop"],
      ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1470&auto=format&fit=crop", 
       "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1528&auto=format&fit=crop"],
      ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1374&auto=format&fit=crop", 
       "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1470&auto=format&fit=crop"],
      ["https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=1364&auto=format&fit=crop", 
       "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1470&auto=format&fit=crop"],
      ["https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=1378&auto=format&fit=crop", 
       "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?q=80&w=1470&auto=format&fit=crop"],
      ["https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1470&auto=format&fit=crop", 
       "https://images.unsplash.com/photo-1610915615744-5d50e9b908c6?q=80&w=1528&auto=format&fit=crop"],
      ["https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1536&auto=format&fit=crop", 
       "https://images.unsplash.com/photo-1576220258822-2a6ecce9b616?q=80&w=1364&auto=format&fit=crop"],
      ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1470&auto=format&fit=crop", 
       "https://images.unsplash.com/photo-1641326201918-3cafc641038e?q=80&w=1528&auto=format&fit=crop"]
    ];
    
    // Générer le reste des voitures pour atteindre environ 200 voitures
    while (mockData.length < targetCarCount) {
      const brandIndex = Math.floor(Math.random() * brands.length);
      const brand = brands[brandIndex];
      const modelArray = models[brand as keyof typeof models] || ["Unknown"];
      const model = modelArray[Math.floor(Math.random() * modelArray.length)];
      
      const randomYear = years[Math.floor(Math.random() * years.length)];
      const mileage = Math.floor(Math.random() * 100000) + 5000;
      const price = Math.floor(Math.random() * 30000) + 8000;
      const fuelIndex = Math.floor(Math.random() * fuels.length);
      const transmissionIndex = Math.floor(Math.random() * transmissions.length);
      const typeIndex = Math.floor(Math.random() * types.length);
      const colorIndex = Math.floor(Math.random() * colors.length);
      const doors = Math.random() > 0.7 ? 3 : 5; // 30% de chance d'avoir 3 portes
      const power = Math.floor(Math.random() * 200) + 70;
      
      // Sélectionner aléatoirement 3 à 6 équipements
      const numFeatures = Math.floor(Math.random() * 4) + 3;
      const selectedFeatures = [];
      const featuresCopy = [...features];
      for (let i = 0; i < numFeatures; i++) {
        const index = Math.floor(Math.random() * featuresCopy.length);
        selectedFeatures.push(featuresCopy[index]);
        featuresCopy.splice(index, 1);
      }
      
      // Sélectionner une paire d'images aléatoire
      const imageIndex = Math.floor(Math.random() * carImages.length);
      
      const descriptions = [
        `${brand} ${model} en excellent état. Faible kilométrage et bien entretenu.`,
        `Superbe ${brand} ${model} avec des options premium. À voir absolument.`,
        `${brand} ${model} très économique et fiable. Parfait pour un usage quotidien.`,
        `${brand} ${model} sportif et élégant. Performances et confort garantis.`,
        `${brand} ${model} familial et spacieux. Idéal pour les longs trajets.`,
        `${brand} ${model} compact et maniable. Parfait pour la ville.`,
        `${brand} ${model} robuste et polyvalent. Adapté à tous types de terrains.`,
        `${brand} ${model} récent avec toutes les options modernes. Une affaire à ne pas manquer.`,
        `${brand} ${model} au style distinctif. Se démarque sur la route.`,
        `${brand} ${model} économique en carburant. Faibles coûts d'entretien.`
      ];
      
      const descriptionIndex = Math.floor(Math.random() * descriptions.length);
      
      mockData.push({
        id: idCounter.toString().padStart(3, '0'),
        title: `${brand} ${model}`,
        description: descriptions[descriptionIndex],
        price: `${price}€`,
        images: carImages[imageIndex],
        details: {
          année: randomYear.toString(),
          kilométrage: mileage.toString(),
          carburant: fuels[fuelIndex],
          boîte: transmissions[transmissionIndex],
          catégorie: types[typeIndex],
          portes: doors.toString(),
          couleur: colors[colorIndex],
          puissance: power.toString(),
          équipements: selectedFeatures.join(', ')
        }
      });
      
      idCounter++;
    }
    
    console.log(`Nombre de voitures générées: ${mockData.length}`);
    
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
        featured: index < Math.min(20, mockData.length * 0.1) // 10% des voitures seront mises en avant, maximum 20
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
