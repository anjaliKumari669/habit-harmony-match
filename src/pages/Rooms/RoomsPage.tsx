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
    const params = new URLSearchParams(location.search);
    const viewId = params.get('view');
    if (viewId) {
      setViewRoomId(viewId);
    }
  }, [location]);

  // Set default images if rooms have none
useEffect(() => {
  const updatedRooms = MOCK_ROOMS.map((room, index) => {
    if (!room.images || room.images.length === 0) {
      const fallbackImages = [
        "/lovable-uploads/room1.jpeg",
        "/lovable-uploads/room2.jpeg",
        "/lovable-uploads/room3.jpeg",
        "/lovable-uploads/room4.jpeg"
      ];
      const fallbackImage = fallbackImages[index % fallbackImages.length]; // Rotate images

      return {
        ...room,
        images: [fallbackImage]
      };
    }
    return room;
  });

  setRooms(updatedRooms);
}, []);


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
    let filtered = [...MOCK_ROOMS];

    filtered = filtered.filter(
      (room) => room.price >= filters.minPrice && room.price <= filters.maxPrice
    );

    if (filters.location) {
      filtered = filtered.filter(
        (room) => room.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(
        (room) => room.bedrooms === parseInt(filters.bedrooms)
      );
    }

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

  const viewedRoom = rooms.find(room => room.id === viewRoomId);

  const defaultImages = [
    "/lovable-uploads/room1.jpeg",
    "/lovable-uploads/room2.jpeg",
    "/lovable-uploads/room3.jpeg",
    "/lovable-uploads/room4.jpeg",
    "/lovable-uploads/room1.jpeg",
    "/lovable-uploads/room2.jpeg"
  ];

  if (viewedRoom && (!viewedRoom.images || viewedRoom.images.length === 0)) {
    viewedRoom.images = [defaultImages[0], defaultImages[1]];
  } else if (viewedRoom && !viewedRoom.images.some(img => img.includes("room2"))) {
    viewedRoom.images.unshift("/lovable-uploads/room2.jpeg");
  }

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setViewRoomId(null);
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
