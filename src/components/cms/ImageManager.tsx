
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";
import MediaUploadField from "./shared/MediaUploadField";
import MediaGalleryField from "./shared/MediaGalleryField";

export default function ImageManager() {
  const { content, updateContent } = useCMS();
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Images Updated",
      description: "Image settings have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Image</CardTitle>
        </CardHeader>
        <CardContent>
          <MediaUploadField
            label="Hero Background Image"
            value={content.heroImage}
            onChange={(url) => updateContent('heroImage', url)}
            placeholder="Upload or enter hero image URL"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Welcome Section Images</CardTitle>
        </CardHeader>
        <CardContent>
          <MediaGalleryField
            label="Welcome Images"
            images={content.welcomeImages}
            onChange={(images) => updateContent('welcomeImages', images)}
            maxImages={6}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
        </CardHeader>
        <CardContent>
          <MediaGalleryField
            label="Gallery Images"
            images={content.galleryImages}
            onChange={(images) => updateContent('galleryImages', images)}
            maxImages={50}
          />
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Image Settings
      </Button>
    </div>
  );
}
