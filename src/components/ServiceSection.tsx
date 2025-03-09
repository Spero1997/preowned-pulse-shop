
import { Car, Wrench, Shield, Clock, CreditCard } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="h-12 w-12 rounded-full bg-autoBlue/10 flex items-center justify-center mb-4 text-autoBlue">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function ServiceSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Nos services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Service Auto Adi est votre partenaire de confiance pour l'achat de voitures d'occasion. Découvrez nos services personnalisés pour une expérience d'achat sans tracas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard 
            icon={<Car className="h-6 w-6" />}
            title="Vaste sélection"
            description="Plus de 100 véhicules d'occasion soigneusement sélectionnés pour répondre à tous les besoins et budgets."
          />
          <ServiceCard 
            icon={<Shield className="h-6 w-6" />}
            title="Garantie incluse"
            description="Tous nos véhicules sont livrés avec une garantie mécanique pour vous assurer tranquillité d'esprit."
          />
          <ServiceCard 
            icon={<Wrench className="h-6 w-6" />}
            title="Service technique"
            description="Notre équipe de techniciens qualifiés assure l'entretien et les réparations de votre véhicule."
          />
          <ServiceCard 
            icon={<CreditCard className="h-6 w-6" />}
            title="Financement facile"
            description="Solutions de financement personnalisées pour faciliter l'achat de votre voiture d'occasion."
          />
        </div>
      </div>
    </section>
  );
}
