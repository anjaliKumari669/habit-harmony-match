
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import RoommateCard from "@/components/Roommate/RoommateCard";
import RoommateFilters, { RoommateFilterState } from "@/components/Filters/RoommateFilters";
import { MOCK_ROOMMATES } from "@/data/mockData";
import { ArrowDownAZ, ArrowUpAZ, Percent } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const MatchesPage = () => {
  const [roommates, setRoommates] = useState(MOCK_ROOMMATES);
  const [sortBy, setSortBy] = useState("compatibility");
  const [filtersVisible, setFiltersVisible] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const handleFilterChange = (filters: RoommateFilterState) => {
    // In a real app, you'd hit an API with these filters
    // For now, we'll just simulate filtering the mock data
    let filtered = [...MOCK_ROOMMATES];
    
    // Apply filters
    if (filters.minAge || filters.maxAge) {
      filtered = filtered.filter(
        (roommate) => roommate.age >= filters.minAge && roommate.age <= filters.maxAge
      );
    }
    
    if (filters.gender) {
      filtered = filtered.filter(
        (roommate) => roommate.gender === filters.gender
      );
    }
    
    if (filters.cleanliness) {
      filtered = filtered.filter(
        (roommate) => roommate.habits.cleanliness === filters.cleanliness
      );
    }
    
    if (filters.sleepSchedule) {
      filtered = filtered.filter(
        (roommate) => roommate.habits.sleepSchedule === filters.sleepSchedule
      );
    }
    
    if (filters.social) {
      filtered = filtered.filter(
        (roommate) => roommate.habits.social === filters.social
      );
    }
    
    if (filters.nonSmoker) {
      filtered = filtered.filter(
        (roommate) => !roommate.preferences.smoking
      );
    }
    
    if (filters.petFriendly) {
      filtered = filtered.filter(
        (roommate) => roommate.preferences.pets
      );
    }
    
    if (filters.location) {
      filtered = filtered.filter(
        (roommate) => roommate.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    setRoommates(filtered);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sorted = [...roommates];
    
    if (value === "compatibility") {
      sorted.sort((a, b) => b.compatibility - a.compatibility);
    } else if (value === "name_asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "name_desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (value === "age_asc") {
      sorted.sort((a, b) => a.age - b.age);
    } else if (value === "age_desc") {
      sorted.sort((a, b) => b.age - a.age);
    }
    
    setRoommates(sorted);
  };
  
  return (
    <div className="py-8">
      <div className="matchmate-container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Matches</h1>
            <p className="text-muted-foreground mt-1">
              Find your perfect roommate match based on compatibility
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFiltersVisible(!filtersVisible)}
            >
              {filtersVisible ? "Hide Filters" : "Show Filters"}
            </Button>
            <Select
              value={sortBy}
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compatibility">
                  <div className="flex items-center">
                    <Percent className="h-4 w-4 mr-2" />
                    Compatibility
                  </div>
                </SelectItem>
                <SelectItem value="name_asc">
                  <div className="flex items-center">
                    <ArrowDownAZ className="h-4 w-4 mr-2" />
                    Name (A-Z)
                  </div>
                </SelectItem>
                <SelectItem value="name_desc">
                  <div className="flex items-center">
                    <ArrowUpAZ className="h-4 w-4 mr-2" />
                    Name (Z-A)
                  </div>
                </SelectItem>
                <SelectItem value="age_asc">Age (Youngest)</SelectItem>
                <SelectItem value="age_desc">Age (Oldest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          {filtersVisible && (
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <RoommateFilters onFilterChange={handleFilterChange} />
              </div>
            </div>
          )}
          
          {/* Roommate Cards */}
          <div className={`${filtersVisible ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-6`}>
            {roommates.length > 0 ? (
              roommates.map((roommate) => (
                <RoommateCard key={roommate.id} roommate={roommate} />
              ))
            ) : (
              <div className="text-center p-12 bg-card rounded-lg border">
                <h2 className="text-xl font-semibold mb-2">No matches found</h2>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or preferences to see more results
                </p>
                <Button onClick={() => handleFilterChange({
                  minAge: 18,
                  maxAge: 50,
                  gender: null,
                  cleanliness: null,
                  sleepSchedule: null,
                  social: null,
                  petFriendly: false,
                  nonSmoker: false,
                  location: ""
                })}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchesPage;
