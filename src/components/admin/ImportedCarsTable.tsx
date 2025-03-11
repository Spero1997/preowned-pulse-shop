
import { Car } from "@/types/car";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";

interface ImportedCarsTableProps {
  importedCars: Car[];
  onAddCar: (car: Car) => void;
  onAddAll: () => void;
}

export const ImportedCarsTable = ({ importedCars, onAddCar, onAddAll }: ImportedCarsTableProps) => {
  const { t } = useTranslation();
  
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
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t("admin.importedCars", { count: importedCars.length })}</CardTitle>
          <CardDescription>
            {t("admin.importedCarsPreview")}
          </CardDescription>
        </div>
        <Button onClick={onAddAll} disabled={importedCars.length === 0}>
          {t("admin.addAllToCatalog")}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">{t("admin.topBrands")}</h3>
          <div className="flex flex-wrap gap-2">
            {sortedBrands.map(([brand, count]) => (
              <Badge key={brand} variant="secondary">
                {brand}: {count} voiture{count > 1 ? 's' : ''}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Marque</TableHead>
                <TableHead>Modèle</TableHead>
                <TableHead>Année</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Vedette</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {importedCars.slice(0, 20).map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.brand}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>{car.price.toLocaleString('fr-FR')} €</TableCell>
                  <TableCell>{car.type}</TableCell>
                  <TableCell>
                    {car.featured ? 
                      <Badge variant="default" className="bg-green-500">Oui</Badge> : 
                      <Badge variant="outline">Non</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onAddCar(car)}
                      title="Ajouter au catalogue"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          {t("admin.showing", { count: 20, total: importedCars.length })}
        </p>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        {t("admin.downloadToReplace", { count: importedCars.length })}
      </CardFooter>
    </Card>
  );
};
