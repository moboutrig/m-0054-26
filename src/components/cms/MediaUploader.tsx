
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, Image, Video, File, Camera, Home, User, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCMS } from "@/contexts/CMSContext";

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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const FileUploadSection = ({ category, title, icon: Icon, accept = "image/*,video/*" }: any) => (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
        <div className="space-y-3">
          <div className="flex justify-center">
            <Icon className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <Label htmlFor={`file-upload-${category}`} className="cursor-pointer">
              <span className="font-medium">{title}</span>
              <p className="text-sm text-muted-foreground mt-1">
                Click to select files
              </p>
            </Label>
            <Input
              id={`file-upload-${category}`}
              type="file"
              accept={accept}
              multiple
              onChange={(e) => handleFileUpload(e, category)}
              disabled={isUploading}
              className="hidden"
            />
          </div>
          <Button
            onClick={() => document.getElementById(`file-upload-${category}`)?.click()}
            disabled={isUploading}
            variant="outline"
            size="sm"
          >
            {isUploading ? "Uploading..." : "Select Files"}
          </Button>
        </div>
      </div>

      {/* Display uploaded files for this category */}
      {uploadedFiles.filter(file => file.category === category).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploadedFiles.filter(file => file.category === category).map((file) => (
            <Card key={file.id} className="relative">
              <CardContent className="p-3">
                <div className="aspect-video relative overflow-hidden rounded-lg mb-2">
                  {file.type === 'image' ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={file.url}
                      className="w-full h-full object-cover"
                      controls
                    />
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs font-medium truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                  
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyUrl(file.url)}
                        className="flex-1 text-xs"
                      >
                        Copy URL
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    {/* Quick action buttons based on category */}
                    {category === 'logo' && file.type === 'image' && (
                      <Button
                        size="sm"
                        onClick={() => useAsLogo(file.url)}
                        className="w-full text-xs"
                      >
                        Use as Logo
                      </Button>
                    )}
                    
                    {category === 'hero' && file.type === 'image' && (
                      <Button
                        size="sm"
                        onClick={() => useAsHeroImage(file.url)}
                        className="w-full text-xs"
                      >
                        Use as Hero
                      </Button>
                    )}
                    
                    {category === 'gallery' && file.type === 'image' && (
                      <Button
                        size="sm"
                        onClick={() => addToGallery(file.url)}
                        className="w-full text-xs"
                      >
                        Add to Gallery
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

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

          <TabsContent value="logo" className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Site Logo Upload</h3>
              <p className="text-sm text-muted-foreground">Upload your site logo (PNG, SVG recommended)</p>
            </div>
            <FileUploadSection
              category="logo"
              title="Upload Site Logo"
              icon={Star}
              accept="image/*"
            />
          </TabsContent>

          <TabsContent value="hero" className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Hero Section Images</h3>
              <p className="text-sm text-muted-foreground">Upload background images for hero sections</p>
            </div>
            <FileUploadSection
              category="hero"
              title="Upload Hero Images"
              icon={Camera}
              accept="image/*"
            />
          </TabsContent>

          <TabsContent value="rooms" className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Room Images</h3>
              <p className="text-sm text-muted-foreground">Upload images for apartments and rooms</p>
            </div>
            <FileUploadSection
              category="rooms"
              title="Upload Room Images"
              icon={Home}
            />
          </TabsContent>

          <TabsContent value="gallery" className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Gallery Images</h3>
              <p className="text-sm text-muted-foreground">Upload images for the main gallery</p>
            </div>
            <FileUploadSection
              category="gallery"
              title="Upload Gallery Images"
              icon={Image}
            />
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">People Images</h3>
              <p className="text-sm text-muted-foreground">Upload photos for testimonials and team</p>
            </div>
            <FileUploadSection
              category="testimonials"
              title="Upload People Photos"
              icon={User}
              accept="image/*"
            />
          </TabsContent>

          <TabsContent value="general" className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">General Media</h3>
              <p className="text-sm text-muted-foreground">Upload any other images or videos</p>
            </div>
            <FileUploadSection
              category="general"
              title="Upload Media Files"
              icon={File}
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
