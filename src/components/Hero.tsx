
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";

export function Hero() {
  return (
    <div className="relative">
      {/* Information Banner */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-3 text-sm">
            <Info className="h-5 w-5 text-autoBlue flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-base mb-2">Concessionnaire automobile, nous vendons des voitures d'occasion en Europe. Nous livrons partout.</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div>
                  <h4 className="font-semibold mb-1">Modalités de paiement</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Acompte : 20% à la commande</li>
                    <li>Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)</li>
                    <li>Offre spéciale : -10% pour paiement comptant à la commande</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">Nos services inclus :</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Délai de rétractation : 14 jours (Satisfait ou remboursé)</li>
                    <li>Facilité de paiement : Payable comptant ou en mensualités sans intérêt</li>
                    <li>Pas besoin de banque ni d'organisme financier, nous nous occupons de tout !</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">Garantie :</h4>
                  <p>12 à 48 mois, selon le type de véhicule, avec possibilité d'extension, valable dans toute l'Europe.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
