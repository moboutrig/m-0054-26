
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";

interface FileUploadSectionProps {
  category: string;
  title: string;
  icon: LucideIcon;
  accept?: string;
  isUploading: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>, category: string) => void;
}

export default function FileUploadSection({ 
  category, 
  title, 
  icon: Icon, 
  accept = "image/*,video/*", 
  isUploading, 
  onFileUpload 
}: FileUploadSectionProps) {
  return (
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
            onChange={(e) => onFileUpload(e, category)}
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
  );
}
