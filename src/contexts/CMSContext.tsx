
import React, { createContext, useContext } from 'react';
import { CMSContent, CMSContextType, RoomImages, RoomAmenity, NavigationItem, Testimonial, PricingInfo } from '@/types/cms';
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
