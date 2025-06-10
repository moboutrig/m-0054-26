
import { CMSContent } from '@/types/cms';
import { siteDefaults } from './content/siteDefaults';
import { imageDefaults } from './content/imageDefaults';
import { navigationDefaults } from './content/navigationDefaults';
import { 
  seoDefaults, 
  socialMediaDefaults, 
  themeDefaults, 
  bookingDefaults, 
  footerDefaults, 
  pricingDefaults 
} from './content/settingsDefaults';
import { pageDefaults } from './content/pageDefaults';
import { uiTextDefaults } from './content/uiTextDefaults';
import { apartmentDefaults } from './content/apartmentDefaults';

export const defaultContent: CMSContent = {
  ...siteDefaults,
  ...imageDefaults,
  navigation: navigationDefaults,
  seoSettings: seoDefaults,
  socialMedia: socialMediaDefaults,
  pricing: pricingDefaults,
  testimonials: [],
  footerContent: footerDefaults,
  themeSettings: themeDefaults,
  bookingSettings: bookingDefaults,
  pageContent: pageDefaults,
  uiText: uiTextDefaults,
  apartments: apartmentDefaults
};
