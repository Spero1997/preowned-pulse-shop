
import { useState, useEffect } from "react";
import { CarCard } from "./CarCard";
import { Button } from "@/components/ui/button";
import { Car } from "@/types/car";
import { cars } from "@/data/cars";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function FeaturedCars() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  
  useEffect(() => {
    // Sélection des voitures mises en avant ou premières voitures si aucune n'est marquée
    const featured = cars.filter(car => car.featured);
    if (featured.length > 0) {
      setFeaturedCars(featured);
    } else {
      setFeaturedCars(cars.slice(0, 3));
    }
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Nos voitures vedettes</h2>
            <p className="text-gray-600">Découvrez notre sélection de véhicules d'exception</p>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
