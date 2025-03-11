
import { cars } from "@/data/cars";

export const syncCarsWithLocalStorage = () => {
  // Stocker les voitures dans le localStorage
  localStorage.setItem('cars', JSON.stringify(cars));
  
  // Émettre un événement personnalisé pour notifier les composants
  const event = new CustomEvent('carsUpdated', { detail: { source: 'dataSync' } });
  window.dispatchEvent(event);
  
  console.log("Synchronisation des données: Voitures synchronisées avec le localStorage", cars.length);
  
  return cars.length;
};
