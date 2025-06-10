
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ArrowUp, ArrowDown, Users, Square, MapPin, Star } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ApartmentManager() {
  const { content, updateApartments } = useCMS();
  const { toast } = useToast();
  const [apartments, setApartments] = useState(content.apartments || []);
  const [newApartment, setNewApartment] = useState({
    name: "",
    description: "",
    capacity: 2,
    size: 40,
    location: "",
    features: [] as string[],
    newFeature: ""
  });

  const locationOptions = [
    "Beachfront",
    "Second row",
    "City center",
    "Mountain view",
    "Garden view",
    "Pool view",
    "Sea view",
    "Custom location"
  ];

  const commonFeatures = [
    "Wi-Fi",
    "Kitchen",
    "Kitchenette", 
    "Bathroom",
    "Air Conditioning",
    "TV",
    "Balcony",
    "Terrace",
    "Washing Machine",
    "Dishwasher",
    "Microwave",
    "Coffee Machine",
    "Safe",
    "Hairdryer",
    "Iron",
    "Parking",
    "Elevator",
    "Pet Friendly",
    "Non-smoking",
    "Wheelchair Accessible"
  ];

  const handleSave = () => {
    updateApartments(apartments);
    toast({
      title: "Apartments Updated",
      description: "All apartment data has been saved successfully.",
    });
  };

  const addApartment = () => {
    if (newApartment.name.trim() && newApartment.description.trim()) {
      const apartment = {
        id: Date.now().toString(),
        name: newApartment.name,
        description: newApartment.description,
        capacity: newApartment.capacity,
        size: newApartment.size,
        location: newApartment.location,
        features: [...newApartment.features],
        isActive: true,
        order: apartments.length + 1
      };
      setApartments([...apartments, apartment]);
      setNewApartment({
        name: "",
        description: "",
        capacity: 2,
        size: 40,
        location: "",
        features: [],
        newFeature: ""
      });
      toast({
        title: "Apartment Added",
        description: `"${newApartment.name}" has been added to your apartment list.`,
      });
    }
  };

  const removeApartment = (id: string) => {
    const apartment = apartments.find(apt => apt.id === id);
    setApartments(apartments.filter(apt => apt.id !== id));
    if (apartment) {
      toast({
        title: "Apartment Removed",
        description: `"${apartment.name}" has been removed.`,
      });
    }
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
      
      newApartments.forEach((apt, index) => {
        apt.order = index + 1;
      });
      
      setApartments(newApartments);
    }
  };

  const updateApartment = (id: string, field: string, value: string | number | boolean | string[]) => {
    setApartments(apartments.map(apt => 
      apt.id === id ? { ...apt, [field]: value } : apt
    ));
  };

  const addFeatureToNew = (feature: string) => {
    if (feature && !newApartment.features.includes(feature)) {
      setNewApartment({
        ...newApartment,
        features: [...newApartment.features, feature],
        newFeature: ""
      });
    }
  };

  const removeFeatureFromNew = (feature: string) => {
    setNewApartment({
      ...newApartment,
      features: newApartment.features.filter(f => f !== feature)
    });
  };

  const addFeatureToApartment = (apartmentId: string, feature: string) => {
    const apartment = apartments.find(apt => apt.id === apartmentId);
    if (apartment && feature && !apartment.features.includes(feature)) {
      updateApartment(apartmentId, 'features', [...apartment.features, feature]);
    }
  };

  const removeFeatureFromApartment = (apartmentId: string, feature: string) => {
    const apartment = apartments.find(apt => apt.id === apartmentId);
    if (apartment) {
      updateApartment(apartmentId, 'features', apartment.features.filter(f => f !== feature));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Apartment Management</h3>
        <p className="text-sm text-muted-foreground">
          Create and manage apartment types. Add unlimited room types with custom features.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Apartment Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-name">Apartment Name</Label>
              <Input
                id="new-name"
                value={newApartment.name}
                onChange={(e) => setNewApartment({ ...newApartment, name: e.target.value })}
                placeholder="e.g., Deluxe Sea View Suite"
              />
            </div>
            <div>
              <Label htmlFor="new-location">Location</Label>
              <Select value={newApartment.location} onValueChange={(value) => setNewApartment({ ...newApartment, location: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="new-description">Description</Label>
            <Textarea
              id="new-description"
              value={newApartment.description}
              onChange={(e) => setNewApartment({ ...newApartment, description: e.target.value })}
              placeholder="Describe the apartment features and amenities..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-capacity">Capacity (guests)</Label>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="new-capacity"
                  type="number"
                  min="1"
                  max="20"
                  value={newApartment.capacity}
                  onChange={(e) => setNewApartment({ ...newApartment, capacity: parseInt(e.target.value) || 2 })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="new-size">Size (sqm)</Label>
              <div className="flex items-center gap-2">
                <Square className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="new-size"
                  type="number"
                  min="10"
                  max="500"
                  value={newApartment.size}
                  onChange={(e) => setNewApartment({ ...newApartment, size: parseInt(e.target.value) || 40 })}
                />
              </div>
            </div>
          </div>

          <div>
            <Label>Features & Amenities</Label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Select onValueChange={addFeatureToNew}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Add common features" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonFeatures.filter(f => !newApartment.features.includes(f)).map((feature) => (
                      <SelectItem key={feature} value={feature}>
                        {feature}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Input
                    value={newApartment.newFeature}
                    onChange={(e) => setNewApartment({ ...newApartment, newFeature: e.target.value })}
                    placeholder="Custom feature"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addFeatureToNew(newApartment.newFeature);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addFeatureToNew(newApartment.newFeature)}
                    disabled={!newApartment.newFeature.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {newApartment.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newApartment.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm flex items-center gap-1"
                    >
                      {feature}
                      <button
                        onClick={() => removeFeatureFromNew(feature)}
                        className="ml-1 hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button onClick={addApartment} className="w-full" disabled={!newApartment.name.trim() || !newApartment.description.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Apartment Type
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h4 className="font-medium">Current Apartment Types ({apartments.length})</h4>
        {apartments.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No apartment types created yet. Add your first apartment type above.
            </CardContent>
          </Card>
        ) : (
          apartments.map((apartment) => (
            <Card key={apartment.id} className={!apartment.isActive ? "opacity-60" : ""}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          rows={2}
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
                            onChange={(e) => updateApartment(apartment.id, 'size', parseInt(e.target.value) || 40)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Features</Label>
                        <div className="space-y-2">
                          <Select onValueChange={(feature) => addFeatureToApartment(apartment.id, feature)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Add feature" />
                            </SelectTrigger>
                            <SelectContent>
                              {commonFeatures.filter(f => !apartment.features.includes(f)).map((feature) => (
                                <SelectItem key={feature} value={feature}>
                                  {feature}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          {apartment.features.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {apartment.features.map((feature, index) => (
                                <span 
                                  key={index}
                                  className="px-2 py-1 bg-muted text-muted-foreground rounded text-sm flex items-center gap-1"
                                >
                                  {feature}
                                  <button
                                    onClick={() => removeFeatureFromApartment(apartment.id, feature)}
                                    className="ml-1 hover:text-destructive"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
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
                          disabled={apartments.findIndex(apt => apt.id === apartment.id) === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => moveApartment(apartment.id, 'down')}
                          variant="outline"
                          size="sm"
                          disabled={apartments.findIndex(apt => apt.id === apartment.id) === apartments.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => removeApartment(apartment.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save All Apartments
      </Button>
    </div>
  );
}
