
export const imageDefaults = {
  heroImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop",
  welcomeImages: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&h=400&fit=crop"
  ],
  galleryImages: [],
  roomImages: {
    "1": {
      main: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
      ]
    },
    "2": {
      main: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop"
      ]
    }
  },
  roomAmenities: {
    "1": [
      { id: "1", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet" },
      { id: "2", name: "Kitchen", icon: "Utensils", description: "Fully equipped kitchen" }
    ],
    "2": [
      { id: "3", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet" },
      { id: "4", name: "Bathroom", icon: "Bath", description: "Luxury bathroom" }
    ]
  }
};
</tml-write>

<lov-write file_path="src/data/content/navigationDefaults.ts">
import { NavigationItem } from '@/types/navigation';

export const navigationDefaults: NavigationItem[] = [
  { id: "1", label: "Home", path: "/", isActive: true, order: 1 },
  { id: "2", label: "Apartments", path: "/apartments", isActive: true, order: 2 },
  { id: "3", label: "Amenities", path: "/amenities", isActive: true, order: 3 },
  { id: "4", label: "Gallery", path: "/gallery", isActive: true, order: 4 },
  { id: "5", label: "About", path: "/about", isActive: true, order: 5 }
];
