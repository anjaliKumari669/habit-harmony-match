
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal } from "lucide-react";
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
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export interface RoomFilters {
  minPrice: number;
  maxPrice: number;
  location: string;
  bedrooms: string | null;
  amenities: string[];
}

export const defaultFilters: RoomFilters = {
  minPrice: 500,
  maxPrice: 2000,
  location: "",
  bedrooms: null,
  amenities: [],
};

interface RoomFiltersProps {
  filters: RoomFilters;
  onFilterChange: <K extends keyof RoomFilters>(key: K, value: RoomFilters[K]) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  onAmenityToggle: (amenity: string) => void;
}

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

const RoomFilters: React.FC<RoomFiltersProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
  onAmenityToggle,
}) => {
  return (
    <div className="mb-8 p-4 bg-card rounded-lg border flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by location or description..."
            className="pl-9"
            value={filters.location}
            onChange={(e) => onFilterChange("location", e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Select
          value={filters.bedrooms || ""}
          onValueChange={(value) => onFilterChange("bedrooms", value || null)}
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
                    onFilterChange("minPrice", value[0]);
                    onFilterChange("maxPrice", value[1]);
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
                        onCheckedChange={() => onAmenityToggle(amenity)}
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
                <Button variant="outline" onClick={onResetFilters} className="flex-1">Reset</Button>
                <Button onClick={onApplyFilters} className="flex-1">Apply Filters</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <Button onClick={onApplyFilters}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default RoomFilters;
