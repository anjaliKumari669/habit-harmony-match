
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MessagesPanel = () => {
  const navigate = useNavigate();
  
  const handleFindMatches = () => {
    navigate("/matches");
    toast.success("Let's find you some great roommates!");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
        <CardDescription>Your latest conversations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center py-8">
            <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <img 
                src="/lovable-uploads/3ec98b1c-a351-4d55-a626-42acb1dbb41c.png" 
                alt="Messages" 
                className="h-20 w-20 object-cover rounded-full"
              />
            </div>
            <h3 className="text-lg font-medium mb-1">No messages yet</h3>
            <p className="text-muted-foreground mb-4">
              Start a conversation with your matches
            </p>
            <Button onClick={handleFindMatches}>
              Find Matches
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagesPanel;
