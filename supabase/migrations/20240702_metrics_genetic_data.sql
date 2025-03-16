-- Create metrics table
CREATE TABLE IF NOT EXISTS metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id and created_at for efficient queries
CREATE INDEX IF NOT EXISTS idx_metrics_user_id ON metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_metrics_created_at ON metrics(created_at);

-- Create genetic_data table
CREATE TABLE IF NOT EXISTS genetic_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  testosterone NUMERIC,
  origins JSONB,
  mutations JSONB,
  muscle_structure TEXT,
  bone_density NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id
CREATE INDEX IF NOT EXISTS idx_genetic_data_user_id ON genetic_data(user_id);

-- Enable Row Level Security
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE genetic_data ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own metrics
CREATE POLICY "Users can read their own metrics"
  ON metrics
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy for users to insert their own metrics
CREATE POLICY "Users can insert their own metrics"
  ON metrics
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own metrics
CREATE POLICY "Users can update their own metrics"
  ON metrics
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy for users to read their own genetic data
CREATE POLICY "Users can read their own genetic data"
  ON genetic_data
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy for users to insert their own genetic data
CREATE POLICY "Users can insert their own genetic data"
  ON genetic_data
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own genetic data
CREATE POLICY "Users can update their own genetic data"
  ON genetic_data
  FOR UPDATE
  USING (auth.uid() = user_id);
