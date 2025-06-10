
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ContentEditor from "@/components/cms/ContentEditor";
import SiteSettings from "@/components/cms/SiteSettings";
import ContactSettings from "@/components/cms/ContactSettings";
import ImageManager from "@/components/cms/ImageManager";
import RoomManager from "@/components/cms/RoomManager";
import NavigationManager from "@/components/cms/NavigationManager";
import SEOSettings from "@/components/cms/SEOSettings";
import SocialMediaSettings from "@/components/cms/SocialMediaSettings";
import PricingManager from "@/components/cms/PricingManager";
import TestimonialsManager from "@/components/cms/TestimonialsManager";
import FooterSettings from "@/components/cms/FooterSettings";
import BookingSettings from "@/components/cms/BookingSettings";
import ThemeManager from "@/components/cms/ThemeManager";

export default function CMSTabContent() {
  return (
    <>
      <TabsContent value="content" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Page Content Editor</CardTitle>
            <CardDescription>
              Edit the main content sections of your website. Changes are saved automatically to your browser's local storage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContentEditor />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Site Settings</CardTitle>
            <CardDescription>
              Manage your website's basic settings and branding.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SiteSettings />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contact" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Update your contact details that appear throughout the site.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactSettings />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="images" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Site-wide Image Management</CardTitle>
            <CardDescription>
              Manage general site images like hero, welcome section, and gallery. For room-specific images, use the Room Management tab.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageManager />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="rooms" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Individual Room Management</CardTitle>
            <CardDescription>
              Manage each room's specific images and amenities. Select a room to customize its main image, gallery, and unique amenities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RoomManager />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="navigation" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Navigation Menu</CardTitle>
            <CardDescription>
              Configure your website's main navigation menu items and their order.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NavigationManager />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="seo" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>
              Optimize your website for search engines with meta tags and descriptions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SEOSettings />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="social" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>
              Add links to your social media profiles for increased visibility.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SocialMediaSettings />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="pricing" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Room Pricing Management</CardTitle>
            <CardDescription>
              Set base prices and seasonal rates for each room type.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PricingManager />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="testimonials" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Testimonials</CardTitle>
            <CardDescription>
              Manage customer reviews and testimonials displayed on your website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TestimonialsManager />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="footer" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Footer Content</CardTitle>
            <CardDescription>
              Customize your website footer with links, contact info, and descriptions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FooterSettings />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="booking" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Booking Policies</CardTitle>
            <CardDescription>
              Configure booking rules, check-in/out times, and cancellation policies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BookingSettings />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="theme" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme Customization</CardTitle>
            <CardDescription>
              Customize your website's colors, fonts, and overall visual appearance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeManager />
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
}
