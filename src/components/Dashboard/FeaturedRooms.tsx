
import React from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RoomCard from "@/components/Roommate/RoomCard";
import { useNavigate } from "react-router-dom";
import { RoomListing } from "@/data/mockData";
import { toast } from "sonner";

interface FeaturedRoomsProps {
  rooms: RoomListing[];
}

const FeaturedRooms = ({ rooms }: FeaturedRoomsProps) => {
  const navigate = useNavigate();
  
  const handleViewAll = () => {
    navigate("/rooms");
    toast.success("Navigating to all available rooms");
  };
  
  const handlePostRoom = () => {
    navigate("/post-room");
    toast.success("Let's post your room listing");
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Featured Rooms</CardTitle>
          <CardDescription>Available rooms that match your preferences</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleViewAll}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rooms && rooms.length > 0 ? rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          )) : (
            <div className="text-center py-8 col-span-2">
              <div className="h-32 w-32 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <img 
                  src="/lovable-uploads/3ec98b1c-a351-4d55-a626-42acb1dbb41c.png" 
                  alt="Featured room"
                  className="h-24 w-24 object-cover rounded-full"
                />
              </div>
              <h3 className="text-lg font-medium mb-1">No rooms available</h3>
              <p className="text-muted-foreground mb-4">
                Check back later or post your own room listing
              </p>
              <Button onClick={handlePostRoom}>
                <Home className="mr-2 h-4 w-4" />
                Post a Room
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedRooms;
