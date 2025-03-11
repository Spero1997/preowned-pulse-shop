
import { useState } from "react";
import { Car } from "@/types/car";
import { CarListTable } from "./CarListTable";
import { CarSearch } from "./CarSearch";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface AdminCarListProps {
  cars: Car[];
  onEdit: (car: Car) => void;
  onDelete: (carId: string) => void;
}

export const AdminCarList = ({ cars, onEdit, onDelete }: AdminCarListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof Car>("brand");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof Car) => {
    if (sortBy === column) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const handleToggleFeatured = (car: Car) => {
    const updatedCar = { 
      ...car, 
      featured: !car.featured 
    };
    
    // Mettre à jour la voiture avec le statut "featured" inversé
    onEdit(updatedCar);
    
    toast.success(`${car.featured ? "Retirée des" : "Ajoutée aux"} véhicules en vedette`, {
      description: `${car.brand} ${car.model} ${car.featured ? "n'est plus" : "est maintenant"} en vedette`
    });
  };

  // Filtrer les voitures en fonction du terme de recherche
  const filteredCars = cars.filter(car => {
    const searchString = `${car.brand} ${car.model} ${car.type} ${car.fuel}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  // Trier les voitures
  const sortedCars = [...filteredCars].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Catalogue de voitures ({filteredCars.length})</span>
        </CardTitle>
        <CardDescription>
          Gérez votre inventaire de véhicules
        </CardDescription>
        <CarSearch 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
      </CardHeader>
      <CardContent>
        <CarListTable 
          cars={sortedCars}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFeatured={handleToggleFeatured}
        />
      </CardContent>
    </Card>
  );
};
