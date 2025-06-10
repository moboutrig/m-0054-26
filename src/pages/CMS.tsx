
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="content">Page Content</TabsTrigger>
            <TabsTrigger value="settings">Site Settings</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
            <TabsTrigger value="images">Site Images</TabsTrigger>
            <TabsTrigger value="rooms">Room Management</TabsTrigger>
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
        </Tabs>

        {/* Info Card */}
        <Card className="mt-8 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="text-amber-800 dark:text-amber-200">Room Management Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-amber-700 dark:text-amber-300">
              <p>• <strong>Individual Room Customization:</strong> Each of the 6 rooms can have unique images and amenities</p>
              <p>• <strong>Room Images:</strong> Set a main image and gallery for each room independently</p>
              <p>• <strong>Custom Amenities:</strong> Add specific amenities for each room with custom icons and descriptions</p>
              <p>• <strong>Automatic Integration:</strong> Room-specific content automatically appears on apartment cards and detail pages</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
