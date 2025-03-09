
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-autoBlue text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/public/lovable-uploads/94fe4706-dd57-4f0e-b309-58c1b4d981d9.png" 
                alt="Service Auto Adi" 
                className="h-12 bg-white p-1 rounded"
              />
              <span className="font-bold text-xl">
                Service Auto Adi
              </span>
            </Link>
            <p className="text-blue-100 text-sm">
              Votre concessionnaire de confiance pour l'achat de voitures d'occasion de qualité en Italie. Nous proposons un large choix de véhicules soigneusement sélectionnés.
            </p>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-blue-100 hover:text-white transition-colors">
                  Voitures
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-100 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-100 hover:text-white transition-colors">
                  Conditions générales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-autoOrange" />
                <span className="text-blue-100">Via Roma 123, Milan, Italie</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-autoOrange" />
                <a href="tel:+391234567890" className="text-blue-100 hover:text-white transition-colors">
                  +39 123 456 7890
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-autoOrange" />
                <a href="mailto:info@serviceautoadi.it" className="text-blue-100 hover:text-white transition-colors">
                  info@serviceautoadi.it
                </a>
              </li>
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-lg font-bold mb-4">Horaires d'ouverture</h3>
            <ul className="space-y-2 text-blue-100">
              <li className="flex justify-between">
                <span>Lundi - Vendredi:</span>
                <span>8h30 - 19h00</span>
              </li>
              <li className="flex justify-between">
                <span>Samedi:</span>
                <span>9h00 - 17h00</span>
              </li>
              <li className="flex justify-between">
                <span>Dimanche:</span>
                <span>Fermé</span>
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-white hover:text-autoOrange transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-autoOrange transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-autoOrange transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-blue-200 text-sm">
          <p>© {currentYear} Service Auto Adi. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
