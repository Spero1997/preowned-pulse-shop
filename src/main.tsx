
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

// Import i18n configuration before rendering the application
import "./i18n.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <LanguageSwitcher />
  </React.StrictMode>
);
