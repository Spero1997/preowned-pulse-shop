import { useState, useEffect } from "react";
import { Car, CarType, FuelType, TransmissionType } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Plus, Save, X, Car as CarIcon } from "lucide-react";
import { toast } from "sonner";

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
    images: ['https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1536&auto=format&fit=crop'],
    color: '',
    doors: 5,
    isAvailable: true,
    featured: false
  });
  
  const [newFeature, setNewFeature] = useState("");
  const [newImage, setNewImage] = useState("");
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
        images: ['https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1536&auto=format&fit=crop'],
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

  const addFeature = () => {
    if (newFeature.trim() && formData.features) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    if (formData.features) {
      const updatedFeatures = [...formData.features];
      updatedFeatures.splice(index, 1);
      setFormData({
        ...formData,
        features: updatedFeatures
      });
    }
  };

  const addImage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newImage.trim() && formData.images) {
      setFormData({
        ...formData,
        images: [...formData.images, newImage.trim()]
      });
      setNewImage("");
    } else {
      toast.error("URL d'image invalide", {
        description: "Veuillez entrer une URL d'image valide"
      });
    }
  };

  const removeImage = (index: number) => {
    if (formData.images && formData.images.length > 1) {
      const updatedImages = [...formData.images];
      updatedImages.splice(index, 1);
      setFormData({
        ...formData,
        images: updatedImages
      });
    } else {
      toast.error("Erreur", {
        description: "Vous devez conserver au moins une image"
      });
    }
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
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="brand">Marque</Label>
              <Input
                id="brand"
                name="brand"
                value={formData.brand || ''}
                onChange={handleChange}
                placeholder="Ex: Peugeot"
                className={errors.brand ? "border-red-500" : ""}
              />
              {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model">Modèle</Label>
              <Input
                id="model"
                name="model"
                value={formData.model || ''}
                onChange={handleChange}
                placeholder="Ex: 308"
                className={errors.model ? "border-red-500" : ""}
              />
              {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
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
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Année</Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={formData.year || ''}
                onChange={handleChange}
                className={errors.year ? "border-red-500" : ""}
              />
              {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Prix (€)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price || ''}
                onChange={handleChange}
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mileage">Kilométrage</Label>
              <Input
                id="mileage"
                name="mileage"
                type="number"
                value={formData.mileage || ''}
                onChange={handleChange}
                className={errors.mileage ? "border-red-500" : ""}
              />
              {errors.mileage && <p className="text-red-500 text-sm">{errors.mileage}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fuel">Carburant</Label>
              <Select
                value={formData.fuel}
                onValueChange={(value) => handleSelectChange("fuel", value)}
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
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission</Label>
              <Select
                value={formData.transmission}
                onValueChange={(value) => handleSelectChange("transmission", value)}
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
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="power">Puissance (ch)</Label>
              <Input
                id="power"
                name="power"
                type="number"
                value={formData.power || ''}
                onChange={handleChange}
                className={errors.power ? "border-red-500" : ""}
              />
              {errors.power && <p className="text-red-500 text-sm">{errors.power}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color">Couleur</Label>
              <Input
                id="color"
                name="color"
                value={formData.color || ''}
                onChange={handleChange}
                placeholder="Ex: Gris Platinium"
                className={errors.color ? "border-red-500" : ""}
              />
              {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="doors">Nombre de portes</Label>
              <Input
                id="doors"
                name="doors"
                type="number"
                value={formData.doors || ''}
                onChange={handleChange}
                className={errors.doors ? "border-red-500" : ""}
              />
              {errors.doors && <p className="text-red-500 text-sm">{errors.doors}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
              placeholder="Description détaillée du véhicule..."
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          
          <div className="space-y-4">
            <Label>Caractéristiques</Label>
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Ajouter une caractéristique..."
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={addFeature}
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.features?.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-gray-100 rounded-md px-3 py-1"
                >
                  <span className="mr-2">{feature}</span>
                  <button 
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <Label>Images</Label>
            <div className="flex gap-2">
              <Input
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="URL de l'image..."
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={addImage}
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {formData.images?.map((image, index) => (
                <div key={index} className="relative rounded-md overflow-hidden border h-48">
                  <img 
                    src={image} 
                    alt={`Image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
          </div>
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
