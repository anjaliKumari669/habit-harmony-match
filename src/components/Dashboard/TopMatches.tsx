
import React from "react";
import { Button } from "@/components/ui/button";
import { User, FileSpreadsheet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RoommateCard from "@/components/Roommate/RoommateCard";
import { useNavigate } from "react-router-dom";
import { RoommateProfile } from "@/data/mockData";

interface TopMatchesProps {
  matches: RoommateProfile[];
}

const TopMatches = ({ matches }: TopMatchesProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Your Top Matches</CardTitle>
          <CardDescription>Potential roommates who match your preferences</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate("/matches")}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.map((roommate) => (
            <RoommateCard key={roommate.id} roommate={roommate} />
          ))}
          
          {matches.length === 0 && (
            <div className="text-center py-8">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <h3 className="text-lg font-medium mb-1">No matches yet</h3>
              <p className="text-muted-foreground mb-4">
                Complete your profile and preferences survey to get matched
              </p>
              <Button onClick={() => navigate("/preferences-survey")}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Take Survey
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopMatches;
