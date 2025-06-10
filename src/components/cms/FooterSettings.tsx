
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

export default function FooterSettings() {
  const { content, updateContent } = useCMS();
  const { toast } = useToast();
  const [footerContent, setFooterContent] = useState(content.footerContent);

  const handleSave = () => {
    updateContent('footerContent', footerContent);
    toast({
      title: "Footer Settings Updated",
      description: "Footer content has been saved successfully.",
    });
  };

  const updateFooter = (field: keyof typeof footerContent, value: any) => {
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
    const newLink = { label: "New Link", path: "/new-page" };
    setFooterContent(prev => ({
      ...prev,
      quickLinks: [...prev.quickLinks, newLink]
    }));
  };

  const updateQuickLink = (index: number, field: 'label' | 'path', value: string) => {
    setFooterContent(prev => ({
      ...prev,
      quickLinks: prev.quickLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const removeQuickLink = (index: number) => {
    setFooterContent(prev => ({
      ...prev,
      quickLinks: prev.quickLinks.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Footer Settings</h3>
        <p className="text-sm text-muted-foreground">
          Customize your website footer content, links, and contact information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Footer Description</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="footer-description">Main Description</Label>
          <Textarea
            id="footer-description"
            value={footerContent.description}
            onChange={(e) => updateFooter('description', e.target.value)}
            placeholder="Brief description of your business"
            rows={3}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Quick Links</CardTitle>
            <Button variant="outline" size="sm" onClick={addQuickLink}>
              <Plus className="h-4 w-4 mr-2" />
              Add Link
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {footerContent.quickLinks.map((link, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="flex-1">
                <Input
                  value={link.label}
                  onChange={(e) => updateQuickLink(index, 'label', e.target.value)}
                  placeholder="Link label"
                />
              </div>
              <div className="flex-1">
                <Input
                  value={link.path}
                  onChange={(e) => updateQuickLink(index, 'path', e.target.value)}
                  placeholder="/page-path"
                />
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeQuickLink(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
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
              placeholder="Your business address"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="footer-phone">Phone</Label>
              <Input
                id="footer-phone"
                value={footerContent.contactInfo.phone}
                onChange={(e) => updateContactInfo('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="footer-email">Email</Label>
              <Input
                id="footer-email"
                value={footerContent.contactInfo.email}
                onChange={(e) => updateContactInfo('email', e.target.value)}
                placeholder="info@example.com"
                type="email"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="footer-hours">Business Hours</Label>
            <Input
              id="footer-hours"
              value={footerContent.contactInfo.hours}
              onChange={(e) => updateContactInfo('hours', e.target.value)}
              placeholder="Mon-Fri: 9AM-6PM"
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
              placeholder="Newsletter"
            />
          </div>
          <div>
            <Label htmlFor="newsletter-description">Newsletter Description</Label>
            <Textarea
              id="newsletter-description"
              value={footerContent.newsletter.description}
              onChange={(e) => updateNewsletter('description', e.target.value)}
              placeholder="Subscribe to receive updates and special offers"
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
          <Label htmlFor="footer-copyright">Copyright Text</Label>
          <Input
            id="footer-copyright"
            value={footerContent.copyright}
            onChange={(e) => updateFooter('copyright', e.target.value)}
            placeholder="© 2024 Your Company. All rights reserved."
          />
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Footer Settings
      </Button>
    </div>
  );
}
