
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, Users } from "lucide-react";

interface RoomHeaderProps {
  onFindRoommate: () => void;
}

const RoomHeader: React.FC<RoomHeaderProps> = ({ onFindRoommate }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Available Rooms</h1>
        <p className="text-muted-foreground mt-1">
          Find a place to stay that suits your needs
        </p>
      </div>
      <div className="flex gap-2 mt-4 sm:mt-0">
        <Button 
          variant="outline"
          className="flex items-center gap-2" 
          onClick={onFindRoommate}
        >
          <Users className="h-4 w-4" />
          Find Roommate
        </Button>
        <Button 
          className="flex items-center gap-2" 
          onClick={() => navigate("/post-room")}
        >
          <Plus className="h-4 w-4" />
          Post a Room
        </Button>
      </div>
    </div>
  );
};

export default RoomHeader;
