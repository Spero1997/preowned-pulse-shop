
import { useState, useEffect } from "react";
import { CarCard } from "./CarCard";
import { Button } from "@/components/ui/button";
import { Car } from "@/types/car";
import { cars as initialCars } from "@/data/cars";
import { ArrowRight, AlertCircle, Car as CarIcon, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function FeaturedCars() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [allCars, setAllCars] = useState<Car[]>(initialCars);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Fonction pour obtenir les voitures stockées localement dans le localStorage
  const getLocalCars = (): Car[] => {
    try {
      const localCarsString = localStorage.getItem('cars');
      if (localCarsString) {
        const parsedCars = JSON.parse(localCarsString);
        console.log("FeaturedCars - Voitures récupérées:", parsedCars.length);
        if (Array.isArray(parsedCars) && parsedCars.length > 0) {
          // Vérifie si le nombre de voitures a changé
          if (allCars.length !== parsedCars.length) {
            console.log("FeaturedCars - Nombre de voitures a changé de", allCars.length, "à", parsedCars.length);
          }
          return parsedCars;
        } else {
          console.warn("FeaturedCars - Données récupérées invalides ou vides, utilisation des données par défaut");
        }
      } else {
        console.log("FeaturedCars - Aucune donnée dans localStorage, utilisation des données par défaut");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des voitures locales:", error);
      toast.error("Erreur de données", {
        description: "Impossible de récupérer les voitures du stockage local"
      });
    }
    
    // Important: Initialiser avec les voitures par défaut si rien n'est trouvé
    // Cela garantit que des voitures sont toujours affichées
    console.log("FeaturedCars - Utilisation des données initiales par défaut:", initialCars.length, "voitures");
    return initialCars;
  };
  
  const forceRefresh = () => {
    console.log("FeaturedCars - Forçage du rafraîchissement des données");
    setRefreshTrigger(prev => prev + 1);
    
    // Lire directement depuis localStorage et mettre à jour l'état
    const updatedCars = getLocalCars();
    setAllCars(updatedCars);
    
    toast.info("Actualisation en cours", {
      description: `Chargement de ${updatedCars.length} voitures...`
    });
  };
  
  // Effet initial pour charger les données
  useEffect(() => {
    console.log("FeaturedCars - Initialisation du composant");
    
    // Récupérer les voitures du localStorage au chargement initial et définir l'état
    const currentCars = getLocalCars();
    console.log("FeaturedCars - Chargement initial:", currentCars.length, "voitures");
    setAllCars(currentCars);
    setLoading(false);
    
    // Mettre en place un écouteur d'événements pour détecter les changements de localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cars') {
        console.log("FeaturedCars - Changement de localStorage détecté");
        const updatedCars = getLocalCars();
        setAllCars(updatedCars);
      }
    };
    
    // Crée un événement personnalisé pour communiquer entre les composants
    const handleCustomEvent = (e: CustomEvent) => {
      console.log("FeaturedCars - Événement personnalisé de mise à jour détecté");
      const updatedCars = getLocalCars();
      setAllCars(updatedCars);
    };
    
    // Ajouter les écouteurs d'événements
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('carsUpdated', handleCustomEvent as EventListener);
    
    // Vérifier à intervalles réguliers
    const interval = setInterval(() => {
      const updatedCars = getLocalCars();
      if (updatedCars.length !== allCars.length) {
        console.log("FeaturedCars - Mise à jour des voitures détectée par intervalle:", updatedCars.length, "voitures (avant:", allCars.length, ")");
        setAllCars(updatedCars);
      }
    }, 1000); // Réduit à 1 seconde pour être plus réactif
    
    // Force rafraîchissement direct au montage
    const initialCheck = setTimeout(() => {
      const freshCars = getLocalCars();
      console.log("FeaturedCars - Vérification initiale:", freshCars.length, "voitures");
      setAllCars(freshCars);
    }, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('carsUpdated', handleCustomEvent as EventListener);
      clearInterval(interval);
      clearTimeout(initialCheck);
    };
  }, [refreshTrigger]); // Ajout de refreshTrigger pour forcer le rechargement

  // Force une mise à jour lors du montage initial de la page
  useEffect(() => {
    const directCheck = setTimeout(() => {
      forceRefresh();
    }, 100);
    
    return () => clearTimeout(directCheck);
  }, []);
  
  // Filtrer les voitures vedettes quand la liste de voitures change
  useEffect(() => {
    if (allCars.length === 0) {
      console.log("FeaturedCars - Aucune voiture disponible");
      return;
    }
    
    // Prioritize featured cars first
    const featured = allCars.filter(car => car.featured && car.isAvailable);
    console.log(`FeaturedCars - Nombre de voitures vedettes: ${featured.length}`);
    
    // If we have featured cars, show them, otherwise take the first 6 cars
    if (featured.length > 0) {
      // Display up to 6 featured cars
      setFeaturedCars(featured.slice(0, 6));
    } else {
      // If no featured cars, take the first 6 available from the entire collection
      const available = allCars.filter(car => car.isAvailable);
      setFeaturedCars(available.slice(0, 6));
    }
  }, [allCars]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p>Chargement des voitures...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Nos voitures vedettes</h2>
            <p className="text-gray-600">
              Découvrez notre sélection de véhicules d'exception parmi notre collection de {allCars.length} voitures
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={forceRefresh}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Rafraîchir
            </Button>
            
            <Button 
              variant="link" 
              className="text-autoBlue"
              asChild
            >
              <Link to="/shop" className="flex items-center">
                Voir toutes les voitures
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        {featuredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <p className="text-gray-600">
              Aucune voiture vedette n'est disponible pour le moment. Consultez notre boutique pour voir toutes nos voitures.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
