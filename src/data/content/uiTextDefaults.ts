
import { UIText } from '@/types/ui';

export const uiTextDefaults: UIText = {
  nav: {
    bookNow: "Book Now",
    backToHome: "Back to Home"
  },
  common: {
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
  buttons: {
    viewDetails: "View Details",
    bookNow: "Book Now",
    learnMore: "Learn More",
    contactUs: "Contact Us",
    readMore: "Read More",
    showMore: "Show More",
    showLess: "Show Less"
  },
  forms: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    submit: "Submit",
    required: "This field is required",
    invalidEmail: "Please enter a valid email address"
  },
  apartment: {
    perNight: "per night",
    guests: "guests",
    sqm: "sqm",
    features: "Features",
    availability: "Check Availability",
    checkAvailability: "Check Availability"
  },
  currency: {
    symbol: "€",
    code: "EUR",
    position: "after"
  },
  filters: {
    clearFilters: "Clear Filters",
    noResults: "No apartments match your current filters.",
    noResultsDescription: "Try adjusting your search criteria or clear all filters to see more options."
  }
};
