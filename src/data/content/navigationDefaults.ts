import { NavigationItem } from '@/types/navigation';

export const navigationDefaults: NavigationItem[] = [
  { id: "1", label: "Home", path: "/", isActive: true, order: 1 },
  { id: "2", label: "Apartments", path: "/apartments", isActive: true, order: 2 },
  { id: "3", label: "Amenities", path: "/amenities", isActive: true, order: 3 },
  { id: "4", label: "Gallery", path: "/gallery", isActive: true, order: 4 },
  { id: "5", label: "About", path: "/about", isActive: true, order: 5 }
];
