
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";
import AboutPageManager from "./pages/AboutPageManager";
import ApartmentsPageManager from "./pages/ApartmentsPageManager";
import FAQPageManager from "./pages/FAQPageManager";
import PrivacyPageManager from "./pages/PrivacyPageManager";
import TermsPageManager from "./pages/TermsPageManager";

export default function PageContentManager() {
  const { content, updatePageContent } = useCMS();
  const { toast } = useToast();
  const [pageContent, setPageContent] = useState(content.pageContent);

  // Define PageContentType for better readability
  type PageContentType = typeof pageContent;

  const handleSave = () => {
    Object.keys(pageContent).forEach(keyStr => {
      // Cast string key to keyof PageContentType
      const key = keyStr as keyof PageContentType;
      updatePageContent(key, pageContent[key]);
    });
    toast({
      title: "Page Content Updated",
      description: "All page content has been saved successfully.",
    });
  };

  // Make updateContent generic
  const updateContent = <P extends keyof PageContentType>(page: P, pageData: PageContentType[P]) => {
    setPageContent(prev => ({
      ...prev,
      [page]: pageData
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Page Content Management</h3>
        <p className="text-sm text-muted-foreground">
          Manage content for all static pages in your website.
        </p>
      </div>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="apartments">Apartments</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="terms">Terms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about" className="space-y-4">
          <AboutPageManager
            content={pageContent.about}
            onUpdate={(data) => updateContent('about', data)}
          />
        </TabsContent>

        <TabsContent value="apartments" className="space-y-4">
          <ApartmentsPageManager
            content={pageContent.apartments}
            onUpdate={(data) => updateContent('apartments', data)}
          />
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <FAQPageManager
            content={pageContent.faq}
            onUpdate={(data) => updateContent('faq', data)}
          />
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <PrivacyPageManager
            content={pageContent.privacy}
            onUpdate={(data) => updateContent('privacy', data)}
          />
        </TabsContent>

        <TabsContent value="terms" className="space-y-4">
          <TermsPageManager
            content={pageContent.terms}
            onUpdate={(data) => updateContent('terms', data)}
          />
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave} className="w-full">
        Save All Page Content
      </Button>
    </div>
  );
}
