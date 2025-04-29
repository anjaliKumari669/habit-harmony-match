
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User } from "@/contexts/AuthContext";

interface DashboardBannerProps {
  user: User;
}

const DashboardBanner = ({ user }: DashboardBannerProps) => {
  const navigate = useNavigate();
  
  if (!user.profileComplete || !user.surveyComplete) return null;
  
  return (
    <div className="mb-8 rounded-lg overflow-hidden">
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705" 
          alt="Find your ideal roommate" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent flex items-center">
          <div className="px-8 py-4 text-white max-w-md">
            <h2 className="text-2xl font-bold mb-2">Find Your Perfect Match</h2>
            <p className="mb-4">Your profile is complete and you're ready to find compatible roommates!</p>
            <Button 
              variant="outline" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => navigate("/matches")}
            >
              Browse Matches
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBanner;
