
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./components/Layout/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import CreateProfile from "./pages/Auth/CreateProfile";
import Dashboard from "./pages/Dashboard/Dashboard";
import MatchesPage from "./pages/Matches/MatchesPage";
import MessagesPage from "./pages/Messages/MessagesPage";
import RoomsPage from "./pages/Rooms/RoomsPage";
import PostRoomPage from "./pages/Rooms/PostRoomPage";
import PreferencesSurveyPage from "./pages/Survey/PreferencesSurveyPage";
import AboutPage from "./pages/About/AboutPage";
import HowItWorksPage from "./pages/HowItWorks/HowItWorksPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Index />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="create-profile" element={<CreateProfile />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="matches" element={<MatchesPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="rooms" element={<RoomsPage />} />
              <Route path="post-room" element={<PostRoomPage />} />
              <Route path="preferences-survey" element={<PreferencesSurveyPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="how-it-works" element={<HowItWorksPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
