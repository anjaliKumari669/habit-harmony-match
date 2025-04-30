
import React from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RoomCard from "@/components/Roommate/RoomCard";
import { useNavigate } from "react-router-dom";
import { RoomListing } from "@/data/mockData";

interface FeaturedRoomsProps {
  rooms: RoomListing[];
}

const FeaturedRooms = ({ rooms }: FeaturedRoomsProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Featured Rooms</CardTitle>
          <CardDescription>Available rooms that match your preferences</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate("/rooms")}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={{
              id: room.id,
              title: room.title,
              price: room.price,
              location: room.location,
              description: room.description,
              amenities: room.amenities,
              image: room.images[0] || "/placeholder.svg"
            }} />
          ))}
          
          {rooms.length === 0 && (
            <div className="text-center py-8 col-span-2">
              <Home className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <h3 className="text-lg font-medium mb-1">No rooms available</h3>
              <p className="text-muted-foreground mb-4">
                Check back later or post your own room listing
              </p>
              <Button onClick={() => navigate("/post-room")}>
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
