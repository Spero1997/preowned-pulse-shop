
import { Car, CarType, FuelType, TransmissionType } from "@/types/car";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "./FormField";

interface CarBasicFieldsProps {
  formData: Partial<Car>;
  errors: Record<string, string>;
  carTypes: CarType[];
  fuelTypes: FuelType[];
  transmissionTypes: TransmissionType[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

export const CarBasicFields = ({ 
  formData, 
  errors, 
  carTypes, 
  fuelTypes, 
  transmissionTypes, 
  onChange, 
  onSelectChange 
}: CarBasicFieldsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <FormField id="brand" label="Marque" error={errors.brand}>
        <Input
          id="brand"
          name="brand"
          value={formData.brand || ''}
          onChange={onChange}
          placeholder="Ex: Peugeot"
          className={errors.brand ? "border-red-500" : ""}
        />
      </FormField>
      
      <FormField id="model" label="Modèle" error={errors.model}>
        <Input
          id="model"
          name="model"
          value={formData.model || ''}
          onChange={onChange}
          placeholder="Ex: 308"
          className={errors.model ? "border-red-500" : ""}
        />
      </FormField>
      
      <FormField id="type" label="Type" error={errors.type}>
        <Select
          value={formData.type}
          onValueChange={(value) => onSelectChange("type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un type" />
          </SelectTrigger>
          <SelectContent>
            {carTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
      
      <FormField id="year" label="Année" error={errors.year}>
        <Input
          id="year"
          name="year"
          type="number"
          value={formData.year || ''}
          onChange={onChange}
          className={errors.year ? "border-red-500" : ""}
        />
      </FormField>
      
      <FormField id="price" label="Prix (€)" error={errors.price}>
        <Input
          id="price"
          name="price"
          type="number"
          value={formData.price || ''}
          onChange={onChange}
          className={errors.price ? "border-red-500" : ""}
        />
      </FormField>
      
      <FormField id="mileage" label="Kilométrage" error={errors.mileage}>
        <Input
          id="mileage"
          name="mileage"
          type="number"
          value={formData.mileage || ''}
          onChange={onChange}
          className={errors.mileage ? "border-red-500" : ""}
        />
      </FormField>
      
      <FormField id="fuel" label="Carburant" error={errors.fuel}>
        <Select
          value={formData.fuel}
          onValueChange={(value) => onSelectChange("fuel", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un carburant" />
          </SelectTrigger>
          <SelectContent>
            {fuelTypes.map((fuel) => (
              <SelectItem key={fuel} value={fuel}>
                {fuel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
      
      <FormField id="transmission" label="Transmission" error={errors.transmission}>
        <Select
          value={formData.transmission}
          onValueChange={(value) => onSelectChange("transmission", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une transmission" />
          </SelectTrigger>
          <SelectContent>
            {transmissionTypes.map((transmission) => (
              <SelectItem key={transmission} value={transmission}>
                {transmission}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
      
      <FormField id="power" label="Puissance (ch)" error={errors.power}>
        <Input
          id="power"
          name="power"
          type="number"
          value={formData.power || ''}
          onChange={onChange}
          className={errors.power ? "border-red-500" : ""}
        />
      </FormField>
      
      <FormField id="color" label="Couleur" error={errors.color}>
        <Input
          id="color"
          name="color"
          value={formData.color || ''}
          onChange={onChange}
          placeholder="Ex: Gris Platinium"
          className={errors.color ? "border-red-500" : ""}
        />
      </FormField>
      
      <FormField id="doors" label="Nombre de portes" error={errors.doors}>
        <Input
          id="doors"
          name="doors"
          type="number"
          value={formData.doors || ''}
          onChange={onChange}
          className={errors.doors ? "border-red-500" : ""}
        />
      </FormField>
    </div>
  );
};
