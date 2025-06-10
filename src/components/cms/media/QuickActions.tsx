
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  file: {
    url: string;
    type: 'image' | 'video';
  };
  category: string;
  onUseAsLogo?: (url: string) => void;
  onUseAsHeroImage?: (url: string) => void;
  onAddToGallery?: (url: string) => void;
}

export default function QuickActions({ 
  file, 
  category, 
  onUseAsLogo, 
  onUseAsHeroImage, 
  onAddToGallery 
}: QuickActionsProps) {
  if (category === 'logo' && file.type === 'image' && onUseAsLogo) {
    return (
      <Button
        size="sm"
        onClick={() => onUseAsLogo(file.url)}
        className="w-full text-xs"
      >
        Use as Logo
      </Button>
    );
  }
  
  if (category === 'hero' && file.type === 'image' && onUseAsHeroImage) {
    return (
      <Button
        size="sm"
        onClick={() => onUseAsHeroImage(file.url)}
        className="w-full text-xs"
      >
        Use as Hero
      </Button>
    );
  }
  
  if (category === 'gallery' && file.type === 'image' && onAddToGallery) {
    return (
      <Button
        size="sm"
        onClick={() => onAddToGallery(file.url)}
        className="w-full text-xs"
      >
        Add to Gallery
      </Button>
    );
  }
  
  return null;
}
