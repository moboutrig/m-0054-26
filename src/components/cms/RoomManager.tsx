
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Edit, Save, X, Image } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

const availableIcons = [
  "Wifi", "Coffee", "Bath", "Wind", "Tv", "Home", "Car", "Utensils", 
  "Dumbbell", "Heart", "Music", "Users", "MapPin", "Clock", "Plane"
];

const roomIds = ["1", "2", "3", "4", "5", "6"];

const roomNames = {
  "1": "Deluxe Sea View Suite",
  "2": "Premium Family Apartment", 
  "3": "Executive Beach Studio",
  "4": "Luxury Penthouse Suite",
  "5": "Classic Double Room",
  "6": "Garden View Apartment"
};

export default function RoomManager() {
  const { content, updateRoomImages, updateRoomAmenities } = useCMS();
  const { toast } = useToast();
  const [selectedRoom, setSelectedRoom] = useState("1");
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState({
    images: { main: "", gallery: [] as string[] },
    amenities: [] as any[],
    newImageUrl: "",
    newAmenity: { name: "", icon: "Wifi", description: "" }
  });

  const currentRoomImages = content.roomImages[selectedRoom] || { main: "", gallery: [] };
  const currentRoomAmenities = content.roomAmenities[selectedRoom] || [];

  const startEditing = () => {
    setEditingData({
      images: {
        main: currentRoomImages.main,
        gallery: [...currentRoomImages.gallery]
      },
      amenities: [...currentRoomAmenities],
      newImageUrl: "",
      newAmenity: { name: "", icon: "Wifi", description: "" }
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingData({
      images: { main: "", gallery: [] },
      amenities: [],
      newImageUrl: "",
      newAmenity: { name: "", icon: "Wifi", description: "" }
    });
  };

  const saveRoomPost = () => {
    // Save images
    updateRoomImages(selectedRoom, editingData.images);
    // Save amenities
    updateRoomAmenities(selectedRoom, editingData.amenities);
    
    setIsEditing(false);
    toast({
      title: "Room Updated",
      description: `${roomNames[selectedRoom as keyof typeof roomNames]} has been saved successfully.`,
    });
  };

  const updateMainImage = (url: string) => {
    setEditingData(prev => ({
      ...prev,
      images: { ...prev.images, main: url }
    }));
  };

  const addGalleryImage = () => {
    if (editingData.newImageUrl.trim()) {
      setEditingData(prev => ({
        ...prev,
        images: {
          ...prev.images,
          gallery: [...prev.images.gallery, prev.newImageUrl.trim()]
        },
        newImageUrl: ""
      }));
    }
  };

  const removeGalleryImage = (index: number) => {
    setEditingData(prev => ({
      ...prev,
      images: {
        ...prev.images,
        gallery: prev.images.gallery.filter((_, i) => i !== index)
      }
    }));
  };

  const addAmenity = () => {
    if (editingData.newAmenity.name.trim()) {
      const amenity = {
        id: Date.now().toString(),
        name: editingData.newAmenity.name.trim(),
        icon: editingData.newAmenity.icon,
        description: editingData.newAmenity.description.trim()
      };
      
      setEditingData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity],
        newAmenity: { name: "", icon: "Wifi", description: "" }
      }));
    }
  };

  const removeAmenity = (amenityId: string) => {
    setEditingData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a.id !== amenityId)
    }));
  };

  const updateAmenity = (amenityId: string, updatedAmenity: any) => {
    setEditingData(prev => ({
      ...prev,
      amenities: prev.amenities.map(a => 
        a.id === amenityId ? { ...a, ...updatedAmenity } : a
      )
    }));
  };

  return (
    <div className="space-y-6">
      {/* Room Selection Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Room Content Management</CardTitle>
              <p className="text-sm text-muted-foreground">
                {isEditing ? "Editing room details" : "View and manage room content"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedRoom} onValueChange={setSelectedRoom} disabled={isEditing}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roomIds.map(roomId => (
                    <SelectItem key={roomId} value={roomId}>
                      {roomNames[roomId as keyof typeof roomNames]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {!isEditing ? (
                <Button onClick={startEditing}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Room
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={saveRoomPost}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Post
                  </Button>
                  <Button onClick={cancelEditing} variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Room Content Display/Edit */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            {roomNames[selectedRoom as keyof typeof roomNames]} - Images
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Image */}
          <div>
            <Label>Main Room Image</Label>
            {isEditing ? (
              <Input
                value={editingData.images.main}
                onChange={(e) => updateMainImage(e.target.value)}
                placeholder="Main room image URL..."
              />
            ) : (
              <div className="p-2 border rounded bg-muted">
                {currentRoomImages.main || "No main image set"}
              </div>
            )}
            {(isEditing ? editingData.images.main : currentRoomImages.main) && (
              <div className="w-full h-32 rounded-lg overflow-hidden mt-2">
                <img 
                  src={isEditing ? editingData.images.main : currentRoomImages.main} 
                  alt="Room main" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div>
            <Label>Room Gallery</Label>
            {isEditing && (
              <div className="flex gap-2 mt-2">
                <Input
                  value={editingData.newImageUrl}
                  onChange={(e) => setEditingData(prev => ({ ...prev, newImageUrl: e.target.value }))}
                  placeholder="Add gallery image URL..."
                />
                <Button onClick={addGalleryImage} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {(isEditing ? editingData.images.gallery : currentRoomImages.gallery).map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <div className="w-full h-24 rounded-lg overflow-hidden border">
                    <img 
                      src={imageUrl} 
                      alt={`Room gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeGalleryImage(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Room Amenities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Amenity (only in edit mode) */}
          {isEditing && (
            <div className="border rounded-lg p-4 space-y-3 bg-muted/50">
              <h4 className="font-medium">Add New Amenity</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Amenity name"
                  value={editingData.newAmenity.name}
                  onChange={(e) => setEditingData(prev => ({
                    ...prev,
                    newAmenity: { ...prev.newAmenity, name: e.target.value }
                  }))}
                />
                <Select 
                  value={editingData.newAmenity.icon} 
                  onValueChange={(value) => setEditingData(prev => ({
                    ...prev,
                    newAmenity: { ...prev.newAmenity, icon: value }
                  }))}
                >
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
                placeholder="Amenity description"
                value={editingData.newAmenity.description}
                onChange={(e) => setEditingData(prev => ({
                  ...prev,
                  newAmenity: { ...prev.newAmenity, description: e.target.value }
                }))}
                rows={2}
              />
              <Button onClick={addAmenity} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Amenity
              </Button>
            </div>
          )}

          {/* Current Amenities */}
          <div className="space-y-3">
            {(isEditing ? editingData.amenities : currentRoomAmenities).map((amenity) => (
              <AmenityCard
                key={amenity.id}
                amenity={amenity}
                isEditing={isEditing}
                onUpdate={(updated) => updateAmenity(amenity.id, updated)}
                onRemove={() => removeAmenity(amenity.id)}
              />
            ))}
          </div>

          {(isEditing ? editingData.amenities : currentRoomAmenities).length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8 border rounded-lg">
              {isEditing ? "No amenities added yet. Add some above." : "No amenities configured for this room."}
            </p>
          )}
        </CardContent>
      </Card>

      {isEditing && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-green-800 dark:text-green-200">Editing Mode Active</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Make your changes and click "Save Post" to publish, or "Cancel" to discard changes.
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={saveRoomPost} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Post
                </Button>
                <Button onClick={cancelEditing} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface AmenityCardProps {
  amenity: any;
  isEditing: boolean;
  onUpdate: (updated: any) => void;
  onRemove: () => void;
}

function AmenityCard({ amenity, isEditing, onUpdate, onRemove }: AmenityCardProps) {
  const [editingAmenity, setEditingAmenity] = useState(false);
  const [editData, setEditData] = useState({
    name: amenity.name,
    icon: amenity.icon,
    description: amenity.description
  });

  const saveAmenity = () => {
    onUpdate(editData);
    setEditingAmenity(false);
  };

  const cancelEdit = () => {
    setEditData({
      name: amenity.name,
      icon: amenity.icon,
      description: amenity.description
    });
    setEditingAmenity(false);
  };

  return (
    <div className="border rounded-lg p-4">
      {editingAmenity ? (
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
            <Button onClick={saveAmenity} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button onClick={cancelEdit} variant="outline" size="sm">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <div>
            <h5 className="font-medium">{amenity.name}</h5>
            <p className="text-sm text-muted-foreground">Icon: {amenity.icon}</p>
            <p className="text-sm text-muted-foreground mt-1">{amenity.description}</p>
          </div>
          {isEditing && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingAmenity(true)}
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={onRemove}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
