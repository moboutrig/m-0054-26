
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit, Save, X, ArrowUp, ArrowDown } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";
import { ApartmentData } from "@/types/cms";

export default function ApartmentManager() {
  const { content, updateApartments } = useCMS();
  const { toast } = useToast();
  const [apartments, setApartments] = useState<ApartmentData[]>(content.apartments);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newApartment, setNewApartment] = useState<Omit<ApartmentData, 'id'>>({
    name: "",
    description: "",
    capacity: 2,
    size: 45,
    location: "",
    features: [],
    isActive: true,
    order: apartments.length + 1
  });

  const handleSave = () => {
    updateApartments(apartments);
    toast({
      title: "Apartments Updated",
      description: "Apartment listings have been saved successfully.",
    });
  };

  const addApartment = () => {
    if (newApartment.name.trim() && newApartment.description.trim()) {
      const apartment: ApartmentData = {
        id: Date.now().toString(),
        ...newApartment,
        features: newApartment.features.filter(f => f.trim() !== "")
      };
      setApartments([...apartments, apartment]);
      setNewApartment({
        name: "",
        description: "",
        capacity: 2,
        size: 45,
        location: "",
        features: [],
        isActive: true,
        order: apartments.length + 2
      });
    }
  };

  const removeApartment = (id: string) => {
    setApartments(apartments.filter(apt => apt.id !== id));
  };

  const toggleActive = (id: string) => {
    setApartments(apartments.map(apt => 
      apt.id === id ? { ...apt, isActive: !apt.isActive } : apt
    ));
  };

  const moveApartment = (id: string, direction: 'up' | 'down') => {
    const currentIndex = apartments.findIndex(apt => apt.id === id);
    if ((direction === 'up' && currentIndex > 0) || 
        (direction === 'down' && currentIndex < apartments.length - 1)) {
      const newApartments = [...apartments];
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      [newApartments[currentIndex], newApartments[targetIndex]] = 
      [newApartments[targetIndex], newApartments[currentIndex]];
      
      // Update order values
      newApartments.forEach((apt, index) => {
        apt.order = index + 1;
      });
      
      setApartments(newApartments);
    }
  };

  const updateApartment = (id: string, field: keyof ApartmentData, value: any) => {
    setApartments(apartments.map(apt => 
      apt.id === id ? { ...apt, [field]: value } : apt
    ));
  };

  const updateNewApartmentFeatures = (features: string) => {
    setNewApartment({
      ...newApartment,
      features: features.split(',').map(f => f.trim()).filter(f => f !== "")
    });
  };

  const updateApartmentFeatures = (id: string, features: string) => {
    updateApartment(id, 'features', features.split(',').map(f => f.trim()).filter(f => f !== ""));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Apartment Management</h3>
        <p className="text-sm text-muted-foreground">
          Manage your apartment listings, pricing, and availability.
        </p>
      </div>

      {/* Add New Apartment */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Apartment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input
                value={newApartment.name}
                onChange={(e) => setNewApartment({ ...newApartment, name: e.target.value })}
                placeholder="Apartment name"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={newApartment.location}
                onChange={(e) => setNewApartment({ ...newApartment, location: e.target.value })}
                placeholder="e.g., Beachfront, Second row"
              />
            </div>
          </div>
          
          <div>
            <Label>Description</Label>
            <Textarea
              value={newApartment.description}
              onChange={(e) => setNewApartment({ ...newApartment, description: e.target.value })}
              placeholder="Apartment description"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Capacity (guests)</Label>
              <Input
                type="number"
                value={newApartment.capacity}
                onChange={(e) => setNewApartment({ ...newApartment, capacity: parseInt(e.target.value) || 2 })}
                min="1"
              />
            </div>
            <div>
              <Label>Size (sqm)</Label>
              <Input
                type="number"
                value={newApartment.size}
                onChange={(e) => setNewApartment({ ...newApartment, size: parseInt(e.target.value) || 45 })}
                min="1"
              />
            </div>
          </div>
          
          <div>
            <Label>Features (comma separated)</Label>
            <Input
              value={newApartment.features.join(', ')}
              onChange={(e) => updateNewApartmentFeatures(e.target.value)}
              placeholder="Wi-Fi, Kitchen, Bathroom, Air Conditioning"
            />
          </div>
          
          <Button onClick={addApartment} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Apartment
          </Button>
        </CardContent>
      </Card>

      {/* Apartment List */}
      <div className="space-y-4">
        {apartments.map((apartment) => (
          <Card key={apartment.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  {editingId === apartment.id ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={apartment.name}
                            onChange={(e) => updateApartment(apartment.id, 'name', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Location</Label>
                          <Input
                            value={apartment.location}
                            onChange={(e) => updateApartment(apartment.id, 'location', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={apartment.description}
                          onChange={(e) => updateApartment(apartment.id, 'description', e.target.value)}
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Capacity</Label>
                          <Input
                            type="number"
                            value={apartment.capacity}
                            onChange={(e) => updateApartment(apartment.id, 'capacity', parseInt(e.target.value) || 2)}
                          />
                        </div>
                        <div>
                          <Label>Size (sqm)</Label>
                          <Input
                            type="number"
                            value={apartment.size}
                            onChange={(e) => updateApartment(apartment.id, 'size', parseInt(e.target.value) || 45)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label>Features</Label>
                        <Input
                          value={apartment.features.join(', ')}
                          onChange={(e) => updateApartmentFeatures(apartment.id, e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h3 className="font-semibold text-lg">{apartment.name}</h3>
                        <p className="text-sm text-muted-foreground">{apartment.location}</p>
                      </div>
                      <p className="text-muted-foreground">{apartment.description}</p>
                      <div className="flex gap-4 text-sm">
                        <span>{apartment.capacity} guests</span>
                        <span>{apartment.size} sqm</span>
                        <span>{apartment.features.length} features</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {apartment.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-muted text-xs rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={apartment.isActive}
                      onCheckedChange={() => toggleActive(apartment.id)}
                    />
                    <Label>Active</Label>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      onClick={() => moveApartment(apartment.id, 'up')}
                      variant="outline"
                      size="sm"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => moveApartment(apartment.id, 'down')}
                      variant="outline"
                      size="sm"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    
                    {editingId === apartment.id ? (
                      <>
                        <Button
                          onClick={() => setEditingId(null)}
                          size="sm"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => setEditingId(null)}
                          variant="outline"
                          size="sm"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => setEditingId(apartment.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => removeApartment(apartment.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save All Apartments
      </Button>
    </div>
  );
}
