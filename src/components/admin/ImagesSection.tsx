
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ImagesSectionProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  error?: string;
}

export const ImagesSection = ({ images, onImagesChange, error }: ImagesSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    if (!file.type.startsWith('image/')) {
      toast.error("Type de fichier non valide", {
        description: "Veuillez sélectionner une image (JPG, PNG, etc.)"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        onImagesChange([...images, reader.result.toString()]);
        toast.success("Image ajoutée", {
          description: "L'image a été ajoutée avec succès"
        });
      }
    };
    reader.readAsDataURL(file);
    
    // Reset the file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    if (images.length > 1) {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      onImagesChange(updatedImages);
    } else {
      toast.error("Erreur", {
        description: "Vous devez conserver au moins une image"
      });
    }
  };

  return (
    <div className="space-y-4">
      <Label>Images</Label>
      <div className="flex gap-2">
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="flex-1"
        />
        <Button 
          type="button" 
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
        >
          <Upload className="h-4 w-4 mr-2" />
          Parcourir
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative rounded-md overflow-hidden border h-48">
            <img 
              src={image} 
              alt={`Image ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <button 
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
