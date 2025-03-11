import { useState, useEffect } from "react";
import { CarCard } from "./CarCard";
import { Button } from "@/components/ui/button";
import { Car } from "@/types/car";
import { cars as initialCars } from "@/data/cars";
import { ArrowRight, AlertCircle, RefreshCw, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function FeaturedCars() {
  const { t, ready } = useTranslation();
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [allCars, setAllCars] = useState<Car[]>(initialCars);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const getLocalCars = (): Car[] => {
    try {
      const localCarsString = localStorage.getItem('cars');
      if (localCarsString) {
        const parsedCars = JSON.parse(localCarsString);
        console.log("FeaturedCars - Voitures récupérées:", parsedCars.length);
        if (Array.isArray(parsedCars) && parsedCars.length > 0) {
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
    }
    
    console.log("FeaturedCars - Utilisation des données initiales par défaut:", initialCars.length, "voitures");
    return initialCars;
  };
  
  const forceRefresh = () => {
    console.log("FeaturedCars - Forçage du rafraîchissement des données");
    setRefreshTrigger(prev => prev + 1);
    
    const updatedCars = getLocalCars();
    setAllCars(updatedCars);
    
    toast.info(ready ? t("featuredCars.refreshing") : "Actualisation...", {
      description: ready 
        ? t("featuredCars.loadingCars", { count: updatedCars.length }) 
        : `Chargement de ${updatedCars.length} voitures...`
    });
  };
  
  useEffect(() => {
    console.log("FeaturedCars - Initialisation du composant");
    
    const currentCars = getLocalCars();
    console.log("FeaturedCars - Chargement initial:", currentCars.length, "voitures");
    setAllCars(currentCars);
    setLoading(false);
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cars') {
        console.log("FeaturedCars - Changement de localStorage détecté");
        const updatedCars = getLocalCars();
        setAllCars(updatedCars);
      }
    };
    
    const handleCustomEvent = (e: CustomEvent) => {
      console.log("FeaturedCars - Événement personnalisé de mise à jour détecté");
      const updatedCars = getLocalCars();
      setAllCars(updatedCars);
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('carsUpdated', handleCustomEvent as EventListener);
    
    const interval = setInterval(() => {
      const updatedCars = getLocalCars();
      if (updatedCars.length !== allCars.length) {
        console.log("FeaturedCars - Mise à jour des voitures détectée par intervalle:", updatedCars.length, "voitures (avant:", allCars.length, ")");
        setAllCars(updatedCars);
      }
    }, 5000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('carsUpdated', handleCustomEvent as EventListener);
      clearInterval(interval);
    };
  }, [refreshTrigger]);
  
  useEffect(() => {
    if (allCars.length === 0) {
      console.log("FeaturedCars - Aucune voiture disponible");
      return;
    }
    
    const featured = allCars.filter(car => car.featured && car.isAvailable);
    console.log(`FeaturedCars - Nombre de voitures vedettes: ${featured.length}`);
    
    if (featured.length > 0) {
      setFeaturedCars(featured.slice(0, 6));
    } else {
      const available = allCars.filter(car => car.isAvailable);
      setFeaturedCars(available.slice(0, 6));
    }
  }, [allCars]);
  
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p>{ready ? t("featuredCars.loading") : "Chargement des voitures..."}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 p-5 border rounded-lg bg-white">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-autoBlue flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-base mb-2">Concessionnaire automobile, nous vendons des voitures d'occasion en Europe. Nous livrons partout.</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div>
                  <h4 className="font-semibold mb-1">Modalités de paiement</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Acompte : 20% à la commande</li>
                    <li>Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)</li>
                    <li>Offre spéciale : -10% pour paiement comptant à la commande</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">Nos services inclus :</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Délai de rétractation : 14 jours (Satisfait ou remboursé)</li>
                    <li>Facilité de paiement : Payable comptant ou en mensualités sans intérêt</li>
                    <li>Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">Garantie :</h4>
                  <p>12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {ready ? t("featuredCars.title") : "Nos voitures en vedette"}
            </h2>
            <p className="text-gray-600">
              {ready 
                ? t("featuredCars.subtitle", { count: allCars.length }) 
                : `Découvrez notre sélection de véhicules exceptionnels parmi notre collection de ${allCars.length} voitures`
              }
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
              {ready ? t("featuredCars.refresh") : "Actualiser"}
            </Button>
            
            <Button 
              variant="link" 
              className="text-autoBlue"
              asChild
            >
              <Link to="/shop" className="flex items-center">
                {ready ? t("featuredCars.viewAllCars") : "Voir toutes les voitures"}
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
              {ready 
                ? t("featuredCars.noFeaturedCars") 
                : "Aucune voiture en vedette n'est disponible pour le moment. Visitez notre boutique pour voir toutes nos voitures."
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
