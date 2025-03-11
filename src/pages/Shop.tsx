
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CarCard } from "@/components/CarCard";
import { CarFilters } from "@/components/CarFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Grid3X3, List, AlertCircle, Loader } from "lucide-react";
import { Car, CarFilters as CarFiltersType } from "@/types/car";
import { minPrice, maxPrice, minYear, maxYear } from "@/data/cars";
import { applyFilters } from "@/lib/utils";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [sortOption, setSortOption] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const carsPerPage = 12;
  const [filters, setFilters] = useState<CarFiltersType>({
    brand: [],
    type: [],
    fuel: [],
    transmission: [],
    minPrice: minPrice,
    maxPrice: maxPrice,
    minYear: minYear,
    maxYear: maxYear,
  });

  // Fonction pour obtenir les voitures stockées localement dans le localStorage
  const getLocalCars = (): Car[] => {
    try {
      const localCarsString = localStorage.getItem('cars');
      if (localCarsString) {
        return JSON.parse(localCarsString);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des voitures locales:", error);
    }
    return [];
  };

  useEffect(() => {
    // Récupérer les voitures du localStorage au chargement initial
    const currentCars = getLocalCars();
    console.log("Shop - Chargement initial:", currentCars.length, "voitures");
    setCars(currentCars);
    setIsLoading(false);
    
    // Mettre en place un écouteur d'événements pour détecter les changements de localStorage
    const handleStorageChange = () => {
      const updatedCars = getLocalCars();
      console.log("Shop - Changement de localStorage détecté:", updatedCars.length, "voitures");
      setCars(updatedCars);
    };
    
    // Ajouter l'écouteur d'événements
    window.addEventListener('storage', handleStorageChange);
    
    // Vérifier à intervalles réguliers aussi, au cas où
    const interval = setInterval(() => {
      const updatedCars = getLocalCars();
      if (updatedCars.length !== cars.length) {
        console.log("Shop - Mise à jour des voitures détectée par intervalle:", updatedCars.length, "voitures");
        setCars(updatedCars);
      }
    }, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (cars.length === 0 && !isLoading) return;
    
    let results = [...cars];
    
    // Filtrer par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(car => 
        `${car.brand} ${car.model}`.toLowerCase().includes(term) ||
        car.description.toLowerCase().includes(term)
      );
    }
    
    // Appliquer les filtres
    results = applyFilters(results, filters, {
      brand: (car, brands) => brands.includes(car.brand),
      type: (car, types) => types.includes(car.type),
      fuel: (car, fuels) => fuels.includes(car.fuel),
      transmission: (car, transmissions) => transmissions.includes(car.transmission),
      minPrice: (car, minPrice) => car.price >= minPrice,
      maxPrice: (car, maxPrice) => car.price <= maxPrice,
      minYear: (car, minYear) => car.year >= minYear,
      maxYear: (car, maxYear) => car.year <= maxYear,
    });
    
    // Appliquer le tri
    switch (sortOption) {
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "year-desc":
        results.sort((a, b) => b.year - a.year);
        break;
      case "mileage-asc":
        results.sort((a, b) => a.mileage - b.mileage);
        break;
    }
    
    setFilteredCars(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters, sortOption, cars, isLoading]);

  // Calculate pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-8 flex items-center justify-center">
          <div className="text-center">
            <Loader className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Chargement des voitures...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Nos voitures</h1>
          
          {/* Barre de recherche */}
          <div className="relative mb-6">
            <Input
              placeholder="Rechercher par marque, modèle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Filtres */}
          <CarFilters 
            filters={filters} 
            onChange={setFilters} 
          />
          
          {/* Tri et options d'affichage */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <p className="text-gray-600 mb-4 md:mb-0">
              {filteredCars.length} {filteredCars.length > 1 ? 'voitures' : 'voiture'} trouvée{filteredCars.length > 1 ? 's' : ''}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select
                value={sortOption}
                onValueChange={setSortOption}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Par défaut</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="year-desc">Plus récent</SelectItem>
                  <SelectItem value="mileage-asc">Kilométrage le plus bas</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className={viewMode === "grid" ? "bg-autoBlue hover:bg-autoBlue/90" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className={viewMode === "list" ? "bg-autoBlue hover:bg-autoBlue/90" : ""}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Affichage des voitures */}
          {currentCars.length > 0 ? (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
            }>
              {currentCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-amber-500 mr-2" />
              </div>
              <h3 className="text-xl font-medium mb-2">Aucune voiture trouvée</h3>
              <p className="text-gray-600">Veuillez modifier vos critères de recherche ou vos filtres.</p>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav>
                <ul className="flex space-x-1">
                  <li>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Précédent
                    </Button>
                  </li>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                    // Show pages around current page
                    let pageToShow = currentPage;
                    if (currentPage <= 2) {
                      pageToShow = index + 1;
                    } else if (currentPage >= totalPages - 1) {
                      pageToShow = totalPages - 4 + index;
                    } else {
                      pageToShow = currentPage - 2 + index;
                    }
                    
                    // Ensure page numbers are valid
                    if (pageToShow <= 0 || pageToShow > totalPages) {
                      return null;
                    }
                    
                    return (
                      <li key={pageToShow}>
                        <Button 
                          variant={currentPage === pageToShow ? "default" : "outline"}
                          size="sm"
                          className={currentPage === pageToShow ? "bg-autoBlue hover:bg-autoBlue/90" : ""}
                          onClick={() => paginate(pageToShow)}
                        >
                          {pageToShow}
                        </Button>
                      </li>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <li className="flex items-center px-2">...</li>
                      <li>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => paginate(totalPages)}
                        >
                          {totalPages}
                        </Button>
                      </li>
                    </>
                  )}
                  <li>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Suivant
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
