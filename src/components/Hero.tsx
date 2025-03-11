
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();
  
  return (
    <div className="relative">
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/lovable-uploads/9ed143f1-9a7a-485c-8120-a629444375f2.png')" 
        }}
      >
        {/* Overlay noir avec opacité */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Overlay bleu avec opacité */}
        <div className="absolute inset-0 bg-autoBlue/30 z-10" />
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-lg mb-8">
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
