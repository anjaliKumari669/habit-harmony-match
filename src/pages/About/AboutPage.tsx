
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 bg-muted/20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-matchmate-teal to-matchmate-violet bg-clip-text text-transparent mb-4">
            About MatchMate
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're revolutionizing how people find compatible roommates based on lifestyle and habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              At MatchMate, we believe that finding the right roommate shouldn't be left to chance. 
              Our mission is to create harmonious living situations by connecting people with compatible 
              lifestyles, habits, and preferences.
            </p>
            <p>
              Using our advanced matching algorithm, we analyze habits, preferences, and lifestyle 
              choices to suggest roommates who are truly compatible with each other.
            </p>
          </div>

          <div>
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
              alt="People living together harmoniously" 
              className="rounded-xl h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Choose MatchMate?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-lg mb-2">Habit-Based Matching</h3>
              <p>We match roommates based on lifestyle habits that matter for day-to-day living.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-lg mb-2">Safe Communication</h3>
              <p>Connect with potential roommates securely through our platform.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-lg mb-2">Verified Profiles</h3>
              <p>All profiles are verified to ensure safety and authenticity.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button onClick={() => navigate("/signup")} size="lg">
            Find Your Perfect Roommate Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
