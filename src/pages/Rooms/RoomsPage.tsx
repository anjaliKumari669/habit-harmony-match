
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import RoomCard from "@/components/Roommate/RoomCard";
import { MOCK_ROOMS } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface RoomFilters {
  minPrice: number;
  maxPrice: number;
  location: string;
  bedrooms: string | null;
  amenities: string[];
}

const defaultFilters: RoomFilters = {
  minPrice: 500,
  maxPrice: 2000,
  location: "",
  bedrooms: null,
  amenities: [],
};

const RoomsPage = () => {
  const [rooms, setRooms] = useState(MOCK_ROOMS);
  const [filters, setFilters] = useState<RoomFilters>(defaultFilters);
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
  
  const handleFilterChange = <K extends keyof RoomFilters>(
    key: K,
    value: RoomFilters[K]
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

  const handleContactHost = () => {
    toast.success("Message sent to host!");
    setViewRoomId(null);
    // Clear the URL parameter
    navigate("/rooms");
  };
  
  const amenitiesList = [
    "Wi-Fi", 
    "Parking", 
    "Washer/Dryer", 
    "Air Conditioning", 
    "Gym", 
    "Pool",
    "Security",
    "Pets Allowed"
  ];

  // Find the room being viewed
  const viewedRoom = MOCK_ROOMS.find(room => room.id === viewRoomId);
  
  return (
    <div className="py-8">
      <div className="matchmate-container">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Available Rooms</h1>
            <p className="text-muted-foreground mt-1">
              Find a place to stay that suits your needs
            </p>
          </div>
          <Button 
            className="mt-4 sm:mt-0" 
            onClick={() => navigate("/post-room")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Post a Room
          </Button>
        </div>
        
        <div className="mb-8 p-4 bg-card rounded-lg border flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by location or description..."
                className="pl-9"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              value={filters.bedrooms || ""}
              onValueChange={(value) => handleFilterChange("bedrooms", value || null)}
            >
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Rooms</SheetTitle>
                  <SheetDescription>
                    Adjust the filters to find your perfect room
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div className="space-y-2">
                    <Label>Price Range (${filters.minPrice} - ${filters.maxPrice})</Label>
                    <Slider
                      min={0}
                      max={3000}
                      step={100}
                      value={[filters.minPrice, filters.maxPrice]}
                      onValueChange={(value) => {
                        handleFilterChange("minPrice", value[0]);
                        handleFilterChange("maxPrice", value[1]);
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Amenities</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {amenitiesList.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={`amenity-${amenity}`}
                            checked={filters.amenities.includes(amenity)}
                            onCheckedChange={() => handleAmenityToggle(amenity)}
                          />
                          <label
                            htmlFor={`amenity-${amenity}`}
                            className="text-sm cursor-pointer"
                          >
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={resetFilters} className="flex-1">Reset</Button>
                    <Button onClick={applyFilters} className="flex-1">Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Button onClick={applyFilters}>
              Search
            </Button>
          </div>
        </div>
        
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-card rounded-lg border">
            <h2 className="text-xl font-semibold mb-2">No rooms found</h2>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms to see more results
            </p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        )}

        {/* Room Details Dialog */}
        <Dialog open={!!viewRoomId} onOpenChange={(open) => {
          if (!open) {
            setViewRoomId(null);
            // Clear the URL parameter
            navigate("/rooms");
          }
        }}>
          <DialogContent className="max-w-3xl">
            {viewedRoom ? (
              <>
                <DialogHeader>
                  <DialogTitle>{viewedRoom.title}</DialogTitle>
                  <DialogDescription>{viewedRoom.location}</DialogDescription>
                </DialogHeader>
                
                <div className="mt-4">
                  <div className="rounded-md overflow-hidden h-60">
                    <img 
                      src={viewedRoom.images[0] || "/lovable-uploads/f994b5e0-a644-49f7-905c-db5acde73a52.png"} 
                      alt={viewedRoom.title}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Details</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-medium">${viewedRoom.price}/month</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Bedrooms:</span>
                          <span>{viewedRoom.bedrooms}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Bathrooms:</span>
                          <span>{viewedRoom.bathrooms}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Available from:</span>
                          <span>{new Date(viewedRoom.availableFrom).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {viewedRoom.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center">
                            <Checkbox checked={true} className="mr-2" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p>{viewedRoom.description}</p>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t flex justify-between items-center">
                    <div className="flex items-center">
                      <img 
                        src={viewedRoom.postedBy.profileImage || "/lovable-uploads/3ec98b1c-a351-4d55-a626-42acb1dbb41c.png"} 
                        alt={viewedRoom.postedBy.name}
                        className="w-10 h-10 rounded-full mr-3" 
                      />
                      <div>
                        <p className="font-medium">{viewedRoom.postedBy.name}</p>
                        <p className="text-sm text-muted-foreground">Property Host</p>
                      </div>
                    </div>
                    
                    <Button onClick={handleContactHost}>Contact Host</Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p>Room not found</p>
                </div>
              )}
            </DialogContent>
          </Dialog>
      </div>
    </div>
  );
};

export default RoomsPage;
