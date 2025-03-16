-- Schema for Train Body Analyzer database

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE,
  birth_date DATE,
  height FLOAT,
  weight FLOAT,
  blood_type TEXT,
  user_id UUID,
  token_identifier TEXT,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Metrics table (stores all parameter values and fit score)
CREATE TABLE metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  fit_score INTEGER,
  dna_grade TEXT,
  volume INTEGER,
  potential INTEGER,
  endurance INTEGER,
  strength INTEGER,
  adaptability INTEGER,
  progress INTEGER,
  coordination INTEGER,
  agility INTEGER,
  consistency INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Genetic data table
CREATE TABLE genetic_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  testosterone FLOAT,
  origins TEXT, -- JSON string of origins
  mutations TEXT, -- JSON string of mutations
  muscle_structure TEXT,
  bone_density FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training logs table
CREATE TABLE training_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity_type TEXT,
  duration INTEGER, -- in minutes
  intensity FLOAT, -- 0-1 scale
  recovery_quality FLOAT, -- 0-1 scale
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recommendations table
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  priority TEXT,
  expected_impact FLOAT,
  is_implemented BOOLEAN DEFAULT FALSE,
  implementation_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Family members table
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  relationship TEXT NOT NULL,
  country_origin TEXT,
  ethnicity TEXT,
  somatotype TEXT,
  eye_color TEXT,
  hair_color TEXT,
  height_description TEXT,
  build TEXT,
  longevity INTEGER,
  health_issues TEXT, -- JSON string of health issues
  athletic_history TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Countries catalog
CREATE TABLE countries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  region TEXT,
  code TEXT
);

-- Biotypes catalog
CREATE TABLE biotypes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT
);

-- Physical traits catalog
CREATE TABLE physical_traits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT,
  description TEXT
);

-- Junction table for family members and physical traits
CREATE TABLE family_member_traits (
  family_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  trait_id UUID REFERENCES physical_traits(id) ON DELETE CASCADE,
  PRIMARY KEY (family_member_id, trait_id)
);

-- RLS Policies

-- Users table policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Metrics table policies
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own metrics" ON metrics
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own metrics" ON metrics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Genetic data table policies
ALTER TABLE genetic_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own genetic data" ON genetic_data
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own genetic data" ON genetic_data
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own genetic data" ON genetic_data
  FOR UPDATE USING (auth.uid() = user_id);

-- Training logs table policies
ALTER TABLE training_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own training logs" ON training_logs
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own training logs" ON training_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own training logs" ON training_logs
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own training logs" ON training_logs
  FOR DELETE USING (auth.uid() = user_id);

-- Recommendations table policies
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own recommendations" ON recommendations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own recommendations" ON recommendations
  FOR UPDATE USING (auth.uid() = user_id);

-- Family members table policies
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own family members" ON family_members
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own family members" ON family_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own family members" ON family_members
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own family members" ON family_members
  FOR DELETE USING (auth.uid() = user_id);

-- Family member traits junction table policies
ALTER TABLE family_member_traits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own family member traits" ON family_member_traits
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM family_members
      WHERE family_members.id = family_member_traits.family_member_id
      AND family_members.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can insert their own family member traits" ON family_member_traits
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM family_members
      WHERE family_members.id = family_member_traits.family_member_id
      AND family_members.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can delete their own family member traits" ON family_member_traits
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM family_members
      WHERE family_members.id = family_member_traits.family_member_id
      AND family_members.user_id = auth.uid()
    )
  );

-- Public access to catalog tables
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view countries" ON countries FOR SELECT USING (true);

ALTER TABLE biotypes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view biotypes" ON biotypes FOR SELECT USING (true);

ALTER TABLE physical_traits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view physical traits" ON physical_traits FOR SELECT USING (true);
