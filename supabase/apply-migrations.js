// Script to apply migrations to Supabase
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Get Supabase URL and key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or key not found in environment variables");
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function applyMigrations() {
  try {
    console.log("Applying migrations to Supabase...");

    // Read the migration file
    const migrationPath = path.join(
      __dirname,
      "migrations",
      "20240720000001_fix_family_members.sql",
    );
    const migrationSql = fs.readFileSync(migrationPath, "utf8");

    // Execute the SQL directly using Supabase's REST API
    const { error } = await supabase.rpc("pgmigrate", { query: migrationSql });

    if (error) {
      console.error("Error applying migration:", error);
      return;
    }

    console.log("Migration applied successfully!");
  } catch (error) {
    console.error("Error applying migrations:", error);
  }
}

applyMigrations();
