
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  category: string;
}

interface UploadedFileCardProps {
  file: UploadedFile;
  onRemove: (id: string) => void;
  onCopyUrl: (url: string) => void;
  quickActions?: React.ReactNode;
}

export default function UploadedFileCard({ file, onRemove, onCopyUrl, quickActions }: UploadedFileCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="relative">
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
                onClick={() => onCopyUrl(file.url)}
                className="flex-1 text-xs"
              >
                Copy URL
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onRemove(file.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            
            {quickActions}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
