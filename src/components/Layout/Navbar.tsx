
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Home, User, FileSpreadsheet, MessageCircle, LogOut, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="border-b sticky top-0 bg-background z-50 shadow-sm">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full primary-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-matchmate-teal to-matchmate-violet bg-clip-text text-transparent">
              MatchMate
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard') 
                      ? 'text-primary font-semibold' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/matches" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/matches') 
                      ? 'text-primary font-semibold' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Matches
                </Link>
                <Link 
                  to="/rooms" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/rooms') 
                      ? 'text-primary font-semibold' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Rooms
                </Link>
                <Link 
                  to="/messages" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/messages') 
                      ? 'text-primary font-semibold' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Messages
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/preferences')}>
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      <span>Preferences</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link 
                  to="/about" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/about') 
                      ? 'text-primary font-semibold' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  About
                </Link>
                <Link 
                  to="/how-it-works" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/how-it-works') 
                      ? 'text-primary font-semibold' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  How It Works
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="mr-2">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer mr-4">
                    <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/preferences')}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    <span>Preferences</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <button onClick={toggleMobileMenu} className="p-2">
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={toggleMobileMenu}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/matches"
                  onClick={toggleMobileMenu}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10"
                >
                  <User className="h-5 w-5 mr-2" />
                  Matches
                </Link>
                <Link
                  to="/rooms"
                  onClick={toggleMobileMenu}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Rooms
                </Link>
                <Link
                  to="/messages"
                  onClick={toggleMobileMenu}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Messages
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    toggleMobileMenu();
                  }}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/about"
                  onClick={toggleMobileMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10"
                >
                  About
                </Link>
                <Link
                  to="/how-it-works"
                  onClick={toggleMobileMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10"
                >
                  How It Works
                </Link>
                <Link
                  to="/login"
                  onClick={toggleMobileMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleMobileMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium primary-gradient text-white rounded-md py-2 text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
