
import React, { createContext, useContext } from 'react';
import { CMSContent, CMSContextType, RoomImages, RoomAmenity, NavigationItem, Testimonial, PricingInfo, PageContent, UIText, ApartmentData } from '@/types/cms';
import { useCMSContent } from '@/hooks/useCMSContent';

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { content, saveContent } = useCMSContent();

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

  const updatePageContent = (pageKey: keyof PageContent, pageContent: any) => {
    const newContent = {
      ...content,
      pageContent: {
        ...content.pageContent,
        [pageKey]: pageContent
      }
    };
    saveContent(newContent);
  };

  const updateUIText = (uiText: UIText) => {
    const newContent = { ...content, uiText };
    saveContent(newContent);
  };

  const updateApartments = (apartments: ApartmentData[]) => {
    const newContent = { ...content, apartments };
    saveContent(newContent);
  };

  const getFormattedPrice = (price: number, currency?: string) => {
    const currencySettings = content.uiText.currency;
    const symbol = currency === 'USD' ? '$' : currency === 'GBP' ? '£' : currencySettings.symbol;
    
    if (currencySettings.position === 'before') {
      return `${symbol}${price}`;
    } else {
      return `${price}${symbol}`;
    }
  };

  const getApartmentWithPricing = (apartmentId: string) => {
    const apartment = content.apartments.find(apt => apt.id === apartmentId);
    const pricing = content.pricing.find(p => p.roomId === apartmentId);
    const images = content.roomImages[apartmentId];
    
    if (!apartment || !pricing) return null;
    
    return {
      ...apartment,
      price: pricing.basePrice,
      currency: pricing.currency,
      image: images?.main || '',
      gallery: images?.gallery || []
    };
  };

  const resetContent = () => {
    localStorage.removeItem('cms-content');
    window.location.reload();
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
      updatePageContent,
      updateUIText,
      updateApartments,
      getFormattedPrice,
      getApartmentWithPricing,
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
