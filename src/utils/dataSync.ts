
import { cars } from "@/data/cars";

// Fonction pour récupérer les voitures depuis le localStorage
export const getCarsFromLocalStorage = (): any[] => {
  const storedCars = localStorage.getItem('cars');
  if (storedCars) {
    try {
      return JSON.parse(storedCars);
    } catch (error) {
      console.error('Erreur lors de la récupération des voitures du localStorage:', error);
      return [];
    }
  }
  return [];
};

// Fonction pour synchroniser les voitures avec le localStorage
export const syncCarsWithLocalStorage = () => {
  // Vérifier d'abord si les voitures existent déjà dans le localStorage
  const existingCars = getCarsFromLocalStorage();
  
  // Si pas de voitures dans le localStorage, utiliser celles du fichier par défaut
  if (existingCars.length === 0) {
    localStorage.setItem('cars', JSON.stringify(cars));
    console.log("Synchronisation initiale: Voitures importées dans le localStorage", cars.length);
  } else {
    console.log("Voitures déjà présentes dans le localStorage", existingCars.length);
  }
  
  // Émettre un événement personnalisé pour notifier les composants
  const event = new CustomEvent('carsUpdated', { detail: { source: 'dataSync' } });
  window.dispatchEvent(event);
  
  // Retourner les voitures actuelles
  return getCarsFromLocalStorage().length;
};

// Fonction pour mettre à jour les voitures dans le localStorage
export const updateCarsInLocalStorage = (updatedCars: any[]) => {
  localStorage.setItem('cars', JSON.stringify(updatedCars));
  
  // Émettre un événement personnalisé pour notifier les composants
  const event = new CustomEvent('carsUpdated', { detail: { source: 'carUpdate' } });
  window.dispatchEvent(event);
  
  console.log("Mise à jour: Voitures mises à jour dans le localStorage", updatedCars.length);
  
  return updatedCars.length;
};
