
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CarCard } from "@/components/CarCard";
import { CarFilters } from "@/components/CarFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Grid3X3, List, AlertCircle, Loader, Car as CarIcon, RefreshCw } from "lucide-react";
import { Car, CarFilters as CarFiltersType } from "@/types/car";
import { cars as initialCars, minPrice, maxPrice, minYear, maxYear } from "@/data/cars";
import { applyFilters } from "@/lib/utils";
import { toast } from "sonner";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState<Car[]>(initialCars); // Initialisé avec les voitures par défaut
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [sortOption, setSortOption] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
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
        const parsedCars = JSON.parse(localCarsString);
        console.log("Shop - Voitures récupérées:", parsedCars.length);
        if (Array.isArray(parsedCars) && parsedCars.length > 0) {
          // Vérifie si le nombre de voitures a changé
          if (cars.length !== parsedCars.length) {
            console.log("Shop - Nombre de voitures a changé de", cars.length, "à", parsedCars.length);
            toast.success(`Inventaire mis à jour`, {
              description: `${parsedCars.length} voitures disponibles dans le catalogue.`
            });
          }
          return parsedCars;
        } else {
          console.warn("Shop - Données récupérées invalides ou vides, utilisation des données par défaut");
          toast.error("Données invalides", {
            description: "Format de données incorrect dans le stockage local"
          });
        }
      } else {
        console.log("Shop - Aucune donnée dans localStorage, utilisation des données par défaut");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des voitures locales:", error);
      toast.error("Erreur de données", {
        description: "Impossible de récupérer les voitures du stockage local"
      });
    }
    
    // Important: Toujours retourner les voitures par défaut si rien n'est trouvé dans localStorage
    console.log("Shop - Utilisation des données initiales par défaut:", initialCars.length, "voitures");
    return initialCars;
  };

  const forceRefresh = () => {
    console.log("Shop - Forçage du rafraîchissement des données");
    setRefreshTrigger(prev => prev + 1);
    
    // Lire directement depuis localStorage et mettre à jour l'état
    const updatedCars = getLocalCars();
    setCars(updatedCars);
    
    toast.info("Actualisation en cours", {
      description: `Chargement de ${updatedCars.length} voitures...`
    });
    
    // Émettre un événement personnalisé pour informer les autres composants
    const event = new CustomEvent('carsUpdated', { detail: { source: 'Shop' } });
    window.dispatchEvent(event);
  };

  // Effet principal pour charger les données
  useEffect(() => {
    console.log("Shop - Initialisation du composant");
    setIsLoading(true);
    
    // Récupérer les voitures du localStorage au chargement initial
    const currentCars = getLocalCars();
    console.log("Shop - Chargement initial:", currentCars.length, "voitures");
    setCars(currentCars);
    setInitialLoadComplete(true);
    setIsLoading(false);
    
    // Mettre en place un écouteur d'événements pour détecter les changements de localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cars') {
        console.log("Shop - Changement de localStorage détecté");
        const updatedCars = getLocalCars();
        setCars(updatedCars);
      }
    };
    
    // Crée un événement personnalisé pour communiquer entre les composants
    const handleCustomEvent = (e: CustomEvent) => {
      if (e.detail?.source !== 'Shop') { // Évite les boucles infinies
        console.log("Shop - Événement personnalisé de mise à jour détecté");
        const updatedCars = getLocalCars();
        setCars(updatedCars);
      }
    };
    
    // Ajouter les écouteurs d'événements
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('carsUpdated', handleCustomEvent as EventListener);
    
    // Vérifier à intervalles réguliers
    const interval = setInterval(() => {
      const updatedCars = getLocalCars();
      if (updatedCars.length !== cars.length) {
        console.log("Shop - Mise à jour des voitures détectée par intervalle:", updatedCars.length, "voitures (avant:", cars.length, ")");
        setCars(updatedCars);
        setInitialLoadComplete(true);
      }
    }, 1000);
    
    // Force rafraîchissement direct au montage
    const initialCheck = setTimeout(() => {
      const freshCars = getLocalCars();
      console.log("Shop - Vérification initiale:", freshCars.length, "voitures");
      setCars(freshCars);
      setInitialLoadComplete(true);
    }, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('carsUpdated', handleCustomEvent as EventListener);
      clearInterval(interval);
      clearTimeout(initialCheck);
    };
  }, [refreshTrigger]); // Ajout de refreshTrigger pour forcer le rechargement

  // Force une mise à jour lors du montage initial de la page
  useEffect(() => {
    console.log("Shop - Déclenchement de la vérification directe");
    const directCheck = setTimeout(() => {
      forceRefresh();
    }, 100);
    
    return () => clearTimeout(directCheck);
  }, []);

  // Effet pour filtrer les voitures lorsque les filtres ou la liste de voitures change
  useEffect(() => {
    if (isLoading) return;
    
    console.log("Shop - Application des filtres sur", cars.length, "voitures");
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
      brand: (car, brands) => brands.length === 0 || brands.includes(car.brand),
      type: (car, types) => types.length === 0 || types.includes(car.type),
      fuel: (car, fuels) => fuels.length === 0 || fuels.includes(car.fuel),
      transmission: (car, transmissions) => transmissions.length === 0 || transmissions.includes(car.transmission),
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
    
    console.log("Shop - Filtrage appliqué:", results.length, "voitures après filtrage");
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
          
          {/* Bouton de rafraîchissement manuel */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={forceRefresh}
            className="mb-4 flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Rafraîchir ({cars.length} voitures)
          </Button>
          
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
            <div className="text-center py-12 bg-gray-50 rounded-lg border">
              <div className="flex items-center justify-center mb-4">
                <AlertCircle className="h-12 w-12 text-amber-500 mr-2" />
              </div>
              <h3 className="text-xl font-medium mb-2">Aucune voiture trouvée</h3>
              <p className="text-gray-600 mb-4">Veuillez modifier vos critères de recherche ou vos filtres.</p>
              <Button onClick={forceRefresh} variant="outline">
                Réessayer
              </Button>
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
