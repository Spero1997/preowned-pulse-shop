
import { Link } from "react-router-dom";
import { Car, ShoppingCart, User, Menu, X, Phone, Facebook, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cartService } from "@/lib/cartService";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    // Charger le nombre initial d'éléments dans le panier
    setCartCount(cartService.getCount());

    // Écouter les mises à jour du panier
    const handleCartUpdate = (event: CustomEvent) => {
      setCartCount(event.detail.count);
    };

    window.addEventListener('cart-updated', handleCartUpdate as EventListener);

    // Nettoyer l'écouteur d'événements
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/94fe4706-dd57-4f0e-b309-58c1b4d981d9.png" 
                alt="Service Auto Adi" 
                className="h-10"
              />
              <span className="hidden font-bold text-xl text-autoBlue md:inline-block">
                Service Auto Adi
              </span>
            </Link>
          </div>

          {/* Navigation principale - visible sur desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-autoBlue font-medium">
              {t("navbar.home")}
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-autoBlue font-medium">
              {t("navbar.cars")}
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-autoBlue font-medium">
              {t("navbar.about")}
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-autoBlue font-medium">
              {t("navbar.contact")}
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-autoBlue font-medium flex items-center">
              <Settings className="h-4 w-4 mr-1" />
              {t("navbar.admin")}
            </Link>
          </nav>

          {/* Numéro de téléphone - visible sur desktop */}
          <div className="hidden md:flex items-center mr-4">
            <a href="tel:+393761753341" className="flex items-center text-autoBlue hover:text-autoBlue/80">
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-medium">+39 376 175 3341</span>
            </a>
          </div>

          {/* Icônes d'action - visibles sur desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <a 
              href="https://www.facebook.com/profile.php?id=61567575174651" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-autoBlue"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-autoBlue">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart" className="flex items-center justify-center text-autoBlue hover:text-autoBlue/80">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-autoOrange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart" className="flex items-center justify-center text-autoBlue">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-autoOrange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={cn(
        "fixed inset-x-0 top-16 z-50 bg-white border-b transition-all duration-300 transform md:hidden",
        isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <div className="container mx-auto px-4 py-4 space-y-4">
          <Link 
            to="/" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("navbar.home")}
          </Link>
          <Link 
            to="/shop" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("navbar.cars")}
          </Link>
          <Link 
            to="/about" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("navbar.about")}
          </Link>
          <Link 
            to="/contact" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("navbar.contact")}
          </Link>
          <Link 
            to="/admin" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <Settings className="h-4 w-4 mr-2" />
            {t("navbar.admin")}
          </Link>
          <div className="flex items-center space-x-4 px-4 py-2">
            <a href="tel:+393761753341" className="flex items-center text-autoBlue">
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-medium">+39 376 175 3341</span>
            </a>
          </div>
          <div className="flex items-center space-x-4 px-4 py-2">
            <LanguageSelector />
            <a 
              href="https://www.facebook.com/profile.php?id=61567575174651" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-autoBlue"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <Button variant="ghost" size="icon" className="text-gray-700">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
