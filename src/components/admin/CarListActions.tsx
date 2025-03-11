
import { Car } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface CarListActionsProps {
  car: Car;
  onEdit: (car: Car) => void;
  onDelete: (carId: string) => void;
}

export const CarListActions = ({ car, onEdit, onDelete }: CarListActionsProps) => {
  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${car.brand} ${car.model} ?`)) {
      onDelete(car.id);
      toast.success("Voiture supprimée", {
        description: `${car.brand} ${car.model} a été supprimé`
      });
    }
  };

  return (
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
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
