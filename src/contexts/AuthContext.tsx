
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  profileComplete: boolean;
  surveyComplete: boolean;
  profileImage?: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
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
    profileImage: "/placeholder.svg"
  }
];

// Create provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("matchmate_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user
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
    
    setLoading(false);
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const userExists = MOCK_USERS.some(u => u.email === email);
    
    if (userExists) {
      toast.error("User already exists");
      setLoading(false);
      return;
    }
    
    // Create new user
    const newUser = {
      id: String(MOCK_USERS.length + 1),
      name,
      email,
      profileComplete: false,
      surveyComplete: false
    };
    
    // Add to mock users (in real app, this would be an API call)
    MOCK_USERS.push({ ...newUser, password });
    
    // Set user state
    setUser(newUser);
    localStorage.setItem("matchmate_user", JSON.stringify(newUser));
    
    toast.success("Account created successfully!");
    navigate("/create-profile");
    setLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("matchmate_user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Update user data
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("matchmate_user", JSON.stringify(updatedUser));
    }
  };

  // Context provider
  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
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
