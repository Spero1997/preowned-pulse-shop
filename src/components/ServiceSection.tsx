
import { Car, Wrench, Shield, CreditCard, Truck, Settings, Gauge } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t("services.title")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard 
            icon={<Car className="h-6 w-6" />}
            title={t("services.selection.title")}
            description={t("services.selection.description")}
          />
          <ServiceCard 
            icon={<Shield className="h-6 w-6" />}
            title={t("services.warranty.title")}
            description={t("services.warranty.description")}
          />
          <ServiceCard 
            icon={<Wrench className="h-6 w-6" />}
            title={t("services.technical.title")}
            description={t("services.technical.description")}
          />
          <ServiceCard 
            icon={<CreditCard className="h-6 w-6" />}
            title={t("services.financing.title")}
            description={t("services.financing.description")}
          />
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-8">Services Garage Automobile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
              icon={<Settings className="h-6 w-6" />}
              title="Réparation mécanique"
              description="Diagnostic et réparation de tous types de pannes mécaniques par nos techniciens expérimentés."
            />
            <ServiceCard 
              icon={<Gauge className="h-6 w-6" />}
              title="Entretien régulier"
              description="Services d'entretien programmé pour maintenir votre véhicule en parfait état de fonctionnement."
            />
            <ServiceCard 
              icon={<Truck className="h-6 w-6" />}
              title="Assistance dépannage"
              description="Service de dépannage rapide et efficace pour vous aider en cas de panne sur la route."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
