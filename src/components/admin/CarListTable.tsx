
import { Car } from "@/types/car";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { formatEuro } from "@/lib/utils";
import { CarListActions } from "./CarListActions";
import { CarFeatureToggle } from "./CarFeatureToggle";
import { ArrowUpDown } from "lucide-react";

interface CarListTableProps {
  cars: Car[];
  sortBy: keyof Car;
  sortDirection: "asc" | "desc";
  onSort: (column: keyof Car) => void;
  onEdit: (car: Car) => void;
  onDelete: (carId: string) => void;
  onToggleFeatured: (car: Car) => void;
}

export const CarListTable = ({
  cars,
  sortBy,
  sortDirection,
  onSort,
  onEdit,
  onDelete,
  onToggleFeatured
}: CarListTableProps) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">Vedette</TableHead>
            <TableHead onClick={() => onSort("brand")} className="cursor-pointer">
              <SortableColumn 
                title="Marque" 
                isActive={sortBy === "brand"} 
                direction={sortDirection} 
              />
            </TableHead>
            <TableHead onClick={() => onSort("model")} className="cursor-pointer">
              <SortableColumn 
                title="Modèle" 
                isActive={sortBy === "model"} 
                direction={sortDirection} 
              />
            </TableHead>
            <TableHead onClick={() => onSort("year")} className="cursor-pointer">
              <SortableColumn 
                title="Année" 
                isActive={sortBy === "year"} 
                direction={sortDirection} 
              />
            </TableHead>
            <TableHead onClick={() => onSort("price")} className="cursor-pointer">
              <SortableColumn 
                title="Prix" 
                isActive={sortBy === "price"} 
                direction={sortDirection} 
              />
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                Aucune voiture trouvée
              </TableCell>
            </TableRow>
          ) : (
            cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell className="text-center">
                  <CarFeatureToggle 
                    car={car} 
                    onToggleFeatured={onToggleFeatured} 
                  />
                </TableCell>
                <TableCell>{car.brand}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{formatEuro(car.price)}</TableCell>
                <TableCell>
                  <CarListActions 
                    car={car} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

interface SortableColumnProps {
  title: string;
  isActive: boolean;
  direction: "asc" | "desc";
}

const SortableColumn = ({ title, isActive, direction }: SortableColumnProps) => {
  return (
    <div className="flex items-center">
      {title}
      {isActive && (
        <ArrowUpDown className={`ml-1 h-4 w-4 ${direction === "asc" ? "transform rotate-180" : ""}`} />
      )}
    </div>
  );
};
