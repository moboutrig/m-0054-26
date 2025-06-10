
import { useState, useEffect } from 'react';
import { CMSContent } from '@/types/cms';
import { defaultContent } from '@/data/defaultCMSContent';

export const useCMSContent = () => {
  const [content, setContent] = useState<CMSContent>(defaultContent);

  useEffect(() => {
    const savedContent = localStorage.getItem('cms-content');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        const mergedContent = {
          ...defaultContent,
          ...parsedContent,
          roomImages: { ...defaultContent.roomImages, ...parsedContent.roomImages },
          roomAmenities: { ...defaultContent.roomAmenities, ...parsedContent.roomAmenities },
          navigation: parsedContent.navigation || defaultContent.navigation,
          seoSettings: { ...defaultContent.seoSettings, ...parsedContent.seoSettings },
          socialMedia: { ...defaultContent.socialMedia, ...parsedContent.socialMedia },
          pricing: parsedContent.pricing || defaultContent.pricing,
          testimonials: parsedContent.testimonials || defaultContent.testimonials,
          footerContent: { ...defaultContent.footerContent, ...parsedContent.footerContent },
          themeSettings: { ...defaultContent.themeSettings, ...parsedContent.themeSettings },
          bookingSettings: { ...defaultContent.bookingSettings, ...parsedContent.bookingSettings }
        };
        setContent(mergedContent);
      } catch (error) {
        console.error('Error parsing saved CMS content:', error);
      }
    }
  }, []);

  const saveContent = (newContent: CMSContent) => {
    setContent(newContent);
    localStorage.setItem('cms-content', JSON.stringify(newContent));
  };

  return { content, saveContent };
};
