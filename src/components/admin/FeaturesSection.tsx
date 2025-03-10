
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface FeaturesSectionProps {
  features: string[];
  onFeaturesChange: (features: string[]) => void;
}

export const FeaturesSection = ({ features, onFeaturesChange }: FeaturesSectionProps) => {
  const [newFeature, setNewFeature] = useState("");

  const addFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFeature.trim()) {
      onFeaturesChange([...features, newFeature.trim()]);
      setNewFeature("");
      toast.success("Caractéristique ajoutée", {
        description: `"${newFeature.trim()}" a été ajouté aux caractéristiques`
      });
    } else {
      toast.error("Caractéristique invalide", {
        description: "Veuillez entrer une caractéristique valide"
      });
    }
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    onFeaturesChange(updatedFeatures);
    toast.success("Caractéristique supprimée", {
      description: "La caractéristique a été supprimée"
    });
  };

  return (
    <div className="space-y-4">
      <Label>Caractéristiques</Label>
      <div className="flex gap-2">
        <Input
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          placeholder="Ajouter une caractéristique..."
          className="flex-1"
        />
        <Button 
          type="button" 
          onClick={addFeature}
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="flex items-center bg-gray-100 rounded-md px-3 py-1"
          >
            <span className="mr-2">{feature}</span>
            <button 
              type="button"
              onClick={() => removeFeature(index)}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
