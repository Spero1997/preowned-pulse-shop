
import { User } from "lucide-react";
import { useTranslation } from "react-i18next";

type TestimonialProps = {
  name: string;
  location: string;
  text: string;
  rating: number;
}

const Testimonial = ({ name, location, text, rating }: TestimonialProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="bg-autoBlue/10 p-3 rounded-full mr-4">
          <User className="h-6 w-6 text-autoBlue" />
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-gray-500 text-sm">{location}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg 
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      <p className="text-gray-700 italic">"{text}"</p>
    </div>
  );
};

export function Testimonials() {
  const { t } = useTranslation();
  
  const testimonials = [
    {
      name: t("testimonials.testimonial1.name", "Marco Bianchi"),
      location: t("testimonials.testimonial1.location", "Florence, Italie"),
      text: t("testimonials.testimonial1.text", "J'ai acheté ma BMW chez Service Auto Adi et je suis extrêmement satisfait. Le processus était simple, transparent et l'équipe était très professionnelle. La voiture est exactement comme décrite!"),
      rating: 5
    },
    {
      name: t("testimonials.testimonial2.name", "Sophie Dupont"),
      location: t("testimonials.testimonial2.location", "Lyon, France"),
      text: t("testimonials.testimonial2.text", "Une expérience exceptionnelle! J'ai fait le voyage depuis la France pour acheter ma Mercedes et je ne regrette rien. Merci à toute l'équipe pour leur accompagnement."),
      rating: 5
    },
    {
      name: t("testimonials.testimonial3.name", "Alessandro Romano"),
      location: t("testimonials.testimonial3.location", "Rome, Italie"),
      text: t("testimonials.testimonial3.text", "Déjà mon deuxième achat chez Service Auto Adi. Des voitures de qualité, bien entretenues et à des prix justes. Je recommande sans hésitation!"),
      rating: 4
    },
    {
      name: t("testimonials.testimonial4.name", "Hans Müller"),
      location: t("testimonials.testimonial4.location", "Munich, Allemagne"),
      text: t("testimonials.testimonial4.text", "Service impeccable! J'ai trouvé exactement ce que je cherchais, une Audi A4 en parfait état. Le rapport qualité-prix est imbattable. Je reviendrai!"),
      rating: 5
    },
    {
      name: t("testimonials.testimonial5.name", "Maria Garcia"),
      location: t("testimonials.testimonial5.location", "Barcelone, Espagne"),
      text: t("testimonials.testimonial5.text", "Merci à Service Auto Adi pour leur professionnalisme. Ils m'ont aidée à trouver une voiture adaptée à mon budget et ont géré toutes les formalités administratives avec efficacité."),
      rating: 4
    },
    {
      name: t("testimonials.testimonial6.name", "Luca Rossi"),
      location: t("testimonials.testimonial6.location", "Milan, Italie"),
      text: t("testimonials.testimonial6.text", "Excellente concession! J'ai acheté une Fiat 500 pour ma fille et tout s'est déroulé parfaitement. Le service après-vente est également très réactif."),
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("testimonials.title")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              name={testimonial.name}
              location={testimonial.location}
              text={testimonial.text}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
