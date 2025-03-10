
import { useState, useEffect } from "react";
import { Car, CarType, FuelType, TransmissionType } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Save, Car as CarIcon } from "lucide-react";
import { toast } from "sonner";
import { CarBasicFields } from "./CarBasicFields";
import { DescriptionField } from "./DescriptionField";
import { FeaturesSection } from "./FeaturesSection";
import { ImagesSection } from "./ImagesSection";

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
    const newErrors: Record<string, string> = {};
    
    if (!formData.brand?.trim()) newErrors.brand = "La marque est requise";
    if (!formData.model?.trim()) newErrors.model = "Le modèle est requis";
    if (!formData.color?.trim()) newErrors.color = "La couleur est requise";
    if (!formData.description?.trim()) newErrors.description = "La description est requise";
    if (formData.year && (formData.year < 1900 || formData.year > new Date().getFullYear() + 1)) {
      newErrors.year = "L'année n'est pas valide";
    }
    if (formData.price && formData.price <= 0) newErrors.price = "Le prix doit être supérieur à 0";
    if (formData.mileage && formData.mileage < 0) newErrors.mileage = "Le kilométrage doit être positif";
    if (formData.power && formData.power <= 0) newErrors.power = "La puissance doit être supérieure à 0";
    if (formData.doors && (formData.doors < 2 || formData.doors > 7)) {
      newErrors.doors = "Le nombre de portes doit être entre 2 et 7";
    }
    if (!formData.images?.length) newErrors.images = "Au moins une image est requise";
    
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
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Annuler
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {car ? "Mettre à jour" : "Ajouter la voiture"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
