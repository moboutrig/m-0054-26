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

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  isActive: boolean;
  order: number;
}

interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

interface SocialMedia {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  tripadvisor: string;
}

interface PricingInfo {
  roomId: string;
  basePrice: number;
  currency: string;
  seasonalRates: { season: string; multiplier: number }[];
}

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  isActive: boolean;
}

interface FooterContent {
  description: string;
  quickLinks: { label: string; path: string }[];
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
  newsletter: {
    title: string;
    description: string;
  };
  copyright: string;
}

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
}

interface BookingSettings {
  minimumStay: number;
  maximumStay: number;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  depositRequired: number;
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
  // New features
  navigation: NavigationItem[];
  seoSettings: SEOSettings;
  socialMedia: SocialMedia;
  pricing: PricingInfo[];
  testimonials: Testimonial[];
  footerContent: FooterContent;
  themeSettings: ThemeSettings;
  bookingSettings: BookingSettings;
}

interface CMSContextType {
  content: CMSContent;
  updateContent: (key: keyof CMSContent, value: any) => void;
  updateRoomImages: (roomId: string, images: RoomImages) => void;
  updateRoomAmenities: (roomId: string, amenities: RoomAmenity[]) => void;
  updateNavigation: (navigation: NavigationItem[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updatePricing: (pricing: PricingInfo[]) => void;
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
    },
    "2": {
      main: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
      ]
    },
    "3": {
      main: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop"
      ]
    },
    "4": {
      main: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop"
      ]
    },
    "5": {
      main: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop"
      ]
    },
    "6": {
      main: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
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
    ],
    "2": [
      { id: "wifi", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet access" },
      { id: "kitchen", name: "Kitchenette", icon: "Coffee", description: "Compact kitchen with essentials" },
      { id: "bathroom", name: "Bathroom", icon: "Bath", description: "Stylish bathroom with shower" },
      { id: "ac", name: "Air Conditioning", icon: "Wind", description: "Climate control system" },
      { id: "workspace", name: "Work Desk", icon: "Users", description: "Dedicated workspace area" }
    ],
    "3": [
      { id: "wifi", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet access" },
      { id: "bathroom", name: "Bathroom", icon: "Bath", description: "Modern bathroom facilities" },
      { id: "ac", name: "Air Conditioning", icon: "Wind", description: "Climate control system" },
      { id: "tv", name: "Smart TV", icon: "Tv", description: "Entertainment system" },
      { id: "balcony", name: "Terrace", icon: "Home", description: "Private outdoor space" },
      { id: "minibar", name: "Mini Bar", icon: "Coffee", description: "Refreshment station" }
    ],
    "4": [
      { id: "wifi", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet access" },
      { id: "kitchen", name: "Full Kitchen", icon: "Coffee", description: "Complete cooking facilities" },
      { id: "bathroom", name: "Bathroom", icon: "Bath", description: "Luxury bathroom with bathtub" },
      { id: "ac", name: "Air Conditioning", icon: "Wind", description: "Climate control system" },
      { id: "tv", name: "TV", icon: "Tv", description: "Large screen entertainment" },
      { id: "balcony", name: "Sea View Balcony", icon: "Home", description: "Panoramic ocean views" },
      { id: "parking", name: "Parking", icon: "Car", description: "Private parking space" }
    ],
    "5": [
      { id: "wifi", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet access" },
      { id: "kitchen", name: "Kitchen", icon: "Coffee", description: "Modern cooking facilities" },
      { id: "bathroom", name: "Bathroom", icon: "Bath", description: "Contemporary bathroom design" },
      { id: "ac", name: "Air Conditioning", icon: "Wind", description: "Climate control system" },
      { id: "dining", name: "Dining Area", icon: "Utensils", description: "Separate dining space" }
    ],
    "6": [
      { id: "wifi", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet access" },
      { id: "kitchen", name: "Gourmet Kitchen", icon: "Coffee", description: "Professional-grade appliances" },
      { id: "bathroom", name: "Master Bathroom", icon: "Bath", description: "Spa-like bathroom experience" },
      { id: "ac", name: "Climate Control", icon: "Wind", description: "Advanced climate system" },
      { id: "tv", name: "Entertainment System", icon: "Tv", description: "Premium audio-visual setup" },
      { id: "balcony", name: "Premium Balcony", icon: "Home", description: "Expansive outdoor living space" },
      { id: "parking", name: "VIP Parking", icon: "Car", description: "Reserved parking spot" },
      { id: "gym", name: "Fitness Access", icon: "Dumbbell", description: "Complimentary gym access" }
    ]
  },
  // New features with default data
  navigation: [
    { id: "1", label: "Home", path: "/", isActive: true, order: 1 },
    { id: "2", label: "Apartments", path: "/apartments", isActive: true, order: 2 },
    { id: "3", label: "Amenities", path: "/amenities", isActive: true, order: 3 },
    { id: "4", label: "Gallery", path: "/gallery", isActive: true, order: 4 },
    { id: "5", label: "Contact", path: "/contact", isActive: true, order: 5 }
  ],
  seoSettings: {
    title: "MareSereno - Luxury Beachfront Accommodations",
    description: "Experience luxury seaside living at MareSereno. Premium beachfront apartments and hotel rooms with stunning sea views on the Mediterranean coast.",
    keywords: "luxury accommodation, beachfront hotel, seaside apartments, Mediterranean vacation, premium rooms",
    ogImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=630&fit=crop"
  },
  socialMedia: {
    facebook: "https://facebook.com/maresereno",
    instagram: "https://instagram.com/maresereno",
    twitter: "https://twitter.com/maresereno",
    youtube: "https://youtube.com/maresereno",
    tripadvisor: "https://tripadvisor.com/maresereno"
  },
  pricing: [
    { roomId: "1", basePrice: 180, currency: "EUR", seasonalRates: [{ season: "High Season", multiplier: 1.3 }, { season: "Low Season", multiplier: 0.8 }] },
    { roomId: "2", basePrice: 150, currency: "EUR", seasonalRates: [{ season: "High Season", multiplier: 1.3 }, { season: "Low Season", multiplier: 0.8 }] },
    { roomId: "3", basePrice: 120, currency: "EUR", seasonalRates: [{ season: "High Season", multiplier: 1.3 }, { season: "Low Season", multiplier: 0.8 }] },
    { roomId: "4", basePrice: 250, currency: "EUR", seasonalRates: [{ season: "High Season", multiplier: 1.3 }, { season: "Low Season", multiplier: 0.8 }] },
    { roomId: "5", basePrice: 100, currency: "EUR", seasonalRates: [{ season: "High Season", multiplier: 1.3 }, { season: "Low Season", multiplier: 0.8 }] },
    { roomId: "6", basePrice: 140, currency: "EUR", seasonalRates: [{ season: "High Season", multiplier: 1.3 }, { season: "Low Season", multiplier: 0.8 }] }
  ],
  testimonials: [
    {
      id: "1",
      name: "Sarah Johnson",
      location: "London, UK",
      rating: 5,
      comment: "Absolutely stunning location with incredible sea views. The staff was exceptional and the room was beautifully appointed.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      isActive: true
    },
    {
      id: "2",
      name: "Marco Rossi",
      location: "Rome, Italy",
      rating: 5,
      comment: "Perfect for a romantic getaway. The sunset from our balcony was magical every evening.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isActive: true
    },
    {
      id: "3",
      name: "Emily Chen",
      location: "New York, USA",
      rating: 5,
      comment: "Luxury at its finest. Every detail was perfect and the beach access was amazing.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isActive: true
    }
  ],
  footerContent: {
    description: "Luxurious beachfront apartments and hotel rooms with stunning sea views, offering the perfect blend of comfort and elegance for your dream vacation.",
    quickLinks: [
      { label: "About Us", path: "/about" },
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms of Service", path: "/terms" },
      { label: "FAQ", path: "/faq" }
    ],
    contactInfo: {
      address: "Via del Mare 123, 12345 Seaside City",
      phone: "+39 123 456 7890",
      email: "info@maresereno.com",
      hours: "Reception: 24/7"
    },
    newsletter: {
      title: "Newsletter",
      description: "Subscribe to our newsletter for special deals and updates."
    },
    copyright: "2024 MareSereno. All rights reserved."
  },
  themeSettings: {
    primaryColor: "#654321",
    secondaryColor: "#8B4513",
    accentColor: "#F0E68C",
    fontFamily: "Inter",
    borderRadius: "0.5rem"
  },
  bookingSettings: {
    minimumStay: 2,
    maximumStay: 14,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    depositRequired: 30
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
        const mergedContent = {
          ...defaultContent,
          ...parsedContent,
          roomImages: { ...defaultContent.roomImages, ...parsedContent.roomImages },
          roomAmenities: { ...defaultContent.roomAmenities, ...parsedContent.roomAmenities },
          navigation: parsedContent.navigation || defaultContent.navigation,
          seoSettings: { ...defaultContent.seoSettings, ...parsedContent.seoSettings },
          socialMedia: { ...defaultContent.socialMedia, ...parsedContent.socialMedia },
          pricing: parsedContent.pricing || defaultContent.pricing,
          testimonials: parsedContent.testimonials || defaultContent.testimonials,
          footerContent: { ...defaultContent.footerContent, ...parsedContent.footerContent },
          themeSettings: { ...defaultContent.themeSettings, ...parsedContent.themeSettings },
          bookingSettings: { ...defaultContent.bookingSettings, ...parsedContent.bookingSettings }
        };
        setContent(mergedContent);
      } catch (error) {
        console.error('Error parsing saved CMS content:', error);
      }
    }
  }, []);

  const saveContent = (newContent: CMSContent) => {
    setContent(newContent);
    localStorage.setItem('cms-content', JSON.stringify(newContent));
  };

  const updateContent = (key: keyof CMSContent, value: any) => {
    const newContent = { ...content, [key]: value };
    saveContent(newContent);
  };

  const updateRoomImages = (roomId: string, images: RoomImages) => {
    const newContent = {
      ...content,
      roomImages: {
        ...content.roomImages,
        [roomId]: images
      }
    };
    saveContent(newContent);
  };

  const updateRoomAmenities = (roomId: string, amenities: RoomAmenity[]) => {
    const newContent = {
      ...content,
      roomAmenities: {
        ...content.roomAmenities,
        [roomId]: amenities
      }
    };
    saveContent(newContent);
  };

  const updateNavigation = (navigation: NavigationItem[]) => {
    const newContent = { ...content, navigation };
    saveContent(newContent);
  };

  const updateTestimonials = (testimonials: Testimonial[]) => {
    const newContent = { ...content, testimonials };
    saveContent(newContent);
  };

  const updatePricing = (pricing: PricingInfo[]) => {
    const newContent = { ...content, pricing };
    saveContent(newContent);
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
      updateNavigation,
      updateTestimonials,
      updatePricing,
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

export default CMSProvider;
