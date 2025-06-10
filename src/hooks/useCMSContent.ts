
import { useState, useEffect } from 'react';
import { CMSContent } from '@/types/cms';
import { defaultContent } from '@/data/defaultCMSContent';

export const useCMSContent = () => {
  const [content, setContent] = useState<CMSContent>(defaultContent);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetContent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. Attempt to fetch data from GET /api/content
        const response = await fetch('/api/content');
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }
        const apiData: CMSContent = await response.json();

        // Deep merge fetched data with defaultContent to ensure all keys are present
        const mergedContent = {
            ...defaultContent,
            ...apiData,
            roomImages: { ...defaultContent.roomImages, ...apiData.roomImages },
            roomAmenities: { ...defaultContent.roomAmenities, ...apiData.roomAmenities },
            navigation: apiData.navigation || defaultContent.navigation,
            seoSettings: { ...defaultContent.seoSettings, ...apiData.seoSettings },
            socialMedia: { ...defaultContent.socialMedia, ...apiData.socialMedia },
            pricing: apiData.pricing || defaultContent.pricing,
            testimonials: apiData.testimonials || defaultContent.testimonials,
            footerContent: { ...defaultContent.footerContent, ...apiData.footerContent },
            themeSettings: { ...defaultContent.themeSettings, ...apiData.themeSettings },
            bookingSettings: { ...defaultContent.bookingSettings, ...apiData.bookingSettings },
            pageContent: { ...defaultContent.pageContent, ...apiData.pageContent },
            uiText: { ...defaultContent.uiText, ...apiData.uiText },
            apartments: apiData.apartments || defaultContent.apartments,
        };

        setContent(mergedContent);
        localStorage.setItem('cms-content-cache', JSON.stringify(mergedContent));
        setError(null); // Clear any previous errors if API fetch is successful
        console.log("CMS content loaded from API.");

      } catch (apiError: any) {
        console.error('Failed to fetch CMS content from API:', apiError.message);
        setError(`API Error: ${apiError.message}. Attempting to load from cache.`);

        // 2. If API fetch fails, attempt to load from localStorage
        try {
          const cachedContentJSON = localStorage.getItem('cms-content-cache');
          if (cachedContentJSON) {
            const cachedData = JSON.parse(cachedContentJSON);
            setContent(cachedData);
            console.log("CMS content loaded from cache due to API failure.");
            // Keep the API error message for info, but content is now from cache
            // Or, could set setError(null) if showing cached data is considered "ok" for the user
            setError(`API unavailable. Displaying cached content. (API Error: ${apiError.message})`);
          } else {
            console.warn('Cache miss after API failure. Falling back to default content.');
            setContent(defaultContent); // Ensure it's explicitly defaultContent
            setError(`API Error: ${apiError.message}. No cache available. Using default content.`);
          }
        } catch (cacheError: any) {
          console.error('Failed to load or parse CMS content from cache:', cacheError.message);
          setContent(defaultContent); // Ensure it's explicitly defaultContent
          setError(`API Error: ${apiError.message}. Cache Error: ${cacheError.message}. Using default content.`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetContent();
  }, []); // Empty dependency array ensures this runs once on mount

  const saveContent = (newContent: CMSContent) => {
    setContent(newContent);
    // This now primarily updates the local state for immediate UI feedback.
    // The actual persistence to backend happens via "Save Changes" button.
    // We can still cache it to local storage for faster perceived loads on next visit if API is slow.
    localStorage.setItem('cms-content-cache', JSON.stringify(newContent));
  };

  return { content, saveContent, isLoading, error };
};
