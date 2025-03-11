
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { t } = useTranslation();
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-full shadow-lg p-2">
        <LanguageSelector variant="icon-only" />
      </div>
    </div>
  );
}
