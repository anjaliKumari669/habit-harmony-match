
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const MessagesPanel = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default MessagesPanel;
