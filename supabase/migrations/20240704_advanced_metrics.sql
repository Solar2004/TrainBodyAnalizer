-- Add new columns to metrics table for advanced metrics
ALTER TABLE metrics
ADD COLUMN IF NOT EXISTS testosterone INTEGER,
ADD COLUMN IF NOT EXISTS bone_density INTEGER,
ADD COLUMN IF NOT EXISTS muscle_structure TEXT,
ADD COLUMN IF NOT EXISTS genetic_origins TEXT,
ADD COLUMN IF NOT EXISTS genetic_mutations TEXT;

-- Create a new table for detailed genetic profiles
CREATE TABLE IF NOT EXISTS genetic_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  origins TEXT,
  mutations TEXT,
  muscle_structure TEXT,
  bone_density INTEGER,
  testosterone INTEGER,
  metabolism_type TEXT,
  recovery_speed TEXT,
  injury_risk INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a new table for biomechanical profiles
CREATE TABLE IF NOT EXISTS biomechanical_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  posture INTEGER,
  flexibility INTEGER,
  balance INTEGER,
  symmetry INTEGER,
  movement_efficiency INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a new table for biochemical profiles
CREATE TABLE IF NOT EXISTS biochemical_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  testosterone INTEGER,
  cortisol FLOAT,
  growth_hormone FLOAT,
  insulin_sensitivity INTEGER,
  inflammation_markers INTEGER,
  oxidative_stress INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a new table for training profiles
CREATE TABLE IF NOT EXISTS training_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  volume INTEGER,
  intensity INTEGER,
  frequency INTEGER,
  consistency INTEGER,
  technique INTEGER,
  periodization INTEGER,
  recovery_quality INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a new table for nutrition profiles
CREATE TABLE IF NOT EXISTS nutrition_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  protein_intake FLOAT,
  calorie_balance INTEGER,
  meal_timing INTEGER,
  hydration INTEGER,
  micronutrient_quality INTEGER,
  supplement_strategy INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for the new tables
ALTER TABLE genetic_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE biomechanical_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE biochemical_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for genetic_profiles
CREATE POLICY "Users can view their own genetic profiles"
  ON genetic_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own genetic profiles"
  ON genetic_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own genetic profiles"
  ON genetic_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policies for biomechanical_profiles
CREATE POLICY "Users can view their own biomechanical profiles"
  ON biomechanical_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own biomechanical profiles"
  ON biomechanical_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own biomechanical profiles"
  ON biomechanical_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policies for biochemical_profiles
CREATE POLICY "Users can view their own biochemical profiles"
  ON biochemical_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own biochemical profiles"
  ON biochemical_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own biochemical profiles"
  ON biochemical_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policies for training_profiles
CREATE POLICY "Users can view their own training profiles"
  ON training_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own training profiles"
  ON training_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own training profiles"
  ON training_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policies for nutrition_profiles
CREATE POLICY "Users can view their own nutrition profiles"
  ON nutrition_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own nutrition profiles"
  ON nutrition_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own nutrition profiles"
  ON nutrition_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);
