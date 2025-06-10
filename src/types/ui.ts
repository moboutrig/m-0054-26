
export interface UIText {
  nav: {
    bookNow: string;
    backToHome: string;
  };
  common: {
    loading: string;
    error: string;
    save: string;
    cancel: string;
    edit: string;
    delete: string;
    add: string;
    remove: string;
    close: string;
    next: string;
    previous: string;
  };
  buttons: {
    viewDetails: string;
    bookNow: string;
    learnMore: string;
    contactUs: string;
    readMore: string;
    showMore: string;
    showLess: string;
  };
  forms: {
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    required: string;
    invalidEmail: string;
  };
  apartment: {
    perNight: string;
    guests: string;
    sqm: string;
    features: string;
    availability: string;
    checkAvailability: string;
  };
  currency: {
    symbol: string;
    code: string;
    position: 'before' | 'after';
  };
  filters: {
    clearFilters: string;
    noResults: string;
    noResultsDescription: string;
  };
}
