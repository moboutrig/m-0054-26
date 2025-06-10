
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Image } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";

export default function ImageManager() {
  const { content, updateContent } = useCMS();
  const [newImageUrl, setNewImageUrl] = useState("");

  const addToGallery = () => {
    if (newImageUrl.trim()) {
      const updatedGallery = [...content.galleryImages, newImageUrl.trim()];
      updateContent('galleryImages', updatedGallery);
      setNewImageUrl("");
    }
  };

  const removeFromGallery = (index: number) => {
    const updatedGallery = content.galleryImages.filter((_, i) => i !== index);
    updateContent('galleryImages', updatedGallery);
  };

  const addToWelcomeImages = () => {
    if (newImageUrl.trim()) {
      const updatedImages = [...content.welcomeImages, newImageUrl.trim()];
      updateContent('welcomeImages', updatedImages);
      setNewImageUrl("");
    }
  };

  const removeFromWelcomeImages = (index: number) => {
    const updatedImages = content.welcomeImages.filter((_, i) => i !== index);
    updateContent('welcomeImages', updatedImages);
  };

  return (
    <div className="space-y-6">
      {/* Hero Image */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section Image</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="heroImage">Hero Background Image URL</Label>
              <Input
                id="heroImage"
                value={content.heroImage}
                onChange={(e) => updateContent('heroImage', e.target.value)}
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            {content.heroImage && (
              <div className="w-full h-32 rounded-lg overflow-hidden">
                <img 
                  src={content.heroImage} 
                  alt="Hero" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Welcome Section Images */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome Section Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Add image URL..."
              />
              <Button onClick={addToWelcomeImages} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {content.welcomeImages.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <div className="w-full h-24 rounded-lg overflow-hidden border">
                    <img 
                      src={imageUrl} 
                      alt={`Welcome ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFromWelcomeImages(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Images */}
      <Card>
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Add gallery image URL..."
              />
              <Button onClick={addToGallery} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {content.galleryImages.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <div className="w-full h-24 rounded-lg overflow-hidden border">
                    <img 
                      src={imageUrl} 
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFromGallery(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
