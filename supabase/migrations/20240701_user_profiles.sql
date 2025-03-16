-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  age INTEGER,
  gender TEXT,
  height NUMERIC,
  weight NUMERIC,
  blood_type TEXT,
  somatotype TEXT,
  training_frequency INTEGER,
  training_intensity INTEGER,
  training_years INTEGER,
  sleep_quality INTEGER,
  sleep_hours NUMERIC,
  stress_level INTEGER,
  medical_conditions TEXT,
  family_athletic_level TEXT,
  family_sports TEXT,
  grandparents_age INTEGER,
  family_longevity TEXT,
  family_health_history TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Create RLS policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own profile
CREATE POLICY "Users can read their own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy for users to insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);
