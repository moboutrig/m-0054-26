import { useCMS } from "@/contexts/CMSContext";
import SectionWrapper from "./SectionWrapper";
import RoomCard from "../RoomCard"; // Updated import
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedRoomsSection() { // Renamed component
  const { content, getRoomWithPricing } = useCMS(); // Updated to getRoomWithPricing
  const uiText = content.uiText;

  // Get active rooms, sort by order, then take top 3 or as specified
  const featuredRooms = content.rooms // Updated to content.rooms
    ?.filter(room => room.isActive)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3) // Show top 3 featured rooms for example
    .map(room => {
      const roomWithPricing = getRoomWithPricing(room.id); // Updated to getRoomWithPricing
      // Ensure getRoomWithPricing returns a compatible structure for RoomCardProps
      // It should return RoomData & { price: number; currency: string }
      return roomWithPricing;
    })
    .filter(room => room !== null); // Filter out nulls if a room wasn't found (should not happen if ID is from content.rooms)

  if (!featuredRooms || featuredRooms.length === 0) {
    return null; // Don't render section if no featured rooms
  }

  return (
    <SectionWrapper
      title={content.featuredRoomsTitle || "Our Featured Rooms"} // Updated CMS key
      description={content.featuredRoomsDescription || "Discover our most popular and highly-rated rooms."} // Updated CMS key
      className="py-12 lg:py-20 bg-background"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {featuredRooms.map((roomWithDetails) => {
          if (!roomWithDetails) return null; // Should be filtered already, but as a safeguard
          return <RoomCard key={roomWithDetails.id} room={roomWithDetails} />; // Pass the whole object
        })}
      </div>

      {content.rooms && content.rooms.length > 3 && (
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/rooms">
              {uiText.buttons.viewDetails || "View All Rooms"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
}
