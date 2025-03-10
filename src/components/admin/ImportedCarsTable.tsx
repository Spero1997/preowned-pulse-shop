
import { Car } from "@/types/car";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ImportedCarsTableProps {
  importedCars: Car[];
}

export const ImportedCarsTable = ({ importedCars }: ImportedCarsTableProps) => {
  if (importedCars.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Voitures importées ({importedCars.length})</CardTitle>
        <CardDescription>
          Aperçu des voitures qui ont été importées
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Marque</th>
                <th className="px-4 py-2 text-left">Modèle</th>
                <th className="px-4 py-2 text-left">Année</th>
                <th className="px-4 py-2 text-left">Prix</th>
                <th className="px-4 py-2 text-left">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {importedCars.map((car) => (
                <tr key={car.id}>
                  <td className="px-4 py-2">{car.brand}</td>
                  <td className="px-4 py-2">{car.model}</td>
                  <td className="px-4 py-2">{car.year}</td>
                  <td className="px-4 py-2">{car.price.toLocaleString('fr-FR')} €</td>
                  <td className="px-4 py-2">{car.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        Pour utiliser ces données, téléchargez le fichier et remplacez src/data/cars.ts
      </CardFooter>
    </Card>
  );
};
