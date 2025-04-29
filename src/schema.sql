
-- Schema for MatchMate Supabase Database

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  profile_image TEXT,
  profile_complete BOOLEAN DEFAULT false,
  survey_complete BOOLEAN DEFAULT false,
  habits TEXT[] DEFAULT '{}',
  bio TEXT,
  age INTEGER,
  gender TEXT,
  occupation TEXT,
  location TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habits table
CREATE TABLE IF NOT EXISTS habits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  habit TEXT NOT NULL,
  preference INTEGER, -- Scale from 1-5
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Roommate preferences table
CREATE TABLE IF NOT EXISTS roommate_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  cleanliness INTEGER, -- 1-5 scale
  noise_level INTEGER, -- 1-5 scale
  sleep_schedule TEXT, -- early_bird, night_owl, flexible
  guest_frequency TEXT, -- rarely, occasionally, often
  smoking BOOLEAN DEFAULT false,
  drinking BOOLEAN DEFAULT false,
  pets BOOLEAN DEFAULT false,
  sharing_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  location TEXT NOT NULL,
  bedrooms INTEGER DEFAULT 1,
  bathrooms INTEGER DEFAULT 1,
  available_from DATE,
  available_until DATE,
  amenities TEXT[] DEFAULT '{}',
  room_images TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user1_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  compatibility_score DECIMAL(5,2),
  status TEXT DEFAULT 'pending', -- pending, accepted, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user1_id, user2_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Functions and triggers
-- Auto-update updated_at when a record is modified
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
CREATE TRIGGER update_profiles_modtime
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_roommate_preferences_modtime
BEFORE UPDATE ON roommate_preferences
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_rooms_modtime
BEFORE UPDATE ON rooms
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_matches_modtime
BEFORE UPDATE ON matches
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

-- Create RLS policies
-- Profiles: Users can read all profiles but only update their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY profiles_select_policy ON profiles
  FOR SELECT USING (true);

CREATE POLICY profiles_update_policy ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Additional policies for other tables
-- Similar policies would be created for each table
