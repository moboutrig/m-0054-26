
export interface RoomAmenity {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface RoomImages {
  main: string;
  gallery: string[];
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  isActive: boolean;
  order: number;
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export interface SocialMedia {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  tripadvisor: string;
}

export interface PricingInfo {
  roomId: string;
  basePrice: number;
  currency: string;
  seasonalRates: { season: string; multiplier: number }[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  isActive: boolean;
}

export interface FooterContent {
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

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
}

export interface BookingSettings {
  minimumStay: number;
  maximumStay: number;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  depositRequired: number;
}

export interface CMSContent {
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

export interface CMSContextType {
  content: CMSContent;
  updateContent: (key: keyof CMSContent, value: any) => void;
  updateRoomImages: (roomId: string, images: RoomImages) => void;
  updateRoomAmenities: (roomId: string, amenities: RoomAmenity[]) => void;
  updateNavigation: (navigation: NavigationItem[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updatePricing: (pricing: PricingInfo[]) => void;
  resetContent: () => void;
}
