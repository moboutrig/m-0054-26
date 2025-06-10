
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MediaUploadField from "./MediaUploadField";
import MediaGalleryField from "./MediaGalleryField";

interface RoomImages {
  main: string;
  gallery: string[];
}

interface RoomMediaUploaderProps {
  roomName: string;
  images: RoomImages;
  onUpdateImages: (images: RoomImages) => void;
}

export default function RoomMediaUploader({ roomName, images, onUpdateImages }: RoomMediaUploaderProps) {
  const updateMainImage = (url: string) => {
    onUpdateImages({ ...images, main: url });
  };

  const updateGallery = (gallery: string[]) => {
    onUpdateImages({ ...images, gallery });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{roomName} Images</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <MediaUploadField
          label="Main Room Image"
          value={images.main}
          onChange={updateMainImage}
          placeholder="Upload or enter main room image URL"
        />

        <MediaGalleryField
          label="Room Gallery"
          images={images.gallery}
          onChange={updateGallery}
          maxImages={15}
        />
      </CardContent>
    </Card>
  );
}
