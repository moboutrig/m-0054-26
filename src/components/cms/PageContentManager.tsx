
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useToast } from "@/hooks/use-toast";

export default function PageContentManager() {
  const { content, updatePageContent } = useCMS();
  const { toast } = useToast();
  const [amenitiesContent, setAmenitiesContent] = useState(content.pageContent.amenities);
  const [galleryContent, setGalleryContent] = useState(content.pageContent.gallery);

  const iconOptions = [
    "Heart", "Dumbbell", "Waves", "Activity", "Utensils", "Wine", "Coffee", 
    "Clock", "Car", "Plane", "MapPin", "Users", "Music", "BookOpen"
  ];

  const categoryOptions = ["exterior", "rooms", "amenities"];

  const handleSaveAmenities = () => {
    updatePageContent('amenities', amenitiesContent);
    toast({
      title: "Amenities Content Updated",
      description: "Amenities page content has been saved successfully.",
    });
  };

  const handleSaveGallery = () => {
    updatePageContent('gallery', galleryContent);
    toast({
      title: "Gallery Content Updated",
      description: "Gallery page content has been saved successfully.",
    });
  };

  const addAmenityCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      title: "New Category",
      description: "Category description",
      items: []
    };
    setAmenitiesContent({
      ...amenitiesContent,
      categories: [...amenitiesContent.categories, newCategory]
    });
  };

  const removeAmenityCategory = (categoryId: string) => {
    setAmenitiesContent({
      ...amenitiesContent,
      categories: amenitiesContent.categories.filter(cat => cat.id !== categoryId)
    });
  };

  const updateAmenityCategory = (categoryId: string, field: string, value: string) => {
    setAmenitiesContent({
      ...amenitiesContent,
      categories: amenitiesContent.categories.map(cat =>
        cat.id === categoryId ? { ...cat, [field]: value } : cat
      )
    });
  };

  const addAmenityItem = (categoryId: string) => {
    const newItem = {
      id: Date.now().toString(),
      title: "New Amenity",
      description: "Amenity description",
      icon: "Coffee"
    };
    setAmenitiesContent({
      ...amenitiesContent,
      categories: amenitiesContent.categories.map(cat =>
        cat.id === categoryId 
          ? { ...cat, items: [...cat.items, newItem] }
          : cat
      )
    });
  };

  const removeAmenityItem = (categoryId: string, itemId: string) => {
    setAmenitiesContent({
      ...amenitiesContent,
      categories: amenitiesContent.categories.map(cat =>
        cat.id === categoryId 
          ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
          : cat
      )
    });
  };

  const updateAmenityItem = (categoryId: string, itemId: string, field: string, value: string) => {
    setAmenitiesContent({
      ...amenitiesContent,
      categories: amenitiesContent.categories.map(cat =>
        cat.id === categoryId 
          ? { 
              ...cat, 
              items: cat.items.map(item =>
                item.id === itemId ? { ...item, [field]: value } : item
              )
            }
          : cat
      )
    });
  };

  const addGalleryImage = () => {
    const newImage = {
      id: Date.now().toString(),
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      alt: "New image",
      category: "exterior"
    };
    setGalleryContent({
      ...galleryContent,
      images: [...galleryContent.images, newImage]
    });
  };

  const removeGalleryImage = (imageId: string) => {
    setGalleryContent({
      ...galleryContent,
      images: galleryContent.images.filter(img => img.id !== imageId)
    });
  };

  const updateGalleryImage = (imageId: string, field: string, value: string) => {
    setGalleryContent({
      ...galleryContent,
      images: galleryContent.images.map(img =>
        img.id === imageId ? { ...img, [field]: value } : img
      )
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="amenities">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="amenities">Amenities Page</TabsTrigger>
          <TabsTrigger value="gallery">Gallery Page</TabsTrigger>
        </TabsList>

        <TabsContent value="amenities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Amenities Page Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="amenities-title">Page Title</Label>
                <Input
                  id="amenities-title"
                  value={amenitiesContent.title}
                  onChange={(e) => setAmenitiesContent({ ...amenitiesContent, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="amenities-subtitle">Subtitle</Label>
                <Input
                  id="amenities-subtitle"
                  value={amenitiesContent.subtitle}
                  onChange={(e) => setAmenitiesContent({ ...amenitiesContent, subtitle: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="amenities-description">Description</Label>
                <Textarea
                  id="amenities-description"
                  value={amenitiesContent.description}
                  onChange={(e) => setAmenitiesContent({ ...amenitiesContent, description: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Amenity Categories</CardTitle>
                <Button onClick={addAmenityCategory} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {amenitiesContent.categories.map((category) => (
                <div key={category.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Category: {category.title}</h4>
                    <Button 
                      onClick={() => removeAmenityCategory(category.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Category Title</Label>
                      <Input
                        value={category.title}
                        onChange={(e) => updateAmenityCategory(category.id, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Category Description</Label>
                      <Input
                        value={category.description}
                        onChange={(e) => updateAmenityCategory(category.id, 'description', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Amenity Items</Label>
                      <Button 
                        onClick={() => addAmenityItem(category.id)} 
                        variant="outline" 
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {category.items.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                          <div className="col-span-3">
                            <Input
                              placeholder="Title"
                              value={item.title}
                              onChange={(e) => updateAmenityItem(category.id, item.id, 'title', e.target.value)}
                            />
                          </div>
                          <div className="col-span-4">
                            <Input
                              placeholder="Description"
                              value={item.description}
                              onChange={(e) => updateAmenityItem(category.id, item.id, 'description', e.target.value)}
                            />
                          </div>
                          <div className="col-span-3">
                            <Select 
                              value={item.icon}
                              onValueChange={(value) => updateAmenityItem(category.id, item.id, 'icon', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {iconOptions.map(icon => (
                                  <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-2">
                            <Button
                              onClick={() => removeAmenityItem(category.id, item.id)}
                              variant="destructive"
                              size="sm"
                              className="w-full"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button onClick={handleSaveAmenities} className="w-full">
            Save Amenities Content
          </Button>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gallery Page Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="gallery-title">Page Title</Label>
                <Input
                  id="gallery-title"
                  value={galleryContent.title}
                  onChange={(e) => setGalleryContent({ ...galleryContent, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="gallery-subtitle">Subtitle</Label>
                <Input
                  id="gallery-subtitle"
                  value={galleryContent.subtitle}
                  onChange={(e) => setGalleryContent({ ...galleryContent, subtitle: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Filter: All</Label>
                  <Input
                    value={galleryContent.filters.all}
                    onChange={(e) => setGalleryContent({
                      ...galleryContent,
                      filters: { ...galleryContent.filters, all: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label>Filter: Exterior</Label>
                  <Input
                    value={galleryContent.filters.exterior}
                    onChange={(e) => setGalleryContent({
                      ...galleryContent,
                      filters: { ...galleryContent.filters, exterior: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label>Filter: Rooms</Label>
                  <Input
                    value={galleryContent.filters.rooms}
                    onChange={(e) => setGalleryContent({
                      ...galleryContent,
                      filters: { ...galleryContent.filters, rooms: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label>Filter: Amenities</Label>
                  <Input
                    value={galleryContent.filters.amenities}
                    onChange={(e) => setGalleryContent({
                      ...galleryContent,
                      filters: { ...galleryContent.filters, amenities: e.target.value }
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Gallery Images</CardTitle>
                <Button onClick={addGalleryImage} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {galleryContent.images.map((image) => (
                  <div key={image.id} className="grid grid-cols-12 gap-4 items-center p-4 border rounded">
                    <div className="col-span-2">
                      <img src={image.src} alt={image.alt} className="w-full h-16 object-cover rounded" />
                    </div>
                    <div className="col-span-3">
                      <Input
                        placeholder="Image URL"
                        value={image.src}
                        onChange={(e) => updateGalleryImage(image.id, 'src', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        placeholder="Alt text"
                        value={image.alt}
                        onChange={(e) => updateGalleryImage(image.id, 'alt', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <Select 
                        value={image.category}
                        onValueChange={(value) => updateGalleryImage(image.id, 'category', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-1">
                      <Button
                        onClick={() => removeGalleryImage(image.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSaveGallery} className="w-full">
            Save Gallery Content
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
