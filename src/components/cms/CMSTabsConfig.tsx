
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CMSTabsConfig() {
  return (
    <TabsList className="w-full flex flex-wrap justify-start gap-1 h-auto p-1">
      <TabsTrigger value="content">Content</TabsTrigger>
      <TabsTrigger value="settings">Site</TabsTrigger>
      <TabsTrigger value="contact">Contact</TabsTrigger>
      <TabsTrigger value="images">Images</TabsTrigger>
      <TabsTrigger value="rooms">Rooms</TabsTrigger>
      <TabsTrigger value="navigation">Navigation</TabsTrigger>
      <TabsTrigger value="seo">SEO</TabsTrigger>
      <TabsTrigger value="social">Social</TabsTrigger>
      <TabsTrigger value="pricing">Pricing</TabsTrigger>
      <TabsTrigger value="testimonials">Reviews</TabsTrigger>
      <TabsTrigger value="footer">Footer</TabsTrigger>
      <TabsTrigger value="booking">Booking</TabsTrigger>
      <TabsTrigger value="theme">Theme</TabsTrigger>
    </TabsList>
  );
}
