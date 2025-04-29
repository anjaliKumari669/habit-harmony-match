
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { BadgeCheck, Home, MessageSquare, Search, User, FileSpreadsheet } from "lucide-react";
import RoommateCard from "@/components/Roommate/RoommateCard";
import { MOCK_ROOMMATES, MOCK_ROOMS } from "@/data/mockData";
import RoomCard from "@/components/Roommate/RoomCard";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <Button onClick={() => navigate("/matches")} className="hidden sm:flex">
            <Search className="mr-2 h-4 w-4" />
            Find Roommates
          </Button>
        </div>
        
        {/* Banner Image */}
        {user.profileComplete && user.surveyComplete && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
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
        )}
        
        {/* Profile Completion */}
        {(!user.profileComplete || !user.surveyComplete) && (
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
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Top Matches */}
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
                  {topMatches.map((roommate) => (
                    <RoommateCard key={roommate.id} roommate={roommate} />
                  ))}
                  
                  {topMatches.length === 0 && (
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
            
            {/* Featured Rooms */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Featured Rooms</CardTitle>
                  <CardDescription>Available rooms that match your preferences</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/rooms")}>
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                  
                  {featuredRooms.length === 0 && (
                    <div className="text-center py-8 col-span-2">
                      <Home className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <h3 className="text-lg font-medium mb-1">No rooms available</h3>
                      <p className="text-muted-foreground mb-4">
                        Check back later or post your own room listing
                      </p>
                      <Button onClick={() => navigate("/post-room")}>
                        <Home className="mr-2 h-4 w-4" />
                        Post a Room
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Activity & Messages */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Your latest conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <h3 className="text-lg font-medium mb-1">No messages yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start a conversation with your matches
                    </p>
                    <Button onClick={() => navigate("/matches")}>
                      Find Matches
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>Useful resources and actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/post-room")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Post a Room Listing
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Edit Your Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/preferences")}
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Update Preferences
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/messages")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View All Messages
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
