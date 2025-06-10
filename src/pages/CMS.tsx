
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";
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

export default function CMS() {
  const { resetContent } = useCMS();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");

  const handleReset = () => {
    resetContent();
    toast({
      title: "Content Reset",
      description: "All content has been reset to default values.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Site
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Content Management System</h1>
                <p className="text-muted-foreground">Manage your website content and settings</p>
              </div>
            </div>
            <Button onClick={handleReset} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset All
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12">
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
          </TabsList>

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
        </Tabs>

        {/* Info Card */}
        <Card className="mt-8 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="text-amber-800 dark:text-amber-200">Comprehensive CMS Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-amber-700 dark:text-amber-300">
              <div className="space-y-2">
                <p>• <strong>Content Management:</strong> Edit all page content and sections</p>
                <p>• <strong>Room Customization:</strong> Individual room images and amenities</p>
                <p>• <strong>Navigation Control:</strong> Manage menu items and structure</p>
                <p>• <strong>SEO Optimization:</strong> Meta tags and search engine settings</p>
                <p>• <strong>Social Integration:</strong> Connect all social media profiles</p>
                <p>• <strong>Pricing Management:</strong> Set rates and seasonal pricing</p>
              </div>
              <div className="space-y-2">
                <p>• <strong>Customer Reviews:</strong> Manage testimonials and ratings</p>
                <p>• <strong>Footer Customization:</strong> Links, contact info, and content</p>
                <p>• <strong>Booking Policies:</strong> Check-in/out times and rules</p>
                <p>• <strong>Image Management:</strong> Site-wide and room-specific images</p>
                <p>• <strong>Contact Settings:</strong> Business information and details</p>
                <p>• <strong>Live Preview:</strong> All changes reflect immediately</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
