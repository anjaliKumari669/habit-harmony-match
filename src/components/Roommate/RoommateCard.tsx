
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RoommateProfile } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RoommateCardProps {
  roommate: RoommateProfile;
  showActions?: boolean;
}

const RoommateCard: React.FC<RoommateCardProps> = ({ roommate, showActions = true }) => {
  const navigate = useNavigate();
  
  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-orange-600";
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-yellow-600";
    return "bg-orange-600";
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={roommate.profileImage} alt={roommate.name} />
              <AvatarFallback className="text-xl">{roommate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-lg">{roommate.name}</h3>
              <p className="text-muted-foreground text-sm">{roommate.age} • {roommate.gender} • {roommate.location}</p>
              
              <div className="mt-3 flex items-center justify-center sm:justify-start gap-2">
                <div className={`font-semibold ${getCompatibilityColor(roommate.compatibility)}`}>
                  {roommate.compatibility}%
                </div>
                <Progress 
                  value={roommate.compatibility} 
                  className="w-24 h-2"
                  style={{ backgroundColor: getProgressColor(roommate.compatibility) }}
                />
                <span className="text-sm text-muted-foreground">match</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm line-clamp-3">{roommate.bio}</p>
          </div>
          
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div className="bg-muted rounded-md p-2 text-xs">
              <span className="block text-muted-foreground">Sleep</span>
              <span className="font-medium capitalize">{roommate.habits.sleepSchedule}</span>
            </div>
            <div className="bg-muted rounded-md p-2 text-xs">
              <span className="block text-muted-foreground">Cleanliness</span>
              <span className="font-medium capitalize">{roommate.habits.cleanliness}</span>
            </div>
            <div className="bg-muted rounded-md p-2 text-xs">
              <span className="block text-muted-foreground">Social</span>
              <span className="font-medium capitalize">{roommate.habits.social}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="flex justify-between bg-muted/50 p-3 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(`/roommate/${roommate.id}`)}
          >
            <User className="h-4 w-4 mr-1" /> View Profile
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={() => navigate('/contact')}
          >
            <MessageSquare className="h-4 w-4 mr-1" /> Contact
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default RoommateCard;
