
import React from "react";
import RoomCard from "@/components/Roommate/RoomCard";
import { Button } from "@/components/ui/button";
import { RoomListing } from "@/data/mockData";

interface RoomListProps {
  rooms: RoomListing[];
  onResetFilters: () => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, onResetFilters }) => {
  if (rooms.length === 0) {
    return (
      <div className="text-center p-12 bg-card rounded-lg border">
        <h2 className="text-xl font-semibold mb-2">No rooms found</h2>
        <p className="text-muted-foreground mb-4">
          Try adjusting your filters or search terms to see more results
        </p>
        <Button onClick={onResetFilters}>Reset Filters</Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomList;
