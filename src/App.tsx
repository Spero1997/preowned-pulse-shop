
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";

import Home from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Shop from "@/pages/Shop";
import CarDetail from "@/pages/CarDetail";
import Cart from "@/pages/Cart";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import { syncCarsWithLocalStorage } from "@/utils/dataSync";

function App() {
  useEffect(() => {
    // Synchroniser les voitures avec le localStorage au chargement de l'application
    const totalCars = syncCarsWithLocalStorage();
    console.log(`App: ${totalCars} voitures chargées et synchronisées avec le localStorage`);
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
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
