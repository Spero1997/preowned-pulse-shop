
import { Car } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Star, StarOff } from "lucide-react";

interface CarFeatureToggleProps {
  car: Car;
  onToggleFeatured: (car: Car) => void;
}

export const CarFeatureToggle = ({ car, onToggleFeatured }: CarFeatureToggleProps) => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => onToggleFeatured(car)}
      className={car.featured ? "text-yellow-500" : "text-gray-500"}
    >
      {car.featured ? <Star /> : <StarOff />}
    </Button>
  );
};
