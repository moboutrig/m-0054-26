import { CMSContent } from '@/types/cms';

export const defaultContent: CMSContent = {
  siteName: "MareSereno",
  heroTitle: "Experience Seaside Tranquility",
  heroSubtitle: "BEACHFRONT LUXURY ACCOMMODATION",
  heroDescription: "Discover our exclusive collection of luxury beachfront apartments and hotel rooms, offering unparalleled comfort and breathtaking sea views.",
  welcomeTitle: "Luxury Seaside Accommodations",
  welcomeDescription1: "Nestled on the pristine Mediterranean coastline, MareSereno offers an exquisite collection of luxury apartments and hotel rooms. Our beachfront accommodations combine elegant design with modern comfort, creating the perfect setting for an unforgettable seaside getaway.",
  welcomeDescription2: "Whether you're seeking a romantic escape, a family vacation, or a peaceful retreat, our diverse range of accommodations caters to every preference and need. Each space is thoughtfully designed to provide panoramic sea views and direct beach access.",
  bookingTitle: "Reserve Your Perfect Getaway",
  bookingDescription: "Take the first step towards your dream vacation by checking availability and securing your preferred dates. Our simple booking process ensures a seamless experience from reservation to arrival.",
  featuredApartmentsTitle: "Featured Apartments",
  featuredApartmentsDescription: "Discover our most popular accommodation options, each offering a perfect blend of comfort, style, and breathtaking sea views.",
  amenitiesTitle: "Experience The Best",
  amenitiesDescription: "Enjoy our premium facilities and services designed to make your stay exceptional.",
  ctaTitle: "Ready for Your Dream Vacation?",
  ctaDescription: "Book your stay today and experience the perfect blend of luxury, comfort, and stunning sea views.",
  contactAddress: "Via del Mare 123, 12345 Seaside City",
  contactPhone: "+39 123 456 7890",
  contactEmail: "info@maresereno.com",
  // Default images
  heroImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop",
  welcomeImages: [
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop"
  ],
  galleryImages: [
    "https://images.unsplash.com/photo-1550000000000?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1550000100000?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1550000200000?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1550000300000?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1550000400000?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1550000500000?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1550000600000?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1550000700000?w=400&h=400&fit=crop"
  ],
  roomImages: {
    "1": {
      main: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&h=300&fit=crop"
      ]
    },
    "2": {
      main: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
      ]
    },
    "3": {
      main: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop"
      ]
    },
    "4": {
      main: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop"
      ]
    },
    "5": {
      main: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop"
      ]
    },
    "6": {
      main: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
      ]
    }
  },
  roomAmenities: {
    "1": [
      { id: "wifi", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet access" },
      { id: "kitchen", name: "Kitchen", icon: "Coffee", description: "Fully equipped kitchen" },
      { id: "bathroom", name: "Bathroom", icon: "Bath", description: "Modern bathroom with premium fixtures" },
      { id: "ac", name: "Air Conditioning", icon: "Wind", description: "Climate control system" },
      { id: "tv", name: "TV", icon: "Tv", description: "Smart TV with streaming services" },
      { id: "balcony", name: "Balcony", icon: "Home", description: "Private balcony with sea view" }
    ],
    "2": [
      { id: "wifi", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet access" },
      { id: "kitchen", name: "Kitchenette", icon: "Coffee", description: "Compact kitchen with essentials" },
      { id: "bathroom", name: "Bathroom", icon: "Bath", description: "Stylish bathroom with shower" },
      { id: "ac", name: "Air Conditioning", icon: "Wind", description: "Climate control system" },
      { id: "workspace", name: "Work Desk", icon: "Users", description: "Dedicated workspace area" }
    ],
    "3": [
      { id: "wifi", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet access" },
      { id: "bathroom", name: "Bathroom", icon: "Bath", description: "Modern bathroom facilities" },
      { id: "ac", name: "Air Conditioning", icon: "Wind", description: "Climate control system" },
      { id: "tv", name: "Smart TV", icon: "Tv", description: "Entertainment system" },
      { id: "balcony", name: "Terrace", icon: "Home", description: "Private outdoor space" },
      { id: "minibar", name: "Mini Bar", icon: "Coffee", description: "Refreshment station" }
    ],
    "4": [
      { id: "wifi", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet access" },
      { id: "kitchen", name: "Full Kitchen", icon: "Coffee", description: "Complete cooking facilities" },
      { id: "bathroom", name: "Bathroom", icon: "Bath", description: "Luxury bathroom with bathtub" },
      { id: "ac", name: "Air Conditioning", icon: "Wind", description: "Climate control system" },
      { id: "tv", name: "TV", icon: "Tv", description: "Large screen entertainment" },
      { id: "balcony", name: "Sea View Balcony", icon: "Home", description: "Panoramic ocean views" },
      { id: "parking", name: "Parking", icon: "Car", description: "Private parking space" }
    ],
    "5": [
      { id: "wifi", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet access" },
      { id: "kitchen", name: "Kitchen", icon: "Coffee", description: "Modern cooking facilities" },
      { id: "bathroom", name: "Bathroom", icon: "Bath", description: "Contemporary bathroom design" },
      { id: "ac", name: "Air Conditioning", icon: "Wind", description: "Climate control system" },
      { id: "dining", name: "Dining Area", icon: "Utensils", description: "Separate dining space" }
    ],
    "6": [
      { id: "wifi", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet access" },
      { id: "kitchen", name: "Gourmet Kitchen", icon: "Coffee", description: "Professional-grade appliances" },
      { id: "bathroom", name: "Master Bathroom", icon: "Bath", description: "Spa-like bathroom experience" },
      { id: "ac", name: "Climate Control", icon: "Wind", description: "Advanced climate system" },
      { id: "tv", name: "Entertainment System", icon: "Tv", description: "Premium audio-visual setup" },
      { id: "balcony", name: "Premium Balcony", icon: "Home", description: "Expansive outdoor living space" },
      { id: "parking", name: "VIP Parking", icon: "Car", description: "Reserved parking spot" },
      { id: "gym", name: "Fitness Access", icon: "Dumbbell", description: "Complimentary gym access" }
    ]
  },
  navigation: [
    { id: "1", label: "Home", path: "/", isActive: true, order: 1 },
    { id: "2", label: "Apartments", path: "/apartments", isActive: true, order: 2 },
    { id: "3", label: "Amenities", path: "/amenities", isActive: true, order: 3 },
    { id: "4", label: "Gallery", path: "/gallery", isActive: true, order: 4 },
    { id: "5", label: "Contact", path: "/contact", isActive: true, order: 5 }
  ],
  seoSettings: {
    title: "MareSereno - Luxury Beachfront Accommodations",
    description: "Experience luxury seaside living at MareSereno. Premium beachfront apartments and hotel rooms with stunning sea views on the Mediterranean coast.",
    keywords: "luxury accommodation, beachfront hotel, seaside apartments, Mediterranean vacation, premium rooms",
    ogImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=630&fit=crop"
  },
  socialMedia: {
    facebook: "https://facebook.com/maresereno",
    instagram: "https://instagram.com/maresereno",
    twitter: "https://twitter.com/maresereno",
    youtube: "https://youtube.com/maresereno",
    tripadvisor: "https://tripadvisor.com/maresereno"
  },
  pricing: [
    { roomId: "1", basePrice: 180, currency: "EUR", seasonalRates: [{ season: "High Season", multiplier: 1.3 }, { season: "Low Season", multiplier: 0.8 }] },
    { roomId: "2", basePrice: 150, currency: "EUR", seasonalRates: [{ season: "High Season", multiplier: 1.3 }, { season: "Low Season", multiplier: 0.8 }] },
    { roomId: "3", basePrice: 120, currency: "EUR", seasonalRates: [{ season: "High Season", multiplier: 1.3 }, { season: "Low Season", multiplier: 0.8 }] },
    { roomId: "4", basePrice: 250, currency: "EUR", seasonalRates: [{ season: "High Season", multiplier: 1.3 }, { season: "Low Season", multiplier: 0.8 }] },
    { roomId: "5", basePrice: 100, currency: "EUR", seasonalRates: [{ season: "High Season", multiplier: 1.3 }, { season: "Low Season", multiplier: 0.8 }] },
    { roomId: "6", basePrice: 140, currency: "EUR", seasonalRates: [{ season: "High Season", multiplier: 1.3 }, { season: "Low Season", multiplier: 0.8 }] }
  ],
  testimonials: [
    {
      id: "1",
      name: "Sarah Johnson",
      location: "London, UK",
      rating: 5,
      comment: "Absolutely stunning location with incredible sea views. The staff was exceptional and the room was beautifully appointed.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      isActive: true
    },
    {
      id: "2",
      name: "Marco Rossi",
      location: "Rome, Italy",
      rating: 5,
      comment: "Perfect for a romantic getaway. The sunset from our balcony was magical every evening.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isActive: true
    },
    {
      id: "3",
      name: "Emily Chen",
      location: "New York, USA",
      rating: 5,
      comment: "Luxury at its finest. Every detail was perfect and the beach access was amazing.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isActive: true
    }
  ],
  footerContent: {
    description: "Luxurious beachfront apartments and hotel rooms with stunning sea views, offering the perfect blend of comfort and elegance for your dream vacation.",
    quickLinks: [
      { label: "About Us", path: "/about" },
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms of Service", path: "/terms" },
      { label: "FAQ", path: "/faq" }
    ],
    contactInfo: {
      address: "Via del Mare 123, 12345 Seaside City",
      phone: "+39 123 456 7890",
      email: "info@maresereno.com",
      hours: "Reception: 24/7"
    },
    newsletter: {
      title: "Newsletter",
      description: "Subscribe to our newsletter for special deals and updates."
    },
    copyright: "2024 MareSereno. All rights reserved."
  },
  themeSettings: {
    primaryColor: "#654321",
    secondaryColor: "#8B4513",
    accentColor: "#F0E68C",
    fontFamily: "Inter",
    borderRadius: "0.5rem"
  },
  bookingSettings: {
    minimumStay: 2,
    maximumStay: 14,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    depositRequired: 30
  },
  // New page-specific content
  pageContent: {
    amenities: {
      title: "Premium Amenities & Services",
      subtitle: "Experience luxury and comfort at every turn",
      description: "Discover our comprehensive range of world-class amenities and personalized services, carefully designed to exceed your expectations and create unforgettable memories during your stay.",
      categories: [
        {
          id: "wellness",
          title: "Wellness & Fitness",
          description: "Rejuvenate your body and mind with our premium wellness facilities",
          items: [
            { id: "spa", title: "Luxury Spa", description: "Full-service spa with massage treatments", icon: "Heart" },
            { id: "gym", title: "Fitness Center", description: "State-of-the-art equipment and facilities", icon: "Dumbbell" },
            { id: "pool", title: "Infinity Pool", description: "Stunning infinity pool with sea views", icon: "Waves" },
            { id: "yoga", title: "Yoga Classes", description: "Daily yoga sessions by the beach", icon: "Activity" }
          ]
        },
        {
          id: "dining",
          title: "Dining & Culinary",
          description: "Savor exceptional cuisine and premium beverages",
          items: [
            { id: "restaurant", title: "Fine Dining", description: "Gourmet restaurant with Mediterranean cuisine", icon: "Utensils" },
            { id: "cafe", title: "Beachside Café", description: "Casual dining with ocean views", icon: "Coffee" },
            { id: "bar", title: "Sunset Bar", description: "Premium cocktails and wine selection", icon: "Wine" },
            { id: "service", title: "Room Service", description: "24/7 in-room dining service", icon: "Clock" }
          ]
        },
        {
          id: "services",
          title: "Guest Services",
          description: "Personalized services to enhance your stay",
          items: [
            { id: "concierge", title: "Concierge", description: "24/7 concierge assistance", icon: "Clock" },
            { id: "transfer", title: "Airport Transfer", description: "Luxury transportation service", icon: "Plane" },
            { id: "parking", title: "Valet Parking", description: "Complimentary valet parking", icon: "Car" },
            { id: "tours", title: "Local Tours", description: "Guided excursions and activities", icon: "MapPin" }
          ]
        },
        {
          id: "entertainment",
          title: "Recreation & Entertainment",
          description: "Endless activities and entertainment options",
          items: [
            { id: "beach", title: "Private Beach", description: "Exclusive beach access with loungers", icon: "Waves" },
            { id: "events", title: "Event Space", description: "Elegant venues for special occasions", icon: "Users" },
            { id: "music", title: "Live Music", description: "Regular live entertainment", icon: "Music" },
            { id: "library", title: "Library Lounge", description: "Quiet reading and relaxation area", icon: "BookOpen" }
          ]
        }
      ]
    },
    gallery: {
      title: "Photo Gallery",
      subtitle: "Discover the beauty of MareSereno through our lens",
      filters: {
        all: "All Photos",
        exterior: "Exterior Views",
        rooms: "Rooms & Suites",
        amenities: "Amenities"
      },
      images: [
        {
          id: "1",
          src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
          alt: "Beachfront view",
          category: "exterior"
        },
        {
          id: "2",
          src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
          alt: "Luxury suite interior",
          category: "rooms"
        },
        {
          id: "3",
          src: "https://images.unsplash.com/photo-1584132905271-512c958d674a?w=800&h=600&fit=crop",
          alt: "Swimming pool",
          category: "amenities"
        },
        {
          id: "4",
          src: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop",
          alt: "Premium apartment",
          category: "rooms"
        },
        {
          id: "5",
          src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop",
          alt: "Beach sunset",
          category: "exterior"
        },
        {
          id: "6",
          src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
          alt: "Dining area",
          category: "amenities"
        },
        {
          id: "7",
          src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop",
          alt: "Bathroom",
          category: "rooms"
        },
        {
          id: "8",
          src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop",
          alt: "Beach pathway",
          category: "exterior"
        },
        {
          id: "9",
          src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
          alt: "Restaurant",
          category: "amenities"
        },
        {
          id: "10",
          src: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&h=600&fit=crop",
          alt: "Bedroom",
          category: "rooms"
        },
        {
          id: "11",
          src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
          alt: "Beach umbrellas",
          category: "exterior"
        },
        {
          id: "12",
          src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
          alt: "Spa",
          category: "amenities"
        }
      ]
    }
  }
};
