
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Square, MapPin } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";

export interface ApartmentProps {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  size: number;
  image: string;
  location: string;
  features: string[];
}

export default function ApartmentCard({ 
  id, 
  name, 
  description, 
  price, 
  capacity, 
  size, 
  image, 
  location, 
  features 
}: ApartmentProps) {
  const { content, getFormattedPrice } = useCMS();
  const uiText = content.uiText;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="font-semibold text-primary">
            {getFormattedPrice(price)} {uiText.apartment.perNight}
          </span>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{capacity} {uiText.apartment.guests}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span>{size} {uiText.apartment.sqm}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">{uiText.apartment.features}:</h4>
          <div className="flex flex-wrap gap-1">
            {features.slice(0, 3).map((feature, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-muted text-xs rounded-full"
              >
                {feature}
              </span>
            ))}
            {features.length > 3 && (
              <span className="px-2 py-1 bg-muted text-xs rounded-full">
                +{features.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            {uiText.buttons.viewDetails}
          </Button>
          <Button className="flex-1">
            {uiText.buttons.bookNow}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
