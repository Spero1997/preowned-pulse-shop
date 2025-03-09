
import { Link } from "react-router-dom";
import { Car, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/public/lovable-uploads/94fe4706-dd57-4f0e-b309-58c1b4d981d9.png" 
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
              Accueil
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-autoBlue font-medium">
              Voitures
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-autoBlue font-medium">
              À propos
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-autoBlue font-medium">
              Contact
            </Link>
          </nav>

          {/* Icônes d'action - visibles sur desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-autoBlue">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-autoBlue relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-autoOrange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
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
            Accueil
          </Link>
          <Link 
            to="/shop" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Voitures
          </Link>
          <Link 
            to="/about" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            À propos
          </Link>
          <Link 
            to="/contact" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="flex items-center space-x-4 px-4 py-2">
            <Button variant="ghost" size="icon" className="text-gray-700">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-700 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-autoOrange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
