import { CMSContent, RoomType } from '@/types/cms'; // Added RoomType

export const defaultContent: CMSContent = {
  siteName: "Luxury Coastal Resort",
  siteLogo: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=80&fit=crop",
  heroTitle: "Luxury Coastal Retreat",
  heroSubtitle: "Where comfort meets elegance",
  heroDescription: "Experience unparalleled luxury in our beautifully appointed rooms and suites, nestled along pristine coastlines with breathtaking ocean views.", // Changed apartments to rooms/suites
  welcomeTitle: "Welcome to Paradise",
  welcomeDescription1: "Discover your perfect coastal getaway in our collection of luxury rooms and suites. Each accommodation is thoughtfully designed to provide the ultimate in comfort and sophistication.", // Changed apartments to rooms/suites
  welcomeDescription2: "From intimate studios to spacious penthouses, our properties offer stunning ocean views, modern amenities, and personalized service that exceeds expectations.",
  bookingTitle: "Book Your Stay",
  bookingDescription: "Reserve your luxury coastal experience with our easy booking system. Choose your dates, select your perfect accommodation, and prepare for an unforgettable getaway.",
  featuredRoomsTitle: "Featured Accommodations", // Renamed
  featuredRoomsDescription: "Explore our handpicked selection of premium rooms and suites, each offering unique features and stunning coastal views.", // Renamed and updated text
  amenitiesTitle: "Premium Amenities",
  amenitiesDescription: "Indulge in our world-class amenities designed to enhance your stay and create lasting memories.",
  ctaTitle: "Ready for Your Escape?",
  ctaDescription: "Book your luxury coastal retreat today and experience the perfect blend of relaxation and sophistication.",
  contactAddress: "123 Coastal Drive, Paradise Bay",
  contactPhone: "+1 (555) 123-4567",
  contactEmail: "info@luxurycoastal.com",
  heroImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop",
  welcomeImages: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&h=400&fit=crop"
  ],
  galleryImages: [],
  // roomImages and roomAmenities are removed from top level
  navigation: [
    { id: "1", label: "Home", path: "/", isActive: true, order: 1 },
    { id: "2", label: "Rooms", path: "/rooms", isActive: true, order: 2 }, // Updated
    { id: "3", label: "Amenities", path: "/amenities", isActive: true, order: 3 },
    { id: "4", label: "Gallery", path: "/gallery", isActive: true, order: 4 },
    { id: "5", label: "About", path: "/about", isActive: true, order: 5 }
  ],
  seoSettings: {
    title: "Luxury Coastal Resort - Premium Rooms & Suites", // Updated
    description: "Experience luxury coastal living with our premium rooms and suites featuring ocean views, modern amenities, and exceptional service.", // Updated
    keywords: "luxury resort, coastal accommodation, ocean view rooms, premium suites, beachfront rental", // Updated
    ogImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=630&fit=crop"
  },
  socialMedia: {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    tripadvisor: ""
  },
  pricing: [ // Assuming roomIds still match the new RoomData ids
    { roomId: "1", basePrice: 180, currency: "EUR", seasonalRates: [] },
    { roomId: "2", basePrice: 250, currency: "EUR", seasonalRates: [] },
    { roomId: "3", basePrice: 150, currency: "EUR", seasonalRates: [] },
    { roomId: "4", basePrice: 320, currency: "EUR", seasonalRates: [] },
    { roomId: "5", basePrice: 120, currency: "EUR", seasonalRates: [] },
    { roomId: "6", basePrice: 200, currency: "EUR", seasonalRates: [] },
  ],
  testimonials: [],
  footerContent: {
    description: "Experience luxury coastal living at its finest with our premium accommodations and exceptional service.",
    quickLinks: [
      { label: "About", path: "/about" },
      { label: "Rooms", path: "/rooms" }, // Updated
      { label: "Gallery", path: "/gallery" },
      { label: "Privacy", path: "/privacy" },
      { label: "Terms", path: "/terms" }
    ],
    contactInfo: { // Address, phone, email are now sourced from root content.contactAddress etc.
      hours: "24/7 Customer Service"
    },
    newsletter: {
      title: "Stay Updated",
      description: "Subscribe to receive our latest news and exclusive offers."
    },
    copyright: "© 2024 Luxury Coastal Resort. All rights reserved."
  },
  themeSettings: {
    primaryColor: "#654321",
    secondaryColor: "#8B4513",
    accentColor: "#F0E68C",
    fontFamily: "Inter",
    borderRadius: "0.5rem"
  },
  bookingSettings: {
    enableBooking: true,
    minimumStay: 2,
    maximumStay: 30,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "Free cancellation up to 48 hours before check-in. Cancellations within 48 hours are subject to a one-night charge.",
    depositRequired: 30
  },
  pageContent: {
    amenities: { // This section seems fine
      title: "Premium Amenities",
      subtitle: "Experience luxury at every turn",
      description: "Our carefully curated amenities are designed to provide you with comfort, convenience, and unforgettable experiences throughout your stay.",
      categories: [
        {
          id: "wellness",
          title: "Wellness & Recreation",
          description: "Rejuvenate your body and mind with our wellness facilities",
          items: [
            { id: "1", title: "Spa & Wellness Center", description: "Full-service spa with massage treatments", icon: "Heart" },
            { id: "2", title: "Fitness Center", description: "State-of-the-art gym equipment", icon: "Dumbbell" },
            { id: "3", title: "Swimming Pool", description: "Infinity pool with ocean views", icon: "Waves" },
            { id: "4", title: "Yoga Studio", description: "Daily yoga and meditation classes", icon: "Activity" }
          ]
        }
      ]
    },
    gallery: { // This section seems fine
      title: "Gallery",
      subtitle: "Discover the beauty of our resort",
      images: [
        { id: "1", src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop", alt: "Ocean view suite", category: "rooms" },
        { id: "2", src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", alt: "Resort exterior", category: "exterior" }
      ],
      filters: {
        all: "All Photos",
        exterior: "Exterior",
        rooms: "Rooms", // This key "rooms" is fine.
        amenities: "Amenities"
      }
    },
    rooms: { // Renamed from apartments
      title: "Our Rooms & Suites", // Updated
      subtitle: "Find your perfect accommodation",
      filters: { // These filters can remain as they are general
        guests: "Number of Guests",
        location: "Location",
        priceRange: "Price Range",
        anyGuests: "Any Number",
        onePlus: "1+ Guests",
        twoPlus: "2+ Guests",
        threePlus: "3+ Guests",
        fourPlus: "4+ Guests",
        anyLocation: "Any Location"
      }
    },
    about: { // This section seems fine
      title: "About Us",
      subtitle: "Your luxury coastal retreat",
      story: {
        title: "Our Story",
        content: [
          "Welcome to our luxury coastal resort, where exceptional hospitality meets breathtaking natural beauty.",
          "For over a decade, we have been dedicated to providing our guests with unforgettable experiences in our carefully curated collection of premium accommodations."
        ]
      },
      offer: {
        title: "What We Offer",
        content: [
          "Our resort features a diverse range of luxury rooms and suites, each designed with comfort and elegance in mind.", // Updated
          "From intimate studios perfect for romantic getaways to spacious family suites with all the amenities of home, we have the perfect accommodation for every traveler." // Updated
        ]
      },
      contact: {
        title: "Contact Information"
      }
    },
    privacy: { // This section seems fine
      title: "Privacy Policy",
      subtitle: "How we protect your information",
      sections: [
        {
          id: "collection",
          title: "Information We Collect",
          content: "We collect information you provide directly to us, such as when you make a reservation, contact us, or subscribe to our newsletter."
        },
        {
          id: "usage",
          title: "How We Use Your Information",
          content: "We use the information we collect to provide, maintain, and improve our services, process reservations, and communicate with you."
        }
      ]
    },
    terms: { // This section seems fine
      title: "Terms of Service",
      subtitle: "Terms and conditions for using our services",
      sections: [
        {
          id: "acceptance",
          title: "Acceptance of Terms",
          content: "By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement."
        },
        {
          id: "booking",
          title: "Booking and Reservations",
          content: "All reservations are subject to availability. We reserve the right to cancel reservations in case of overbooking or other unforeseen circumstances."
        }
      ]
    },
    faq: { // This section seems fine
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions",
      questions: [
        {
          id: "checkin",
          question: "What are your check-in and check-out times?",
          answer: "Check-in is at 15:00 and check-out is at 11:00."
        },
        {
          id: "cancellation",
          question: "What is your cancellation policy?",
          answer: "Free cancellation up to 48 hours before check-in. Cancellations within 48 hours are subject to a one-night charge."
        }
      ],
      contactSection: {
        title: "Still Have Questions?",
        description: "If you couldn't find the answer you're looking for, feel free to contact us directly:"
      }
    },
    notFound: { // This section seems fine
      title: "Page Not Found",
      subtitle: "Oops! The page you're looking for doesn't exist.",
      description: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
      returnHome: "Return to Home"
    }
  },
  uiText: {
    nav: {
      bookNow: "Book Now",
      backToHome: "Back to Home"
    },
    common: { // This section seems fine
      loading: "Loading...",
      error: "An error occurred",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      add: "Add",
      remove: "Remove",
      close: "Close",
      next: "Next",
      previous: "Previous"
    },
    buttons: { // This section seems fine
      viewDetails: "View Details",
      bookNow: "Book Now",
      learnMore: "Learn More",
      contactUs: "Contact Us",
      readMore: "Read More",
      showMore: "Show More",
      showLess: "Show Less"
    },
    forms: { // This section seems fine
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      submit: "Submit",
      required: "This field is required",
      invalidEmail: "Please enter a valid email address"
    },
    room: { // Renamed from apartment
      perNight: "per night",
      guests: "guests",
      sqm: "sqm",
      features: "Features",
      availability: "Check Availability",
      checkAvailability: "Check Availability"
    },
    currency: { // This section seems fine
      symbol: "€",
      code: "EUR",
      position: "after"
    }
  },
  rooms: [ // Renamed from apartments and structure updated
    {
      id: "1",
      name: "Deluxe Sea View Suite",
      description: "Luxurious suite with panoramic sea views, modern amenities, and a private balcony.",
      capacity: 2,
      size: 45,
      location: "Beachfront",
      features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Balcony"],
      isActive: true,
      order: 1,
      roomType: 'Suite' as RoomType,
      images: {
        main: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
        ]
      },
      amenities: [
        { id: "1", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet" },
        { id: "2", name: "Kitchen", icon: "Utensils", description: "Fully equipped kitchen" }
      ]
    },
    {
      id: "2",
      name: "Premium Family Suite", // Updated name for consistency
      description: "Spacious suite ideal for families, with full kitchen and stunning coastal views.",
      capacity: 4,
      size: 75,
      location: "Second row",
      features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Washing Machine"],
      isActive: true,
      order: 2,
      roomType: 'Premium' as RoomType,
      images: {
        main: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop"
        ]
      },
      amenities: [
        { id: "3", name: "Wi-Fi", icon: "Wifi", description: "High-speed internet" },
        { id: "4", name: "Bathroom", icon: "Bath", description: "Luxury bathroom" }
      ]
    },
    {
      id: "3",
      name: "Executive Beach Studio",
      description: "Elegant studio with direct beach access, modern design, and premium finishes.",
      capacity: 2,
      size: 35,
      location: "Beachfront",
      features: ["Wi-Fi", "Kitchenette", "Bathroom", "Air Conditioning", "TV"],
      isActive: true,
      order: 3,
      roomType: 'Studio' as RoomType,
      images: { main: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop", gallery: [] },
      amenities: [{ id: "5", name: "Beach Access", icon: "Waves", description: "Direct beach access"}]
    },
    {
      id: "4",
      name: "Luxury Penthouse Suite",
      description: "Exclusive top-floor suite with expansive terrace and panoramic sea views.",
      capacity: 4,
      size: 90,
      location: "Beachfront",
      features: ["Wi-Fi", "Full Kitchen", "2 Bathrooms", "Air Conditioning", "TV", "Terrace", "Jacuzzi"],
      isActive: true,
      order: 4,
      roomType: 'Suite' as RoomType,
      images: { main: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", gallery: [] },
      amenities: [{ id: "6", name: "Jacuzzi", icon: "Wind", description: "Private Jacuzzi" }]
    },
    {
      id: "5",
      name: "Classic Double Room",
      description: "Comfortable hotel room with modern amenities and partial sea views.",
      capacity: 2,
      size: 28,
      location: "Hotel building",
      features: ["Wi-Fi", "Bathroom", "Air Conditioning", "TV", "Mini Fridge"],
      isActive: true,
      order: 5,
      roomType: 'Standard' as RoomType,
      images: { main: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop", gallery: [] },
      amenities: []
    },
    {
      id: "6",
      name: "Garden View Room", // Updated name
      description: "Peaceful room surrounded by lush gardens, just a short walk from the beach.",
      capacity: 3,
      size: 55,
      location: "Garden area",
      features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Terrace"],
      isActive: true,
      order: 6,
      roomType: 'Custom' as RoomType, // Example
      images: { main: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop", gallery: [] },
      amenities: []
    }
  ]
};
