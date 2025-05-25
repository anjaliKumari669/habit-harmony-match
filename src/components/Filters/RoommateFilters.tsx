
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface RoommateFiltersProps {
  onFilterChange: (filters: RoommateFilterState) => void;
}

const RoommateFilters: React.FC<RoommateFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<RoommateFilterState>({
    minAge: 18,
    maxAge: 50,
    gender: null,
    cleanliness: null,
    sleepSchedule: null,
    social: null,
    petFriendly: false,
    nonSmoker: false,
    location: ""
  });

  const updateFilters = (newFilters: Partial<RoommateFilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters: RoommateFilterState = {
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
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Age Range */}
        <div className="space-y-2">
          <Label>Age Range: {filters.minAge} - {filters.maxAge}</Label>
          <Slider
            value={[filters.minAge, filters.maxAge]}
            onValueChange={([min, max]) => updateFilters({ minAge: min, maxAge: max })}
            max={65}
            min={18}
            step={1}
            className="w-full"
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label>Gender</Label>
          <Select
            value={filters.gender || "any"}
            onValueChange={(value) => updateFilters({ gender: value === "any" ? null : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any gender</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Non-binary">Non-binary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cleanliness */}
        <div className="space-y-2">
          <Label>Cleanliness</Label>
          <Select
            value={filters.cleanliness || "any"}
            onValueChange={(value) => updateFilters({ cleanliness: value === "any" ? null : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any level</SelectItem>
              <SelectItem value="neat">Very clean</SelectItem>
              <SelectItem value="moderate">Moderately clean</SelectItem>
              <SelectItem value="messy">Relaxed about mess</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sleep Schedule */}
        <div className="space-y-2">
          <Label>Sleep Schedule</Label>
          <Select
            value={filters.sleepSchedule || "any"}
            onValueChange={(value) => updateFilters({ sleepSchedule: value === "any" ? null : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any schedule</SelectItem>
              <SelectItem value="early">Early bird</SelectItem>
              <SelectItem value="normal">Normal hours</SelectItem>
              <SelectItem value="late">Night owl</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Social Preference */}
        <div className="space-y-2">
          <Label>Social Style</Label>
          <Select
            value={filters.social || "any"}
            onValueChange={(value) => updateFilters({ social: value === "any" ? null : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any style</SelectItem>
              <SelectItem value="introvert">Quiet/Introvert</SelectItem>
              <SelectItem value="balanced">Balanced</SelectItem>
              <SelectItem value="extrovert">Social/Extrovert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            placeholder="Enter preferred area..."
            value={filters.location}
            onChange={(e) => updateFilters({ location: e.target.value })}
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="petFriendly"
              checked={filters.petFriendly}
              onCheckedChange={(checked) => updateFilters({ petFriendly: !!checked })}
            />
            <Label htmlFor="petFriendly">Pet-friendly</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="nonSmoker"
              checked={filters.nonSmoker}
              onCheckedChange={(checked) => updateFilters({ nonSmoker: !!checked })}
            />
            <Label htmlFor="nonSmoker">Non-smoker only</Label>
          </div>
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoommateFilters;
