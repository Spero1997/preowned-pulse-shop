
import { useState, useEffect } from "react";
import { Car, CarType, FuelType, TransmissionType } from "@/types/car";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Car as CarIcon } from "lucide-react";
import { toast } from "sonner";
import { CarBasicFields } from "./CarBasicFields";
import { DescriptionField } from "./DescriptionField";
import { FeaturesSection } from "./FeaturesSection";
import { ImagesSection } from "./ImagesSection";
import { CarStatusFields } from "./CarStatusFields";
import { CarFormActions } from "./CarFormActions";
import { validateCarForm } from "@/utils/carFormValidation";

interface AdminCarFormProps {
  car: Car | null;
  onSubmit: (car: Car) => void;
  onCancel: () => void;
}

const carTypes: CarType[] = ['Berline', 'SUV', 'Citadine', 'Break', 'Coupé', 'Cabriolet', 'Monospace', 'Utilitaire'];
const fuelTypes: FuelType[] = ['Essence', 'Diesel', 'Hybride', 'Électrique', 'GPL'];
const transmissionTypes: TransmissionType[] = ['Manuelle', 'Automatique'];

export const AdminCarForm = ({ car, onSubmit, onCancel }: AdminCarFormProps) => {
  const [formData, setFormData] = useState<Partial<Car>>({
    brand: '',
    model: '',
    type: 'Berline',
    year: new Date().getFullYear(),
    mileage: 0,
    price: 0,
    fuel: 'Essence',
    transmission: 'Manuelle',
    power: 0,
    description: '',
    features: [],
    images: [],
    color: '',
    doors: 5,
    isAvailable: true,
    featured: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (car) {
      setFormData(car);
    } else {
      setFormData({
        brand: '',
        model: '',
        type: 'Berline',
        year: new Date().getFullYear(),
        mileage: 0,
        price: 0,
        fuel: 'Essence',
        transmission: 'Manuelle',
        power: 0,
        description: '',
        features: [],
        images: [],
        color: '',
        doors: 5,
        isAvailable: true,
        featured: false
      });
    }
  }, [car]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    let parsedValue: string | number = value;
    
    if (['year', 'mileage', 'price', 'power', 'doors'].includes(name)) {
      parsedValue = value === '' ? 0 : Number(value);
    }
    
    setFormData({
      ...formData,
      [name]: parsedValue
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleStatusChange = (name: string, value: boolean) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFeaturesChange = (features: string[]) => {
    setFormData({
      ...formData,
      features
    });
  };

  const handleImagesChange = (images: string[]) => {
    setFormData({
      ...formData,
      images
    });
  };

  const validateForm = (): boolean => {
    const newErrors = validateCarForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData as Car);
      toast.success(car ? "Voiture mise à jour" : "Voiture ajoutée", {
        description: `${formData.brand} ${formData.model} a été ${car ? "mise à jour" : "ajoutée"} avec succès`
      });
    } else {
      toast.error("Erreur dans le formulaire", {
        description: "Veuillez corriger les erreurs avant de soumettre"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CarIcon className="h-6 w-6" />
          {car ? "Modifier une voiture" : "Ajouter une nouvelle voiture"}
        </CardTitle>
        <CardDescription>
          {car 
            ? `Modification de ${car.brand} ${car.model}`
            : "Remplissez le formulaire pour ajouter une nouvelle voiture à votre inventaire"
          }
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <CarBasicFields 
            formData={formData}
            errors={errors}
            carTypes={carTypes}
            fuelTypes={fuelTypes}
            transmissionTypes={transmissionTypes}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
          />
          
          <DescriptionField 
            description={formData.description || ''}
            error={errors.description}
            onChange={handleChange}
          />
          
          <FeaturesSection 
            features={formData.features || []}
            onFeaturesChange={handleFeaturesChange}
          />
          
          <ImagesSection 
            images={formData.images || []}
            onImagesChange={handleImagesChange}
            error={errors.images}
          />
          
          <CarStatusFields
            isAvailable={formData.isAvailable || true}
            featured={formData.featured || false}
            onStatusChange={handleStatusChange}
          />
        </CardContent>
        
        <CarFormActions
          isEditing={!!car}
          onCancel={onCancel}
        />
      </form>
    </Card>
  );
};
