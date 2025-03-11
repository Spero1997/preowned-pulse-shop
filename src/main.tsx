
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
    // Force Italian language on initial mount
    i18n.changeLanguage('it');
    console.log("Language forcefully set to Italian:", i18n.language);
    
    // Set a small timeout to make sure the language is applied
    setTimeout(() => {
      console.log("Language after timeout:", i18n.language);
    }, 500);
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
