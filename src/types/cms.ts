
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
  enableBooking: boolean;
  minimumStay: number;
  maximumStay: number;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  depositRequired: number;
}

export interface AmenityCategory {
  id: string;
  title: string;
  description: string;
  items: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface PageContent {
  amenities: {
    title: string;
    subtitle: string;
    description: string;
    categories: AmenityCategory[];
  };
  gallery: {
    title: string;
    subtitle: string;
    images: GalleryImage[];
    filters: {
      all: string;
      exterior: string;
      rooms: string;
      amenities: string;
    };
  };
  apartments: {
    title: string;
    subtitle: string;
    filters: {
      guests: string;
      location: string;
      priceRange: string;
      anyGuests: string;
      onePlus: string;
      twoPlus: string;
      threePlus: string;
      fourPlus: string;
      anyLocation: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    story: {
      title: string;
      content: string[];
    };
    offer: {
      title: string;
      content: string[];
    };
    contact: {
      title: string;
    };
  };
  privacy: {
    title: string;
    subtitle: string;
    sections: {
      id: string;
      title: string;
      content: string;
    }[];
  };
  terms: {
    title: string;
    subtitle: string;
    sections: {
      id: string;
      title: string;
      content: string;
    }[];
  };
  faq: {
    title: string;
    subtitle: string;
    questions: {
      id: string;
      question: string;
      answer: string;
    }[];
    contactSection: {
      title: string;
      description: string;
    };
  };
  notFound: {
    title: string;
    subtitle: string;
    description: string;
    returnHome: string;
  };
}

export interface UIText {
  nav: {
    bookNow: string;
    backToHome: string;
  };
  common: {
    loading: string;
    error: string;
    save: string;
    cancel: string;
    edit: string;
    delete: string;
    add: string;
    remove: string;
    close: string;
    next: string;
    previous: string;
  };
  buttons: {
    viewDetails: string;
    bookNow: string;
    learnMore: string;
    contactUs: string;
    readMore: string;
    showMore: string;
    showLess: string;
  };
  forms: {
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    required: string;
    invalidEmail: string;
  };
  apartment: {
    perNight: string;
    guests: string;
    sqm: string;
    features: string;
    availability: string;
    checkAvailability: string;
  };
  currency: {
    symbol: string;
    code: string;
    position: 'before' | 'after';
  };
}

export interface ApartmentData {
  id: string;
  name: string;
  description: string;
  capacity: number;
  size: number;
  location: string;
  features: string[];
  isActive: boolean;
  order: number;
}

export interface CMSContent {
  siteName: string;
  siteLogo: string;
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
  // Page-specific content
  pageContent: PageContent;
  // UI Text
  uiText: UIText;
  // Apartment data
  apartments: ApartmentData[];
}

export interface CMSContextType {
  content: CMSContent;
  updateContent: (key: keyof CMSContent, value: any) => void;
  updateRoomImages: (roomId: string, images: RoomImages) => void;
  updateRoomAmenities: (roomId: string, amenities: RoomAmenity[]) => void;
  updateNavigation: (navigation: NavigationItem[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updatePricing: (pricing: PricingInfo[]) => void;
  updatePageContent: (pageKey: keyof PageContent, content: any) => void;
  updateUIText: (uiText: UIText) => void;
  updateApartments: (apartments: ApartmentData[]) => void;
  resetContent: () => void;
  getFormattedPrice: (price: number, currency?: string) => string;
  getApartmentWithPricing: (apartmentId: string) => any;
}
