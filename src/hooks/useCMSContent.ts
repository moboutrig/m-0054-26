
import { useState, useEffect } from 'react';
import { CMSContent } from '@/types/cms';
import { defaultContent } from '@/data/defaultCMSContent';

export const useCMSContent = () => {
  const [content, setContent] = useState<CMSContent>(defaultContent);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/content');
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}`);
        }
        const data: CMSContent = await response.json();
        // Deep merge fetched data with defaultContent to ensure all keys are present
        // This is a shallow example; a proper deep merge might be needed if structure is very dynamic
        // For now, assuming fetched data is largely complete or `defaultContent` provides good fallbacks for missing top-level keys.
        const mergedContent = {
          ...defaultContent,
          ...data,
          // Ensuring nested objects are also merged, at least one level deep for critical parts
          roomImages: { ...defaultContent.roomImages, ...data.roomImages },
          roomAmenities: { ...defaultContent.roomAmenities, ...data.roomAmenities },
          navigation: data.navigation || defaultContent.navigation,
          seoSettings: { ...defaultContent.seoSettings, ...data.seoSettings },
          socialMedia: { ...defaultContent.socialMedia, ...data.socialMedia },
          pricing: data.pricing || defaultContent.pricing,
          testimonials: data.testimonials || defaultContent.testimonials,
          footerContent: { ...defaultContent.footerContent, ...data.footerContent },
          themeSettings: { ...defaultContent.themeSettings, ...data.themeSettings },
          bookingSettings: { ...defaultContent.bookingSettings, ...data.bookingSettings },
          pageContent: { ...defaultContent.pageContent, ...data.pageContent },
          uiText: { ...defaultContent.uiText, ...data.uiText },
          apartments: data.apartments || defaultContent.apartments,
        };
        setContent(mergedContent);
        localStorage.setItem('cms-content-cache', JSON.stringify(mergedContent)); // Cache fetched content
      } catch (err) {
        console.error('Error fetching CMS content from API:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        // Fallback to local storage cache if API fails
        const cachedContent = localStorage.getItem('cms-content-cache');
        if (cachedContent) {
          try {
            setContent(JSON.parse(cachedContent));
          } catch (parseError) {
            console.error('Error parsing cached CMS content:', parseError);
            setContent(defaultContent); // Fallback to default if cache is corrupt
          }
        } else {
          setContent(defaultContent); // Fallback to default if no cache
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []); // Empty dependency array means this runs once on mount

  const saveContent = (newContent: CMSContent) => {
    setContent(newContent);
    // This now primarily updates the local state for immediate UI feedback.
    // The actual persistence to backend happens via "Save Changes" button.
    // We can still cache it to local storage for faster perceived loads on next visit if API is slow.
    localStorage.setItem('cms-content-cache', JSON.stringify(newContent));
  };

  return { content, saveContent, isLoading, error };
};
