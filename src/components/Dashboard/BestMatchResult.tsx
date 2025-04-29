
import React from "react";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RoommateCard from "@/components/Roommate/RoommateCard";
import { RoommateProfile } from "@/data/mockData";

interface BestMatchResultProps {
  bestMatch: RoommateProfile | null;
  onClear: () => void;
}

const BestMatchResult = ({ bestMatch, onClear }: BestMatchResultProps) => {
  if (!bestMatch) return null;
  
  return (
    <div className="mb-8">
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-accent" />
                Your Best Match
              </CardTitle>
              <CardDescription>
                Based on your habits and preferences
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={onClear}>
              Find Again
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <RoommateCard roommate={bestMatch} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BestMatchResult;
