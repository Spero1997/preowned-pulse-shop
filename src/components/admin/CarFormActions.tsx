
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface CarFormActionsProps {
  isEditing: boolean;
  onCancel: () => void;
}

export const CarFormActions = ({ isEditing, onCancel }: CarFormActionsProps) => {
  const { t } = useTranslation();
  
  return (
    <CardFooter className="flex justify-between">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
      >
        Annuler
      </Button>
      <Button type="submit">
        <Save className="h-4 w-4 mr-2" />
        {isEditing ? "Mettre à jour" : "Ajouter la voiture"}
      </Button>
    </CardFooter>
  );
};
