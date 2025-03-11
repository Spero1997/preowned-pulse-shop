import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback } from "react";

export function Hero() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Images pour le carousel
  const carImages = [
    "/lovable-uploads/c2257c96-cf77-45e8-a1f7-16d1e742ff16.png",
    "/lovable-uploads/ff916e5c-3206-4689-a1ef-2c70c8061ae2.png",
    "/lovable-uploads/bf188267-97cc-474c-9f86-7aa855a881a9.png",
    "/lovable-uploads/140fdb6b-c339-4707-924a-c5ca1b93b7ec.png"
  ];

  // Fonction pour passer à la diapositive suivante
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === carImages.length - 1 ? 0 : prev + 1));
  }, [carImages.length]);

  // Fonction pour passer à la diapositive précédente
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? carImages.length - 1 : prev - 1));
  }, [carImages.length]);

  // Changement automatique de diapositive toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative">
      <div className="relative h-[600px] overflow-hidden">
        {/* Carousel d'images */}
        <div 
          className="h-full w-full transition-transform duration-500 ease-in-out flex"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carImages.map((image, index) => (
            <div 
              key={index}
              className="min-w-full h-full bg-cover bg-center transition-opacity duration-500"
              style={{ 
                backgroundImage: `url('${image}')`,
                opacity: currentSlide === index ? 1 : 0.8
              }}
            >
              {/* Overlays pour améliorer la visibilité du texte */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-autoBlue/20" />
            </div>
          ))}
        </div>

        {/* Contrôles du carousel */}
        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-30"
          onClick={prevSlide}
          aria-label="Diapositive précédente"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-30"
          onClick={nextSlide}
          aria-label="Diapositive suivante"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicateurs de diapositive */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
          {carImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? "bg-autoOrange w-6" : "bg-white/60"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Aller à la diapositive ${index + 1}`}
            />
          ))}
        </div>

        {/* Contenu principal */}
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              {t("hero.title")}
            </h1>
            <p className="text-lg mb-8 drop-shadow-md">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-autoOrange hover:bg-autoOrange/90"
                asChild
              >
                <Link to="/shop" className="flex items-center">
                  {t("hero.exploreCars")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/contact">{t("hero.contactUs")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
