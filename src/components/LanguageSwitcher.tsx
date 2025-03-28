
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  // Log the current language when the component mounts or changes
  useEffect(() => {
    console.log("Current language in LanguageSwitcher:", i18n.language);
    
    // If no language is detected, default to French
    if (!i18n.language || i18n.language === 'cimode') {
      console.log("No language detected, setting to French");
      i18n.changeLanguage('fr').catch(error => {
        console.error("Error changing language:", error);
      });
    }
    
    // Update document language attribute when language changes
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-full shadow-lg p-2">
        <LanguageSelector variant="icon-only" />
      </div>
    </div>
  );
}
