
import { User } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

type TestimonialProps = {
  name: string;
  location: string;
  text: string;
  rating: number;
  language?: string;
}

const Testimonial = ({ name, location, text, rating, language }: TestimonialProps) => {
  const languageIndicator = language ? (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ml-2 bg-autoBlue/10 text-autoBlue`}>
      {language}
    </span>
  ) : null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <div className="flex items-center mb-4">
        <div className="bg-autoBlue/10 p-3 rounded-full mr-4">
          <User className="h-6 w-6 text-autoBlue" />
        </div>
        <div>
          <div className="flex items-center">
            <h4 className="font-bold">{name}</h4>
            {languageIndicator}
          </div>
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
  const [shouldAutoPlay, setShouldAutoPlay] = useState(true);
  const [api, setApi] = useState<any>(null);
  
  // Pause autoplay when the user interacts with the carousel
  const handleInteraction = () => {
    setShouldAutoPlay(false);
    // Restart autoplay after 5 seconds of inactivity
    setTimeout(() => setShouldAutoPlay(true), 5000);
  };
  
  // Handle autoplay functionality
  useEffect(() => {
    if (!api || !shouldAutoPlay) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [api, shouldAutoPlay]);
  
  const testimonials = [
    {
      name: "Marco Bianchi",
      location: "Firenze, Italia",
      text: "Ho acquistato la mia BMW da Service Auto Adi e sono estremamente soddisfatto. Il processo è stato semplice, trasparente e il team era molto professionale. L'auto è esattamente come descritta!",
      rating: 5,
      language: "Italiano"
    },
    {
      name: "Sophie Dupont",
      location: "Lyon, France",
      text: "Une expérience exceptionnelle! J'ai fait le voyage depuis la France pour acheter ma Mercedes et je ne regrette rien. Merci à toute l'équipe pour leur accompagnement.",
      rating: 5,
      language: "Français"
    },
    {
      name: "Alessandro Romano",
      location: "Roma, Italia",
      text: "Già il mio secondo acquisto da Service Auto Adi. Auto di qualità, ben mantenute e a prezzi equi. Consiglio senza esitazione!",
      rating: 4,
      language: "Italiano"
    },
    {
      name: "Hans Müller",
      location: "München, Deutschland",
      text: "Ein ausgezeichneter Service! Ich habe genau das gefunden, was ich suchte - einen Audi A4 in perfektem Zustand. Das Preis-Leistungs-Verhältnis ist unschlagbar. Ich werde wiederkommen!",
      rating: 5,
      language: "Deutsch"
    },
    {
      name: "Maria Garcia",
      location: "Barcelona, España",
      text: "Gracias a Service Auto Adi por su profesionalidad. Me ayudaron a encontrar un coche adaptado a mi presupuesto y gestionaron todos los trámites administrativos con eficacia.",
      rating: 4,
      language: "Español"
    },
    {
      name: "Luca Rossi",
      location: "Milano, Italia",
      text: "Concessionaria eccellente! Ho comprato una Fiat 500 per mia figlia e tutto è andato perfettamente. Anche il servizio post-vendita è molto reattivo.",
      rating: 5,
      language: "Italiano"
    },
    // Témoignages en portugais
    {
      name: "João Silva",
      location: "Lisboa, Portugal",
      text: "Comprei o meu Volkswagen na Service Auto Adi e fiquei extremamente satisfeito. A equipe foi muito atenciosa e o processo de compra foi muito transparente. Excelente serviço!",
      rating: 5,
      language: "Português"
    },
    {
      name: "Mariana Costa",
      location: "Porto, Portugal",
      text: "Viajei de Portugal para comprar meu Audi na Service Auto Adi. A qualidade dos carros e o profissionalismo da equipe superam em muito o incômodo da viagem. Valeu muito a pena!",
      rating: 4,
      language: "Português"
    },
    // Témoignages en espagnol
    {
      name: "Carlos Rodríguez",
      location: "Madrid, España",
      text: "Mi experiencia con Service Auto Adi fue excepcional. Encontré un BMW Serie 3 en perfecto estado y a un precio muy competitivo. El equipo fue muy profesional durante todo el proceso.",
      rating: 5,
      language: "Español"
    },
    {
      name: "Elena Martínez",
      location: "Valencia, España",
      text: "Compré mi Mercedes desde España y todo el proceso fue muy sencillo. La documentación fue gestionada perfectamente y el coche llegó en el estado prometido. Muy recomendable.",
      rating: 5,
      language: "Español"
    },
    {
      name: "Javier López",
      location: "Sevilla, España",
      text: "Después de buscar durante meses, encontré el coche perfecto en Service Auto Adi. A pesar de la distancia, el proceso fue muy fácil y la comunicación excelente. El coche está en perfectas condiciones.",
      rating: 4,
      language: "Español"
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
        
        <div className="mx-auto max-w-5xl px-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
              containScroll: "trimSnaps",
            }}
            setApi={setApi}
            className="w-full"
            onMouseDown={handleInteraction}
            onTouchStart={handleInteraction}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 h-full">
                  <Testimonial 
                    name={testimonial.name}
                    location={testimonial.location}
                    text={testimonial.text}
                    rating={testimonial.rating}
                    language={testimonial.language}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="static mx-2 translate-y-0" />
              <CarouselNext className="static mx-2 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
