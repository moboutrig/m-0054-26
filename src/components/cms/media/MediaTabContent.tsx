
import FileUploadSection from "./FileUploadSection";
import UploadedFileCard from "./UploadedFileCard";
import QuickActions from "./QuickActions";
import { LucideIcon } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  category: string;
}

interface MediaTabContentProps {
  category: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accept?: string;
  uploadedFiles: UploadedFile[];
  isUploading: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>, category: string) => void;
  onRemoveFile: (id: string) => void;
  onCopyUrl: (url: string) => void;
  onUseAsLogo?: (url: string) => void;
  onUseAsHeroImage?: (url: string) => void;
  onAddToGallery?: (url: string) => void;
}

export default function MediaTabContent({
  category,
  title,
  description,
  icon,
  accept = "image/*,video/*",
  uploadedFiles,
  isUploading,
  onFileUpload,
  onRemoveFile,
  onCopyUrl,
  onUseAsLogo,
  onUseAsHeroImage,
  onAddToGallery
}: MediaTabContentProps) {
  const categoryFiles = uploadedFiles.filter(file => file.category === category);

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      <FileUploadSection
        category={category}
        title={`Upload ${title}`}
        icon={icon}
        accept={accept}
        isUploading={isUploading}
        onFileUpload={onFileUpload}
      />

      {categoryFiles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryFiles.map((file) => (
            <UploadedFileCard
              key={file.id}
              file={file}
              onRemove={onRemoveFile}
              onCopyUrl={onCopyUrl}
              quickActions={
                <QuickActions
                  file={file}
                  category={category}
                  onUseAsLogo={onUseAsLogo}
                  onUseAsHeroImage={onUseAsHeroImage}
                  onAddToGallery={onAddToGallery}
                />
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
