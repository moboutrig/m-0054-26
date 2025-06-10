
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Edit, Save, X } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";

const availableIcons = [
  "Wifi", "Coffee", "Bath", "Wind", "Tv", "Home", "Car", "Utensils", 
  "Dumbbell", "Heart", "Music", "Users", "MapPin", "Clock", "Plane"
];

const roomIds = ["1", "2", "3", "4", "5", "6"];

export default function RoomManager() {
  const { content, updateRoomImages, updateRoomAmenities } = useCMS();
  const [selectedRoom, setSelectedRoom] = useState("1");
  const [editingAmenity, setEditingAmenity] = useState<string | null>(null);
  const [newAmenity, setNewAmenity] = useState({
    name: "",
    icon: "Wifi",
    description: ""
  });
  const [newImageUrl, setNewImageUrl] = useState("");

  const currentRoomImages = content.roomImages[selectedRoom] || { main: "", gallery: [] };
  const currentRoomAmenities = content.roomAmenities[selectedRoom] || [];

  const addAmenity = () => {
    if (newAmenity.name.trim()) {
      const amenity = {
        id: Date.now().toString(),
        name: newAmenity.name.trim(),
        icon: newAmenity.icon,
        description: newAmenity.description.trim()
      };
      
      updateRoomAmenities(selectedRoom, [...currentRoomAmenities, amenity]);
      setNewAmenity({ name: "", icon: "Wifi", description: "" });
    }
  };

  const removeAmenity = (amenityId: string) => {
    const updatedAmenities = currentRoomAmenities.filter(a => a.id !== amenityId);
    updateRoomAmenities(selectedRoom, updatedAmenities);
  };

  const updateAmenity = (amenityId: string, updatedAmenity: any) => {
    const updatedAmenities = currentRoomAmenities.map(a => 
      a.id === amenityId ? { ...a, ...updatedAmenity } : a
    );
    updateRoomAmenities(selectedRoom, updatedAmenities);
    setEditingAmenity(null);
  };

  const updateMainImage = (url: string) => {
    updateRoomImages(selectedRoom, {
      ...currentRoomImages,
      main: url
    });
  };

  const addGalleryImage = () => {
    if (newImageUrl.trim()) {
      updateRoomImages(selectedRoom, {
        ...currentRoomImages,
        gallery: [...currentRoomImages.gallery, newImageUrl.trim()]
      });
      setNewImageUrl("");
    }
  };

  const removeGalleryImage = (index: number) => {
    const updatedGallery = currentRoomImages.gallery.filter((_, i) => i !== index);
    updateRoomImages(selectedRoom, {
      ...currentRoomImages,
      gallery: updatedGallery
    });
  };

  return (
    <div className="space-y-6">
      {/* Room Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Room to Manage</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedRoom} onValueChange={setSelectedRoom}>
            <SelectTrigger>
              <SelectValue placeholder="Select a room" />
            </SelectTrigger>
            <SelectContent>
              {roomIds.map(roomId => (
                <SelectItem key={roomId} value={roomId}>
                  Room {roomId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Room Images */}
      <Card>
        <CardHeader>
          <CardTitle>Room {selectedRoom} Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Image */}
          <div>
            <Label htmlFor="mainImage">Main Room Image</Label>
            <Input
              id="mainImage"
              value={currentRoomImages.main}
              onChange={(e) => updateMainImage(e.target.value)}
              placeholder="Main room image URL..."
            />
            {currentRoomImages.main && (
              <div className="w-full h-32 rounded-lg overflow-hidden mt-2">
                <img 
                  src={currentRoomImages.main} 
                  alt="Room main" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div>
            <Label>Room Gallery</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Add gallery image URL..."
              />
              <Button onClick={addGalleryImage} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {currentRoomImages.gallery.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <div className="w-full h-24 rounded-lg overflow-hidden border">
                    <img 
                      src={imageUrl} 
                      alt={`Room gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeGalleryImage(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Room {selectedRoom} Amenities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Amenity */}
          <div className="border rounded-lg p-4 space-y-3">
            <h4 className="font-medium">Add New Amenity</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="Amenity name"
                value={newAmenity.name}
                onChange={(e) => setNewAmenity({ ...newAmenity, name: e.target.value })}
              />
              <Select value={newAmenity.icon} onValueChange={(value) => setNewAmenity({ ...newAmenity, icon: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  {availableIcons.map(icon => (
                    <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              placeholder="Amenity description"
              value={newAmenity.description}
              onChange={(e) => setNewAmenity({ ...newAmenity, description: e.target.value })}
              rows={2}
            />
            <Button onClick={addAmenity} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Amenity
            </Button>
          </div>

          {/* Current Amenities */}
          <div className="space-y-3">
            {currentRoomAmenities.map((amenity) => (
              <div key={amenity.id} className="border rounded-lg p-4">
                {editingAmenity === amenity.id ? (
                  <EditAmenityForm
                    amenity={amenity}
                    onSave={(updated) => updateAmenity(amenity.id, updated)}
                    onCancel={() => setEditingAmenity(null)}
                  />
                ) : (
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-medium">{amenity.name}</h5>
                      <p className="text-sm text-muted-foreground">Icon: {amenity.icon}</p>
                      <p className="text-sm text-muted-foreground mt-1">{amenity.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingAmenity(amenity.id)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeAmenity(amenity.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface EditAmenityFormProps {
  amenity: any;
  onSave: (updated: any) => void;
  onCancel: () => void;
}

function EditAmenityForm({ amenity, onSave, onCancel }: EditAmenityFormProps) {
  const [editData, setEditData] = useState({
    name: amenity.name,
    icon: amenity.icon,
    description: amenity.description
  });

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
        />
        <Select value={editData.icon} onValueChange={(value) => setEditData({ ...editData, icon: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableIcons.map(icon => (
              <SelectItem key={icon} value={icon}>{icon}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Textarea
        value={editData.description}
        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
        rows={2}
      />
      <div className="flex gap-2">
        <Button onClick={() => onSave(editData)} size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button onClick={onCancel} variant="outline" size="sm">
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );
}
