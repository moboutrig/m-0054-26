
export interface FooterContent {
  description: string;
  quickLinks: { label: string; path: string }[];
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
  newsletter: {
    title: string;
    description: string;
  };
  copyright: string;
}
