
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    location: "",
    occupation: "",
    bio: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.age || !formData.gender || !formData.location) {
      toast.error("Please fill out all required fields");
      setIsSubmitting(false);
      return;
    }
    
    // In a real app, you would upload the user profile data to the server
    setTimeout(() => {
      updateUser({ profileComplete: true });
      toast.success("Profile created successfully!");
      navigate("/preferences-survey");
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen py-12">
      <div className="matchmate-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Create Your Profile</h1>
            <p className="text-muted-foreground mt-2">
              Let's set up your profile to help you find your perfect roommate match
            </p>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  This information will be shown to potential roommate matches
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/3 space-y-2">
                    <Label htmlFor="age">Age*</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="Your age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="18"
                      max="120"
                    />
                  </div>
                  
                  <div className="w-full md:w-2/3 space-y-2">
                    <Label htmlFor="gender">Gender*</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleSelectChange("gender", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Non-binary">Non-binary</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location*</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="City, Neighborhood, etc."
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    name="occupation"
                    placeholder="Student, Professional, etc."
                    value={formData.occupation}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell potential roommates a bit about yourself..."
                    value={formData.bio}
                    onChange={handleChange}
                    className="min-h-[120px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Profile Picture</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground text-center">
                      Drag & drop or click to upload your profile picture
                    </p>
                    <span className="mt-2 text-xs text-muted-foreground">
                      Supports JPG, PNG - Max 5MB
                    </span>
                    <Button variant="outline" className="mt-4" size="sm" type="button">
                      Select File
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => navigate("/")}
                >
                  Skip for Now
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save & Continue"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
