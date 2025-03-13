
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Translation resources fallback (pour le cas où le backend ne répond pas)
const resources = {
  fr: {
    translation: {
      // Traductions en français de secours
      "services": {
        "title": "Nos services",
        "subtitle": "Service Auto Adi est votre partenaire de confiance pour l'achat de voitures d'occasion. Découvrez nos services personnalisés pour une expérience d'achat sans souci."
      },
      "navbar": {
        "home": "Accueil",
        "cars": "Voitures",
        "about": "À propos",
        "contact": "Contact"
      },
      "contact": {
        "messageSent": "Message envoyé avec succès !",
        "messageResponse": "Nous vous répondrons dans les plus brefs délais.",
        "errorSending": "Erreur lors de l'envoi du message",
        "tryAgain": "Veuillez réessayer plus tard."
      }
    }
  },
  en: {
    translation: {
      // English fallback translations
      "services": {
        "title": "Our Services",
        "subtitle": "Service Auto Adi is your trusted partner for buying used cars. Discover our personalized services for a worry-free buying experience."
      },
      "contact": {
        "messageSent": "Message sent successfully!",
        "messageResponse": "We will respond as soon as possible.",
        "errorSending": "Error sending message",
        "tryAgain": "Please try again later."
      }
    }
  },
  it: {
    translation: {
      // Traduzioni italiane di backup
      "services": {
        "title": "I nostri servizi",
        "subtitle": "Service Auto Adi è il tuo partner affidabile per l'acquisto di auto usate. Scopri i nostri servizi personalizzati per un'esperienza di acquisto senza preoccupazioni."
      }
    }
  },
  es: {
    translation: {}
  },
  pt: {
    translation: {}
  }
};

// Configure i18next
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: true, // Activé pour mieux voir les erreurs dans la console
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['navigator', 'querystring', 'cookie', 'localStorage', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    },
    react: {
      useSuspense: false, // Important pour éviter les problèmes avec Suspense
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    }
  });

// Ensure document language attribute is set
document.documentElement.lang = i18n.language || 'fr';

// Ajouter des journaux pour le débogage
console.log("i18n initialized with language:", i18n.language);
console.log("Available languages:", Object.keys(resources));

// Log any language change events
i18n.on('languageChanged', (lng) => {
  console.log("Language changed to:", lng);
  document.documentElement.lang = lng;
});

export default i18n;
