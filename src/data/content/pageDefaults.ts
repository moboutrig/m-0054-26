
import { PageContent } from '@/types/pages';

export const pageDefaults: PageContent = {
  amenities: {
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
  gallery: {
    title: "Gallery",
    subtitle: "Discover the beauty of our resort",
    images: [
      { id: "1", src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop", alt: "Ocean view suite", category: "rooms" },
      { id: "2", src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", alt: "Resort exterior", category: "exterior" }
    ],
    filters: {
      all: "All Photos",
      exterior: "Exterior",
      rooms: "Rooms",
      amenities: "Amenities"
    }
  },
  apartments: {
    title: "Our Apartments",
    subtitle: "Find your perfect accommodation",
    description: "Discover our collection of luxury apartments and suites, each designed to provide you with an unforgettable coastal experience. From intimate studios to spacious family apartments, we have the perfect accommodation for every type of traveler.",
    filters: {
      guests: "Number of Guests",
      location: "Location",
      priceRange: "Price Range",
      anyGuests: "Any Number",
      onePlus: "1+ Guests",
      twoPlus: "2+ Guests",
      threePlus: "3+ Guests",
      fourPlus: "4+ Guests",
      anyLocation: "Any Location"
    },
    seo: {
      metaTitle: "Luxury Apartments & Suites | Coastal Resort",
      metaDescription: "Browse our collection of luxury apartments and suites with stunning ocean views, modern amenities, and premium service. Book your perfect coastal getaway today."
    }
  },
  about: {
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
        "Our resort features a diverse range of luxury apartments and suites, each designed with comfort and elegance in mind.",
        "From intimate studios perfect for romantic getaways to spacious family apartments with all the amenities of home, we have the perfect accommodation for every traveler."
      ]
    },
    contact: {
      title: "Contact Information"
    }
  },
  privacy: {
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
  terms: {
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
  faq: {
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
  notFound: {
    title: "Page Not Found",
    subtitle: "Oops! The page you're looking for doesn't exist.",
    description: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
    returnHome: "Return to Home"
  }
};
