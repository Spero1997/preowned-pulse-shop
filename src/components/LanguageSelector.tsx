
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Check, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentLanguage = i18n.language;

  const languages = [
    { code: "fr", label: t("language.fr") },
    { code: "en", label: t("language.en") },
    { code: "it", label: t("language.it") },
    { code: "es", label: t("language.es") },
    { code: "pt", label: t("language.pt") }
  ];

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  const getLanguageLabel = () => {
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? lang.label : languages[0].label;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-700 hover:text-autoBlue"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              currentLanguage === lang.code && "font-medium"
            )}
            onClick={() => handleLanguageChange(lang.code)}
          >
            {currentLanguage === lang.code && <Check className="h-4 w-4" />}
            <span className={currentLanguage === lang.code ? "ml-0" : "ml-6"}>
              {lang.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
