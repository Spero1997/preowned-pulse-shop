
import { Car } from "@/types/car";

export const validateCarForm = (formData: Partial<Car>): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!formData.brand?.trim()) errors.brand = "La marque est requise";
  if (!formData.model?.trim()) errors.model = "Le modèle est requis";
  if (!formData.color?.trim()) errors.color = "La couleur est requise";
  if (!formData.description?.trim()) errors.description = "La description est requise";
  
  if (formData.year && (formData.year < 1900 || formData.year > new Date().getFullYear() + 1)) {
    errors.year = "L'année n'est pas valide";
  }
  
  if (formData.price && formData.price <= 0) errors.price = "Le prix doit être supérieur à 0";
  if (formData.mileage && formData.mileage < 0) errors.mileage = "Le kilométrage doit être positif";
  if (formData.power && formData.power <= 0) errors.power = "La puissance doit être supérieure à 0";
  
  if (formData.doors && (formData.doors < 2 || formData.doors > 7)) {
    errors.doors = "Le nombre de portes doit être entre 2 et 7";
  }
  
  if (!formData.images?.length) errors.images = "Au moins une image est requise";
  
  return errors;
};
