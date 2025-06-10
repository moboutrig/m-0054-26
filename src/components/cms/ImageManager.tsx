
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Image } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

export default function ImageManager() {
  const { content, updateContent } = useCMS();
  const { toast } = useToast();
  const [newGalleryImage, setNewGalleryImage] = useState("");

  const handleSave = () => {
    toast({
      title: "Images Updated",
      description: "Image settings have been saved successfully.",
    });
  };

  const addGalleryImage = () => {
    if (newGalleryImage.trim()) {
      const updatedGallery = [...content.galleryImages, newGalleryImage];
      updateContent('galleryImages', updatedGallery);
      setNewGalleryImage("");
    }
  };

  const removeGalleryImage = (index: number) => {
    const updatedGallery = content.galleryImages.filter((_, i) => i !== index);
    updateContent('galleryImages', updatedGallery);
  };

  const addWelcomeImage = () => {
    if (newGalleryImage.trim()) {
      const updatedWelcome = [...content.welcomeImages, newGalleryImage];
      updateContent('welcomeImages', updatedWelcome);
      setNewGalleryImage("");
    }
  };

  const removeWelcomeImage = (index: number) => {
    const updatedWelcome = content.welcomeImages.filter((_, i) => i !== index);
    updateContent('welcomeImages', updatedWelcome);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Image</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="heroImage">Hero Background Image URL</Label>
            <Input
              id="heroImage"
              value={content.heroImage}
              onChange={(e) => updateContent('heroImage', e.target.value)}
              placeholder="https://example.com/hero-image.jpg"
            />
            {content.heroImage && (
              <div className="mt-2">
                <img 
                  src={content.heroImage} 
                  alt="Hero" 
                  className="w-32 h-20 object-cover rounded"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Welcome Section Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {content.welcomeImages.map((image, index) => (
              <div key={index} className="relative">
                <img 
                  src={image} 
                  alt={`Welcome ${index + 1}`} 
                  className="w-full h-24 object-cover rounded"
                />
                <Button
                  onClick={() => removeWelcomeImage(index)}
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newGalleryImage}
              onChange={(e) => setNewGalleryImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <Button onClick={addWelcomeImage}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {content.galleryImages.map((image, index) => (
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
          <div className="flex gap-2">
            <Input
              value={newGalleryImage}
              onChange={(e) => setNewGalleryImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <Button onClick={addGalleryImage}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Image Settings
      </Button>
    </div>
  );
}
