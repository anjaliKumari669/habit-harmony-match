
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterX, Sliders } from "lucide-react";

interface RoommateFiltersProps {
  onFilterChange: (filters: RoommateFilterState) => void;
}

export interface RoommateFilterState {
  minAge: number;
  maxAge: number;
  gender: string | null;
  cleanliness: string | null;
  sleepSchedule: string | null;
  social: string | null;
  petFriendly: boolean;
  nonSmoker: boolean;
  location: string;
}

const defaultFilterState: RoommateFilterState = {
  minAge: 18,
  maxAge: 50,
  gender: null,
  cleanliness: null,
  sleepSchedule: null,
  social: null,
  petFriendly: false,
  nonSmoker: false,
  location: ""
};

const RoommateFilters: React.FC<RoommateFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<RoommateFilterState>(defaultFilterState);
  const [expanded, setExpanded] = useState(false);
  
  const handleFilterChange = <K extends keyof RoommateFilterState>(
    key: K,
    value: RoommateFilterState[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const resetFilters = () => {
    setFilters(defaultFilterState);
    onFilterChange(defaultFilterState);
  };
  
  return (
    <div className="bg-card rounded-lg shadow-sm border p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold flex items-center">
          <Sliders className="h-4 w-4 mr-2" /> Filters
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 text-xs"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Show More"}
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label>Age Range</Label>
          <div className="flex items-center justify-between mt-1 mb-2">
            <span className="text-sm">{filters.minAge}</span>
            <span className="text-sm">{filters.maxAge}</span>
          </div>
          <Slider
            defaultValue={[filters.minAge, filters.maxAge]}
            min={18}
            max={80}
            step={1}
            onValueChange={(value) => {
              handleFilterChange("minAge", value[0]);
              handleFilterChange("maxAge", value[1]);
            }}
          />
        </div>
        
        <div>
          <Label>Location</Label>
          <Input
            placeholder="Enter location..."
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label>Gender</Label>
          <Select
            value={filters.gender || ""}
            onValueChange={(value) => handleFilterChange("gender", value || null)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Non-binary">Non-binary</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {expanded && (
          <>
            <div>
              <Label>Cleanliness</Label>
              <RadioGroup
                value={filters.cleanliness || ""}
                onValueChange={(value) => handleFilterChange("cleanliness", value || null)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="neat" id="neat" />
                  <Label htmlFor="neat" className="cursor-pointer">Neat</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate" className="cursor-pointer">Moderate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="messy" id="messy" />
                  <Label htmlFor="messy" className="cursor-pointer">Messy</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label>Sleep Schedule</Label>
              <RadioGroup
                value={filters.sleepSchedule || ""}
                onValueChange={(value) => handleFilterChange("sleepSchedule", value || null)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="early" id="early" />
                  <Label htmlFor="early" className="cursor-pointer">Early</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="cursor-pointer">Normal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="late" id="late" />
                  <Label htmlFor="late" className="cursor-pointer">Late</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label>Social Style</Label>
              <RadioGroup
                value={filters.social || ""}
                onValueChange={(value) => handleFilterChange("social", value || null)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="introvert" id="introvert" />
                  <Label htmlFor="introvert" className="cursor-pointer">Introvert</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="balanced" id="balanced" />
                  <Label htmlFor="balanced" className="cursor-pointer">Balanced</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="extrovert" id="extrovert" />
                  <Label htmlFor="extrovert" className="cursor-pointer">Extrovert</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pet-friendly"
                  checked={filters.petFriendly}
                  onCheckedChange={(checked) => 
                    handleFilterChange("petFriendly", checked === true)
                  }
                />
                <Label htmlFor="pet-friendly" className="cursor-pointer">Pet Friendly</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="non-smoker"
                  checked={filters.nonSmoker}
                  onCheckedChange={(checked) => 
                    handleFilterChange("nonSmoker", checked === true)
                  }
                />
                <Label htmlFor="non-smoker" className="cursor-pointer">Non-Smoker</Label>
              </div>
            </div>
          </>
        )}
        
        <Button 
          variant="outline" 
          className="w-full text-sm" 
          onClick={resetFilters}
        >
          <FilterX className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default RoommateFilters;
