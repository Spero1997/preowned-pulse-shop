
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
    fallbackLng: "fr",
    supportedLngs: ["fr", "en", "it", "es", "pt"],
    debug: false,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"]
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
