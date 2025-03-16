// Script to create family_members table directly in Supabase
const { createClient } = require("@supabase/supabase-js");

// Get Supabase URL and key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or key not found in environment variables");
  process.exit(1);
}

// Create Supabase client with service role key for admin privileges
const supabase = createClient(supabaseUrl, supabaseKey);

async function createFamilyMembersTable() {
  try {
    console.log("Creating family_members table...");

    // SQL to create the table and set up RLS
    const sql = `
    -- Create extension if it doesn't exist
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    -- Drop table if it exists
    DROP TABLE IF EXISTS family_members;
    
    -- Create family_members table
    CREATE TABLE family_members (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL,
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
    `;

    // Execute the SQL using Supabase's REST API
    const { error } = await supabase.rpc("pgmigrate", { query: sql });

    if (error) {
      console.error("Error creating table:", error);
      return;
    }

    console.log("Family members table created successfully!");
  } catch (error) {
    console.error("Error creating family_members table:", error);
  }
}

createFamilyMembersTable();
