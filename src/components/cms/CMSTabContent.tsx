
import { TabsContent } from "@/components/ui/tabs";
import SiteSettings from "./SiteSettings";
import NavigationManager from "./NavigationManager";
import RoomManager from "./RoomManager";
import TestimonialsManager from "./TestimonialsManager";
import PricingManager from "./PricingManager";
import SEOSettings from "./SEOSettings";
import SocialMediaSettings from "./SocialMediaSettings";
import ThemeManager from "./ThemeManager";
import ApartmentManager from "./ApartmentManager";
import PageContentManager from "./PageContentManager";
import UITextManager from "./UITextManager";

export default function CMSTabContent() {
  return (
    <>
      <TabsContent value="content">
        <SiteSettings />
      </TabsContent>
      
      <TabsContent value="apartments">
        <ApartmentManager />
      </TabsContent>
      
      <TabsContent value="navigation">
        <NavigationManager />
      </TabsContent>
      
      <TabsContent value="rooms">
        <RoomManager />
      </TabsContent>
      
      <TabsContent value="testimonials">
        <TestimonialsManager />
      </TabsContent>
      
      <TabsContent value="pricing">
        <PricingManager />
      </TabsContent>
      
      <TabsContent value="pages">
        <PageContentManager />
      </TabsContent>
      
      <TabsContent value="ui-text">
        <UITextManager />
      </TabsContent>
      
      <TabsContent value="seo">
        <SEOSettings />
      </TabsContent>
      
      <TabsContent value="social">
        <SocialMediaSettings />
      </TabsContent>
      
      <TabsContent value="theme">
        <ThemeManager />
      </TabsContent>
    </>
  );
}
