
import { Car } from "@/types/car";
import { FormField } from "./FormField";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CarStatusFieldsProps {
  isAvailable: boolean;
  featured: boolean;
  onStatusChange: (name: string, value: boolean) => void;
}

export const CarStatusFields = ({ 
  isAvailable, 
  featured, 
  onStatusChange 
}: CarStatusFieldsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <FormField id="isAvailable" label="Disponibilité">
        <div className="flex items-center space-x-2">
          <Switch 
            id="isAvailable" 
            checked={isAvailable} 
            onCheckedChange={(checked) => onStatusChange("isAvailable", checked)} 
          />
          <Label htmlFor="isAvailable" className="cursor-pointer">
            {isAvailable ? "Disponible" : "Non disponible"}
          </Label>
        </div>
      </FormField>
      
      <FormField id="featured" label="Mettre en avant">
        <div className="flex items-center space-x-2">
          <Switch 
            id="featured" 
            checked={featured} 
            onCheckedChange={(checked) => onStatusChange("featured", checked)} 
          />
          <Label htmlFor="featured" className="cursor-pointer">
            {featured ? "En vedette" : "Standard"}
          </Label>
        </div>
      </FormField>
    </div>
  );
};
