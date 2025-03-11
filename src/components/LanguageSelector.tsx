
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

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
