
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle, Heart, Home, Users, BarChart } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24">
        <div className="matchmate-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Find Your Perfect <span className="bg-gradient-to-r from-matchmate-teal to-matchmate-violet bg-clip-text text-transparent">Roommate Match</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Connect with compatible roommates based on lifestyle habits, preferences, and personality. 
                Enjoy a harmonious living environment with someone you'll actually get along with.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                {user ? (
                  <Link to="/dashboard">
                    <Button size="lg" className="primary-gradient border-none">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button size="lg" className="primary-gradient border-none">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/how-it-works">
                      <Button variant="outline" size="lg">
                        How It Works
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border-8 border-white shadow-xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1600607686527-6fb886090705" 
                  alt="Happy roommates" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-full z-0 animate-float"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full z-0 animate-float"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="matchmate-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How MatchMate Works</h2>
            <p className="text-muted-foreground">
              Our intelligent matching algorithm helps you find the perfect roommate in just a few steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Users size={32} className="text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Sign up and create your detailed profile with your personal information and roommate preferences.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
              <div className="bg-secondary/10 p-4 rounded-full mb-4">
                <CheckCircle size={32} className="text-secondary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Take the Compatibility Survey</h3>
              <p className="text-muted-foreground">
                Answer questions about your habits, lifestyle, and preferences to help us find your ideal matches.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-sm border flex flex-col items-center text-center">
              <div className="bg-accent/10 p-4 rounded-full mb-4">
                <Heart size={32} className="text-accent" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Get Matched</h3>
              <p className="text-muted-foreground">
                Browse your personalized matches, connect with potential roommates, and find your perfect living situation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Highlight */}
      <section className="py-16 bg-muted/50">
        <div className="matchmate-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/placeholder.svg" 
                alt="MatchMate features" 
                className="rounded-xl shadow-lg border-8 border-white"
              />
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Find Roommates Who Match Your Lifestyle</h2>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-2 rounded-full h-fit">
                    <CheckCircle size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Detailed Compatibility Matching</h3>
                    <p className="text-muted-foreground">Our algorithm analyzes over 15 lifestyle factors to ensure you find a truly compatible roommate.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-2 rounded-full h-fit">
                    <Home size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Room Listings & Search</h3>
                    <p className="text-muted-foreground">Browse available rooms or list your own space to find the perfect living arrangement.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-2 rounded-full h-fit">
                    <BarChart size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Match Percentage Scoring</h3>
                    <p className="text-muted-foreground">See exactly how compatible you are with potential roommates at a glance.</p>
                  </div>
                </div>
              </div>
              
              <Link to="/signup">
                <Button size="lg" className="primary-gradient border-none">
                  Find Your Match
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="matchmate-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground">
              Thousands of people have found their perfect roommate match with MatchMate
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                    <img src="/placeholder.svg" alt="User" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Jamie R.</h4>
                  <p className="text-sm text-muted-foreground">Student</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I was worried about finding a roommate who would respect my study schedule. MatchMate connected me with someone who has similar habits, and we get along great!"
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                    <img src="/placeholder.svg" alt="User" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Taylor M.</h4>
                  <p className="text-sm text-muted-foreground">Professional</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "After a series of bad roommate experiences, I tried MatchMate. The compatibility matching really works - my new roommate and I have become great friends!"
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                    <img src="/placeholder.svg" alt="User" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Alex T.</h4>
                  <p className="text-sm text-muted-foreground">Entrepreneur</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I found both a room and a roommate through MatchMate. The lifestyle matching made sure we were compatible, and I've never had a better living situation!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 primary-gradient">
        <div className="matchmate-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Find Your Perfect Roommate Match?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who have found their ideal living situation through our intelligent matching system.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
