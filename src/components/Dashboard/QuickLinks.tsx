
import React from "react";
import { Button } from "@/components/ui/button";
import { Home, User, FileSpreadsheet, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const QuickLinks = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string, message: string) => {
    navigate(path);
    toast.success(message);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
        <CardDescription>Useful resources and actions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => handleNavigation("/post-room", "Create a new room listing")}
        >
          <Home className="mr-2 h-4 w-4" />
          Post a Room Listing
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => handleNavigation("/profile", "Edit your profile information")}
        >
          <User className="mr-2 h-4 w-4" />
          Edit Your Profile
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => handleNavigation("/preferences", "Update your roommate preferences")}
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Update Preferences
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => handleNavigation("/messages", "View your messages")}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          View All Messages
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickLinks;
