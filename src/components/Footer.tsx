
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-autoBlue text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/94fe4706-dd57-4f0e-b309-58c1b4d981d9.png" 
                alt="Service Auto Adi" 
                className="h-12 bg-white p-1 rounded"
              />
              <span className="font-bold text-xl">
                Service Auto Adi
              </span>
            </Link>
            <p className="text-blue-100 text-sm">
              {t("footer.description")}
            </p>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-white transition-colors">
                  {t("footer.home")}
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-blue-100 hover:text-white transition-colors">
                  {t("footer.cars")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-100 hover:text-white transition-colors">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100 hover:text-white transition-colors">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-blue-100 hover:text-white transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.contact")}</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-autoOrange" />
                <span className="text-blue-100">{t("whyChooseUs.address")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-autoOrange" />
                <a href="tel:+393761753341" className="text-blue-100 hover:text-white transition-colors">
                  {t("whyChooseUs.phone")}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-autoOrange" />
                <a href="mailto:infos@autoadi.com" className="text-blue-100 hover:text-white transition-colors">
                  {t("whyChooseUs.email")}
                </a>
              </li>
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.openingHours")}</h3>
            <ul className="space-y-2 text-blue-100">
              <li className="flex justify-between">
                <span>{t("footer.monday")} - {t("footer.friday")}:</span>
                <span>8h30 - 19h00</span>
              </li>
              <li className="flex justify-between">
                <span>{t("footer.saturday")}:</span>
                <span>9h00 - 17h00</span>
              </li>
              <li className="flex justify-between">
                <span>{t("footer.sunday")}:</span>
                <span>{t("footer.closed")}</span>
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61567575174651" target="_blank" rel="noopener noreferrer" className="text-white hover:text-autoOrange transition-colors">
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
          <p>© {currentYear} Service Auto Adi. {t("footer.allRightsReserved")}</p>
        </div>
      </div>
    </footer>
  );
}
