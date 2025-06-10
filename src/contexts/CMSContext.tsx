
import React, { createContext, useContext } from 'react';
import { CMSContent, CMSContextType, RoomData, RoomImages, RoomAmenity, NavigationItem, Testimonial, PricingInfo, PageContent, UIText } from '@/types/cms'; // Replaced ApartmentData with RoomData
import { useCMSContent } from '@/hooks/useCMSContent';
import { defaultContent } from '@/data/defaultCMSContent'; // Import for fallback

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { content, saveContent, isLoading, error } = useCMSContent();

  // The actual content state is now managed by useCMSContent,
  // including initial loading from API and fallback to defaultContent on error.

  const updateContent = (key: keyof CMSContent, value: any) => {
    const newContent = { ...content, [key]: value };
    saveContent(newContent);
  };

  // updateRoomImages and updateRoomAmenities are removed as this is now part of RoomData within updateRooms

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

  const updateRooms = (rooms: RoomData[]) => { // Renamed from updateApartments, type changed to RoomData[]
    const newContent = { ...content, rooms };
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

  const getRoomWithPricing = (roomId: string) => { // Renamed from getApartmentWithPricing, param renamed
    const room = content.rooms?.find(r => r.id === roomId); // Changed from apartments to rooms
    const pricing = content.pricing?.find(p => p.roomId === roomId);
    // Images are now directly on the room object
    
    if (!room) return null;
    
    return {
      ...room, // room already contains images and amenities
      price: pricing?.basePrice || 150, // Default pricing if not found
      currency: pricing?.currency || content.uiText.currency.code || 'EUR', // Default currency
      // 'image' and 'gallery' are part of room.images
      // 'features' are part of room.features
      // 'amenities' are part of room.amenities
    };
  };

  const resetContent = () => {
    // Consider if this should also clear the server state or just local cache
    localStorage.removeItem('cms-content-cache'); // Updated to match the key used in useCMSContent
    // Potentially, re-trigger fetch or set to default:
    // saveContent(defaultContent); // This would update the local state and cache
    window.location.reload(); // Or navigate to reset state without full reload
  };

  // Display loading or error states globally if desired, or let individual components handle them.
  // For this task, we ensure the context provides content fetched from API or a fallback.
  if (isLoading) {
    // Simple global loading state example.
    // In a real app, this might be a more sophisticated loading spinner overlay,
    // or each component using the context could handle its own loading UI.
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em' }}>Loading CMS Data...</div>;
  }

  if (error) {
    // Similar to loading, this is a simple global error display.
    // Components could also check an error state from the context if needed.
    // The useCMSContent hook already tries to fallback to cached or default content.
    console.error("CMS Loading Error in Provider:", error);
    // Optionally display a user-facing error message here, though useCMSContent handles fallback.
    // return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Error loading CMS data: {error}. Displaying cached or default content.</div>;
  }

  // content is now guaranteed to be either fetched data, cached data, or defaultContent.
  return (
    <CMSContext.Provider value={{
      content: content || defaultContent, // Ensure content is never null/undefined if API fails badly
      updateContent,
      // updateRoomImages and updateRoomAmenities removed
      updateNavigation,
      updateTestimonials,
      updatePricing,
      updatePageContent,
      updateUIText,
      updateRooms, // Renamed from updateApartments
      getFormattedPrice,
      getRoomWithPricing, // Renamed from getApartmentWithPricing
      resetContent,
      // Expose isLoading and error if needed by consumer components, though not strictly required by the prompt for now
      // isLoading,
      // error
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
