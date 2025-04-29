
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Layouts
import MainLayout from "./components/Layout/MainLayout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import CreateProfile from "./pages/Auth/CreateProfile";
import PreferencesSurveyPage from "./pages/Survey/PreferencesSurveyPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import MatchesPage from "./pages/Matches/MatchesPage";
import RoomsPage from "./pages/Rooms/RoomsPage";
import AboutPage from "./pages/About/AboutPage";
import HowItWorksPage from "./pages/HowItWorks/HowItWorksPage";
import NotFound from "./pages/NotFound";

// Replace placeholder images with real ones
const replaceImages = () => {
  // Add real images to replace placeholders
  const images = document.querySelectorAll('img[src="/placeholder.svg"]');
  const roommatePics = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
  ];
  
  const roomPics = [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
    "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb",
    "https://images.unsplash.com/photo-1536376072261-38c75010e6c9",
    "https://images.unsplash.com/photo-1501183638710-841dd1904471"
  ];
  
  images.forEach((img: Element, index: number) => {
    const imgElement = img as HTMLImageElement;
    if (imgElement.closest('.roommate-card')) {
      imgElement.src = roommatePics[index % roommatePics.length];
    } else if (imgElement.closest('.room-card')) {
      imgElement.src = roomPics[index % roomPics.length];
    } else if (imgElement.parentElement?.classList.contains('aspect-square')) {
      imgElement.src = "https://images.unsplash.com/photo-1600607686527-6fb886090705";
    }
  });
};

const queryClient = new QueryClient();

const App = () => {
  React.useEffect(() => {
    // Replace placeholder images after component mounts
    replaceImages();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/matches" element={<MatchesPage />} />
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/preferences-survey" element={<PreferencesSurveyPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
