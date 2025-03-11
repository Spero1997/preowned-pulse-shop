
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
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

function App() {
  const [carsCount, setCarsCount] = useState(0);

  useEffect(() => {
    // Synchroniser les voitures avec le localStorage au chargement de l'application
    const totalCars = syncCarsWithLocalStorage();
    setCarsCount(totalCars);
    console.log(`App: ${totalCars} voitures chargées et synchronisées avec le localStorage`);
    
    // Écouter les événements de mise à jour des voitures
    const handleCarsUpdated = () => {
      const updatedCount = getCarsFromLocalStorage().length;
      setCarsCount(updatedCount);
      console.log(`App: Événement carsUpdated reçu - ${updatedCount} voitures`);
    };
    
    window.addEventListener('carsUpdated', handleCarsUpdated);
    
    // Nettoyage de l'écouteur d'événements
    return () => {
      window.removeEventListener('carsUpdated', handleCarsUpdated);
    };
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home key={`home-${carsCount}`} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop key={`shop-${carsCount}`} />} />
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
