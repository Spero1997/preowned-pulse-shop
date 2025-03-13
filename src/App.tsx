
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, useEffect, useState, useCallback } from "react";
import { Toaster } from "@/components/ui/sonner";

import Home from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Shop from "@/pages/Shop";
import CarDetail from "@/pages/CarDetail";
import Cart from "@/pages/Cart";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import { syncCarsWithLocalStorage, getCarsFromLocalStorage } from "@/utils/dataSync";
import { toast } from "sonner";

function App() {
  const [carsCount, setCarsCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const updateCarsCount = useCallback(() => {
    const updatedCount = getCarsFromLocalStorage().length;
    setCarsCount(updatedCount);
    console.log(`App: Mise à jour du nombre de voitures - ${updatedCount} voitures`);
    return updatedCount;
  }, []);

  useEffect(() => {
    // Synchroniser les voitures avec le localStorage au chargement de l'application
    const totalCars = syncCarsWithLocalStorage();
    setCarsCount(totalCars);
    console.log(`App: ${totalCars} voitures chargées et synchronisées avec le localStorage`);
    
    // Écouter les événements de mise à jour des voitures
    const handleCarsUpdated = (event: Event) => {
      const customEvent = event as CustomEvent;
      const source = customEvent.detail?.source || 'unknown';
      const timestamp = customEvent.detail?.timestamp || Date.now();
      
      // Éviter les mises à jour en double dans un court laps de temps
      if (timestamp - lastUpdate < 500 && source !== 'carAdd') {
        console.log(`App: Événement ignoré - trop rapproché (${source})`);
        return;
      }
      
      setLastUpdate(timestamp);
      const updatedCount = updateCarsCount();
      console.log(`App: Événement carsUpdated reçu de ${source} - ${updatedCount} voitures`);
      
      if (source === 'carAdd') {
        toast.success("Voiture ajoutée avec succès", {
          description: "La voiture a été ajoutée et apparaîtra sur la page d'accueil"
        });
      }
    };
    
    window.addEventListener('carsUpdated', handleCarsUpdated);
    
    // Nettoyage de l'écouteur d'événements
    return () => {
      window.removeEventListener('carsUpdated', handleCarsUpdated);
    };
  }, [updateCarsCount, lastUpdate]);

  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Chargement...</div>}>
        <Routes>
          <Route path="/" element={<Home key={`home-${carsCount}-${lastUpdate}`} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop key={`shop-${carsCount}-${lastUpdate}`} />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
}

export default App;
