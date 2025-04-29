// Mock data for roommate profiles

export interface RoommateProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  profileImage: string;
  bio: string;
  compatibility: number;
  habits: {
    sleepSchedule: string; // early, normal, late
    cleanliness: string; // neat, moderate, messy
    noise: string; // quiet, moderate, loud
    cooking: string; // frequent, occasional, none
    social: string; // introvert, extrovert, balanced
    studyWork: string; // focused, relaxed, flexible
  };
  preferences: {
    pets: boolean;
    smoking: boolean;
    drinking: boolean;
    guests: string; // rarely, occasionally, frequently
    roomType: string; // shared, private
  };
  contactInfo?: {
    email: string;
    phone?: string;
  };
}

export const MOCK_ROOMMATES: RoommateProfile[] = [
  {
    id: "1",
    name: "Alex Johnson",
    age: 24,
    gender: "Male",
    location: "Downtown, City Center",
    profileImage: "/placeholder.svg",
    bio: "Software engineer who enjoys hiking on weekends. Looking for a clean and quiet space to live.",
    compatibility: 92,
    habits: {
      sleepSchedule: "normal", 
      cleanliness: "neat",
      noise: "quiet",
      cooking: "occasional",
      social: "balanced",
      studyWork: "focused"
    },
    preferences: {
      pets: false,
      smoking: false,
      drinking: true,
      guests: "occasionally",
      roomType: "private"
    }
  },
  {
    id: "2",
    name: "Samantha Lee",
    age: 27,
    gender: "Female",
    location: "Westside Apartments",
    profileImage: "/placeholder.svg",
    bio: "Graphic designer and yoga enthusiast. I'm clean, organized, and respectful of shared spaces.",
    compatibility: 87,
    habits: {
      sleepSchedule: "early", 
      cleanliness: "neat",
      noise: "moderate",
      cooking: "frequent",
      social: "introvert",
      studyWork: "focused"
    },
    preferences: {
      pets: true,
      smoking: false,
      drinking: false,
      guests: "rarely",
      roomType: "private"
    }
  },
  {
    id: "3",
    name: "Marcus Chen",
    age: 23,
    gender: "Male",
    location: "University District",
    profileImage: "/placeholder.svg",
    bio: "Medical student who studies late. I'm easy-going and tidy. Looking for a quiet place during weeknights.",
    compatibility: 78,
    habits: {
      sleepSchedule: "late", 
      cleanliness: "moderate",
      noise: "quiet",
      cooking: "occasional",
      social: "introvert",
      studyWork: "focused"
    },
    preferences: {
      pets: false,
      smoking: false,
      drinking: true,
      guests: "rarely",
      roomType: "private"
    }
  },
  {
    id: "4",
    name: "Priya Patel",
    age: 25,
    gender: "Female",
    location: "North Heights",
    profileImage: "/placeholder.svg",
    bio: "Marketing manager who loves to cook and host small dinner parties. Very organized and clean.",
    compatibility: 75,
    habits: {
      sleepSchedule: "normal", 
      cleanliness: "neat",
      noise: "moderate",
      cooking: "frequent",
      social: "extrovert",
      studyWork: "flexible"
    },
    preferences: {
      pets: true,
      smoking: false,
      drinking: true,
      guests: "frequently",
      roomType: "shared"
    }
  },
  {
    id: "5",
    name: "Jordan Taylor",
    age: 29,
    gender: "Non-binary",
    location: "Arts District",
    profileImage: "/placeholder.svg",
    bio: "Musician and freelance writer. Creative, laid-back, and respectful. I keep odd hours sometimes due to gigs.",
    compatibility: 68,
    habits: {
      sleepSchedule: "late", 
      cleanliness: "moderate",
      noise: "moderate",
      cooking: "occasional",
      social: "balanced",
      studyWork: "relaxed"
    },
    preferences: {
      pets: true,
      smoking: true,
      drinking: true,
      guests: "occasionally",
      roomType: "private"
    }
  }
];

export interface RoommatePreferences {
  sleepSchedule: string;
  cleanliness: string;
  noise: string;
  cooking: string;
  social: string;
  studyWork: string;
  pets: boolean;
  smoking: boolean;
  drinking: boolean;
  guests: string;
  roomType: string;
}

export const DEFAULT_PREFERENCES: RoommatePreferences = {
  sleepSchedule: "normal",
  cleanliness: "moderate",
  noise: "moderate",
  cooking: "occasional",
  social: "balanced",
  studyWork: "flexible",
  pets: false,
  smoking: false,
  drinking: false,
  guests: "occasionally",
  roomType: "private"
};

export interface RoomListing {
  id: string;
  title: string;
  location: string;
  price: number;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  description: string;
  amenities: string[];
  availableFrom: string;
  postedBy: {
    id: string;
    name: string;
    profileImage: string;
  };
}

export const MOCK_ROOMS: RoomListing[] = [
  {
    id: "r1",
    title: "Sunny Private Room in Shared Apartment",
    location: "Downtown, City Center",
    price: 850,
    images: ["/placeholder.svg", "/placeholder.svg"],
    bedrooms: 1,
    bathrooms: 1,
    description: "Bright and spacious private room in a 2-bedroom apartment. Shared kitchen and living room. Close to public transportation and shops.",
    amenities: ["Wi-Fi", "Washer/Dryer", "Parking", "Air Conditioning"],
    availableFrom: "2025-05-01",
    postedBy: {
      id: "1",
      name: "Alex Johnson",
      profileImage: "/placeholder.svg"
    }
  },
  {
    id: "r2",
    title: "Modern Studio Near University",
    location: "University District",
    price: 1200,
    images: ["/placeholder.svg", "/placeholder.svg"],
    bedrooms: 1,
    bathrooms: 1,
    description: "Fully furnished studio apartment perfect for students. Walking distance to campus and local amenities.",
    amenities: ["Wi-Fi", "Gym", "Washer/Dryer", "Security"],
    availableFrom: "2025-04-15",
    postedBy: {
      id: "3",
      name: "Marcus Chen",
      profileImage: "/placeholder.svg"
    }
  },
  {
    id: "r3",
    title: "Room in Artistic Loft",
    location: "Arts District",
    price: 900,
    images: ["/placeholder.svg", "/placeholder.svg"],
    bedrooms: 1,
    bathrooms: 1,
    description: "Creative space in a converted warehouse. High ceilings, lots of natural light. Shared with two artists.",
    amenities: ["Wi-Fi", "Art Studio", "Rooftop Access", "Bike Storage"],
    availableFrom: "2025-05-15",
    postedBy: {
      id: "5",
      name: "Jordan Taylor",
      profileImage: "/placeholder.svg"
    }
  }
];

export interface Room {
  id: string;
  title: string;
  price: number;
  location: string;
  description: string;
  amenities: string[];
  image: string;
}

export const rooms: Room[] = [
  {
    id: "1",
    title: "Modern Studio Apartment",
    price: 1200,
    location: "Downtown",
    description: "Bright and modern studio apartment in the heart of downtown.",
    amenities: ["WiFi", "Kitchen", "Washer/Dryer", "AC"],
    image: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Cozy 2-Bedroom Near Campus",
    price: 1500,
    location: "University District",
    description: "Comfortable 2-bedroom apartment within walking distance to campus.",
    amenities: ["Parking", "WiFi", "Kitchen", "Pet-friendly"],
    image: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Spacious Shared House",
    price: 800,
    location: "Greenwood",
    description: "Private room in a spacious shared house with 3 other roommates.",
    amenities: ["Garden", "WiFi", "Shared Kitchen", "Furnished"],
    image: "/placeholder.svg"
  }
];
