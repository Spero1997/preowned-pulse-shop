
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Ressources de traduction directement définies
const resources = {
  fr: {
    translation: {
      // Définitions françaises ici (ou vide si vous utilisez les fichiers locaux)
    }
  },
  en: {
    translation: {
      // Définitions anglaises ici
    }
  },
  it: {
    translation: {
      // Définitions italiennes ici
    }
  },
  es: {
    translation: {
      // Espagnol
    }
  },
  pt: {
    translation: {
      // Portugais
    }
  }
};

// Initialize i18next
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "fr",
    supportedLngs: ["fr", "en", "it", "es", "pt"],
    debug: true,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"]
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    }
  });

export default i18n;
