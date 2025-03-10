
import { Car } from "@/types/car";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ImportedCarsTableProps {
  importedCars: Car[];
}

export const ImportedCarsTable = ({ importedCars }: ImportedCarsTableProps) => {
  if (importedCars.length === 0) {
    return null;
  }
  
  // Compter les voitures par marque
  const brandCounts: Record<string, number> = {};
  importedCars.forEach(car => {
    brandCounts[car.brand] = (brandCounts[car.brand] || 0) + 1;
  });
  
  // Trier les marques par nombre de voitures (décroissant)
  const sortedBrands = Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Top 10 marques
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Voitures importées ({importedCars.length})</CardTitle>
        <CardDescription>
          Aperçu des voitures qui ont été importées
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Top 10 des marques importées:</h3>
          <div className="flex flex-wrap gap-2">
            {sortedBrands.map(([brand, count]) => (
              <Badge key={brand} variant="secondary">
                {brand}: {count} voiture{count > 1 ? 's' : ''}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Marque</th>
                <th className="px-4 py-2 text-left">Modèle</th>
                <th className="px-4 py-2 text-left">Année</th>
                <th className="px-4 py-2 text-left">Prix</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Vedette</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {importedCars.slice(0, 20).map((car) => (
                <tr key={car.id}>
                  <td className="px-4 py-2">{car.brand}</td>
                  <td className="px-4 py-2">{car.model}</td>
                  <td className="px-4 py-2">{car.year}</td>
                  <td className="px-4 py-2">{car.price.toLocaleString('fr-FR')} €</td>
                  <td className="px-4 py-2">{car.type}</td>
                  <td className="px-4 py-2">
                    {car.featured ? 
                      <Badge variant="default" className="bg-green-500">Oui</Badge> : 
                      <Badge variant="outline">Non</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Affichage des 20 premières voitures sur {importedCars.length} importées.
        </p>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        Pour utiliser toutes ces {importedCars.length} voitures, téléchargez le fichier et remplacez src/data/cars.ts
      </CardFooter>
    </Card>
  );
};
