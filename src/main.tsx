
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

// Import i18n configuration before rendering the application
import "./i18n.ts";

// Ajouter un délai pour s'assurer que i18n est complètement chargé
// avant de rendre l'application
setTimeout(() => {
  console.log("Rendering application after delay to ensure i18n is loaded");
  
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
      <LanguageSwitcher />
    </React.StrictMode>
  );
}, 100);
