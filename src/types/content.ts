
export interface RoomAmenity {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface RoomImages {
  main: string;
  gallery: string[];
}

export interface AmenityCategory {
  id: string;
  title: string;
  description: string;
  items: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  isActive: boolean;
}

export interface ApartmentData {
  id: string;
  name: string;
  description: string;
  capacity: number;
  size: number;
  location: string;
  features: string[];
  isActive: boolean;
  order: number;
}
