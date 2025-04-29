
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, FileSpreadsheet, MessageCircle, User } from "lucide-react";

const HowItWorksPage = () => {
  const navigate = useNavigate();

  const steps = [
    {
      title: "Create Your Profile",
      description: "Sign up and complete your profile with personal details and preferences.",
      icon: <User className="h-8 w-8 text-primary" />,
    },
    {
      title: "Share Your Habits",
      description: "Tell us about your lifestyle habits and what you're looking for in a roommate.",
      icon: <FileSpreadsheet className="h-8 w-8 text-primary" />,
    },
    {
      title: "Get Matched",
      description: "Our algorithm will match you with compatible roommates based on your preferences.",
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
    },
    {
      title: "Connect",
      description: "Message your matches and find the perfect roommate match for your living situation.",
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-muted/20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-matchmate-teal to-matchmate-violet bg-clip-text text-transparent mb-4">
            How MatchMate Works
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Finding your perfect roommate is simple with our easy-to-follow process.
          </p>
        </div>

        <div className="mb-16">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block"></div>
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className={`md:w-1/2 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                      <div className="bg-white p-6 rounded-xl shadow-sm border mb-6 md:mb-0 md:mx-4">
                        <div className="md:hidden flex justify-center mb-4">{step.icon}</div>
                        <h2 className="text-xl font-bold mb-2">{step.title}</h2>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-primary/20 z-10">
                      <span className="text-lg font-bold">{index + 1}</span>
                    </div>
                    <div className="hidden md:block md:w-1/2">{step.icon}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Matching Algorithm</h2>
              <p className="mb-4">
                MatchMate uses a sophisticated algorithm that analyzes over 20 different 
                lifestyle factors and habits to find your most compatible roommate matches.
              </p>
              <p>
                From sleep schedules to cleaning habits, social preferences to noise tolerance, 
                we consider all the factors that make for a harmonious living situation.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
                alt="Modern living room" 
                className="rounded-xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button onClick={() => navigate("/signup")} size="lg">
            Start Finding Roommates
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
