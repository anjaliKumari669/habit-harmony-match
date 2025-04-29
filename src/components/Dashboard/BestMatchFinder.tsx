
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { User } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { RoommateProfile, MOCK_ROOMMATES } from "@/data/mockData";

interface BestMatchFinderProps {
  user: User;
  onFindBestMatch: (bestMatch: RoommateProfile | null) => void;
}

const BestMatchFinder = ({ user, onFindBestMatch }: BestMatchFinderProps) => {
  const [isSearching, setIsSearching] = useState(false);
  
  if (!user.profileComplete || !user.surveyComplete) return null;
  
  const findBestMatch = () => {
    setIsSearching(true);
    
    // Simulate searching process
    setTimeout(() => {
      // Find roommate with highest compatibility
      const bestRoommate = [...MOCK_ROOMMATES].sort((a, b) => b.compatibility - a.compatibility)[0];
      onFindBestMatch(bestRoommate);
      setIsSearching(false);
      toast.success("Found your best roommate match!");
    }, 2000);
  };
  
  return (
    <div className="mb-8 p-6 bg-accent/5 border border-accent/20 rounded-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-semibold flex items-center">
            <Award className="mr-2 h-5 w-5 text-accent" />
            Find Your Best Roommate Match
          </h2>
          <p className="text-muted-foreground">
            Let our algorithm find your ideal roommate based on your preferences and habits
          </p>
        </div>
        <Button 
          onClick={findBestMatch} 
          disabled={isSearching}
          className="min-w-[150px]"
        >
          {isSearching ? (
            <>
              <div className="mr-2 h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
              Searching...
            </>
          ) : (
            <>Find Best Match</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BestMatchFinder;
