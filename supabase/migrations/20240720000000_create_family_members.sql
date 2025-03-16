-- Create family_members table
CREATE TABLE IF NOT EXISTS family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  generation INTEGER NOT NULL,
  side TEXT,
  origin TEXT,
  ethnicity TEXT,
  somatotype TEXT,
  eye_color TEXT,
  hair_color TEXT,
  height TEXT,
  build TEXT,
  athletic_history TEXT,
  genetic_traits JSONB DEFAULT '[]'::jsonb,
  medical_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;

-- Policy for selecting own family members
CREATE POLICY "Users can view their own family members"
  ON family_members
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy for inserting own family members
CREATE POLICY "Users can insert their own family members"
  ON family_members
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy for updating own family members
CREATE POLICY "Users can update their own family members"
  ON family_members
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy for deleting own family members
CREATE POLICY "Users can delete their own family members"
  ON family_members
  FOR DELETE
  USING (auth.uid() = user_id);
