
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ArrowUp, ArrowDown, Globe, Home, Building, Utensils, ImageIcon, HelpCircle, Shield, FileText } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  isActive: boolean;
  order: number;
}

const defaultPages = [
  { path: "/", label: "Home", icon: Home },
  { path: "/about", label: "About", icon: Building },
  { path: "/apartments", label: "Apartments", icon: Building },
  { path: "/amenities", label: "Amenities", icon: Utensils },
  { path: "/gallery", label: "Gallery", icon: ImageIcon },
  { path: "/contact", label: "Contact", icon: Globe },
  { path: "/faq", label: "FAQ", icon: HelpCircle },
  { path: "/privacy", label: "Privacy Policy", icon: Shield },
  { path: "/terms", label: "Terms of Service", icon: FileText },
];

export default function NavigationManager() {
  const { content, updateNavigation } = useCMS();
  const { toast } = useToast();
  const [navigation, setNavigation] = useState<NavigationItem[]>(content.navigation || []);
  const [newItem, setNewItem] = useState({ label: "", path: "", template: "" });

  const handleSave = () => {
    updateNavigation(navigation);
    toast({
      title: "Navigation Updated",
      description: "Navigation menu has been saved successfully.",
    });
  };

  const addNavigationItem = () => {
    if (newItem.label.trim() && newItem.path.trim()) {
      const item: NavigationItem = {
        id: Date.now().toString(),
        label: newItem.label,
        path: newItem.path,
        isActive: true,
        order: navigation.length + 1
      };
      setNavigation([...navigation, item]);
      setNewItem({ label: "", path: "", template: "" });
      toast({
        title: "Navigation Item Added",
        description: `"${newItem.label}" has been added to navigation.`,
      });
    }
  };

  const addFromTemplate = (templatePath: string) => {
    const template = defaultPages.find(p => p.path === templatePath);
    if (template) {
      setNewItem({
        label: template.label,
        path: template.path,
        template: ""
      });
    }
  };

  const removeNavigationItem = (id: string) => {
    const item = navigation.find(n => n.id === id);
    setNavigation(navigation.filter(item => item.id !== id));
    if (item) {
      toast({
        title: "Navigation Item Removed",
        description: `"${item.label}" has been removed from navigation.`,
      });
    }
  };

  const toggleItemActive = (id: string) => {
    setNavigation(navigation.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const currentIndex = navigation.findIndex(item => item.id === id);
    if ((direction === 'up' && currentIndex > 0) || 
        (direction === 'down' && currentIndex < navigation.length - 1)) {
      const newNavigation = [...navigation];
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      [newNavigation[currentIndex], newNavigation[targetIndex]] = 
      [newNavigation[targetIndex], newNavigation[currentIndex]];
      
      // Update order values
      newNavigation.forEach((item, index) => {
        item.order = index + 1;
      });
      
      setNavigation(newNavigation);
    }
  };

  const updateItemLabel = (id: string, label: string) => {
    setNavigation(navigation.map(item => 
      item.id === id ? { ...item, label } : item
    ));
  };

  const updateItemPath = (id: string, path: string) => {
    setNavigation(navigation.map(item => 
      item.id === id ? { ...item, path } : item
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Navigation Management</h3>
        <p className="text-sm text-muted-foreground">
          Manage your website's navigation menu. Add, remove, and reorder navigation items.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Navigation Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="template-select">Quick Add from Template</Label>
            <Select value={newItem.template} onValueChange={(value) => {
              setNewItem({ ...newItem, template: value });
              addFromTemplate(value);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a page template" />
              </SelectTrigger>
              <SelectContent>
                {defaultPages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <SelectItem key={page.path} value={page.path}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {page.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-label">Label</Label>
              <Input
                id="new-label"
                value={newItem.label}
                onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                placeholder="Menu label"
              />
            </div>
            <div>
              <Label htmlFor="new-path">Path</Label>
              <Input
                id="new-path"
                value={newItem.path}
                onChange={(e) => setNewItem({ ...newItem, path: e.target.value })}
                placeholder="/page-url"
              />
            </div>
          </div>
          <Button onClick={addNavigationItem} className="w-full" disabled={!newItem.label.trim() || !newItem.path.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Navigation Item
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h4 className="font-medium">Current Navigation Items ({navigation.length})</h4>
        {navigation.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No navigation items. Add some using the form above.
            </CardContent>
          </Card>
        ) : (
          navigation.map((item) => (
            <Card key={item.id} className={!item.isActive ? "opacity-60" : ""}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <Label>Label</Label>
                      <Input
                        value={item.label}
                        onChange={(e) => updateItemLabel(item.id, e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Path</Label>
                      <Input
                        value={item.path}
                        onChange={(e) => updateItemPath(item.id, e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={item.isActive}
                        onCheckedChange={() => toggleItemActive(item.id)}
                      />
                      <Label>Active</Label>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => moveItem(item.id, 'up')}
                        variant="outline"
                        size="sm"
                        disabled={navigation.findIndex(n => n.id === item.id) === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => moveItem(item.id, 'down')}
                        variant="outline"
                        size="sm"
                        disabled={navigation.findIndex(n => n.id === item.id) === navigation.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => removeNavigationItem(item.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Navigation
      </Button>
    </div>
  );
}
