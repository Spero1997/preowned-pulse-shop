
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Import i18n configuration before rendering the application
import "./i18n.ts";

// Render the app with a loading fallback while i18n initializes
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Chargement de l'application...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);
