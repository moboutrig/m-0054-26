
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Camera, Home, User, Star, Image, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCMS } from "@/contexts/CMSContext";
import MediaTabContent from "./media/MediaTabContent";

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  category: string;
}

export default function MediaUploader() {
  const { toast } = useToast();
  const { content, updateContent } = useCMS();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        
        if (!isImage && !isVideo) {
          toast({
            title: "Invalid file type",
            description: `${file.name} is not a valid image or video file.`,
            variant: "destructive",
          });
          continue;
        }

        const fileUrl = URL.createObjectURL(file);
        
        const uploadedFile: UploadedFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          url: fileUrl,
          type: isImage ? 'image' : 'video',
          size: file.size,
          category
        };

        setUploadedFiles(prev => [...prev, uploadedFile]);
      }

      toast({
        title: "Upload successful",
        description: `${files.length} file(s) uploaded successfully.`,
      });
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

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
    toast({
      title: "File removed",
      description: "File has been removed from the gallery.",
    });
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied",
      description: "File URL copied to clipboard.",
    });
  };

  const useAsLogo = (url: string) => {
    updateContent('siteLogo', url);
    toast({
      title: "Logo updated",
      description: "Site logo has been updated successfully.",
    });
  };

  const useAsHeroImage = (url: string) => {
    updateContent('heroImage', url);
    toast({
      title: "Hero image updated",
      description: "Hero background image has been updated.",
    });
  };

  const addToGallery = (url: string) => {
    const updatedGallery = [...content.galleryImages, url];
    updateContent('galleryImages', updatedGallery);
    toast({
      title: "Added to gallery",
      description: "Image has been added to the main gallery.",
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Media Management Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="logo" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="logo">Logo</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="testimonials">People</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>

          <TabsContent value="logo">
            <MediaTabContent
              category="logo"
              title="Site Logo Upload"
              description="Upload your site logo (PNG, SVG recommended)"
              icon={Star}
              accept="image/*"
              uploadedFiles={uploadedFiles}
              isUploading={isUploading}
              onFileUpload={handleFileUpload}
              onRemoveFile={removeFile}
              onCopyUrl={copyUrl}
              onUseAsLogo={useAsLogo}
            />
          </TabsContent>

          <TabsContent value="hero">
            <MediaTabContent
              category="hero"
              title="Hero Section Images"
              description="Upload background images for hero sections"
              icon={Camera}
              accept="image/*"
              uploadedFiles={uploadedFiles}
              isUploading={isUploading}
              onFileUpload={handleFileUpload}
              onRemoveFile={removeFile}
              onCopyUrl={copyUrl}
              onUseAsHeroImage={useAsHeroImage}
            />
          </TabsContent>

          <TabsContent value="rooms">
            <MediaTabContent
              category="rooms"
              title="Room Images"
              description="Upload images for apartments and rooms"
              icon={Home}
              uploadedFiles={uploadedFiles}
              isUploading={isUploading}
              onFileUpload={handleFileUpload}
              onRemoveFile={removeFile}
              onCopyUrl={copyUrl}
            />
          </TabsContent>

          <TabsContent value="gallery">
            <MediaTabContent
              category="gallery"
              title="Gallery Images"
              description="Upload images for the main gallery"
              icon={Image}
              uploadedFiles={uploadedFiles}
              isUploading={isUploading}
              onFileUpload={handleFileUpload}
              onRemoveFile={removeFile}
              onCopyUrl={copyUrl}
              onAddToGallery={addToGallery}
            />
          </TabsContent>

          <TabsContent value="testimonials">
            <MediaTabContent
              category="testimonials"
              title="People Images"
              description="Upload photos for testimonials and team"
              icon={User}
              accept="image/*"
              uploadedFiles={uploadedFiles}
              isUploading={isUploading}
              onFileUpload={handleFileUpload}
              onRemoveFile={removeFile}
              onCopyUrl={copyUrl}
            />
          </TabsContent>

          <TabsContent value="general">
            <MediaTabContent
              category="general"
              title="General Media"
              description="Upload any other images or videos"
              icon={File}
              uploadedFiles={uploadedFiles}
              isUploading={isUploading}
              onFileUpload={handleFileUpload}
              onRemoveFile={removeFile}
              onCopyUrl={copyUrl}
            />
          </TabsContent>
        </Tabs>

        {/* Upload Instructions */}
        <div className="bg-muted/50 rounded-lg p-4 mt-6">
          <h4 className="font-medium mb-2">Upload Instructions</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Supported formats: Images (JPG, PNG, GIF, WebP, SVG) and Videos (MP4, WebM, MOV)</li>
            <li>• Maximum file size: 50MB per file</li>
            <li>• Files are stored locally and URLs can be copied for use in CMS</li>
            <li>• Use quick action buttons to directly apply images to specific sections</li>
            <li>• Logo images will automatically update the site logo when applied</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
