
import React, { createContext, useContext, useState, useEffect } from 'react';

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
}

interface CMSContextType {
  content: CMSContent;
  updateContent: (key: keyof CMSContent, value: string) => void;
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
  contactEmail: "info@maresereno.com"
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

  const updateContent = (key: keyof CMSContent, value: string) => {
    const newContent = { ...content, [key]: value };
    setContent(newContent);
    localStorage.setItem('cms-content', JSON.stringify(newContent));
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem('cms-content');
  };

  return (
    <CMSContext.Provider value={{ content, updateContent, resetContent }}>
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
