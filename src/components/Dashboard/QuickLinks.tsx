
import React from "react";
import { Button } from "@/components/ui/button";
import { Home, User, FileSpreadsheet, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const QuickLinks = () => {
  const navigate = useNavigate();
  
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
  );
};

export default QuickLinks;
