
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  placeholder?: string;
  showPreview?: boolean;
  previewClassName?: string;
}

export default function MediaUploadField({
  label,
  value,
  onChange,
  accept = "image/*",
  placeholder = "Enter image URL or upload file",
  showPreview = true,
  previewClassName = "w-32 h-24 object-cover rounded"
}: MediaUploadFieldProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      toast({
        title: "Invalid file type",
        description: "Please select an image or video file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error during upload.' }));
        throw new Error(`Upload failed: ${response.statusText} - ${errorData.message}`);
      }

      const result = await response.json();
      onChange(result.filePath);
      
      toast({
        title: "Upload successful",
        description: `${file.name} uploaded successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const copyUrl = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      toast({
        title: "URL copied",
        description: "Image URL copied to clipboard.",
      });
    }
  };

  const removeImage = () => {
    onChange('');
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <Upload className="h-4 w-4" />
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
      
      {value && showPreview && (
        <Card className="relative inline-block">
          <CardContent className="p-2">
            <div className="relative">
              <img 
                src={value} 
                alt="Preview" 
                className={previewClassName}
              />
              <div className="absolute top-1 right-1 flex gap-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={copyUrl}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={removeImage}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
