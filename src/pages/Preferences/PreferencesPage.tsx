
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PreferencesSurvey from "@/components/Survey/PreferencesSurvey";
import { toast } from "sonner";

const PreferencesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = (data: any) => {
    console.log("Preferences updated:", data);
    toast.success("Preferences updated successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="matchmate-container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Update Preferences</h1>
              <p className="text-muted-foreground mt-2">
                Update your roommate preferences to find better matches
              </p>
            </div>
          </div>

          <PreferencesSurvey onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default PreferencesPage;
