
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

export default function ThemeManager() {
  const { content, updateContent } = useCMS();
  const { toast } = useToast();
  const [themeSettings, setThemeSettings] = useState(content.themeSettings);

  const handleSave = () => {
    updateContent('themeSettings', themeSettings);
    // Apply theme changes to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary', themeSettings.primaryColor);
    root.style.setProperty('--secondary', themeSettings.secondaryColor);
    root.style.setProperty('--accent', themeSettings.accentColor);
    root.style.setProperty('--font-family', themeSettings.fontFamily);
    root.style.setProperty('--border-radius', themeSettings.borderRadius);
    
    toast({
      title: "Theme Updated",
      description: "Theme settings have been applied successfully.",
    });
  };

  const updateTheme = (field: keyof typeof themeSettings, value: string) => {
    setThemeSettings(prev => ({ ...prev, [field]: value }));
  };

  const fontOptions = [
    { value: "Inter", label: "Inter" },
    { value: "Roboto", label: "Roboto" },
    { value: "Open Sans", label: "Open Sans" },
    { value: "Lato", label: "Lato" },
    { value: "Poppins", label: "Poppins" }
  ];

  const borderRadiusOptions = [
    { value: "0rem", label: "None" },
    { value: "0.25rem", label: "Small" },
    { value: "0.5rem", label: "Medium" },
    { value: "0.75rem", label: "Large" },
    { value: "1rem", label: "Extra Large" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Palette className="h-5 w-5" />
        <div>
          <h3 className="text-lg font-semibold">Theme Settings</h3>
          <p className="text-sm text-muted-foreground">
            Customize your website's appearance with colors and typography.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="primary-color"
                type="color"
                value={themeSettings.primaryColor}
                onChange={(e) => updateTheme('primaryColor', e.target.value)}
                className="w-20 h-10"
              />
              <Input
                value={themeSettings.primaryColor}
                onChange={(e) => updateTheme('primaryColor', e.target.value)}
                placeholder="#654321"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="secondary-color">Secondary Color</Label>
            <div className="flex gap-2">
              <Input
                id="secondary-color"
                type="color"
                value={themeSettings.secondaryColor}
                onChange={(e) => updateTheme('secondaryColor', e.target.value)}
                className="w-20 h-10"
              />
              <Input
                value={themeSettings.secondaryColor}
                onChange={(e) => updateTheme('secondaryColor', e.target.value)}
                placeholder="#8B4513"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="accent-color">Accent Color</Label>
            <div className="flex gap-2">
              <Input
                id="accent-color"
                type="color"
                value={themeSettings.accentColor}
                onChange={(e) => updateTheme('accentColor', e.target.value)}
                className="w-20 h-10"
              />
              <Input
                value={themeSettings.accentColor}
                onChange={(e) => updateTheme('accentColor', e.target.value)}
                placeholder="#F0E68C"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typography & Layout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="font-family">Font Family</Label>
            <Select value={themeSettings.fontFamily} onValueChange={(value) => updateTheme('fontFamily', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map(font => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>{font.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="border-radius">Border Radius</Label>
            <Select value={themeSettings.borderRadius} onValueChange={(value) => updateTheme('borderRadius', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {borderRadiusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Apply Theme Settings
      </Button>
    </div>
  );
}
