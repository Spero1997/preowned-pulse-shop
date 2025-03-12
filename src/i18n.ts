
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Translation resources fallback (pour le cas où le backend ne répond pas)
const resources = {
  fr: {
    translation: {}
  },
  en: {
    translation: {}
  },
  it: {
    translation: {}
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
    debug: false,
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
      useSuspense: true,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    }
  });

// Ensure document language attribute is set
document.documentElement.lang = i18n.language || 'fr';

export default i18n;
