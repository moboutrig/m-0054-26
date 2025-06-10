import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ArrowUp, ArrowDown, Edit, Save, X, Users, Square, MapPin, Star, Image as ImageIcon, ListChecks } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";
import { RoomData, RoomType, RoomAmenity, RoomImages } from "@/types/cms"; // Adjusted import
import RoomMediaUploader from "./shared/RoomMediaUploader"; // Keep for later

// Helper to get all possible RoomType values
const roomTypeOptions = [
  'Deluxe', 'Studio', 'Suite', 'Standard', 'Premium', 'Ocean View', 'Custom'
] as const satisfies readonly RoomType[]; // Ensure this is a const array of valid RoomTypes

const commonFeatures = [
  "Wi-Fi", "Kitchen", "Kitchenette", "Bathroom", "Air Conditioning", "TV",
  "Balcony", "Terrace", "Washing Machine", "Dishwasher", "Microwave",
  "Coffee Machine", "Safe", "Hairdryer", "Iron", "Parking", "Elevator",
  "Pet Friendly", "Non-smoking", "Wheelchair Accessible"
];

const iconOptions = [
  "Wifi", "Coffee", "Bath", "Wind", "Tv", "Home", "Car", "Dumbbell", "Users", "Utensils", "Gift", "Key", "Bed"
];

const initialNewRoomData: Omit<RoomData, 'id' | 'order' | 'isActive'> = {
  name: "",
  description: "",
  capacity: 2,
  size: 40,
  location: "",
  features: [],
  roomType: 'Standard', // Default room type
  amenities: [],
  images: { main: "", gallery: [] },
};

export default function RoomManager() {
  const { content, updateRooms } = useCMS();
  const { toast } = useToast();

  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [newRoom, setNewRoom] = useState<Omit<RoomData, 'id' | 'order' | 'isActive'>>({ ...initialNewRoomData });
  const [newRoomNewFeature, setNewRoomNewFeature] = useState("");
  const [newRoomCurrentAmenity, setNewRoomCurrentAmenity] = useState<Omit<RoomAmenity, 'id'>>({ name: "", icon: iconOptions[0], description: ""});


  useEffect(() => {
    if (content.rooms) {
      setRooms(content.rooms);
    } else {
      setRooms([]); // Ensure rooms is an empty array if content.rooms is undefined
    }
  }, [content.rooms]);

  const handleSave = () => {
    updateRooms(rooms);
    toast({
      title: "Rooms Updated",
      description: "All room data has been saved successfully.",
    });
  };

  const addRoom = () => {
    if (newRoom.name.trim() && newRoom.description.trim()) {
      const newRoomData: RoomData = {
        id: Date.now().toString(),
        ...newRoom, // newRoom already has features from addFeatureToNewRoom
        isActive: true,
        order: rooms.length + 1,
      };
      setRooms([...rooms, newRoomData]);
      setNewRoom({ ...initialNewRoomData }); // Reset the new room form
      setNewRoomNewFeature("");
      toast({
        title: "Room Added",
        description: `"${newRoomData.name}" has been added.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Room name and description cannot be empty.",
        variant: "destructive",
      });
    }
  };

  const removeRoom = (id: string) => {
    const room = rooms.find(r => r.id === id);
    setRooms(rooms.filter(r => r.id !== id).map((r, index) => ({ ...r, order: index + 1 }))); // Re-order after removal
    if (room) {
      toast({
        title: "Room Removed",
        description: `"${room.name}" has been removed.`,
      });
    }
  };

  const updateRoomField = (id: string, field: keyof RoomData, value: any) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const toggleRoomActive = (id: string) => {
    setRooms(
      rooms.map(room =>
        room.id === id ? { ...room, isActive: !room.isActive } : room
      )
    );
  };

  const moveRoom = (id: string, direction: 'up' | 'down') => {
    const index = rooms.findIndex(r => r.id === id);
    if (index === -1) return;

    const newRoomsList = [...rooms];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newRoomsList.length) return;

    [newRoomsList[index], newRoomsList[targetIndex]] = [newRoomsList[targetIndex], newRoomsList[index]];

    // Update order property
    newRoomsList.forEach((room, idx) => room.order = idx + 1);
    setRooms(newRoomsList);
  };

  // --- Feature Management for New Room ---
  const addFeatureToNewRoom = (feature: string) => {
    if (feature.trim() && !newRoom.features.includes(feature.trim())) {
      setNewRoom(prev => ({
        ...prev,
        features: [...prev.features, feature.trim()],
      }));
      setNewRoomNewFeature(""); // Clear input after adding
    }
  };

  const removeFeatureFromNewRoom = (feature: string) => {
    setNewRoom(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  // --- Feature Management for Existing Rooms ---
  // State to manage the custom feature input for each existing room
  const [editingRoomFeatureInputs, setEditingRoomFeatureInputs] = useState<Record<string, string>>({});

  const handleExistingRoomFeatureInputChange = (roomId: string, value: string) => {
    setEditingRoomFeatureInputs(prev => ({ ...prev, [roomId]: value }));
  };

  const addFeatureToRoom = (roomId: string, feature?: string) => {
    const featureToAdd = feature || editingRoomFeatureInputs[roomId];
    if (!featureToAdd || !featureToAdd.trim()) return;

    setRooms(rooms.map(room => {
      if (room.id === roomId && !room.features.includes(featureToAdd.trim())) {
        return { ...room, features: [...room.features, featureToAdd.trim()] };
      }
      return room;
    }));
    // Clear the specific input field after adding
    setEditingRoomFeatureInputs(prev => ({ ...prev, [roomId]: "" }));
  };

  const removeFeatureFromRoom = (roomId: string, feature: string) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        return { ...room, features: room.features.filter(f => f !== feature) };
      }
      return room;
    }));
  };

  // TODO: Amenity and Image management functions
  // --- Amenity Management for New Room ---
  const handleNewRoomAmenityInputChange = (field: keyof Omit<RoomAmenity, 'id'>, value: string) => {
    setNewRoomCurrentAmenity(prev => ({ ...prev, [field]: value }));
  };

  const addCurrentAmenityToNewRoom = () => {
    if (newRoomCurrentAmenity.name.trim()) {
      const amenityToAdd: RoomAmenity = {
        id: Date.now().toString(),
        ...newRoomCurrentAmenity
      };
      setNewRoom(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenityToAdd]
      }));
      setNewRoomCurrentAmenity({ name: "", icon: iconOptions[0], description: "" }); // Reset form
    }
  };

  const removeAmenityFromNewRoom = (amenityId: string) => {
    setNewRoom(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a.id !== amenityId)
    }));
  };

  // --- Amenity Management for Existing Rooms ---
  const [editingAmenityState, setEditingAmenityState] = useState<{roomId: string; amenity: RoomAmenity; isNew: boolean} | null>(null);

  const openAmenityEditor = (roomId: string, amenity?: RoomAmenity) => {
    if (amenity) {
      setEditingAmenityState({ roomId, amenity: {...amenity}, isNew: false });
    } else {
      setEditingAmenityState({ roomId, amenity: { id: Date.now().toString(), name: "", icon: iconOptions[0], description: "" }, isNew: true });
    }
  };

  const closeAmenityEditor = () => {
    setEditingAmenityState(null);
  };

  const handleEditingAmenityChange = (field: keyof RoomAmenity, value: string) => {
    if (editingAmenityState) {
      setEditingAmenityState({
        ...editingAmenityState,
        amenity: { ...editingAmenityState.amenity, [field]: value }
      });
    }
  };

  const saveEditingAmenity = () => {
    if (!editingAmenityState || !editingAmenityState.amenity.name.trim()) return;

    const { roomId, amenity, isNew } = editingAmenityState;
    setRooms(prevRooms => prevRooms.map(room => {
      if (room.id === roomId) {
        const newAmenities = isNew
          ? [...room.amenities, amenity]
          : room.amenities.map(a => a.id === amenity.id ? amenity : a);
        return { ...room, amenities: newAmenities };
      }
      return room;
    }));
    closeAmenityEditor();
  };

  const removeAmenityFromRoom = (roomId: string, amenityId: string) => {
    setRooms(prevRooms => prevRooms.map(room => {
      if (room.id === roomId) {
        return { ...room, amenities: room.amenities.filter(a => a.id !== amenityId) };
      }
      return room;
    }));
  };


  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Room Management</h3>
        <p className="text-sm text-muted-foreground">
          Create and manage room types, features, amenities, and images.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Room</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Info: Name, Description, Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-room-name">Room Name</Label>
              <Input
                id="new-room-name"
                value={newRoom.name}
                onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                placeholder="e.g., Deluxe Sea View Suite"
              />
            </div>
            <div>
              <Label htmlFor="new-room-location">Location</Label>
              <Input
                id="new-room-location"
                value={newRoom.location}
                onChange={(e) => setNewRoom({ ...newRoom, location: e.target.value })}
                placeholder="e.g., Floor 5, Mountain View"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="new-room-description">Description</Label>
            <Textarea
              id="new-room-description"
              value={newRoom.description}
              onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
              placeholder="Describe the room..."
              rows={3}
            />
          </div>

          {/* Capacity, Size, RoomType */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="new-room-capacity">Capacity (guests)</Label>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="new-room-capacity"
                  type="number"
                  min="1"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="new-room-size">Size (sqm)</Label>
              <div className="flex items-center gap-2">
                <Square className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="new-room-size"
                  type="number"
                  min="10"
                  value={newRoom.size}
                  onChange={(e) => setNewRoom({ ...newRoom, size: parseInt(e.target.value) || 10 })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="new-room-type">Room Type</Label>
              <Select
                value={newRoom.roomType}
                onValueChange={(value: RoomType) => setNewRoom({ ...newRoom, roomType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  {roomTypeOptions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Features Management for New Room */}
          <div>
            <Label>Features</Label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Select onValueChange={(value) => { if (value) addFeatureToNewRoom(value); }}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Add common feature" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonFeatures.filter(f => !newRoom.features.includes(f)).map((feature) => (
                      <SelectItem key={`new-${feature}`} value={feature}>
                        {feature}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2 flex-1">
                  <Input
                    value={newRoomNewFeature}
                    onChange={(e) => setNewRoomNewFeature(e.target.value)}
                    placeholder="Or add custom feature"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addFeatureToNewRoom(newRoomNewFeature);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addFeatureToNewRoom(newRoomNewFeature)}
                    disabled={!newRoomNewFeature.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {newRoom.features.length > 0 && (
                <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
                  {newRoom.features.map((feature) => (
                    <span
                      key={`new-tag-${feature}`}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm flex items-center gap-1"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeatureFromNewRoom(feature)}
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

          {/* Amenities Management for New Room */}
          <div>
            <Label>Amenities for New Room</Label>
            <div className="p-4 border rounded-md space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Input
                  placeholder="Amenity Name"
                  value={newRoomCurrentAmenity.name}
                  onChange={(e) => handleNewRoomAmenityInputChange('name', e.target.value)}
                />
                <Select
                  value={newRoomCurrentAmenity.icon}
                  onValueChange={(value) => handleNewRoomAmenityInputChange('icon', value)}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {iconOptions.map(icon => <SelectItem key={`new-amenity-icon-${icon}`} value={icon}>{icon}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Short Description"
                  value={newRoomCurrentAmenity.description}
                  onChange={(e) => handleNewRoomAmenityInputChange('description', e.target.value)}
                />
              </div>
              <Button onClick={addCurrentAmenityToNewRoom} disabled={!newRoomCurrentAmenity.name.trim()} className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" /> Add Amenity to New Room
              </Button>

              {newRoom.amenities.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm">Added Amenities:</Label>
                  {newRoom.amenities.map(amenity => (
                    <div key={`new-amenity-${amenity.id}`} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <span className="font-medium">{amenity.name}</span> ({amenity.icon})
                        <p className="text-xs text-muted-foreground">{amenity.description}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeAmenityFromNewRoom(amenity.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Image Management for New Room */}
          <div>
            <Label>Images for New Room</Label>
            <div className="p-4 border rounded-md">
              <RoomMediaUploader
                roomName={newRoom.name || "New Room"}
                images={newRoom.images}
                onUpdateImages={(updatedImages) => setNewRoom(prev => ({ ...prev, images: updatedImages }))}
              />
            </div>
          </div>

          <Button onClick={addRoom} className="w-full" disabled={!newRoom.name.trim() || !newRoom.description.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Room
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h4 className="font-medium">Current Rooms ({rooms.length})</h4>
        {rooms.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No rooms created yet. Add your first room above.
            </CardContent>
          </Card>
        ) : (
          rooms.map((room) => (
            <Card key={room.id} className={!room.isActive ? "opacity-60" : ""}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <Input
                    value={room.name}
                    onChange={(e) => updateRoomField(room.id, 'name', e.target.value)}
                    className="text-lg font-semibold flex-grow mr-2"
                  />
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Switch
                      checked={room.isActive}
                      onCheckedChange={() => toggleRoomActive(room.id)}
                      aria-label="Toggle room active state"
                    />
                    <Button
                      onClick={() => moveRoom(room.id, 'up')}
                      variant="outline" size="icon"
                      disabled={rooms.findIndex(r => r.id === room.id) === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => moveRoom(room.id, 'down')}
                      variant="outline" size="icon"
                      disabled={rooms.findIndex(r => r.id === room.id) === rooms.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => removeRoom(room.id)}
                      variant="destructive" size="icon"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`room-type-${room.id}`}>Room Type</Label>
                    <Select
                      value={room.roomType}
                      onValueChange={(value: RoomType) => updateRoomField(room.id, 'roomType', value)}
                    >
                      <SelectTrigger id={`room-type-${room.id}`}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {roomTypeOptions.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                   <div>
                    <Label htmlFor={`room-capacity-${room.id}`}>Capacity</Label>
                    <Input id={`room-capacity-${room.id}`} type="number" value={room.capacity} onChange={e => updateRoomField(room.id, 'capacity', parseInt(e.target.value) || 1)} />
                  </div>
                  <div>
                    <Label htmlFor={`room-size-${room.id}`}>Size (sqm)</Label>
                    <Input id={`room-size-${room.id}`} type="number" value={room.size} onChange={e => updateRoomField(room.id, 'size', parseInt(e.target.value) || 10)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor={`room-location-${room.id}`}>Location</Label>
                  <Input id={`room-location-${room.id}`} value={room.location} onChange={e => updateRoomField(room.id, 'location', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor={`room-description-${room.id}`}>Description</Label>
                  <Textarea id={`room-description-${room.id}`} value={room.description} onChange={e => updateRoomField(room.id, 'description', e.target.value)} />
                </div>

                {/* Features Management for Existing Room */}
                <div>
                  <Label>Features</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                       <Select onValueChange={(value) => { if(value) addFeatureToRoom(room.id, value); }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Add common feature" />
                        </SelectTrigger>
                        <SelectContent>
                          {commonFeatures.filter(f => !room.features.includes(f)).map(feature => (
                            <SelectItem key={`${room.id}-feature-${feature}`} value={feature}>{feature}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2 flex-1">
                        <Input
                          value={editingRoomFeatureInputs[room.id] || ""}
                          onChange={(e) => handleExistingRoomFeatureInputChange(room.id, e.target.value)}
                          placeholder="Or add custom feature"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addFeatureToRoom(room.id);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addFeatureToRoom(room.id)}
                          disabled={!(editingRoomFeatureInputs[room.id] || "").trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {room.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
                        {room.features.map(feature => (
                          <span key={`${room.id}-tag-${feature}`} className="px-2 py-1 bg-muted text-muted-foreground rounded text-sm flex items-center gap-1">
                            {feature}
                            <button onClick={() => removeFeatureFromRoom(room.id, feature)} className="ml-1 hover:text-destructive">
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Amenities Management for Existing Room */}
                <div>
                  <Label>Amenities</Label>
                  <div className="space-y-2">
                    {room.amenities.map(amenity => (
                      <div key={amenity.id} className="flex items-center justify-between p-2 border rounded">
                        {editingAmenityState?.amenity.id === amenity.id && editingAmenityState.roomId === room.id && !editingAmenityState.isNew ? (
                          <div className="flex-1 space-y-2">
                            <Input
                              value={editingAmenityState.amenity.name}
                              onChange={e => handleEditingAmenityChange('name', e.target.value)}
                              placeholder="Amenity Name"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <Select value={editingAmenityState.amenity.icon} onValueChange={val => handleEditingAmenityChange('icon', val)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>{iconOptions.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
                              </Select>
                              <Input
                                value={editingAmenityState.amenity.description}
                                onChange={e => handleEditingAmenityChange('description', e.target.value)}
                                placeholder="Description"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={saveEditingAmenity} size="sm"><Save className="h-4 w-4 mr-1" /> Save</Button>
                              <Button onClick={closeAmenityEditor} variant="outline" size="sm"><X className="h-4 w-4 mr-1" /> Cancel</Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1">
                            <span className="font-medium">{amenity.name}</span> ({amenity.icon})
                            <p className="text-xs text-muted-foreground">{amenity.description}</p>
                          </div>
                        )}
                        {!editingAmenityState || editingAmenityState.amenity.id !== amenity.id || editingAmenityState.roomId !== room.id ? (
                          <div className="flex gap-1">
                            <Button variant="outline" size="icon" onClick={() => openAmenityEditor(room.id, amenity)}><Edit className="h-4 w-4" /></Button>
                            <Button variant="destructive" size="icon" onClick={() => removeAmenityFromRoom(room.id, amenity.id)}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        ) : null}
                      </div>
                    ))}
                     {editingAmenityState?.roomId === room.id && editingAmenityState.isNew && (
                        <div className="p-2 border rounded space-y-2 mt-2">
                           <Input
                              value={editingAmenityState.amenity.name}
                              onChange={e => handleEditingAmenityChange('name', e.target.value)}
                              placeholder="New Amenity Name"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <Select value={editingAmenityState.amenity.icon} onValueChange={val => handleEditingAmenityChange('icon', val)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>{iconOptions.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
                              </Select>
                              <Input
                                value={editingAmenityState.amenity.description}
                                onChange={e => handleEditingAmenityChange('description', e.target.value)}
                                placeholder="Description"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={saveEditingAmenity} size="sm"><Save className="h-4 w-4 mr-1" /> Add New Amenity</Button>
                              <Button onClick={closeAmenityEditor} variant="outline" size="sm"><X className="h-4 w-4 mr-1" /> Cancel</Button>
                            </div>
                        </div>
                    )}
                    {!editingAmenityState || editingAmenityState.roomId !== room.id ? (
                      <Button onClick={() => openAmenityEditor(room.id)} variant="outline" className="w-full mt-2">
                        <Plus className="h-4 w-4 mr-2" /> Add Amenity
                      </Button>
                    ) : null}
                  </div>
                </div>

                {/* Image Management for Existing Room */}
                <div>
                  <Label>Images</Label>
                  <div className="p-4 border rounded-md">
                    <RoomMediaUploader
                      roomName={room.name}
                      images={room.images}
                      onUpdateImages={(updatedImages) => updateRoomField(room.id, 'images', updatedImages)}
                    />
                  </div>
                </div>

              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save All Rooms
      </Button>
    </div>
  );
}
