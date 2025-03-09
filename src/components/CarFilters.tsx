
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Filter, X } from "lucide-react";
import { CarFilters as CarFiltersType } from "@/types/car";
import { brands, carTypes, fuelTypes, transmissionTypes, minPrice, maxPrice, minYear, maxYear } from "@/data/cars";
import { cn } from "@/lib/utils";

interface FiltersProps {
  filters: CarFiltersType;
  onChange: (filters: CarFiltersType) => void;
}

export function CarFilters({ filters, onChange }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<CarFiltersType>(filters);
  
  const handleCheckboxChange = (field: keyof CarFiltersType, value: string) => {
    const currentValues = localFilters[field] as string[] || [];
    
    if (currentValues.includes(value)) {
      setLocalFilters({
        ...localFilters,
        [field]: currentValues.filter(v => v !== value)
      });
    } else {
      setLocalFilters({
        ...localFilters,
        [field]: [...currentValues, value]
      });
    }
  };
  
  const handleRangeChange = (field: 'minPrice' | 'maxPrice' | 'minYear' | 'maxYear', value: number) => {
    setLocalFilters({
      ...localFilters,
      [field]: value
    });
  };
  
  const applyFilters = () => {
    onChange(localFilters);
    setIsOpen(false);
  };
  
  const clearFilters = () => {
    const emptyFilters = {
      brand: [],
      type: [],
      fuel: [],
      transmission: [],
      minPrice: minPrice,
      maxPrice: maxPrice,
      minYear: minYear,
      maxYear: maxYear,
    };
    setLocalFilters(emptyFilters);
    onChange(emptyFilters);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Filter className="h-4 w-4" />
          Filtres
        </Button>
        
        {Object.values(filters).some(value => 
          Array.isArray(value) ? value.length > 0 : value !== undefined
        ) && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500"
            onClick={clearFilters}
          >
            Réinitialiser
          </Button>
        )}
      </div>
      
      <div className={cn(
        "transition-all duration-300 overflow-hidden bg-white border rounded-lg shadow-sm",
        isOpen ? "max-h-[2000px] opacity-100 p-4" : "max-h-0 opacity-0 p-0 border-0"
      )}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">Filtrer les voitures</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Marques */}
          <div>
            <h4 className="font-medium mb-2">Marques</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {brands.map(brand => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brand-${brand}`} 
                    checked={(localFilters.brand || []).includes(brand)}
                    onCheckedChange={() => handleCheckboxChange('brand', brand)}
                  />
                  <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Types de voitures */}
          <div>
            <h4 className="font-medium mb-2">Types de véhicules</h4>
            <div className="space-y-2">
              {carTypes.map(type => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`type-${type}`} 
                    checked={(localFilters.type || []).includes(type)}
                    onCheckedChange={() => handleCheckboxChange('type', type)}
                  />
                  <Label htmlFor={`type-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carburant */}
          <div>
            <h4 className="font-medium mb-2">Carburant</h4>
            <div className="space-y-2">
              {fuelTypes.map(fuel => (
                <div key={fuel} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`fuel-${fuel}`} 
                    checked={(localFilters.fuel || []).includes(fuel)}
                    onCheckedChange={() => handleCheckboxChange('fuel', fuel)}
                  />
                  <Label htmlFor={`fuel-${fuel}`}>{fuel}</Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Transmission */}
          <div>
            <h4 className="font-medium mb-2">Transmission</h4>
            <div className="space-y-2">
              {transmissionTypes.map(transmission => (
                <div key={transmission} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`transmission-${transmission}`} 
                    checked={(localFilters.transmission || []).includes(transmission)}
                    onCheckedChange={() => handleCheckboxChange('transmission', transmission)}
                  />
                  <Label htmlFor={`transmission-${transmission}`}>{transmission}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prix */}
          <div>
            <h4 className="font-medium mb-2">Prix</h4>
            <div className="px-2">
              <Slider
                min={minPrice}
                max={maxPrice}
                step={1000}
                value={[localFilters.minPrice || minPrice, localFilters.maxPrice || maxPrice]}
                onValueChange={([min, max]) => {
                  handleRangeChange('minPrice', min);
                  handleRangeChange('maxPrice', max);
                }}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{(localFilters.minPrice || minPrice).toLocaleString()}€</span>
                <span>{(localFilters.maxPrice || maxPrice).toLocaleString()}€</span>
              </div>
            </div>
          </div>
          
          {/* Année */}
          <div>
            <h4 className="font-medium mb-2">Année</h4>
            <div className="px-2">
              <Slider
                min={minYear}
                max={maxYear}
                step={1}
                value={[localFilters.minYear || minYear, localFilters.maxYear || maxYear]}
                onValueChange={([min, max]) => {
                  handleRangeChange('minYear', min);
                  handleRangeChange('maxYear', max);
                }}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{localFilters.minYear || minYear}</span>
                <span>{localFilters.maxYear || maxYear}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
          >
            Annuler
          </Button>
          <Button 
            className="bg-autoBlue hover:bg-autoBlue/90"
            onClick={applyFilters}
          >
            Appliquer les filtres
          </Button>
        </div>
      </div>
    </div>
  );
}
