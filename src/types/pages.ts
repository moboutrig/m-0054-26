
import { AmenityCategory, GalleryImage } from './content';

export interface PageContent {
  amenities: {
    title: string;
    subtitle: string;
    description: string;
    categories: AmenityCategory[];
  };
  gallery: {
    title: string;
    subtitle: string;
    images: GalleryImage[];
    filters: {
      all: string;
      exterior: string;
      rooms: string;
      amenities: string;
    };
  };
  apartments: {
    title: string;
    subtitle: string;
    description: string;
    filters: {
      guests: string;
      location: string;
      priceRange: string;
      anyGuests: string;
      onePlus: string;
      twoPlus: string;
      threePlus: string;
      fourPlus: string;
      anyLocation: string;
    };
    seo: {
      metaTitle: string;
      metaDescription: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    story: {
      title: string;
      content: string[];
    };
    offer: {
      title: string;
      content: string[];
    };
    contact: {
      title: string;
    };
  };
  privacy: {
    title: string;
    subtitle: string;
    sections: {
      id: string;
      title: string;
      content: string;
    }[];
  };
  terms: {
    title: string;
    subtitle: string;
    sections: {
      id: string;
      title: string;
      content: string;
    }[];
  };
  faq: {
    title: string;
    subtitle: string;
    questions: {
      id: string;
      question: string;
      answer: string;
    }[];
    contactSection: {
      title: string;
      description: string;
    };
  };
  notFound: {
    title: string;
    subtitle: string;
    description: string;
    returnHome: string;
  };
}
