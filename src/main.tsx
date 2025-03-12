
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

// Import i18n configuration before rendering the application
import i18n from "./i18n.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <App />
      <LanguageSwitcher />
    </Suspense>
  </React.StrictMode>
);
