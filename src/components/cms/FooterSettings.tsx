
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

// Define a type for QuickLink for clarity
type QuickLink = { label: string; path: string };

export default function FooterSettings() {
  const { content, updateContent } = useCMS();
  const { toast } = useToast();
  const [footerContent, setFooterContent] = useState(content.footerContent);
  const [newLink, setNewLink] = useState<QuickLink>({ label: "", path: "" });

  const handleSave = () => {
    updateContent('footerContent', footerContent);
    toast({
      title: "Footer Updated",
      description: "Footer content has been saved successfully.",
    });
  };

  const updateFooter = (field: keyof typeof footerContent, value: string | QuickLink[]) => {
    setFooterContent(prev => ({ ...prev, [field]: value }));
  };

  const updateContactInfo = (field: keyof typeof footerContent.contactInfo, value: string) => {
    setFooterContent(prev => ({ 
      ...prev, 
      contactInfo: { ...prev.contactInfo, [field]: value }
    }));
  };

  const updateNewsletter = (field: keyof typeof footerContent.newsletter, value: string) => {
    setFooterContent(prev => ({ 
      ...prev, 
      newsletter: { ...prev.newsletter, [field]: value }
    }));
  };

  const addQuickLink = () => {
    if (newLink.label.trim() && newLink.path.trim()) {
      const updatedLinks = [...footerContent.quickLinks, newLink];
      updateFooter('quickLinks', updatedLinks);
      setNewLink({ label: "", path: "" });
    }
  };

  const removeQuickLink = (index: number) => {
    const updatedLinks = footerContent.quickLinks.filter((_, i) => i !== index);
    updateFooter('quickLinks', updatedLinks);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Footer Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="footer-description">Business Description</Label>
            <Textarea
              id="footer-description"
              value={footerContent.description}
              onChange={(e) => updateFooter('description', e.target.value)}
              placeholder="Brief description of your business"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {footerContent.quickLinks.map((link, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  value={link.label}
                  onChange={(e) => {
                    const updatedLinks = footerContent.quickLinks.map((l, i) => 
                      i === index ? { ...l, label: e.target.value } : l
                    );
                    updateFooter('quickLinks', updatedLinks);
                  }}
                  placeholder="Link label"
                  className="flex-1"
                />
                <Input
                  value={link.path}
                  onChange={(e) => {
                    const updatedLinks = footerContent.quickLinks.map((l, i) => 
                      i === index ? { ...l, path: e.target.value } : l
                    );
                    updateFooter('quickLinks', updatedLinks);
                  }}
                  placeholder="/path"
                  className="flex-1"
                />
                <Button
                  onClick={() => removeQuickLink(index)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newLink.label}
              onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
              placeholder="New link label"
              className="flex-1"
            />
            <Input
              value={newLink.path}
              onChange={(e) => setNewLink({ ...newLink, path: e.target.value })}
              placeholder="/new-path"
              className="flex-1"
            />
            <Button onClick={addQuickLink}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="footer-address">Address</Label>
            <Input
              id="footer-address"
              value={footerContent.contactInfo.address}
              onChange={(e) => updateContactInfo('address', e.target.value)}
              placeholder="Business address"
            />
          </div>
          <div>
            <Label htmlFor="footer-phone">Phone</Label>
            <Input
              id="footer-phone"
              value={footerContent.contactInfo.phone}
              onChange={(e) => updateContactInfo('phone', e.target.value)}
              placeholder="Phone number"
            />
          </div>
          <div>
            <Label htmlFor="footer-email">Email</Label>
            <Input
              id="footer-email"
              value={footerContent.contactInfo.email}
              onChange={(e) => updateContactInfo('email', e.target.value)}
              placeholder="Email address"
            />
          </div>
          <div>
            <Label htmlFor="footer-hours">Business Hours</Label>
            <Input
              id="footer-hours"
              value={footerContent.contactInfo.hours}
              onChange={(e) => updateContactInfo('hours', e.target.value)}
              placeholder="Business hours"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Newsletter Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="newsletter-title">Newsletter Title</Label>
            <Input
              id="newsletter-title"
              value={footerContent.newsletter.title}
              onChange={(e) => updateNewsletter('title', e.target.value)}
              placeholder="Newsletter section title"
            />
          </div>
          <div>
            <Label htmlFor="newsletter-description">Newsletter Description</Label>
            <Textarea
              id="newsletter-description"
              value={footerContent.newsletter.description}
              onChange={(e) => updateNewsletter('description', e.target.value)}
              placeholder="Newsletter description"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Copyright</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="copyright">Copyright Text</Label>
            <Input
              id="copyright"
              value={footerContent.copyright}
              onChange={(e) => updateFooter('copyright', e.target.value)}
              placeholder="Copyright notice"
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Footer Settings
      </Button>
    </div>
  );
}
