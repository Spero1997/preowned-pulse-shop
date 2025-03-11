
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  // Log the current language when the component mounts
  useEffect(() => {
    console.log("Current language in LanguageSwitcher:", i18n.language);
  }, [i18n.language]);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-full shadow-lg p-2">
        <LanguageSelector variant="icon-only" />
      </div>
    </div>
  );
}
