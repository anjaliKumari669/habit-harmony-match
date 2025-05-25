
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { MOCK_ROOMMATES, MOCK_ROOMS } from "@/data/mockData";
import { RoommateProfile } from "@/data/mockData";
import { toast } from "sonner";

// Dashboard Components
import WelcomeHeader from "@/components/Dashboard/WelcomeHeader";
import DashboardBanner from "@/components/Dashboard/DashboardBanner";
import ProfileCompletion from "@/components/Dashboard/ProfileCompletion";
import BestMatchFinder from "@/components/Dashboard/BestMatchFinder";
import BestMatchResult from "@/components/Dashboard/BestMatchResult";
import TopMatches from "@/components/Dashboard/TopMatches";
import FeaturedRooms from "@/components/Dashboard/FeaturedRooms";
import MessagesPanel from "@/components/Dashboard/MessagesPanel";
import QuickLinks from "@/components/Dashboard/QuickLinks";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bestMatch, setBestMatch] = useState<RoommateProfile | null>(null);
  
  if (!user) {
    toast.error("Please login to access the dashboard");
    navigate("/login");
    return null;
  }
  
  // Show top 3 matches with proper profile images
  const topMatches = MOCK_ROOMMATES.slice(0, 3).map((roommate, index) => ({
    ...roommate,
    profileImage: roommate.profileImage || 
      (index === 0 ? "/lovable-uploads/745351af-c6b7-4e67-af07-529c8876d97b.png" : 
       index === 1 ? "/lovable-uploads/3ec98b1c-a351-4d55-a626-42acb1dbb41c.png" :
       "/lovable-uploads/d40fb71f-91e2-4f5a-91d0-d345503cec59.png")
  }));
  
  // Get featured rooms with fallback images
  const featuredRooms = MOCK_ROOMS.slice(0, 2).map(room => ({
    ...room,
    images: room.images && room.images.length > 0 
      ? room.images 
      : ["/lovable-uploads/f994b5e0-a644-49f7-905c-db5acde73a52.png"],
    postedBy: {
      ...room.postedBy,
      profileImage: room.postedBy.profileImage || "/lovable-uploads/3ec98b1c-a351-4d55-a626-42acb1dbb41c.png"
    }
  }));
  
  return (
    <div className="py-8">
      <div className="matchmate-container">
        <WelcomeHeader user={user} />
        
        {/* Banner Image */}
        <DashboardBanner user={user} />
        
        {/* Profile Completion */}
        <ProfileCompletion user={user} />
        
        {/* Best Match Feature */}
        {user.profileComplete && user.surveyComplete && !bestMatch && (
          <BestMatchFinder 
            user={user} 
            onFindBestMatch={(match) => setBestMatch(match)} 
          />
        )}
        
        {/* Best Match Result */}
        <BestMatchResult 
          bestMatch={bestMatch} 
          onClear={() => setBestMatch(null)} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Top Matches */}
            <TopMatches matches={topMatches} />
            
            {/* Featured Rooms */}
            <FeaturedRooms rooms={featuredRooms} />
          </div>
          
          {/* Activity & Messages */}
          <div className="space-y-6">
            <MessagesPanel />
            <QuickLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
