
import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

// Import i18n configuration before rendering the application
import i18n from "./i18n.ts";

// Language initialization wrapper to ensure the language is properly set
const LanguageInitializer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Force reload the language on initial mount
    const currentLang = i18n.language || 'it';
    if (currentLang) {
      i18n.changeLanguage(currentLang);
      console.log("Language set to:", currentLang);
    }
  }, []);

  return <>{children}</>;
};

// Render the app with a loading fallback while i18n initializes
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Caricamento dell'applicazione...</div>}>
      <LanguageInitializer>
        <App />
        <LanguageSwitcher />
      </LanguageInitializer>
    </Suspense>
  </React.StrictMode>
);
