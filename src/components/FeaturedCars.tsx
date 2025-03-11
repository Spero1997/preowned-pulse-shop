
import { useState, useEffect } from "react";
import { CarCard } from "./CarCard";
import { Button } from "@/components/ui/button";
import { Car } from "@/types/car";
import { cars as initialCars } from "@/data/cars";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function FeaturedCars() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [allCars, setAllCars] = useState<Car[]>(initialCars);
  const [loading, setLoading] = useState(true);
  
  // Fonction pour obtenir les voitures stockées localement dans le localStorage
  const getLocalCars = (): Car[] => {
    try {
      const localCarsString = localStorage.getItem('cars');
      if (localCarsString) {
        return JSON.parse(localCarsString);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des voitures locales:", error);
    }
    return initialCars;
  };
  
  useEffect(() => {
    // Récupérer les voitures du localStorage au chargement initial et définir l'état
    const currentCars = getLocalCars();
    console.log("Chargement initial:", currentCars.length, "voitures");
    setAllCars(currentCars);
    setLoading(false);
    
    // Mettre en place un écouteur d'événements pour détecter les changements de localStorage
    const handleStorageChange = () => {
      const updatedCars = getLocalCars();
      console.log("Changement de localStorage détecté:", updatedCars.length, "voitures");
      setAllCars(updatedCars);
    };
    
    // Ajouter l'écouteur d'événements
    window.addEventListener('storage', handleStorageChange);
    
    // Vérifier à intervalles réguliers aussi, au cas où
    const interval = setInterval(() => {
      const updatedCars = getLocalCars();
      if (updatedCars.length !== allCars.length) {
        console.log("Mise à jour des voitures détectée par intervalle:", updatedCars.length, "voitures");
        setAllCars(updatedCars);
      }
    }, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);
  
  useEffect(() => {
    if (allCars.length === 0) return;
    
    // Prioritize featured cars first
    const featured = allCars.filter(car => car.featured && car.isAvailable);
    console.log(`Nombre de voitures vedettes: ${featured.length}`);
    
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
          <Button 
            variant="link" 
            className="text-autoBlue mt-4 md:mt-0"
            asChild
          >
            <Link to="/shop" className="flex items-center">
              Voir toutes les voitures
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {featuredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Aucune voiture vedette n'est disponible pour le moment. Consultez notre boutique pour voir toutes nos voitures.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
