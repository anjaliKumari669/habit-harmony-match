
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User } from "@/contexts/AuthContext";

interface WelcomeHeaderProps {
  user: User;
}

const WelcomeHeader = ({ user }: WelcomeHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
      <Button onClick={() => navigate("/matches")} className="hidden sm:flex">
        <Search className="mr-2 h-4 w-4" />
        Find Roommates
      </Button>
    </div>
  );
};

export default WelcomeHeader;
