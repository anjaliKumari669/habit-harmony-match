
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { MOCK_ROOMS } from "@/data/mockData";

// Imported Components
import RoomHeader from "@/components/Roommate/RoomHeader";
import RoomFilters, { RoomFilters as RoomFiltersType, defaultFilters } from "@/components/Roommate/RoomFilters";
import RoomList from "@/components/Roommate/RoomList";
import RoomDetailsDialog from "@/components/Roommate/RoomDetailsDialog";

const RoomsPage = () => {
  const [rooms, setRooms] = useState(MOCK_ROOMS);
  const [filters, setFilters] = useState<RoomFiltersType>(defaultFilters);
  const [viewRoomId, setViewRoomId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Check if there's a room ID to view in the URL
    const params = new URLSearchParams(location.search);
    const viewId = params.get('view');
    if (viewId) {
      setViewRoomId(viewId);
    }
  }, [location]);

  if (!user) {
    navigate("/login");
    return null;
  }
  
  const handleFilterChange = <K extends keyof RoomFiltersType>(
    key: K,
    value: RoomFiltersType[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  
  const handleAmenityToggle = (amenity: string) => {
    if (filters.amenities.includes(amenity)) {
      handleFilterChange(
        "amenities", 
        filters.amenities.filter(a => a !== amenity)
      );
    } else {
      handleFilterChange(
        "amenities", 
        [...filters.amenities, amenity]
      );
    }
  };
  
  const applyFilters = () => {
    // In a real app, you'd hit an API with these filters
    // For now, we'll just simulate filtering the mock data
    let filtered = [...MOCK_ROOMS];
    
    // Filter by price
    filtered = filtered.filter(
      (room) => room.price >= filters.minPrice && room.price <= filters.maxPrice
    );
    
    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(
        (room) => room.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Filter by bedrooms
    if (filters.bedrooms) {
      filtered = filtered.filter(
        (room) => room.bedrooms === parseInt(filters.bedrooms)
      );
    }
    
    // Filter by amenities
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((room) => 
        filters.amenities.every(amenity => room.amenities.includes(amenity))
      );
    }
    
    setRooms(filtered);
    toast.success("Filters applied");
  };
  
  const resetFilters = () => {
    setFilters(defaultFilters);
    setRooms(MOCK_ROOMS);
    toast.success("Filters reset");
  };

  const handleFindRoommate = () => {
    navigate("/matches");
    toast.success("Navigating to potential roommates");
  };

  // Find the room being viewed
  const viewedRoom = MOCK_ROOMS.find(room => room.id === viewRoomId);
  
  // Ensure viewedRoom has images - add placeholder if needed
  if (viewedRoom && (!viewedRoom.images || viewedRoom.images.length === 0)) {
    viewedRoom.images = [
      "/lovable-uploads/09a3331e-9b4b-41d9-955d-706f56a17b93.png",
      "/lovable-uploads/d4b8e0f5-15dd-4aeb-8b18-569291289269.png"
    ];
  }
  
  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setViewRoomId(null);
      // Clear the URL parameter
      navigate("/rooms");
    }
  };
  
  return (
    <div className="py-8">
      <div className="matchmate-container">
        <RoomHeader onFindRoommate={handleFindRoommate} />
        
        <RoomFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          onApplyFilters={applyFilters}
          onResetFilters={resetFilters}
          onAmenityToggle={handleAmenityToggle}
        />
        
        <RoomList 
          rooms={rooms}
          onResetFilters={resetFilters}
        />
        
        <RoomDetailsDialog 
          viewRoomId={viewRoomId}
          viewedRoom={viewedRoom}
          onOpenChange={handleDialogOpenChange}
        />
      </div>
    </div>
  );
};

export default RoomsPage;
