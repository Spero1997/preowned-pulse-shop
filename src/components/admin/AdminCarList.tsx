
import { useState } from "react";
import { Car } from "@/types/car";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatEuro } from "@/lib/utils";
import { 
  Pencil, 
  Trash2, 
  Search, 
  Plus,
  ArrowUpDown,
  Star,
  StarOff
} from "lucide-react";
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

  const handleDelete = (car: Car) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${car.brand} ${car.model} ?`)) {
      onDelete(car.id);
      toast.success("Voiture supprimée", {
        description: `${car.brand} ${car.model} a été supprimé`
      });
    }
  };

  const toggleFeatured = (car: Car) => {
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
        <div className="flex gap-2 items-center mt-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">Vedette</TableHead>
                <TableHead onClick={() => handleSort("brand")} className="cursor-pointer">
                  <div className="flex items-center">
                    Marque
                    {sortBy === "brand" && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === "asc" ? "transform rotate-180" : ""}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("model")} className="cursor-pointer">
                  <div className="flex items-center">
                    Modèle
                    {sortBy === "model" && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === "asc" ? "transform rotate-180" : ""}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("year")} className="cursor-pointer">
                  <div className="flex items-center">
                    Année
                    {sortBy === "year" && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === "asc" ? "transform rotate-180" : ""}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("price")} className="cursor-pointer">
                  <div className="flex items-center">
                    Prix
                    {sortBy === "price" && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === "asc" ? "transform rotate-180" : ""}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCars.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Aucune voiture trouvée
                  </TableCell>
                </TableRow>
              ) : (
                sortedCars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell className="text-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleFeatured(car)}
                        className={car.featured ? "text-yellow-500" : "text-gray-500"}
                      >
                        {car.featured ? <Star /> : <StarOff />}
                      </Button>
                    </TableCell>
                    <TableCell>{car.brand}</TableCell>
                    <TableCell>{car.model}</TableCell>
                    <TableCell>{car.year}</TableCell>
                    <TableCell>{formatEuro(car.price)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => onEdit(car)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(car)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
