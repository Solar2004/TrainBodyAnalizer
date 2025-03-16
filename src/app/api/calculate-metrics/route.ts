import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";
import { ParameterName } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId } = await request.json();

    // Verify the user is authorized to calculate metrics for this user
    if (userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Get user profile data
    const { data: profileData, error: profileError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (profileError) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Calculate metrics based on profile data
    const metrics = calculateMetrics(profileData);

    // Save metrics to database
    const { error: metricsError } = await supabase.from("metrics").insert({
      user_id: userId,
      ...metrics,
      created_at: new Date().toISOString(),
    });

    if (metricsError) {
      return NextResponse.json(
        { error: "Failed to save metrics" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, metrics });
  } catch (error) {
    console.error("Error calculating metrics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

function calculateMetrics(profileData: any) {
  // This is a more comprehensive calculation based on the user profile data

  // Volume calculation based on training frequency, intensity, and years
  const volume = Math.min(
    (profileData.training_frequency * profileData.training_intensity) / 7 +
      Math.min(profileData.training_years * 2, 20),
    100,
  );

  // Potential calculation based on age, genetics (family athletic background)
  let potential = 0;
  // Age factor - younger people have higher potential
  if (profileData.age < 20) potential += 50;
  else if (profileData.age < 30) potential += 40;
  else if (profileData.age < 40) potential += 30;
  else if (profileData.age < 50) potential += 20;
  else potential += 10;

  // Family athletic background
  if (profileData.family_athletic_level === "professional") potential += 30;
  else if (profileData.family_athletic_level === "amateur") potential += 20;
  else if (profileData.family_athletic_level === "recreational")
    potential += 10;

  // Family longevity as a genetic indicator
  if (profileData.family_longevity === "high") potential += 20;
  else if (profileData.family_longevity === "above-average") potential += 15;
  else if (profileData.family_longevity === "average") potential += 10;
  else if (profileData.family_longevity === "below-average") potential += 5;

  potential = Math.min(potential, 100);

  // Endurance calculation
  let endurance = 0;
  // Base from training frequency and years
  endurance += profileData.training_frequency * 5;
  endurance += Math.min(profileData.training_years * 3, 30);

  // Adjust for somatotype
  if (profileData.somatotype.includes("ectomorph")) endurance += 15;
  if (profileData.somatotype.includes("mesomorph")) endurance += 10;

  // Adjust for sleep and stress
  endurance += profileData.sleep_quality / 5;
  endurance -= profileData.stress_level / 10;

  endurance = Math.max(0, Math.min(endurance, 100));

  // Strength calculation
  let strength = 0;
  // Base from training intensity
  strength += profileData.training_intensity / 2;

  // Adjust for somatotype
  if (profileData.somatotype.includes("mesomorph")) strength += 25;
  if (profileData.somatotype.includes("endomorph")) strength += 15;

  // Adjust for gender (simplified approach)
  if (profileData.gender === "male") strength += 10;

  // Adjust for age
  if (profileData.age < 30) strength += 15;
  else if (profileData.age < 40) strength += 10;
  else if (profileData.age < 50) strength += 5;

  strength = Math.max(0, Math.min(strength, 100));

  // Adaptability calculation
  let adaptability = 50; // Start at middle

  // Sleep quality improves adaptability
  adaptability += profileData.sleep_quality / 5;

  // Stress reduces adaptability
  adaptability -= profileData.stress_level / 5;

  // Medical conditions reduce adaptability
  const medicalConditionsCount = profileData.medical_conditions
    .split(",")
    .filter((c: string) => c !== "none").length;
  adaptability -= medicalConditionsCount * 5;

  // Age affects adaptability
  if (profileData.age > 50) adaptability -= 15;
  else if (profileData.age > 40) adaptability -= 10;
  else if (profileData.age > 30) adaptability -= 5;

  adaptability = Math.max(0, Math.min(adaptability, 100));

  // Progress - calculated based on training consistency and intensity
  let progress = 40; // Base value
  progress += profileData.training_frequency * 3; // Frequency contributes to progress
  progress += profileData.training_intensity / 5; // Intensity contributes to progress
  progress = Math.min(progress, 100);

  // Coordination - more sophisticated calculation
  let coordination = 50; // Base value

  // Family sports background affects coordination
  if (profileData.family_sports) {
    const familySports = profileData.family_sports.toLowerCase();
    if (familySports.includes("tennis") || familySports.includes("badminton"))
      coordination += 10;
    if (familySports.includes("gymnastics") || familySports.includes("dance"))
      coordination += 15;
    if (familySports.includes("martial") || familySports.includes("boxing"))
      coordination += 8;
    if (familySports.includes("soccer") || familySports.includes("football"))
      coordination += 7;
  }

  // Age affects coordination
  if (profileData.age < 20) coordination += 10;
  else if (profileData.age > 60) coordination -= 15;
  else if (profileData.age > 50) coordination -= 10;
  else if (profileData.age > 40) coordination -= 5;

  coordination = Math.max(0, Math.min(coordination, 100));

  // Agility - more detailed calculation
  let agility = 40; // Base value

  // Age significantly affects agility
  if (profileData.age < 20) agility += 25;
  else if (profileData.age < 30) agility += 20;
  else if (profileData.age < 40) agility += 15;
  else if (profileData.age < 50) agility += 10;
  else if (profileData.age < 60) agility += 5;

  // Somatotype affects agility
  if (profileData.somatotype.includes("ectomorph")) agility += 15;
  if (profileData.somatotype.includes("mesomorph")) agility += 10;
  if (profileData.somatotype.includes("endomorph")) agility -= 5;

  // Training intensity affects agility
  agility += profileData.training_intensity / 10;

  agility = Math.max(0, Math.min(agility, 100));

  // Consistency based on training frequency
  const consistency = Math.min(profileData.training_frequency * 14, 100);

  // Calculate fit score (0-1000)
  const fitScore = Math.round(
    ((volume +
      potential +
      endurance +
      strength +
      adaptability +
      progress +
      coordination +
      agility +
      consistency) /
      9) *
      10,
  );

  // Determine DNA grade based on potential and family factors
  let dnaGrade = "C";
  if (potential >= 90) dnaGrade = "SS";
  else if (potential >= 80) dnaGrade = "S";
  else if (potential >= 70) dnaGrade = "A";
  else if (potential >= 60) dnaGrade = "B";
  else if (potential < 40) dnaGrade = "E";

  // Calculate additional metrics
  const testosterone = calculateTestosteroneLevel(
    profileData.age,
    profileData.gender,
    profileData.training_intensity,
  );
  const boneDensity = calculateBoneDensity(
    profileData.age,
    profileData.gender,
    profileData.family_longevity,
  );
  const muscleStructure = determineMuscleStructure(profileData.somatotype);
  const geneticOrigins = determineGeneticOrigins(profileData);
  const geneticMutations = determineGeneticMutations(profileData);

  return {
    volume,
    potential,
    endurance,
    strength,
    adaptability,
    progress,
    coordination,
    agility,
    consistency,
    fit_score: fitScore,
    dna_grade: dnaGrade,
    testosterone,
    bone_density: boneDensity,
    muscle_structure: muscleStructure,
    genetic_origins: geneticOrigins ? geneticOrigins.join(",") : null,
    genetic_mutations: geneticMutations ? geneticMutations.join(",") : null,
  };
}

// Helper function to calculate testosterone level (simplified)
function calculateTestosteroneLevel(
  age: number,
  gender: string,
  trainingIntensity: number,
): number {
  let base = gender === "male" ? 600 : 40; // Base levels in ng/dL

  // Age adjustment
  if (gender === "male") {
    if (age > 30) base -= (age - 30) * 7; // Decline after 30
    base = Math.max(base, 250); // Minimum level
  } else {
    if (age > 40) base -= (age - 40) * 0.5; // Decline after 40
    base = Math.max(base, 15); // Minimum level
  }

  // Training intensity increases testosterone
  base += (trainingIntensity / 100) * 50;

  return Math.round(base);
}

// Helper function to calculate bone density (simplified)
function calculateBoneDensity(
  age: number,
  gender: string,
  familyLongevity: string,
): number {
  // Base bone density score (0-100)
  let density = 70;

  // Age affects bone density
  if (age > 30) density -= (age - 30) * 0.5;

  // Gender affects bone density
  if (gender === "male") density += 5;

  // Family longevity affects bone density
  if (familyLongevity === "high") density += 10;
  else if (familyLongevity === "above-average") density += 5;
  else if (familyLongevity === "below-average") density -= 5;
  else if (familyLongevity === "low") density -= 10;

  return Math.max(30, Math.min(100, density));
}

// Helper function to determine muscle structure based on somatotype
function determineMuscleStructure(somatotype: string): string {
  if (somatotype.includes("mesomorph") && somatotype.includes("ectomorph")) {
    return "Fast-twitch dominant";
  } else if (
    somatotype.includes("mesomorph") &&
    somatotype.includes("endomorph")
  ) {
    return "Mixed fiber composition";
  } else if (somatotype.includes("ectomorph")) {
    return "Slow-twitch dominant";
  } else if (somatotype.includes("mesomorph")) {
    return "Balanced fiber composition";
  } else if (somatotype.includes("endomorph")) {
    return "Power-oriented fiber composition";
  } else {
    return "Average fiber composition";
  }
}

// Helper function to determine genetic origins
function determineGeneticOrigins(profileData: any): string[] | null {
  if (!profileData) return null;

  const origins = [];

  // Based on family longevity
  if (profileData.family_longevity === "high") {
    origins.push("Longevity genes");
  }

  // Based on family athletic level
  if (profileData.family_athletic_level === "professional") {
    origins.push("Elite athletic predisposition");
  } else if (profileData.family_athletic_level === "amateur") {
    origins.push("Athletic predisposition");
  }

  // Add a default if empty
  if (origins.length === 0) {
    origins.push("Standard genetic profile");
  }

  return origins;
}

// Helper function to determine genetic mutations
function determineGeneticMutations(profileData: any): string[] | null {
  if (!profileData || !profileData.family_health_history) return null;

  const mutations = [];
  const healthHistory = profileData.family_health_history;

  if (healthHistory.includes("hypertension")) {
    mutations.push("ACE gene variant");
  }

  if (healthHistory.includes("diabetes")) {
    mutations.push("TCF7L2 variant");
  }

  if (healthHistory.includes("alzheimers")) {
    mutations.push("APOE4 variant");
  }

  if (healthHistory.includes("cancer")) {
    mutations.push("BRCA variant");
  }

  // Add a default if empty
  if (mutations.length === 0) {
    mutations.push("No significant mutations detected");
  }

  return mutations;
}
