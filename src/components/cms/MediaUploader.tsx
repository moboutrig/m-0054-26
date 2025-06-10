
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image, Video, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
}

export default function MediaUploader() {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        // Validate file type
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

        // Create file URL (in a real app, you'd upload to a server)
        const fileUrl = URL.createObjectURL(file);
        
        const uploadedFile: UploadedFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          url: fileUrl,
          type: isImage ? 'image' : 'video',
          size: file.size
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Media Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Upload className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <Label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-lg font-medium">Upload Images & Videos</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Drag and drop files here, or click to select
                </p>
              </Label>
              <Input
                id="file-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              variant="outline"
            >
              {isUploading ? "Uploading..." : "Select Files"}
            </Button>
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Uploaded Files</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles.map((file) => (
                <Card key={file.id} className="relative">
                  <CardContent className="p-4">
                    <div className="aspect-video relative overflow-hidden rounded-lg mb-3">
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
                      <div className="absolute top-2 left-2">
                        {file.type === 'image' ? (
                          <Image className="h-4 w-4 text-white bg-black/50 rounded p-0.5" />
                        ) : (
                          <Video className="h-4 w-4 text-white bg-black/50 rounded p-0.5" />
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyUrl(file.url)}
                          className="flex-1"
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Upload Instructions */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium mb-2">Upload Instructions</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Supported formats: Images (JPG, PNG, GIF, WebP) and Videos (MP4, WebM, MOV)</li>
            <li>• Maximum file size: 50MB per file</li>
            <li>• Files are stored locally and URLs can be copied for use in CMS</li>
            <li>• Use the "Copy URL" button to get the file URL for CMS content</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
