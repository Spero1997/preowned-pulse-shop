
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ShoppingBag } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Check if the path contains a common route pattern
  const isShopRelated = location.pathname.includes('/shop') || location.pathname.includes('/car');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page non trouvée</p>
        <p className="text-gray-500 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="flex items-center gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Accueil
            </Link>
          </Button>
          {isShopRelated && (
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link to="/shop">
                <ShoppingBag className="h-4 w-4" />
                Nos Voitures
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
