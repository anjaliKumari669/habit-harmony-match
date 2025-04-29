
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createClient } from '@supabase/supabase-js';

// Supabase client setup
const supabaseUrl = 'https://supabase-public-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  profileComplete: boolean;
  surveyComplete: boolean;
  profileImage?: string;
  habits: string[];
}

// Define context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateHabits: (habits: string[]) => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock database for demo
const MOCK_USERS = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
    profileComplete: true,
    surveyComplete: true,
    profileImage: "/placeholder.svg",
    habits: ["Early riser", "Clean and tidy", "Non-smoker"]
  }
];

// Create provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Try to get session from Supabase first
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (session) {
          // Get user profile from Supabase
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setUser({
              id: session.user.id,
              name: profile.name || session.user.email?.split('@')[0] || '',
              email: session.user.email || '',
              profileComplete: profile.profile_complete || false,
              surveyComplete: profile.survey_complete || false,
              profileImage: profile.profile_image || '/placeholder.svg',
              habits: profile.habits || []
            });
          }
        } else {
          // Fallback to localStorage for demo purposes
          const storedUser = localStorage.getItem("matchmate_user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
        // Fallback to localStorage
        const storedUser = localStorage.getItem("matchmate_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Try Supabase auth first
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError;
        }
        
        // Create profile if it doesn't exist
        let userProfile = profile;
        if (!profile) {
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([{ 
              id: data.user.id, 
              name: data.user.email?.split('@')[0] || '', 
              email: data.user.email,
              profile_complete: false,
              survey_complete: false,
              habits: []
            }])
            .select()
            .single();
          
          if (insertError) throw insertError;
          userProfile = newProfile;
        }
        
        // Set user state
        const userData = {
          id: data.user.id,
          name: userProfile?.name || data.user.email?.split('@')[0] || '',
          email: data.user.email || '',
          profileComplete: userProfile?.profile_complete || false,
          surveyComplete: userProfile?.survey_complete || false,
          profileImage: userProfile?.profile_image || '/placeholder.svg',
          habits: userProfile?.habits || []
        };
        
        setUser(userData);
        localStorage.setItem("matchmate_user", JSON.stringify(userData));
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      
      // Fallback to mock data for demo
      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        // Remove password from user object
        const { password, ...secureUser } = foundUser;
        setUser(secureUser);
        localStorage.setItem("matchmate_user", JSON.stringify(secureUser));
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    try {
      // Try Supabase signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: data.user.id,
            name,
            email,
            profile_complete: false,
            survey_complete: false,
            habits: []
          }]);
        
        if (profileError) throw profileError;
        
        // Set user state
        const newUser = {
          id: data.user.id,
          name,
          email: data.user.email || '',
          profileComplete: false,
          surveyComplete: false,
          profileImage: '/placeholder.svg',
          habits: []
        };
        
        setUser(newUser);
        localStorage.setItem("matchmate_user", JSON.stringify(newUser));
        
        toast.success("Account created successfully!");
        navigate("/create-profile");
      }
    } catch (err) {
      console.error("Signup error:", err);
      
      // Fallback to mock for demo
      const userExists = MOCK_USERS.some(u => u.email === email);
      
      if (userExists) {
        toast.error("User already exists");
      } else {
        // Create new user
        const newUser = {
          id: String(MOCK_USERS.length + 1),
          name,
          email,
          profileComplete: false,
          surveyComplete: false,
          profileImage: "/placeholder.svg",
          habits: []
        };
        
        // Add to mock users (in real app, this would be an API call)
        MOCK_USERS.push({ ...newUser, password });
        
        // Set user state
        setUser(newUser);
        localStorage.setItem("matchmate_user", JSON.stringify(newUser));
        
        toast.success("Account created successfully!");
        navigate("/create-profile");
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Try Supabase logout
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Always clear local state
      setUser(null);
      localStorage.removeItem("matchmate_user");
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  // Update user data
  const updateUser = async (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      
      try {
        // Update profile in Supabase
        if (user.id) {
          const { error } = await supabase
            .from('profiles')
            .update({
              name: updatedUser.name,
              profile_complete: updatedUser.profileComplete,
              survey_complete: updatedUser.surveyComplete,
              profile_image: updatedUser.profileImage,
            })
            .eq('id', user.id);
          
          if (error) throw error;
        }
      } catch (err) {
        console.error("Error updating user:", err);
      } finally {
        // Always update local state
        setUser(updatedUser);
        localStorage.setItem("matchmate_user", JSON.stringify(updatedUser));
      }
    }
  };
  
  // Update habits
  const updateHabits = async (habits: string[]) => {
    if (user) {
      const updatedUser = { ...user, habits };
      
      try {
        // Update habits in Supabase
        if (user.id) {
          const { error } = await supabase
            .from('profiles')
            .update({ habits })
            .eq('id', user.id);
          
          if (error) throw error;
        }
      } catch (err) {
        console.error("Error updating habits:", err);
      } finally {
        // Always update local state
        setUser(updatedUser);
        localStorage.setItem("matchmate_user", JSON.stringify(updatedUser));
      }
    }
  };

  // Context provider
  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser, updateHabits }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
