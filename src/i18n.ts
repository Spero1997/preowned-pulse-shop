
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Initialize i18next
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "fr",
    supportedLngs: ["fr", "en", "it", "es", "pt"],
    debug: true, // Activer le mode debug pour voir les problèmes de chargement
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
      loadPath: '/locales/{{lng}}/translation.json' // Correction du chemin - retrait du point pour utiliser la racine
    }
  });

export default i18n;
