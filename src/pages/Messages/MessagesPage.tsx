
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Search, Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { MOCK_ROOMMATES } from "@/data/mockData";
import { toast } from "sonner";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    profileImage: string;
  };
  lastMessage: Message;
  unreadCount: number;
  messages: Message[];
}

const MessagesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  if (!user) {
    navigate("/login");
    return null;
  }

  // Mock conversations with real roommate data and message history
  const [conversations, setConversations] = useState<Conversation[]>(() => 
    MOCK_ROOMMATES.slice(0, 4).map((roommate, index) => {
      const messages: Message[] = [
        {
          id: `msg-${index}-1`,
          senderId: roommate.id,
          receiverId: user.id,
          content: index === 0 ? "Hi! I saw your profile and think we'd be a great match as roommates!" :
                   index === 1 ? "Are you still looking for a roommate? I'd love to chat about the apartment." :
                   index === 2 ? "Thanks for reaching out! When would be a good time to meet?" :
                   "I'm interested in learning more about your living preferences.",
          timestamp: new Date(Date.now() - (index + 1) * 3600000),
          read: index > 1
        }
      ];

      if (index === 0) {
        messages.push({
          id: `msg-${index}-2`,
          senderId: user.id,
          receiverId: roommate.id,
          content: "Hi there! Thanks for reaching out. I'd love to learn more about you.",
          timestamp: new Date(Date.now() - index * 1800000),
          read: true
        });
        messages.push({
          id: `msg-${index}-3`,
          senderId: roommate.id,
          receiverId: user.id,
          content: "Great! I'm a software engineer, clean, and quiet. What about you?",
          timestamp: new Date(Date.now() - index * 900000),
          read: true
        });
      }

      return {
        id: `conv-${roommate.id}`,
        participant: {
          id: roommate.id,
          name: roommate.name,
          profileImage: roommate.profileImage || 
            (index === 0 ? "/lovable-uploads/745351af-c6b7-4e67-af07-529c8876d97b.png" : 
             index === 1 ? "/lovable-uploads/3ec98b1c-a351-4d55-a626-42acb1dbb41c.png" :
             index === 2 ? "/lovable-uploads/d40fb71f-91e2-4f5a-91d0-d345503cec59.png" :
             "/lovable-uploads/3ec98b1c-a351-4d55-a626-42acb1dbb41c.png")
        },
        lastMessage: messages[messages.length - 1],
        unreadCount: index < 2 ? index + 1 : 0,
        messages
      };
    })
  );

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation && selectedConv) {
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        senderId: user.id,
        receiverId: selectedConv.participant.id,
        content: newMessage.trim(),
        timestamp: new Date(),
        read: false
      };

      // Update conversations with new message
      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversation) {
          return {
            ...conv,
            messages: [...conv.messages, newMsg],
            lastMessage: newMsg
          };
        }
        return conv;
      }));

      setNewMessage("");
      toast.success("Message sent!");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="py-8">
      <div className="matchmate-container">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground">Chat with your potential roommates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Conversations
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`w-full p-4 text-left hover:bg-muted/50 transition-colors border-b ${
                      selectedConversation === conversation.id ? 'bg-muted' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.participant.profileImage} />
                        <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{conversation.participant.name}</p>
                          {conversation.unreadCount > 0 && (
                            <Badge variant="default" className="ml-2">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage.content}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
                {filteredConversations.length === 0 && (
                  <div className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No conversations found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2">
            {selectedConv ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedConversation(null)}
                      className="lg:hidden"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConv.participant.profileImage} />
                      <AvatarFallback>{selectedConv.participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedConv.participant.name}</p>
                      <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col h-[450px]">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 p-4">
                    {selectedConv.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.senderId === user.id
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === user.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} size="sm" disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a conversation from the list to start chatting</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
