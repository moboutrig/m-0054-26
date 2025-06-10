
import { SEOSettings, SocialMedia } from '@/types/seo';
import { ThemeSettings } from '@/types/theme';
import { BookingSettings } from '@/types/booking';
import { FooterContent } from '@/types/footer';
import { PricingInfo } from '@/types/pricing';

export const seoDefaults: SEOSettings = {
  title: "Luxury Coastal Resort - Premium Accommodations",
  description: "Experience luxury coastal living with our premium apartments and suites featuring ocean views, modern amenities, and exceptional service.",
  keywords: "luxury resort, coastal accommodation, ocean view apartments, premium suites, beachfront rental",
  ogImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=630&fit=crop"
};

export const socialMediaDefaults: SocialMedia = {
  facebook: "",
  instagram: "",
  twitter: "",
  youtube: "",
  tripadvisor: ""
};

export const themeDefaults: ThemeSettings = {
  primaryColor: "#654321",
  secondaryColor: "#8B4513",
  accentColor: "#F0E68C",
  fontFamily: "Inter",
  borderRadius: "0.5rem"
};

export const bookingDefaults: BookingSettings = {
  enableBooking: true,
  minimumStay: 2,
  maximumStay: 30,
  checkInTime: "15:00",
  checkOutTime: "11:00",
  cancellationPolicy: "Free cancellation up to 48 hours before check-in. Cancellations within 48 hours are subject to a one-night charge.",
  depositRequired: 30
};

export const footerDefaults: FooterContent = {
  description: "Experience luxury coastal living at its finest with our premium accommodations and exceptional service.",
  quickLinks: [
    { label: "About", path: "/about" },
    { label: "Apartments", path: "/apartments" },
    { label: "Gallery", path: "/gallery" },
    { label: "Privacy", path: "/privacy" },
    { label: "Terms", path: "/terms" }
  ],
  contactInfo: {
    address: "123 Coastal Drive, Paradise Bay",
    phone: "+1 (555) 123-4567",
    email: "info@luxurycoastal.com",
    hours: "24/7 Customer Service"
  },
  newsletter: {
    title: "Stay Updated",
    description: "Subscribe to receive our latest news and exclusive offers."
  },
  copyright: "© 2024 Luxury Coastal Resort. All rights reserved."
};

export const pricingDefaults: PricingInfo[] = [
  { roomId: "1", basePrice: 180, currency: "EUR", seasonalRates: [] },
  { roomId: "2", basePrice: 250, currency: "EUR", seasonalRates: [] }
];
