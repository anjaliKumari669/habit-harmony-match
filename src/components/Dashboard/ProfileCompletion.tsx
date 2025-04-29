
import React from "react";
import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User } from "@/contexts/AuthContext";

interface ProfileCompletionProps {
  user: User;
}

const ProfileCompletion = ({ user }: ProfileCompletionProps) => {
  const navigate = useNavigate();
  
  if (user.profileComplete && user.surveyComplete) return null;
  
  return (
    <div className="mb-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <BadgeCheck className="mr-2 h-5 w-5 text-primary" />
        Complete Your Profile
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start">
          <div className={`rounded-full h-6 w-6 mt-0.5 flex items-center justify-center ${user.profileComplete ? 'bg-green-500' : 'bg-muted border'}`}>
            <span className={`text-sm ${user.profileComplete ? 'text-white' : 'text-muted-foreground'}`}>1</span>
          </div>
          <div className="ml-3">
            <h3 className="font-medium">Personal Profile</h3>
            <p className="text-sm text-muted-foreground mb-2">Tell us about yourself to help find your perfect match</p>
            <Button 
              variant={user.profileComplete ? "outline" : "default"} 
              size="sm"
              onClick={() => navigate("/create-profile")}
            >
              {user.profileComplete ? "Edit Profile" : "Create Profile"}
            </Button>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className={`rounded-full h-6 w-6 mt-0.5 flex items-center justify-center ${user.surveyComplete ? 'bg-green-500' : 'bg-muted border'}`}>
            <span className={`text-sm ${user.surveyComplete ? 'text-white' : 'text-muted-foreground'}`}>2</span>
          </div>
          <div className="ml-3">
            <h3 className="font-medium">Preferences Survey</h3>
            <p className="text-sm text-muted-foreground mb-2">Complete the survey to find compatible roommates</p>
            <Button 
              variant={user.surveyComplete ? "outline" : "default"} 
              size="sm"
              onClick={() => navigate("/preferences-survey")}
            >
              {user.surveyComplete ? "Update Preferences" : "Take Survey"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
