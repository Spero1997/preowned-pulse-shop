
import { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { ImportSection } from "@/components/admin/ImportSection";
import { ImportedCarsTable } from "@/components/admin/ImportedCarsTable";
import { Car } from "@/types/car";

const Admin = () => {
  const [importedCars, setImportedCars] = useState<Car[]>([]);

  return (
    <AdminLayout 
      title="Panneau d'administration"
      description="Gérez l'importation des données de votre ancien site"
    >
      <ImportSection 
        importedCars={importedCars}
        setImportedCars={setImportedCars}
      />
      <ImportedCarsTable importedCars={importedCars} />
    </AdminLayout>
  );
};

export default Admin;
