
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CMSTabsConfig() {
  return (
    <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 gap-1"> {/* Adjusted grid columns */}
      <TabsTrigger value="content" className="text-xs">Site</TabsTrigger>
      {/* <TabsTrigger value="apartments" className="text-xs">Apartments</TabsTrigger> // Removed */}
      <TabsTrigger value="navigation" className="text-xs">Navigation</TabsTrigger>
      <TabsTrigger value="rooms" className="text-xs">Rooms</TabsTrigger>
      <TabsTrigger value="testimonials" className="text-xs">Reviews</TabsTrigger>
      <TabsTrigger value="pricing" className="text-xs">Pricing</TabsTrigger>
      <TabsTrigger value="pages" className="text-xs">Pages</TabsTrigger>
      <TabsTrigger value="ui-text" className="text-xs">UI Text</TabsTrigger>
      <TabsTrigger value="seo" className="text-xs">SEO</TabsTrigger>
      <TabsTrigger value="social" className="text-xs">Social</TabsTrigger>
      <TabsTrigger value="theme" className="text-xs">Theme</TabsTrigger>
    </TabsList>
  );
}
