
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { MOCK_ROOMMATES, MOCK_ROOMS, RoomListing } from "@/data/mockData";
import { RoommateProfile } from "@/data/mockData";

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
    navigate("/login");
    return null;
  }
  
  // Show top 3 matches
  const topMatches = MOCK_ROOMMATES.slice(0, 3);
  
  // Get featured rooms
  const featuredRooms = MOCK_ROOMS.slice(0, 2);
  
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
