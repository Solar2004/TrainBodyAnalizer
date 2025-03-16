-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  age INTEGER,
  gender TEXT,
  height FLOAT,
  weight FLOAT,
  blood_type TEXT,
  somatotype TEXT,
  training_frequency INTEGER,
  training_intensity INTEGER,
  training_duration INTEGER,
  training_years INTEGER,
  bench_press FLOAT,
  squat FLOAT,
  deadlift FLOAT,
  pullups INTEGER,
  resting_heart_rate INTEGER,
  max_heart_rate INTEGER,
  running_distance FLOAT,
  recovery_time INTEGER,
  coordination_level TEXT,
  sport_specific TEXT,
  reaction_time TEXT,
  balance_level TEXT,
  sleep_quality INTEGER,
  sleep_hours FLOAT,
  stress_level INTEGER,
  adaptability_to_change INTEGER,
  recovery_ability TEXT,
  training_consistency TEXT,
  progress_rate TEXT,
  tracking_method TEXT,
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

-- Create metrics table
CREATE TABLE IF NOT EXISTS public.metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  volume INTEGER,
  potential INTEGER,
  endurance INTEGER,
  strength INTEGER,
  adaptability INTEGER,
  progress INTEGER,
  coordination INTEGER,
  agility INTEGER,
  consistency INTEGER,
  fit_score INTEGER,
  dna_grade TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  full_name TEXT,
  email TEXT,
  user_id UUID,
  token_identifier TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view their own profiles"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profiles"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profiles"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policies for metrics
CREATE POLICY "Users can view their own metrics"
  ON public.metrics
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own metrics"
  ON public.metrics
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policies for users
CREATE POLICY "Users can view their own user data"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own user data"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own user data"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);
