
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
import RoomMediaUploader from "./shared/RoomMediaUploader";

interface UnifiedRoom {
  id: string;
  name: string;
  description: string;
  capacity: number;
  size: number;
  location: string;
  features: string[];
  isActive: boolean;
  order: number;
  type: 'room' | 'apartment';
}

export default function UnifiedRoomManager() {
  const { content, updateApartments, updateRoomImages, updateRoomAmenities } = useCMS();
  const { toast } = useToast();
  
  // Combine existing apartments and create unified rooms list
  const existingApartments = content.apartments || [];
  const [rooms, setRooms] = useState<UnifiedRoom[]>(
    existingApartments.map(apt => ({
      ...apt,
      type: 'apartment' as const
    }))
  );

  const [newRoom, setNewRoom] = useState<Omit<UnifiedRoom, 'id' | 'order'>>({
    name: "",
    description: "",
    capacity: 2,
    size: 40,
    location: "",
    features: [],
    isActive: true,
    type: 'apartment'
  });
  const [newFeature, setNewFeature] = useState("");

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
    // Convert back to apartment format for backwards compatibility
    const apartmentData = rooms.map(room => ({
      id: room.id,
      name: room.name,
      description: room.description,
      capacity: room.capacity,
      size: room.size,
      location: room.location,
      features: room.features,
      isActive: room.isActive,
      order: room.order
    }));
    
    updateApartments(apartmentData);
    toast({
      title: "Rooms Updated",
      description: "All room data has been saved successfully.",
    });
  };

  const addRoom = () => {
    if (newRoom.name.trim() && newRoom.description.trim()) {
      const room: UnifiedRoom = {
        ...newRoom,
        id: Date.now().toString(),
        order: rooms.length + 1
      };
      setRooms([...rooms, room]);
      setNewRoom({
        name: "",
        description: "",
        capacity: 2,
        size: 40,
        location: "",
        features: [],
        isActive: true,
        type: 'apartment'
      });
      setNewFeature("");
      toast({
        title: "Room Added",
        description: `"${newRoom.name}" has been added to your room list.`,
      });
    }
  };

  const removeRoom = (id: string) => {
    const room = rooms.find(r => r.id === id);
    setRooms(rooms.filter(r => r.id !== id));
    if (room) {
      toast({
        title: "Room Removed", 
        description: `"${room.name}" has been removed.`,
      });
    }
  };

  const toggleActive = (id: string) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, isActive: !room.isActive } : room
    ));
  };

  const moveRoom = (id: string, direction: 'up' | 'down') => {
    const currentIndex = rooms.findIndex(room => room.id === id);
    if ((direction === 'up' && currentIndex > 0) || 
        (direction === 'down' && currentIndex < rooms.length - 1)) {
      const newRooms = [...rooms];
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      [newRooms[currentIndex], newRooms[targetIndex]] = 
      [newRooms[targetIndex], newRooms[currentIndex]];
      
      newRooms.forEach((room, index) => {
        room.order = index + 1;
      });
      
      setRooms(newRooms);
    }
  };

  const updateRoom = (id: string, field: keyof UnifiedRoom, value: any) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, [field]: value } : room
    ));
  };

  const addFeatureToNew = (feature: string) => {
    if (feature && !newRoom.features.includes(feature)) {
      setNewRoom({
        ...newRoom,
        features: [...newRoom.features, feature]
      });
      setNewFeature("");
    }
  };

  const removeFeatureFromNew = (feature: string) => {
    setNewRoom({
      ...newRoom,
      features: newRoom.features.filter(f => f !== feature)
    });
  };

  const addFeatureToRoom = (roomId: string, feature: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (room && feature && !room.features.includes(feature)) {
      updateRoom(roomId, 'features', [...room.features, feature]);
    }
  };

  const removeFeatureFromRoom = (roomId: string, feature: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      updateRoom(roomId, 'features', room.features.filter(f => f !== feature));
    }
  };

  const handleImageUpdate = (roomId: string, images: { main: string; gallery: string[] }) => {
    updateRoomImages(roomId, images);
  };

  const handleAmenitiesUpdate = (roomId: string, amenities: any[]) => {
    updateRoomAmenities(roomId, amenities);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Room & Apartment Management</h3>
        <p className="text-sm text-muted-foreground">
          Create and manage all room types including apartments, suites, and standard rooms. Configure images, amenities, and pricing in one unified interface.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Room/Apartment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-name">Room Name</Label>
              <Input
                id="new-name"
                value={newRoom.name}
                onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                placeholder="e.g., Deluxe Sea View Suite, Standard Double Room"
              />
            </div>
            <div>
              <Label htmlFor="new-location">Location</Label>
              <Select value={newRoom.location} onValueChange={(value) => setNewRoom({ ...newRoom, location: value })}>
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
              value={newRoom.description}
              onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
              placeholder="Describe the room features and amenities..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="new-capacity">Capacity (guests)</Label>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="new-capacity"
                  type="number"
                  min="1"
                  max="20"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) || 2 })}
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
                  value={newRoom.size}
                  onChange={(e) => setNewRoom({ ...newRoom, size: parseInt(e.target.value) || 40 })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="new-type">Type</Label>
              <Select value={newRoom.type} onValueChange={(value: 'room' | 'apartment') => setNewRoom({ ...newRoom, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="room">Room</SelectItem>
                </SelectContent>
              </Select>
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
                    {commonFeatures.filter(f => !newRoom.features.includes(f)).map((feature) => (
                      <SelectItem key={feature} value={feature}>
                        {feature}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Custom feature"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addFeatureToNew(newFeature);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addFeatureToNew(newFeature)}
                    disabled={!newFeature.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {newRoom.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newRoom.features.map((feature, index) => (
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

          <Button onClick={addRoom} className="w-full" disabled={!newRoom.name.trim() || !newRoom.description.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Room/Apartment
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h4 className="font-medium">Current Rooms & Apartments ({rooms.length})</h4>
        {rooms.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No rooms or apartments created yet. Add your first room above.
            </CardContent>
          </Card>
        ) : (
          rooms.map((room) => (
            <div key={room.id} className="space-y-4">
              <Card className={!room.isActive ? "opacity-60" : ""}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={room.name}
                              onChange={(e) => updateRoom(room.id, 'name', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Location</Label>
                            <Input
                              value={room.location}
                              onChange={(e) => updateRoom(room.id, 'location', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={room.description}
                            onChange={(e) => updateRoom(room.id, 'description', e.target.value)}
                            rows={2}
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>Capacity</Label>
                            <Input
                              type="number"
                              value={room.capacity}
                              onChange={(e) => updateRoom(room.id, 'capacity', parseInt(e.target.value) || 2)}
                            />
                          </div>
                          <div>
                            <Label>Size (sqm)</Label>
                            <Input
                              type="number"
                              value={room.size}
                              onChange={(e) => updateRoom(room.id, 'size', parseInt(e.target.value) || 40)}
                            />
                          </div>
                          <div>
                            <Label>Type</Label>
                            <Select value={room.type} onValueChange={(value: 'room' | 'apartment') => updateRoom(room.id, 'type', value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="room">Room</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label>Features</Label>
                          <div className="space-y-2">
                            <Select onValueChange={(feature) => addFeatureToRoom(room.id, feature)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Add feature" />
                              </SelectTrigger>
                              <SelectContent>
                                {commonFeatures.filter(f => !room.features.includes(f)).map((feature) => (
                                  <SelectItem key={feature} value={feature}>
                                    {feature}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            
                            {room.features.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {room.features.map((feature, index) => (
                                  <span 
                                    key={index}
                                    className="px-2 py-1 bg-muted text-muted-foreground rounded text-sm flex items-center gap-1"
                                  >
                                    {feature}
                                    <button
                                      onClick={() => removeFeatureFromRoom(room.id, feature)}
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
                            checked={room.isActive}
                            onCheckedChange={() => toggleActive(room.id)}
                          />
                          <Label>Active</Label>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            onClick={() => moveRoom(room.id, 'up')}
                            variant="outline"
                            size="sm"
                            disabled={rooms.findIndex(r => r.id === room.id) === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => moveRoom(room.id, 'down')}
                            variant="outline"
                            size="sm"
                            disabled={rooms.findIndex(r => r.id === room.id) === rooms.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => removeRoom(room.id)}
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

              <RoomMediaUploader
                roomName={room.name}
                images={content.roomImages?.[room.id] || { main: '', gallery: [] }}
                onUpdateImages={(images) => handleImageUpdate(room.id, images)}
              />
            </div>
          ))
        )}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save All Rooms & Apartments
      </Button>
    </div>
  );
}
