
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  isActive: boolean;
  order: number;
}

export default function NavigationManager() {
  const { content, updateNavigation } = useCMS();
  const { toast } = useToast();
  const [navigation, setNavigation] = useState<NavigationItem[]>(content.navigation);
  const [newItem, setNewItem] = useState({ label: "", path: "" });

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
      setNewItem({ label: "", path: "" });
    }
  };

  const removeNavigationItem = (id: string) => {
    setNavigation(navigation.filter(item => item.id !== id));
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
      <Card>
        <CardHeader>
          <CardTitle>Add New Navigation Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <Button onClick={addNavigationItem} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Navigation Item
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {navigation.map((item) => (
          <Card key={item.id}>
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
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => moveItem(item.id, 'down')}
                      variant="outline"
                      size="sm"
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
        ))}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Navigation
      </Button>
    </div>
  );
}
