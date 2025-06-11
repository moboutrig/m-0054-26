import { useState, useMemo } from 'react';
import { useCMS } from "@/contexts/CMSContext";
import RoomCard from "@/components/RoomCard"; // Updated import
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import Head from 'next/head'; // For SEO

// Assuming PageContent.apartments is now PageContent.rooms
// We'll use a more generic title or specific if available
// For this example, I'll use a generic title from uiText if specific one isn't in pageContent.apartments
// const pageSpecificContent = content.pageContent.apartments; // This needs to be checked/updated if used

export default function RoomsPage() { // Renamed component
  const { content, getRoomWithPricing, getFormattedPrice } = useCMS(); // Updated to getRoomWithPricing
  const uiText = content.uiText;
  const pageContent = content.pageContent; // For easier access

  // Initial state for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [guestCapacity, setGuestCapacity] = useState<number | null>(null); // Can be null for "Any"
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]); // Default price range
  const [sortBy, setSortBy] = useState('name-asc');

  const allRoomsWithDetails = useMemo(() => {
    return content.rooms // Updated to content.rooms
      ?.filter(room => room.isActive)
      .map(room => {
        const roomWithPricing = getRoomWithPricing(room.id); // Updated to getRoomWithPricing
        return roomWithPricing;
      })
      .filter(room => room !== null) as (RoomData & { price: number; currency: string })[]; // Type assertion
  }, [content.rooms, getRoomWithPricing]);

  const filteredAndSortedRooms = useMemo(() => {
    if (!allRoomsWithDetails) return [];

    let rooms = [...allRoomsWithDetails];

    // Apply search term filter
    if (searchTerm) {
      rooms = rooms.filter(room => room.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Apply guest capacity filter
    if (guestCapacity !== null && guestCapacity > 0) {
      rooms = rooms.filter(room => room.capacity >= guestCapacity);
    }

    // Apply price range filter
    rooms = rooms.filter(room => room.price >= priceRange[0] && room.price <= priceRange[1]);

    // Apply sorting
    rooms.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        default: return 0;
      }
    });

    return rooms;
  }, [allRoomsWithDetails, searchTerm, guestCapacity, priceRange, sortBy]);

  const pageTitle = pageContent.apartments?.title || "Our Rooms"; // Use a generic fallback or update CMS
  const pageSubtitle = pageContent.apartments?.subtitle || "Find the perfect room for your stay.";

  const clearFilters = () => {
    setSearchTerm('');
    setGuestCapacity(null);
    setPriceRange([0, 1000]); // Reset to default or derive min/max from allRoomsWithDetails
    setSortBy('name-asc');
  };

  // For price slider: determine min/max from available rooms if not fixed
  const minPrice = useMemo(() => allRoomsWithDetails ? Math.min(0, ...allRoomsWithDetails.map(r => r.price)) : 0, [allRoomsWithDetails]);
  const maxPrice = useMemo(() => allRoomsWithDetails ? Math.max(1000, ...allRoomsWithDetails.map(r => r.price)) : 1000, [allRoomsWithDetails]);


  if (!allRoomsWithDetails) {
    return <div>Loading rooms...</div>; // Or some other loading state
  }

  return (
    <>
      <Head>
        <title>{pageTitle} - {content.siteName}</title>
        <meta name="description" content={pageSubtitle} />
      </Head>
      <PageHeader title={pageTitle} description={pageSubtitle} />

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Filters Bar */}
        <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm mb-8 sticky top-16 z-10 border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-muted-foreground mb-1">
                {pageContent.apartments?.filters?.guests || "Search by name"}
              </label>
              <div className="relative">
                <Input
                  id="search"
                  placeholder="Room name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label htmlFor="guests" className="block text-sm font-medium text-muted-foreground mb-1">
                {pageContent.apartments?.filters?.guests || "Guests"}
              </label>
              <Select value={guestCapacity?.toString() || "any"} onValueChange={(val) => setGuestCapacity(val === "any" ? null : parseInt(val))}>
                <SelectTrigger id="guests">
                  <SelectValue placeholder={pageContent.apartments?.filters?.anyGuests || "Any"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">{pageContent.apartments?.filters?.anyGuests || "Any"}</SelectItem>
                  <SelectItem value="1">{pageContent.apartments?.filters?.onePlus || "1+"}</SelectItem>
                  <SelectItem value="2">{pageContent.apartments?.filters?.twoPlus || "2+"}</SelectItem>
                  <SelectItem value="3">{pageContent.apartments?.filters?.threePlus || "3+"}</SelectItem>
                  <SelectItem value="4">{pageContent.apartments?.filters?.fourPlus || "4+"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium text-muted-foreground mb-1">
                {pageContent.apartments?.filters?.priceRange || "Price Range"}: {getFormattedPrice(priceRange[0])} - {getFormattedPrice(priceRange[1])}
              </label>
              <Slider
                id="price"
                min={minPrice}
                max={maxPrice}
                step={10}
                value={priceRange}
                onValueChange={(newRange: [number, number]) => setPriceRange(newRange)}
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-muted-foreground mb-1">Sort by</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={clearFilters} variant="outline" className="sm:col-start-2 lg:col-start-auto">
              <X className="h-4 w-4 mr-2" /> Clear Filters
            </Button>
          </div>
        </div>

        {filteredAndSortedRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredAndSortedRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">No Rooms Found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters or check back later.</p>
          </div>
        )}
      </div>
    </>
  );
}
