
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CarSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const CarSearch = ({ searchTerm, onSearchChange }: CarSearchProps) => {
  return (
    <div className="flex gap-2 items-center mt-2">
      <Search className="h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
};
