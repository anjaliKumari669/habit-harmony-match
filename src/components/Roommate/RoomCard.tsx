
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoomListing } from "@/data/mockData";
import { MapPin, DollarSign, Calendar, BedDouble, Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface RoomCardProps {
  room: RoomListing;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const handleViewDetails = () => {
    navigate(`/rooms?view=${room.id}`);
    toast.success(`Viewing details for ${room.title}`);
  };
  
  // Use provided placeholder images or default to our own
  const defaultImages = [
    "/lovable-uploads/09a3331e-9b4b-41d9-955d-706f56a17b93.png",
    "/lovable-uploads/d4b8e0f5-15dd-4aeb-8b18-569291289269.png",
    "/lovable-uploads/d40fb71f-91e2-4f5a-91d0-d345503cec59.png",
    "/lovable-uploads/e8fee0da-9972-4c21-8021-aa84bc1cbef3.png",
    "/lovable-uploads/f994b5e0-a644-49f7-905c-db5acde73a52.png"
  ];
  
  // If room doesn't have images, add our placeholder images
  if (!room.images || room.images.length === 0) {
    room.images = [defaultImages[Math.floor(Math.random() * defaultImages.length)]];
  }
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={room.images[0]} 
          alt={room.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-background/90 px-3 py-1 rounded-full text-sm font-medium">
          <DollarSign className="h-4 w-4 inline-block mr-1" />
          ${room.price}/mo
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{room.title}</h3>
        
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          {room.location}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center text-sm">
            <BedDouble className="h-4 w-4 mr-1 text-primary" />
            {room.bedrooms} {room.bedrooms === 1 ? 'bedroom' : 'bedrooms'}, {room.bathrooms} {room.bathrooms === 1 ? 'bathroom' : 'bathrooms'}
          </div>
          
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-1 text-primary" />
            Available {formatDate(room.availableFrom)}
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-sm line-clamp-2">{room.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <div key={index} className="text-xs bg-muted px-2 py-1 rounded">
              {amenity}
            </div>
          ))}
          {room.amenities.length > 3 && (
            <div className="text-xs bg-muted px-2 py-1 rounded">
              +{room.amenities.length - 3} more
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={room.postedBy.profileImage || "/lovable-uploads/3ec98b1c-a351-4d55-a626-42acb1dbb41c.png"} alt={room.postedBy.name} />
            <AvatarFallback>{room.postedBy.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{room.postedBy.name}</span>
        </div>
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={handleViewDetails}
          className="flex items-center gap-1"
        >
          <Wand2 className="h-4 w-4" />
          <span>View Details</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
