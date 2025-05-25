
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MOCK_ROOMMATES } from "@/data/mockData";

const MessagesPanel = () => {
  const navigate = useNavigate();
  
  const handleViewMessages = () => {
    navigate("/messages");
    toast.success("Opening your messages");
  };
  
  // Show recent conversations with actual roommate data
  const recentConversations = MOCK_ROOMMATES.slice(0, 2).map((roommate, index) => ({
    id: roommate.id,
    name: roommate.name,
    profileImage: roommate.profileImage || 
      (index === 0 ? "/lovable-uploads/745351af-c6b7-4e67-af07-529c8876d97b.png" : 
       "/lovable-uploads/3ec98b1c-a351-4d55-a626-42acb1dbb41c.png"),
    lastMessage: index === 0 ? 
      "Hi! I think we'd be a great match as roommates!" :
      "Are you still looking for a roommate?",
    timestamp: new Date(Date.now() - (index + 1) * 3600000),
    unread: index === 0
  }));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
        <CardDescription>Your latest conversations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentConversations.map((conversation) => (
            <div 
              key={conversation.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={handleViewMessages}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={conversation.profileImage} alt={conversation.name} />
                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{conversation.name}</p>
                  {conversation.unread && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {conversation.lastMessage}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {conversation.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          <div className="pt-4">
            <Button onClick={handleViewMessages} className="w-full" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              View All Messages
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagesPanel;
