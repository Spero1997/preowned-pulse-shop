
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { FeaturedCars } from "@/components/FeaturedCars";
import { ServiceSection } from "@/components/ServiceSection";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedCars />
        <ServiceSection />
        <Testimonials />
        
        {/* Section Pourquoi nous choisir */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Pourquoi choisir Service Auto Adi ?
                </h2>
                <p className="text-gray-600 mb-6">
                  Depuis plus de 15 ans, nous sommes spécialisés dans la vente de voitures d'occasion de qualité. Notre expertise et notre engagement envers la satisfaction client font de nous un partenaire de confiance pour votre prochain achat automobile.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="bg-autoOrange text-white p-1 rounded-full mr-3 mt-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Véhicules rigoureusement sélectionnés et inspectés</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-autoOrange text-white p-1 rounded-full mr-3 mt-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Service après-vente personnalisé</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-autoOrange text-white p-1 rounded-full mr-3 mt-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Prix transparents et compétitifs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-autoOrange text-white p-1 rounded-full mr-3 mt-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Équipe professionnelle et passionnée</span>
                  </li>
                </ul>
                <Button 
                  className="bg-autoBlue hover:bg-autoBlue/90"
                  asChild
                >
                  <Link to="/about">
                    En savoir plus sur nous
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1374&auto=format&fit=crop" 
                  alt="Notre concession" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg md:max-w-xs">
                  <h3 className="font-bold text-lg mb-2">Visitez notre concession</h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-autoOrange" />
                      Borgo Ognissanti, 142r 50123 Firenze FI Italie
                    </p>
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-autoOrange" />
                      +39 376 175 3341
                    </p>
                    <p className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-autoOrange" />
                      info@serviceautoadi.it
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
