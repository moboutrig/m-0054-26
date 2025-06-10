
import React, { createContext, useContext, useState, useEffect } from 'react';

interface RoomAmenity {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface RoomImages {
  main: string;
  gallery: string[];
}

interface CMSContent {
  siteName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  welcomeTitle: string;
  welcomeDescription1: string;
  welcomeDescription2: string;
  bookingTitle: string;
  bookingDescription: string;
  featuredApartmentsTitle: string;
  featuredApartmentsDescription: string;
  amenitiesTitle: string;
  amenitiesDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  // Image management
  heroImage: string;
  welcomeImages: string[];
  galleryImages: string[];
  // Room-specific data
  roomImages: { [roomId: string]: RoomImages };
  roomAmenities: { [roomId: string]: RoomAmenity[] };
}

interface CMSContextType {
  content: CMSContent;
  updateContent: (key: keyof CMSContent, value: any) => void;
  updateRoomImages: (roomId: string, images: RoomImages) => void;
  updateRoomAmenities: (roomId: string, amenities: RoomAmenity[]) => void;
  resetContent: () => void;
}

const defaultContent: CMSContent = {
  siteName: "MareSereno",
  heroTitle: "Experience Seaside Tranquility",
  heroSubtitle: "BEACHFRONT LUXURY ACCOMMODATION",
  heroDescription: "Discover our exclusive collection of luxury beachfront apartments and hotel rooms, offering unparalleled comfort and breathtaking sea views.",
  welcomeTitle: "Luxury Seaside Accommodations",
  welcomeDescription1: "Nestled on the pristine Mediterranean coastline, MareSereno offers an exquisite collection of luxury apartments and hotel rooms. Our beachfront accommodations combine elegant design with modern comfort, creating the perfect setting for an unforgettable seaside getaway.",
  welcomeDescription2: "Whether you're seeking a romantic escape, a family vacation, or a peaceful retreat, our diverse range of accommodations caters to every preference and need. Each space is thoughtfully designed to provide panoramic sea views and direct beach access.",
  bookingTitle: "Reserve Your Perfect Getaway",
  bookingDescription: "Take the first step towards your dream vacation by checking availability and securing your preferred dates. Our simple booking process ensures a seamless experience from reservation to arrival.",
  featuredApartmentsTitle: "Featured Apartments",
  featuredApartmentsDescription: "Discover our most popular accommodation options, each offering a perfect blend of comfort, style, and breathtaking sea views.",
  amenitiesTitle: "Experience The Best",
  amenitiesDescription: "Enjoy our premium facilities and services designed to make your stay exceptional.",
  ctaTitle: "Ready for Your Dream Vacation?",
  ctaDescription: "Book your stay today and experience the perfect blend of luxury, comfort, and stunning sea views.",
  contactAddress: "Via del Mare 123, 12345 Seaside City",
  contactPhone: "+39 123 456 7890",
  contactEmail: "info@maresereno.com",
  // Default images
  heroImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop",
  welcomeImages: [
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop"
  ],
  galleryImages: [
    "https://images.unsplash.com/photo-1550000000000?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1550000100000?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1550000200000?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1550000300000?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1550000400000?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1550000500000?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1550000600000?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1550000700000?w=400&h=400&fit=crop"
  ],
  roomImages: {
    "1": {
      main: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&h=300&fit=crop"
      ]
    }
  },
  roomAmenities: {
    "1": [
      { id: "wifi", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet access" },
      { id: "kitchen", name: "Kitchen", icon: "Coffee", description: "Fully equipped kitchen" },
      { id: "bathroom", name: "Bathroom", icon: "Bath", description: "Modern bathroom with premium fixtures" },
      { id: "ac", name: "Air Conditioning", icon: "Wind", description: "Climate control system" },
      { id: "tv", name: "TV", icon: "Tv", description: "Smart TV with streaming services" },
      { id: "balcony", name: "Balcony", icon: "Home", description: "Private balcony with sea view" }
    ]
  }
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<CMSContent>(defaultContent);

  useEffect(() => {
    const savedContent = localStorage.getItem('cms-content');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setContent({ ...defaultContent, ...parsedContent });
      } catch (error) {
        console.error('Error parsing saved CMS content:', error);
      }
    }
  }, []);

  const updateContent = (key: keyof CMSContent, value: any) => {
    const newContent = { ...content, [key]: value };
    setContent(newContent);
    localStorage.setItem('cms-content', JSON.stringify(newContent));
  };

  const updateRoomImages = (roomId: string, images: RoomImages) => {
    const newContent = {
      ...content,
      roomImages: {
        ...content.roomImages,
        [roomId]: images
      }
    };
    setContent(newContent);
    localStorage.setItem('cms-content', JSON.stringify(newContent));
  };

  const updateRoomAmenities = (roomId: string, amenities: RoomAmenity[]) => {
    const newContent = {
      ...content,
      roomAmenities: {
        ...content.roomAmenities,
        [roomId]: amenities
      }
    };
    setContent(newContent);
    localStorage.setItem('cms-content', JSON.stringify(newContent));
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem('cms-content');
  };

  return (
    <CMSContext.Provider value={{ 
      content, 
      updateContent, 
      updateRoomImages, 
      updateRoomAmenities, 
      resetContent 
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
