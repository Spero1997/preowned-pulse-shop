
export type CarType = 'SUV' | 'Berline' | 'Citadine' | 'Break' | 'Coupé' | 'Cabriolet' | 'Monospace' | 'Utilitaire';

export type FuelType = 'Essence' | 'Diesel' | 'Hybride' | 'Électrique' | 'GPL';

export type TransmissionType = 'Manuelle' | 'Automatique';

export interface Car {
  id: string;
  brand: string;
  model: string;
  type: CarType;
  year: number;
  mileage: number;
  price: number;
  fuel: FuelType;
  transmission: TransmissionType;
  power: number;
  description: string;
  features: string[];
  images: string[];
  color: string;
  doors: number;
  isAvailable: boolean;
  discount?: number;
  featured?: boolean;
}

export interface CarFilters {
  brand?: string[];
  type?: CarType[];
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuel?: FuelType[];
  transmission?: TransmissionType[];
}
