
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Importation directe des fichiers de traduction
import translationFR from '../public/locales/fr/translation.json';
import translationEN from '../public/locales/en/translation.json';
import translationIT from '../public/locales/it/translation.json';
import translationES from '../public/locales/es/translation.json';
import translationPT from '../public/locales/pt/translation.json';

// Ressources de traduction
const resources = {
  fr: {
    translation: translationFR
  },
  en: {
    translation: translationEN
  },
  it: {
    translation: translationIT
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
    }
  });

export default i18n;
