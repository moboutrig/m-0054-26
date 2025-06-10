
import { RoomAmenity, RoomImages, Testimonial, ApartmentData } from './content';
import { NavigationItem } from './navigation';
import { SEOSettings, SocialMedia } from './seo';
import { PricingInfo } from './pricing';
import { FooterContent } from './footer';
import { ThemeSettings } from './theme';
import { BookingSettings } from './booking';
import { PageContent } from './pages';
import { UIText } from './ui';

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

// Re-export types for convenience
export * from './content';
export * from './navigation';
export * from './seo';
export * from './pricing';
export * from './footer';
export * from './theme';
export * from './booking';
export * from './pages';
export * from './ui';
