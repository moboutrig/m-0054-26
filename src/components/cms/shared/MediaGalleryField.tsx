
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Copy, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaGalleryFieldProps {
  label: string;
  images: string[];
  onChange: (images: string[]) => void;
  accept?: string;
  placeholder?: string;
  maxImages?: number;
}

export default function MediaGalleryField({
  label,
  images,
  onChange,
  accept = "image/*",
  placeholder = "Enter image URL",
  maxImages = 20
}: MediaGalleryFieldProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    const newImages: string[] = [];

    try {
      for (const file of Array.from(files)) {
        if (images.length + newImages.length >= maxImages) {
          toast({
            title: "Maximum images reached",
            description: `You can only have up to ${maxImages} images.`,
            variant: "destructive",
          });
          break;
        }

        const isImage = file.type.startsWith('image/');
        
        if (!isImage) {
          toast({
            title: "Invalid file type",
            description: `${file.name} is not a valid image file.`,
            variant: "destructive",
          });
          continue;
        }

        const fileUrl = URL.createObjectURL(file);
        newImages.push(fileUrl);
      }

      if (newImages.length > 0) {
        onChange([...images, ...newImages]);
        toast({
          title: "Upload successful",
          description: `${newImages.length} image(s) uploaded successfully.`,
        });
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const addImageUrl = () => {
    if (newImageUrl.trim() && images.length < maxImages) {
      onChange([...images, newImageUrl]);
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onChange(updatedImages);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied",
      description: "Image URL copied to clipboard.",
    });
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      <div className="flex gap-2">
        <Input
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addImageUrl}
          disabled={!newImageUrl.trim() || images.length >= maxImages}
        >
          <Plus className="h-4 w-4" />
          Add URL
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading || images.length >= maxImages}
        >
          <Upload className="h-4 w-4" />
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-2">
                <div className="relative">
                  <img 
                    src={image} 
                    alt={`Gallery ${index + 1}`} 
                    className="w-full h-20 object-cover rounded"
                  />
                  <div className="absolute top-1 right-1 flex gap-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => copyUrl(image)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeImage(index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <p className="text-xs text-muted-foreground">
        {images.length} of {maxImages} images used
      </p>
    </div>
  );
}
