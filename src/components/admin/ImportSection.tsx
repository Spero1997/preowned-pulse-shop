
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Import, Save, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { fetchCarsFromTakeApp } from "@/utils/importCars";
import { Car } from "@/types/car";
import { toast } from "sonner";

interface ImportSectionProps {
  importedCars: Car[];
  setImportedCars: (cars: Car[]) => void;
}

export const ImportSection = ({ importedCars, setImportedCars }: ImportSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImport = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    setProgress(10);

    try {
      // Simuler une progression
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Récupérer les données
      const cars = await fetchCarsFromTakeApp();
      
      setProgress(100);
      clearInterval(progressInterval);
      
      if (cars.length === 0) {
        setError("Aucune voiture n'a été trouvée. Vérifiez l'URL ou la structure des données.");
        toast.error("Échec de l'importation", {
          description: "Aucune voiture n'a été trouvée"
        });
      } else {
        setImportedCars(cars);
        setSuccess(`Importation réussie ! ${cars.length} voitures ont été importées et seront disponibles sur le site après avoir téléchargé et remplacé le fichier cars.ts.`);
        toast.success("Importation réussie", {
          description: `${cars.length} voitures ont été importées`
        });
      }
    } catch (err) {
      setError(`Erreur lors de l'importation: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
      toast.error("Échec de l'importation", {
        description: "Une erreur s'est produite lors de l'importation"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (importedCars.length === 0) {
      toast.error("Rien à sauvegarder", {
        description: "Importez d'abord des voitures"
      });
      return;
    }

    // Générer le contenu du fichier cars.ts
    const fileContent = `
import { Car } from "../types/car";

export const cars: Car[] = ${JSON.stringify(importedCars, null, 2)};

export const brands = Array.from(new Set(cars.map(car => car.brand))).sort();
export const carTypes = Array.from(new Set(cars.map(car => car.type))).sort();
export const fuelTypes = Array.from(new Set(cars.map(car => car.fuel))).sort();
export const transmissionTypes = Array.from(new Set(cars.map(car => car.transmission))).sort();

export const minPrice = Math.min(...cars.map(car => car.price));
export const maxPrice = Math.max(...cars.map(car => car.price));
export const minYear = Math.min(...cars.map(car => car.year));
export const maxYear = Math.max(...cars.map(car => car.year));
`;

    // Créer un blob et télécharger le fichier
    const blob = new Blob([fileContent], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cars.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Fichier de données généré", {
      description: `Le fichier cars.ts contenant toutes les ${importedCars.length} voitures a été téléchargé. Remplacez le fichier existant dans src/data/.`
    });
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Importation de voitures</CardTitle>
        <CardDescription>
          Importez les voitures depuis votre ancien site Take.app ou utilisez les données de démonstration
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Importation en cours...</p>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-700">Succès</AlertTitle>
            <AlertDescription className="text-green-600">{success}</AlertDescription>
          </Alert>
        )}

        {importedCars.length > 0 && !success && !error && (
          <Alert className="mb-4 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertTitle className="text-blue-700">Information</AlertTitle>
            <AlertDescription className="text-blue-600">
              {importedCars.length} voitures sont prêtes à être téléchargées. Utilisez le bouton ci-dessous pour générer le fichier cars.ts.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={handleImport} 
            disabled={isLoading}
            className="bg-autoBlue hover:bg-autoBlue/90"
          >
            <Import className="mr-2 h-4 w-4" />
            Importer des données de démonstration
          </Button>

          <Button
            variant="outline"
            onClick={handleSave}
            disabled={importedCars.length === 0 || isLoading}
          >
            <Save className="mr-2 h-4 w-4" />
            Télécharger le fichier cars.ts ({importedCars.length} voitures)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
