
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import direct des fichiers de traduction
import translationES from '../public/locales/es/translation.json';
import translationPT from '../public/locales/pt/translation.json';

// Définition des ressources de traduction
const resources = {
  fr: {
    translation: {
      "navbar": {
        "home": "Accueil",
        "cars": "Voitures",
        "about": "À propos",
        "contact": "Contact",
        "admin": "Administration",
        "phone": "Téléphone",
        "cart": "Panier"
      },
      "hero": {
        "title": "Trouvez la voiture de vos rêves",
        "description": "Service Auto Adi vous propose un large choix de voitures d'occasion de qualité à des prix compétitifs. Découvrez notre catalogue et trouvez le véhicule qui vous convient.",
        "exploreCars": "Explorer nos voitures",
        "contactUs": "Nous contacter"
      },
      "featuredCars": {
        "title": "Nos voitures en vedette",
        "subtitle": "Découvrez notre sélection de véhicules exceptionnels parmi notre collection de {{count}} voitures",
        "refresh": "Actualiser",
        "viewAllCars": "Voir toutes les voitures",
        "noFeaturedCars": "Aucune voiture en vedette n'est disponible pour le moment. Visitez notre boutique pour voir toutes nos voitures.",
        "loading": "Chargement des voitures...",
        "refreshing": "Actualisation...",
        "loadingCars": "Chargement de {{count}} voitures..."
      },
      "services": {
        "title": "Nos services",
        "subtitle": "Service Auto Adi est votre partenaire de confiance pour l'achat de voitures d'occasion. Découvrez nos services personnalisés pour une expérience d'achat sans souci.",
        "selection": {
          "title": "Large sélection",
          "description": "Plus de 100 véhicules d'occasion soigneusement sélectionnés pour répondre à tous les besoins et budgets."
        },
        "warranty": {
          "title": "Garantie incluse",
          "description": "Tous nos véhicules sont livrés avec une garantie mécanique pour vous assurer tranquillité d'esprit."
        },
        "technical": {
          "title": "Service technique",
          "description": "Notre équipe de techniciens qualifiés assure l'entretien et les réparations de votre véhicule."
        },
        "financing": {
          "title": "Financement facile",
          "description": "Solutions de financement personnalisées pour faciliter l'achat de votre voiture d'occasion."
        }
      },
      "testimonials": {
        "title": "Ce que disent nos clients",
        "subtitle": "Découvrez les témoignages de nos clients satisfaits qui ont trouvé leur voiture idéale chez Service Auto Adi.",
        "testimonial1": {
          "name": "Marco Bianchi",
          "location": "Florence, Italie",
          "text": "J'ai acheté ma BMW chez Service Auto Adi et je suis extrêmement satisfait. Le processus était simple, transparent et l'équipe était très professionnelle. La voiture est exactement comme décrite!"
        },
        "testimonial2": {
          "name": "Sophie Dupont",
          "location": "Lyon, France",
          "text": "Une expérience exceptionnelle! J'ai fait le voyage depuis la France pour acheter ma Mercedes et je ne regrette rien. Merci à toute l'équipe pour leur accompagnement."
        },
        "testimonial3": {
          "name": "Alessandro Romano",
          "location": "Rome, Italie",
          "text": "Déjà mon deuxième achat chez Service Auto Adi. Des voitures de qualité, bien entretenues et à des prix justes. Je recommande sans hésitation!"
        }
      },
      "whyChooseUs": {
        "title": "Pourquoi choisir Service Auto Adi ?",
        "description": "Avec plus de 15 ans d'expérience, nous sommes spécialisés dans la vente de voitures d'occasion de qualité. Notre expertise et notre engagement envers la satisfaction client font de nous un partenaire de confiance pour votre prochain achat automobile.",
        "points": {
          "inspection": "Véhicules rigoureusement sélectionnés et inspectés",
          "service": "Service après-vente personnalisé",
          "prices": "Prix transparents et compétitifs",
          "team": "Équipe professionnelle et passionnée"
        },
        "learnMore": "En savoir plus sur nous",
        "visitDealer": "Visitez notre concession",
        "address": "Borgo Ognissanti, 142r 50123 Firenze FI Italie",
        "phone": "+39 376 175 3341",
        "email": "info@serviceautoadi.it"
      },
      "shop": {
        "title": "Nos voitures",
        "carsFound": "{{count}} voiture trouvée",
        "carsFound_plural": "{{count}} voitures trouvées",
        "searchPlaceholder": "Rechercher par marque, modèle...",
        "sortBy": "Trier par",
        "sortOptions": {
          "default": "Par défaut",
          "priceAsc": "Prix croissant",
          "priceDesc": "Prix décroissant",
          "newest": "Plus récent",
          "lowestMileage": "Kilométrage le plus bas"
        },
        "noResults": "Aucune voiture trouvée",
        "modifySearch": "Veuillez modifier vos critères de recherche ou vos filtres.",
        "tryAgain": "Réessayer",
        "previous": "Précédent",
        "next": "Suivant",
        "loading": "Chargement des voitures...",
        "refresh": "Rafraîchir",
        "refreshing": "Actualisation...",
        "loadingCars": "Chargement de {{count}} voitures..."
      },
      "admin": {
        "carCatalog": "Catalogue de voitures ({{count}})",
        "manageInventory": "Gérez votre inventaire de véhicules",
        "importedCars": "Voitures importées ({{count}})",
        "importedCarsPreview": "Aperçu des voitures importées",
        "addAllToCatalog": "Ajouter toutes au catalogue",
        "topBrands": "Top 10 marques importées :",
        "showing": "Affichage des {{count}} premières sur {{total}} voitures importées.",
        "downloadToReplace": "Pour utiliser ces {{count}} voitures, téléchargez le fichier et remplacez src/data/cars.ts"
      },
      "notFound": {
        "title": "Oops! Page non trouvée",
        "description": "La page que vous recherchez n'existe pas ou a été déplacée.",
        "home": "Accueil",
        "shop": "Nos Voitures"
      }
    }
  },
  en: {
    translation: {
      "navbar": {
        "home": "Home",
        "cars": "Cars",
        "about": "About",
        "contact": "Contact",
        "admin": "Admin",
        "phone": "Phone",
        "cart": "Cart"
      },
      "hero": {
        "title": "Find the car of your dreams",
        "description": "Service Auto Adi offers a wide selection of quality used cars at competitive prices. Discover our catalog and find the vehicle that suits you.",
        "exploreCars": "Explore our cars",
        "contactUs": "Contact us"
      },
      "featuredCars": {
        "title": "Our featured cars",
        "subtitle": "Discover our selection of exceptional vehicles among our collection of {{count}} cars",
        "refresh": "Refresh",
        "viewAllCars": "View all cars",
        "noFeaturedCars": "No featured cars are currently available. Visit our shop to see all our cars.",
        "loading": "Loading cars...",
        "refreshing": "Refreshing...",
        "loadingCars": "Loading {{count}} cars..."
      },
      "services": {
        "title": "Our Services",
        "subtitle": "Service Auto Adi is your trusted partner for purchasing used cars. Discover our personalized services for a worry-free buying experience.",
        "selection": {
          "title": "Wide Selection",
          "description": "Over 100 carefully selected used vehicles to meet all needs and budgets."
        },
        "warranty": {
          "title": "Warranty Included",
          "description": "All our vehicles come with a mechanical warranty to ensure your peace of mind."
        },
        "technical": {
          "title": "Technical Service",
          "description": "Our team of qualified technicians ensures the maintenance and repairs of your vehicle."
        },
        "financing": {
          "title": "Easy Financing",
          "description": "Personalized financing solutions to facilitate the purchase of your used car."
        }
      },
      "testimonials": {
        "title": "What Our Customers Say",
        "subtitle": "Discover testimonials from our satisfied customers who found their ideal car at Service Auto Adi.",
        "testimonial1": {
          "name": "Marco Bianchi",
          "location": "Florence, Italy",
          "text": "I bought my BMW from Service Auto Adi and I am extremely satisfied. The process was simple, transparent and the team was very professional. The car is exactly as described!"
        },
        "testimonial2": {
          "name": "Sophie Dupont",
          "location": "Lyon, France",
          "text": "An exceptional experience! I made the trip from France to buy my Mercedes and I don't regret it. Thanks to the whole team for their support."
        },
        "testimonial3": {
          "name": "Alessandro Romano",
          "location": "Rome, Italy",
          "text": "Already my second purchase from Service Auto Adi. Quality cars, well maintained and at fair prices. I recommend without hesitation!"
        }
      },
      "whyChooseUs": {
        "title": "Why Choose Service Auto Adi?",
        "description": "With over 15 years of experience, we specialize in selling quality used cars. Our expertise and commitment to customer satisfaction make us a trusted partner for your next car purchase.",
        "points": {
          "inspection": "Rigorously selected and inspected vehicles",
          "service": "Personalized after-sales service",
          "prices": "Transparent and competitive prices",
          "team": "Professional and passionate team"
        },
        "learnMore": "Learn more about us",
        "visitDealer": "Visit our dealership",
        "address": "Borgo Ognissanti, 142r 50123 Firenze FI Italy",
        "phone": "+39 376 175 3341",
        "email": "info@serviceautoadi.it"
      },
      "shop": {
        "title": "Our cars",
        "carsFound": "{{count}} car found",
        "carsFound_plural": "{{count}} cars found",
        "searchPlaceholder": "Search by brand, model...",
        "sortBy": "Sort by",
        "sortOptions": {
          "default": "Default",
          "priceAsc": "Price ascending",
          "priceDesc": "Price descending",
          "newest": "Newest",
          "lowestMileage": "Lowest mileage"
        },
        "noResults": "No cars found",
        "modifySearch": "Please modify your search criteria or filters.",
        "tryAgain": "Try again",
        "previous": "Previous",
        "next": "Next",
        "loading": "Loading cars...",
        "refresh": "Refresh",
        "refreshing": "Refreshing...",
        "loadingCars": "Loading {{count}} cars..."
      },
      "admin": {
        "carCatalog": "Car catalog ({{count}})",
        "manageInventory": "Manage your vehicle inventory",
        "importedCars": "Imported cars ({{count}})",
        "importedCarsPreview": "Preview of imported cars",
        "addAllToCatalog": "Add all to catalog",
        "topBrands": "Top 10 imported brands:",
        "showing": "Showing first {{count}} of {{total}} imported cars.",
        "downloadToReplace": "To use all these {{count}} cars, download the file and replace src/data/cars.ts"
      },
      "notFound": {
        "title": "Oops! Page not found",
        "description": "The page you are looking for doesn't exist or has been moved.",
        "home": "Home",
        "shop": "Our Cars"
      }
    }
  },
  it: {
    translation: {
      "navbar": {
        "home": "Home",
        "cars": "Auto",
        "about": "Chi siamo",
        "contact": "Contatto",
        "admin": "Amministrazione",
        "phone": "Telefono",
        "cart": "Carrello"
      },
      "hero": {
        "title": "Trova l'auto dei tuoi sogni",
        "description": "Service Auto Adi offre un'ampia selezione di auto usate di qualità a prezzi competitivi. Scopri il nostro catalogo e trova il veicolo che fa per te.",
        "exploreCars": "Esplora le nostre auto",
        "contactUs": "Contattaci"
      },
      "featuredCars": {
        "title": "Le nostre auto in evidenza",
        "subtitle": "Scopri la nostra selezione di veicoli eccezionali tra la nostra collezione di {{count}} auto",
        "refresh": "Aggiorna",
        "viewAllCars": "Vedi tutte le auto",
        "noFeaturedCars": "Nessuna auto in evidenza è attualmente disponibile. Visita il nostro negozio per vedere tutte le nostre auto.",
        "loading": "Caricamento auto...",
        "refreshing": "Aggiornamento...",
        "loadingCars": "Caricamento di {{count}} auto..."
      },
      "services": {
        "title": "I nostri servizi",
        "subtitle": "Service Auto Adi è il tuo partner di fiducia per l'acquisto di auto usate. Scopri i nostri servizi personalizzati per un'esperienza di acquisto senza preoccupazioni.",
        "selection": {
          "title": "Ampia selezione",
          "description": "Oltre 100 veicoli usati accuratamente selezionati per soddisfare tutte le esigenze e i budget."
        },
        "warranty": {
          "title": "Garanzia inclusa",
          "description": "Tutti i nostri veicoli sono forniti con una garanzia meccanica per garantire la tua tranquillità."
        },
        "technical": {
          "title": "Servizio tecnico",
          "description": "Il nostro team di tecnici qualificati garantisce la manutenzione e le riparazioni del tuo veicolo."
        },
        "financing": {
          "title": "Finanziamento facile",
          "description": "Soluzioni di finanziamento personalizzate per facilitare l'acquisto della tua auto usata."
        }
      },
      "testimonials": {
        "title": "Cosa dicono i nostri clienti",
        "subtitle": "Scopri le testimonianze dei nostri clienti soddisfatti che hanno trovato la loro auto ideale presso Service Auto Adi.",
        "testimonial1": {
          "name": "Marco Bianchi",
          "location": "Firenze, Italia",
          "text": "Ho acquistato la mia BMW da Service Auto Adi e sono estremamente soddisfatto. Il processo è stato semplice, trasparente e il team era molto professionale. L'auto è esattamente come descritta!"
        },
        "testimonial2": {
          "name": "Sophie Dupont",
          "location": "Lione, Francia",
          "text": "Un'esperienza eccezionale! Ho fatto il viaggio dalla Francia per acquistare la mia Mercedes e non me ne pento. Grazie a tutto il team per il loro supporto."
        },
        "testimonial3": {
          "name": "Alessandro Romano",
          "location": "Roma, Italia",
          "text": "Già il mio secondo acquisto da Service Auto Adi. Auto di qualità, ben mantenute e a prezzi equi. Consiglio senza esitazione!"
        }
      },
      "whyChooseUs": {
        "title": "Perché scegliere Service Auto Adi?",
        "description": "Con oltre 15 anni di esperienza, siamo specializzati nella vendita di auto usate di qualità. La nostra esperienza e il nostro impegno per la soddisfazione del cliente ci rendono un partner affidabile per il tuo prossimo acquisto di auto.",
        "points": {
          "inspection": "Veicoli rigorosamente selezionati e ispezionati",
          "service": "Servizio post-vendita personalizzato",
          "prices": "Prezzi trasparenti e competitivi",
          "team": "Team professionale e appassionato"
        },
        "learnMore": "Scopri di più su di noi",
        "visitDealer": "Visita la nostra concessionaria",
        "address": "Borgo Ognissanti, 142r 50123 Firenze FI Italia",
        "phone": "+39 376 175 3341",
        "email": "info@serviceautoadi.it"
      },
      "shop": {
        "title": "Le nostre auto",
        "carsFound": "{{count}} auto trovata",
        "carsFound_plural": "{{count}} auto trovate",
        "searchPlaceholder": "Cerca per marca, modello...",
        "sortBy": "Ordina per",
        "sortOptions": {
          "default": "Predefinito",
          "priceAsc": "Prezzo crescente",
          "priceDesc": "Prezzo decrescente",
          "newest": "Più recente",
          "lowestMileage": "Chilometraggio più basso"
        },
        "noResults": "Nessuna auto trovata",
        "modifySearch": "Si prega di modificare i criteri di ricerca o i filtri.",
        "tryAgain": "Riprova",
        "previous": "Precedente",
        "next": "Successivo",
        "loading": "Caricamento auto...",
        "refresh": "Aggiorna",
        "refreshing": "Aggiornamento...",
        "loadingCars": "Caricamento di {{count}} auto..."
      },
      "admin": {
        "carCatalog": "Catalogo auto ({{count}})",
        "manageInventory": "Gestisci il tuo inventario di veicoli",
        "importedCars": "Auto importate ({{count}})",
        "importedCarsPreview": "Anteprima delle auto importate",
        "addAllToCatalog": "Aggiungi tutte al catalogo",
        "topBrands": "Top 10 marche importate:",
        "showing": "Visualizzazione delle prime {{count}} di {{total}} auto importate.",
        "downloadToReplace": "Per utilizzare tutte queste {{count}} auto, scarica il file e sostituisci src/data/cars.ts"
      },
      "notFound": {
        "title": "Oops! Pagina non trovata",
        "description": "La pagina che stai cercando non esiste o è stata spostata.",
        "home": "Home",
        "shop": "Le nostre auto"
      }
    }
  },
  es: {
    translation: translationES
  },
  pt: {
    translation: translationPT
  }
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "it", // Italian as default language
    supportedLngs: ["fr", "en", "it", "es", "pt"],
    debug: true, // Enable debug to see what's happening with language detection
    detection: {
      order: ["htmlTag", "localStorage", "navigator"], // Try to detect from html first, then localStorage, then browser
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
      htmlTag: document.documentElement // Use the html tag for detection
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

// Force Italian language on first load if no language is set
if (!localStorage.getItem('i18nextLng')) {
  i18n.changeLanguage('it');
  localStorage.setItem('i18nextLng', 'it');
}

export default i18n;
