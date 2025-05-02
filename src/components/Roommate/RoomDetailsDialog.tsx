import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RoomListing } from "@/data/mockData";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";

interface RoomDetailsDialogProps {
  viewRoomId: string | null;
  viewedRoom: RoomListing | undefined;
  onOpenChange: (open: boolean) => void;
}

const RoomDetailsDialog: React.FC<RoomDetailsDialogProps> = ({ viewRoomId, viewedRoom, onOpenChange }) => {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showContactSheet, setShowContactSheet] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleContactHost = () => {
    setShowContactSheet(true);
  };

  const handleSendMessage = () => {
    toast.success("Message sent to host!");
    setShowContactSheet(false);
    setMessage("");
  };

  const handleViewProfile = (userId: string) => {
    onOpenChange(false);
    navigate(`/profile/${userId}`);
    toast.success("Viewing host profile");
  };

  if (!viewedRoom) {
    return null;
  }
  
  // Ensure we have at least 2 images for the room details view
  const defaultImages = [
    "/lovable-uploads/af57e138-9d54-4d23-a21a-9bf49734340c.png", // Prioritize the new uploaded image
    "/lovable-uploads/09a3331e-9b4b-41d9-955d-706f56a17b93.png",
    "/lovable-uploads/d4b8e0f5-15dd-4aeb-8b18-569291289269.png",
    "/lovable-uploads/d40fb71f-91e2-4f5a-91d0-d345503cec59.png",
    "/lovable-uploads/e8fee0da-9972-4c21-8021-aa84bc1cbef3.png",
    "/lovable-uploads/f994b5e0-a644-49f7-905c-db5acde73a52.png"
  ];
  
  // Add images to the viewedRoom if needed with the new uploaded image first
  if (!viewedRoom.images || viewedRoom.images.length === 0) {
    viewedRoom.images = [
      defaultImages[0], // Always use the uploaded image first
      defaultImages[1]
    ];
  } else if (!viewedRoom.images.some(img => img.includes("af57e138-9d54-4d23-a21a-9bf49734340c"))) {
    // Add the new image to the beginning of the array if it's not already there
    viewedRoom.images.unshift("/lovable-uploads/af57e138-9d54-4d23-a21a-9bf49734340c.png");
  }

  return (
    <>
      <Dialog 
        open={!!viewRoomId} 
        onOpenChange={onOpenChange}
      >
        <DialogContent className="max-w-3xl">
          {viewedRoom ? (
            <>
              <DialogHeader>
                <DialogTitle>{viewedRoom.title}</DialogTitle>
                <DialogDescription>{viewedRoom.location}</DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="rounded-md overflow-hidden h-60">
                  <img 
                    src={viewedRoom.images[selectedImageIndex]} 
                    alt={viewedRoom.title}
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                {/* Thumbnails */}
                {viewedRoom.images && viewedRoom.images.length > 1 && (
                  <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                    {viewedRoom.images.map((image, index) => (
                      <div 
                        key={index}
                        className={`cursor-pointer w-16 h-16 rounded-md overflow-hidden border-2 ${
                          selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <img 
                          src={image} 
                          alt={`Room view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-medium">${viewedRoom.price}/month</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Bedrooms:</span>
                        <span>{viewedRoom.bedrooms}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Bathrooms:</span>
                        <span>{viewedRoom.bathrooms}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Available from:</span>
                        <span>{new Date(viewedRoom.availableFrom).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {viewedRoom.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <Checkbox checked={true} disabled className="mr-2" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p>{viewedRoom.description}</p>
                </div>
                
                <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center">
                    <img 
                      src={viewedRoom.postedBy.profileImage || "/lovable-uploads/3ec98b1c-a351-4d55-a626-42acb1dbb41c.png"} 
                      alt={viewedRoom.postedBy.name}
                      className="w-10 h-10 rounded-full mr-3" 
                    />
                    <div>
                      <p className="font-medium">{viewedRoom.postedBy.name}</p>
                      <p className="text-sm text-muted-foreground">Property Host</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleViewProfile(viewedRoom.postedBy.id)}>
                      View Profile
                    </Button>
                    <Button onClick={handleContactHost} className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Contact Host
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p>Room not found</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Contact Sheet */}
      <Sheet open={showContactSheet} onOpenChange={setShowContactSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Contact Host</SheetTitle>
            <SheetDescription>
              Send a message to {viewedRoom?.postedBy.name} about this room
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6">
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                className="w-full min-h-[150px] p-3 border rounded-md"
                placeholder={`Hi ${viewedRoom?.postedBy.name}, I'm interested in your room at ${viewedRoom?.location}...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          
          <SheetFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowContactSheet(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendMessage}>
              Send Message
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default RoomDetailsDialog;
