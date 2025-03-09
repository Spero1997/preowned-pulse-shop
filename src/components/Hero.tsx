
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-autoBlue/90 to-autoBlue/70 z-10" />
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1470&auto=format&fit=crop')" 
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Trouvez la voiture de vos rêves
            </h1>
            <p className="text-lg mb-8">
              Service Auto Adi vous propose une large sélection de voitures d'occasion de qualité à des prix compétitifs. Découvrez notre catalogue et trouvez le véhicule qui vous correspond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-autoOrange hover:bg-autoOrange/90"
                asChild
              >
                <Link to="/shop" className="flex items-center">
                  Explorer nos voitures
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
