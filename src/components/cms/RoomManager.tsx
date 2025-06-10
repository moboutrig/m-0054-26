
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

interface RoomAmenity {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface RoomImages {
  main: string;
  gallery: string[];
}

export default function RoomManager() {
  const { content, updateRoomImages, updateRoomAmenities } = useCMS();
  const { toast } = useToast();
  const [selectedRoom, setSelectedRoom] = useState("1");
  const [newGalleryImage, setNewGalleryImage] = useState("");
  const [editingAmenity, setEditingAmenity] = useState<string | null>(null);
  const [newAmenity, setNewAmenity] = useState<Omit<RoomAmenity, 'id'>>({
    name: "",
    icon: "Wifi",
    description: ""
  });

  const roomTypes = [
    { id: "1", name: "Deluxe Apartment" },
    { id: "2", name: "Studio Suite" },
    { id: "3", name: "Premium Room" },
    { id: "4", name: "Ocean View Suite" },
    { id: "5", name: "Standard Room" },
    { id: "6", name: "Luxury Suite" }
  ];

  const iconOptions = [
    "Wifi", "Coffee", "Bath", "Wind", "Tv", "Home", "Car", "Dumbbell", "Users", "Utensils"
  ];

  const currentRoomImages = content.roomImages[selectedRoom] || { main: "", gallery: [] };
  const currentRoomAmenities = content.roomAmenities[selectedRoom] || [];

  const handleSaveImages = () => {
    toast({
      title: "Room Images Updated",
      description: `Images for ${roomTypes.find(r => r.id === selectedRoom)?.name} have been saved.`,
    });
  };

  const updateMainImage = (url: string) => {
    const updatedImages: RoomImages = {
      ...currentRoomImages,
      main: url
    };
    updateRoomImages(selectedRoom, updatedImages);
  };

  const addGalleryImage = () => {
    if (newGalleryImage.trim()) {
      const updatedImages: RoomImages = {
        ...currentRoomImages,
        gallery: [...currentRoomImages.gallery, newGalleryImage]
      };
      updateRoomImages(selectedRoom, updatedImages);
      setNewGalleryImage("");
    }
  };

  const removeGalleryImage = (index: number) => {
    const updatedImages: RoomImages = {
      ...currentRoomImages,
      gallery: currentRoomImages.gallery.filter((_, i) => i !== index)
    };
    updateRoomImages(selectedRoom, updatedImages);
  };

  const addAmenity = () => {
    if (newAmenity.name.trim()) {
      const amenity: RoomAmenity = {
        id: Date.now().toString(),
        ...newAmenity
      };
      const updatedAmenities = [...currentRoomAmenities, amenity];
      updateRoomAmenities(selectedRoom, updatedAmenities);
      setNewAmenity({ name: "", icon: "Wifi", description: "" });
    }
  };

  const removeAmenity = (amenityId: string) => {
    const updatedAmenities = currentRoomAmenities.filter(a => a.id !== amenityId);
    updateRoomAmenities(selectedRoom, updatedAmenities);
  };

  const startEditingAmenity = (amenityId: string) => {
    setEditingAmenity(amenityId);
  };

  const saveAmenityEdit = (amenityId: string, updatedAmenity: Partial<RoomAmenity>) => {
    const updatedAmenities = currentRoomAmenities.map(a =>
      a.id === amenityId ? { ...a, ...updatedAmenity } : a
    );
    updateRoomAmenities(selectedRoom, updatedAmenities);
    setEditingAmenity(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Room to Manage</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedRoom} onValueChange={setSelectedRoom}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {roomTypes.map(room => (
                <SelectItem key={room.id} value={room.id}>
                  {room.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Room Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="main-image">Main Room Image</Label>
            <Input
              id="main-image"
              value={currentRoomImages.main}
              onChange={(e) => updateMainImage(e.target.value)}
              placeholder="https://example.com/room-image.jpg"
            />
            {currentRoomImages.main && (
              <div className="mt-2">
                <img 
                  src={currentRoomImages.main} 
                  alt="Room main" 
                  className="w-32 h-24 object-cover rounded"
                />
              </div>
            )}
          </div>

          <div>
            <Label>Gallery Images</Label>
            <div className="grid grid-cols-4 gap-4 mt-2">
              {currentRoomImages.gallery.map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={image} 
                    alt={`Gallery ${index + 1}`} 
                    className="w-full h-20 object-cover rounded"
                  />
                  <Button
                    onClick={() => removeGalleryImage(index)}
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <Input
                value={newGalleryImage}
                onChange={(e) => setNewGalleryImage(e.target.value)}
                placeholder="https://example.com/gallery-image.jpg"
              />
              <Button onClick={addGalleryImage}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Room Amenities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {currentRoomAmenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center gap-2 p-2 border rounded">
                {editingAmenity === amenity.id ? (
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <Input
                      defaultValue={amenity.name}
                      placeholder="Amenity name"
                      onChange={(e) => amenity.name = e.target.value}
                    />
                    <Select defaultValue={amenity.icon}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map(icon => (
                          <SelectItem key={icon} value={icon}>
                            {icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      defaultValue={amenity.description}
                      placeholder="Description"
                      onChange={(e) => amenity.description = e.target.value}
                    />
                  </div>
                ) : (
                  <div className="flex-1">
                    <span className="font-medium">{amenity.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">({amenity.icon})</span>
                    <p className="text-sm text-muted-foreground">{amenity.description}</p>
                  </div>
                )}
                <div className="flex gap-1">
                  {editingAmenity === amenity.id ? (
                    <>
                      <Button
                        onClick={() => saveAmenityEdit(amenity.id, amenity)}
                        size="sm"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => setEditingAmenity(null)}
                        variant="outline"
                        size="sm"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => startEditingAmenity(amenity.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => removeAmenity(amenity.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Input
              value={newAmenity.name}
              onChange={(e) => setNewAmenity({ ...newAmenity, name: e.target.value })}
              placeholder="Amenity name"
            />
            <Select 
              value={newAmenity.icon} 
              onValueChange={(value) => setNewAmenity({ ...newAmenity, icon: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map(icon => (
                  <SelectItem key={icon} value={icon}>
                    {icon}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={newAmenity.description}
              onChange={(e) => setNewAmenity({ ...newAmenity, description: e.target.value })}
              placeholder="Description"
            />
          </div>
          <Button onClick={addAmenity} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Amenity
          </Button>
        </CardContent>
      </Card>

      <Button onClick={handleSaveImages} className="w-full">
        Save Room Configuration
      </Button>
    </div>
  );
}
