
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function applyFilters<T>(items: T[], filters: Record<string, any>, config: Record<string, (item: T, filterValue: any) => boolean>): T[] {
  return items.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      // Si la valeur du filtre est vide ou undefined, on skip ce filtre
      if (value === undefined || (Array.isArray(value) && value.length === 0)) {
        return true;
      }
      
      // Si on a une fonction de config pour ce filtre, on l'utilise
      if (config[key]) {
        return config[key](item, value);
      }
      
      return true;
    });
  });
}
