
import { Car, Wrench, Shield, Clock, CreditCard } from "lucide-react";
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
      </div>
    </section>
  );
}
