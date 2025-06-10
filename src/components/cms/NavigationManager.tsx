
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, GripVertical } from "lucide-react";
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
  const [items, setItems] = useState<NavigationItem[]>(content.navigation);

  const handleSave = () => {
    updateNavigation(items);
    toast({
      title: "Navigation Updated",
      description: "Navigation menu has been saved successfully.",
    });
  };

  const addItem = () => {
    const newItem: NavigationItem = {
      id: Date.now().toString(),
      label: "New Item",
      path: "/new-page",
      isActive: true,
      order: items.length + 1
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof NavigationItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const currentIndex = items.findIndex(item => item.id === id);
    if (currentIndex === -1) return;

    const newItems = [...items];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex >= 0 && targetIndex < items.length) {
      [newItems[currentIndex], newItems[targetIndex]] = [newItems[targetIndex], newItems[currentIndex]];
      
      // Update order numbers
      newItems.forEach((item, index) => {
        item.order = index + 1;
      });
      
      setItems(newItems);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Navigation Menu</h3>
          <p className="text-sm text-muted-foreground">
            Manage your website's navigation menu items and their order.
          </p>
        </div>
        <Button onClick={addItem} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={item.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-sm">Menu Item {index + 1}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveItem(item.id, 'up')}
                    disabled={index === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveItem(item.id, 'down')}
                    disabled={index === items.length - 1}
                  >
                    ↓
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`label-${item.id}`}>Label</Label>
                  <Input
                    id={`label-${item.id}`}
                    value={item.label}
                    onChange={(e) => updateItem(item.id, 'label', e.target.value)}
                    placeholder="Menu label"
                  />
                </div>
                <div>
                  <Label htmlFor={`path-${item.id}`}>Path</Label>
                  <Input
                    id={`path-${item.id}`}
                    value={item.path}
                    onChange={(e) => updateItem(item.id, 'path', e.target.value)}
                    placeholder="/page-path"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id={`active-${item.id}`}
                  checked={item.isActive}
                  onCheckedChange={(checked) => updateItem(item.id, 'isActive', checked)}
                />
                <Label htmlFor={`active-${item.id}`}>Active</Label>
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
