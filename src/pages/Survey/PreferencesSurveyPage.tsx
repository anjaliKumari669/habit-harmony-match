
import React from "react";
import PreferencesSurvey from "@/components/Survey/PreferencesSurvey";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { RoommatePreferences } from "@/data/mockData";

const PreferencesSurveyPage = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  
  const handleSurveySubmit = (preferences: RoommatePreferences) => {
    // In a real app, you would send this data to your backend
    console.log("Survey preferences:", preferences);
    
    // Update user state to indicate survey is complete
    updateUser({ surveyComplete: true });
    
    // Redirect to dashboard
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen py-12 bg-muted/20">
      <div className="matchmate-container">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold">Roommate Preferences Survey</h1>
          <p className="text-muted-foreground mt-2">
            Help us find your perfect roommate match by telling us about your habits and preferences
          </p>
        </div>
        
        <PreferencesSurvey onSubmit={handleSurveySubmit} />
      </div>
    </div>
  );
};

export default PreferencesSurveyPage;
