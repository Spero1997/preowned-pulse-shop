
import { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { ImportSection } from "@/components/admin/ImportSection";
import { ImportedCarsTable } from "@/components/admin/ImportedCarsTable";
import { AdminCarList } from "@/components/admin/AdminCarList";
import { AdminCarForm } from "@/components/admin/AdminCarForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car } from "@/types/car";
import { cars as initialCars } from "@/data/cars";

const Admin = () => {
  const [importedCars, setImportedCars] = useState<Car[]>([]);
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleAddCar = (car: Car) => {
    // Générer un ID unique pour la nouvelle voiture
    const newCar = {
      ...car,
      id: `local-${Date.now()}`,
      isAvailable: true
    };
    
    setCars(prevCars => [...prevCars, newCar]);
    setSelectedCar(null);
  };

  const handleUpdateCar = (updatedCar: Car) => {
    setCars(prevCars => 
      prevCars.map(car => car.id === updatedCar.id ? updatedCar : car)
    );
    setSelectedCar(null);
  };

  const handleDeleteCar = (carId: string) => {
    setCars(prevCars => prevCars.filter(car => car.id !== carId));
    if (selectedCar?.id === carId) {
      setSelectedCar(null);
    }
  };

  const handleEditCar = (car: Car) => {
    setSelectedCar(car);
  };

  return (
    <AdminLayout 
      title="Panneau d'administration"
      description="Gérez les voitures et importez des données de votre ancien site"
    >
      <Tabs defaultValue="cars" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="cars">Gestion des voitures</TabsTrigger>
          <TabsTrigger value="import">Importation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cars" className="space-y-8">
          <AdminCarForm 
            car={selectedCar}
            onSubmit={selectedCar ? handleUpdateCar : handleAddCar}
            onCancel={() => setSelectedCar(null)}
          />
          <AdminCarList 
            cars={cars} 
            onEdit={handleEditCar}
            onDelete={handleDeleteCar}
          />
        </TabsContent>
        
        <TabsContent value="import" className="space-y-8">
          <ImportSection 
            importedCars={importedCars}
            setImportedCars={setImportedCars}
          />
          <ImportedCarsTable importedCars={importedCars} />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Admin;
