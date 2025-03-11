
import { Car } from "../types/car";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { formatEuro } from "@/lib/utils";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <div className="car-card group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
      {car.featured && (
        <Badge className="absolute top-2 left-2 z-10 bg-autoBlue">Vedette</Badge>
      )}
      {car.discount && (
        <Badge className="absolute top-2 right-2 z-10 bg-autoOrange">-{car.discount}€</Badge>
      )}
      
      <Link to={`/car/${car.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={car.images[0]} 
            alt={`${car.brand} ${car.model}`} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg">{car.brand} {car.model}</h3>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-autoOrange">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="bg-gray-100">
              {car.year}
            </Badge>
            <Badge variant="outline" className="bg-gray-100">
              {car.mileage.toLocaleString()} km
            </Badge>
            <Badge variant="outline" className="bg-gray-100">
              {car.fuel}
            </Badge>
            <Badge variant="outline" className="bg-gray-100">
              {car.transmission}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div>
              {car.discount ? (
                <div>
                  <span className="text-gray-500 line-through text-sm mr-2">
                    {formatEuro(car.price + car.discount)}
                  </span>
                  <span className="font-bold text-lg text-autoBlue">
                    {formatEuro(car.price)}
                  </span>
                </div>
              ) : (
                <span className="font-bold text-lg text-autoBlue">
                  {formatEuro(car.price)}
                </span>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" variant="default" className="bg-autoOrange hover:bg-autoOrange/90">
                <ShoppingCart className="h-4 w-4 mr-1" />
                Réserver
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
