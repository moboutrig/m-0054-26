import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Square, MapPin, CheckCircle, ImageIcon } from "lucide-react"; // Added CheckCircle for amenities, ImageIcon
import { useCMS } from "@/contexts/CMSContext";
import { RoomData } from "@/types/cms"; // Import RoomData

// The props for RoomCard will be the RoomData object itself, plus price and currency added by getRoomWithPricing
export interface RoomCardProps {
  room: RoomData & { price: number; currency: string };
}

export default function RoomCard({ room }: RoomCardProps) {
  const { content, getFormattedPrice } = useCMS();
  const uiText = content.uiText;

  const {
    id,
    name,
    description,
    price,
    currency, // currency is available if needed for display, getFormattedPrice handles it
    capacity,
    size,
    images, // Contains main and gallery
    location,
    features = [],
    amenities = [] // Added amenities
  } = room;

  const mainImage = images?.main || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop'; // Default placeholder

  // Ensure features and amenities are always arrays
  const safeFeatures = Array.isArray(features) ? features : [];
  const safeAmenities = Array.isArray(amenities) ? amenities : [];

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      <div className="relative overflow-hidden">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {price > 0 && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="font-semibold text-primary">
              {getFormattedPrice(price)} {uiText.apartment.perNight}
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow">{description}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1" title="Capacity">
            <Users className="h-4 w-4" />
            <span>{capacity} {uiText.apartment.guests}</span>
          </div>
          <div className="flex items-center gap-1" title="Size">
            <Square className="h-4 w-4" />
            <span>{size} {uiText.apartment.sqm}</span>
          </div>
          <div className="flex items-center gap-1" title="Location">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {safeFeatures.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-1">{uiText.apartment.features}:</h4>
            <div className="flex flex-wrap gap-1">
              {safeFeatures.slice(0, 3).map((feature, index) => (
                <span
                  key={`feature-${index}`}
                  className="px-2 py-1 bg-muted text-xs rounded-full"
                >
                  {feature}
                </span>
              ))}
              {safeFeatures.length > 3 && (
                <span className="px-2 py-1 bg-muted text-xs rounded-full">
                  +{safeFeatures.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {safeAmenities.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-1">Main Amenities:</h4>
            <div className="flex flex-wrap gap-1">
              {safeAmenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={`amenity-${index}`}
                  className="px-2 py-1 bg-muted text-xs rounded-full flex items-center gap-1"
                >
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {amenity.name}
                </span>
              ))}
              {safeAmenities.length > 3 && (
                <span className="px-2 py-1 bg-muted text-xs rounded-full">
                  +{safeAmenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto flex gap-2"> {/* mt-auto to push buttons to the bottom */}
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
