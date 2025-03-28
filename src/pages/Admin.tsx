import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { ImportSection } from "@/components/admin/ImportSection";
import { ImportedCarsTable } from "@/components/admin/ImportedCarsTable";
import { AdminCarList } from "@/components/admin/AdminCarList";
import { AdminCarForm } from "@/components/admin/AdminCarForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car } from "@/types/car";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getCarsFromLocalStorage, updateCarsInLocalStorage, addCarToLocalStorage } from "@/utils/dataSync";

const Admin = () => {
  const [importedCars, setImportedCars] = useState<Car[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const navigate = useNavigate();

  // Charger les voitures depuis le localStorage au démarrage
  useEffect(() => {
    const loadCars = () => {
      const storedCars = getCarsFromLocalStorage();
      setCars(storedCars);
      console.log("Admin: Voitures chargées du localStorage", storedCars.length);
    };
    
    loadCars();
    
    // Écouter les événements de mise à jour des voitures
    const handleCarsUpdated = (event: Event) => {
      const customEvent = event as CustomEvent;
      const source = customEvent.detail?.source || 'unknown';
      
      // Ne réagir qu'aux événements qui ne proviennent pas d'Admin lui-même
      if (source !== 'Admin') {
        console.log(`Admin: Événement carsUpdated reçu de ${source}`);
        loadCars();
      }
    };
    
    window.addEventListener('carsUpdated', handleCarsUpdated);
    
    // Nettoyage de l'écouteur d'événements
    return () => {
      window.removeEventListener('carsUpdated', handleCarsUpdated);
    };
  }, []);

  const handleAddCar = (car: Car) => {
    // Générer un ID unique pour la nouvelle voiture et la marquer comme featured
    const newCar = {
      ...car,
      id: `local-${Date.now()}`,
      isAvailable: true,
      featured: true // Marquer automatiquement comme vedette
    };
    
    // Mettre à jour l'état local
    const updatedCars = [...cars, newCar];
    setCars(updatedCars);
    
    // Utiliser la nouvelle fonction pour ajouter une voiture
    addCarToLocalStorage(newCar);
    
    setSelectedCar(null);
    
    toast.success("Voiture ajoutée", {
      description: `${car.brand} ${car.model} a été ajoutée au catalogue et apparaîtra sur la page d'accueil`
    });
    
    // Rediriger vers la page d'accueil après un court délai
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleUpdateCar = (updatedCar: Car) => {
    const updatedCars = cars.map(car => car.id === updatedCar.id ? updatedCar : car);
    setCars(updatedCars);
    
    // Mettre à jour explicitement le localStorage et déclencher l'événement
    updateCarsInLocalStorage(updatedCars);
    
    setSelectedCar(null);
    
    toast.success("Voiture mise à jour", {
      description: `${updatedCar.brand} ${updatedCar.model} a été mise à jour avec succès`
    });
  };

  const handleDeleteCar = (carId: string) => {
    const filteredCars = cars.filter(car => car.id !== carId);
    setCars(filteredCars);
    
    // Mettre à jour explicitement le localStorage et déclencher l'événement
    updateCarsInLocalStorage(filteredCars);
    
    if (selectedCar?.id === carId) {
      setSelectedCar(null);
    }
    
    toast.success("Voiture supprimée", {
      description: `La voiture a été supprimée du catalogue`
    });
  };

  const handleEditCar = (car: Car) => {
    setSelectedCar(car);
  };

  // Fonction pour importer les voitures depuis l'API
  const handleImportCars = (importedCarsData: Car[]) => {
    setImportedCars(importedCarsData);
    toast.success("Importation réussie", {
      description: `${importedCarsData.length} voitures ont été importées avec succès`
    });
  };

  // Fonction pour ajouter une voiture importée au catalogue
  const handleAddImportedCar = (car: Car) => {
    const newCar = {
      ...car,
      id: `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isAvailable: true,
      featured: true // Marquer automatiquement comme vedette
    };
    
    // Mettre à jour l'état local
    const updatedCars = [...cars, newCar];
    setCars(updatedCars);
    
    // Utiliser la nouvelle fonction pour ajouter une voiture
    addCarToLocalStorage(newCar);
    
    setImportedCars(prevCars => prevCars.filter(c => c.id !== car.id));
    
    toast.success("Voiture ajoutée", {
      description: `${car.brand} ${car.model} a été ajoutée au catalogue et apparaîtra sur la page d'accueil`
    });
    
    // Rediriger vers la page d'accueil après un court délai
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  // Fonction pour ajouter toutes les voitures importées au catalogue
  const handleAddAllImportedCars = () => {
    if (importedCars.length === 0) {
      toast.error("Aucune voiture à importer", {
        description: "Veuillez d'abord importer des voitures"
      });
      return;
    }
    
    const newCars = importedCars.map(car => ({
      ...car,
      id: `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isAvailable: true,
      featured: true // Marquer automatiquement comme vedette
    }));
    
    // Mettre à jour l'état local
    const updatedCars = [...cars, ...newCars];
    setCars(updatedCars);
    
    // Mettre à jour explicitement le localStorage et déclencher l'événement
    updateCarsInLocalStorage(updatedCars);
    
    setImportedCars([]);
    
    toast.success("Importation terminée", {
      description: `${newCars.length} voitures ont été ajoutées au catalogue et apparaîtront sur la page d'accueil`
    });
    
    // Rediriger vers la page d'accueil après un court délai
    setTimeout(() => {
      navigate('/');
    }, 1000);
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
            setImportedCars={handleImportCars}
          />
          <ImportedCarsTable 
            importedCars={importedCars}
            onAddCar={handleAddImportedCar}
            onAddAll={handleAddAllImportedCars}
          />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Admin;
