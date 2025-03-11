
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const languages = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
    { code: "it", label: "Italiano" },
    { code: "es", label: "Español" },
    { code: "pt", label: "Português" }
  ];

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-autoBlue"
        >
          <Globe className="h-4 w-4" />
          <span className="font-medium">
            {languages.find(lang => lang.code === currentLanguage)?.label || "Language"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span>{lang.label}</span>
            {currentLanguage === lang.code && (
              <span className="h-2 w-2 rounded-full bg-autoBlue"></span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
