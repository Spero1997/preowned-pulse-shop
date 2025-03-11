
import { LanguageSelector } from "./LanguageSelector";

export function LanguageSwitcher() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-full shadow-lg p-2">
        <LanguageSelector variant="icon-only" />
      </div>
    </div>
  );
}
