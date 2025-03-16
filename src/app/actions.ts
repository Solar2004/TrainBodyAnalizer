"use server";

import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../../supabase/server";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || "";
  const supabase = await createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: fullName,
        email: email,
      },
    },
  });

  console.log("After signUp", error);

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  }

  if (user) {
    try {
      const { error: updateError } = await supabase.from("users").insert({
        id: user.id,
        name: fullName,
        full_name: fullName,
        email: email,
        user_id: user.id,
        token_identifier: user.id,
        created_at: new Date().toISOString(),
      });

      if (updateError) {
        console.error("Error updating user profile:", updateError);
      }
    } catch (err) {
      console.error("Error in user profile creation:", err);
    }
  }

  return redirect("/onboarding");
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  // Check if user has completed onboarding
  const { data: profileData, error: profileError } = await supabase
    .from("user_profiles")
    .select("onboarding_completed")
    .eq("user_id", data.user.id)
    .single();

  if (profileError && profileError.code !== "PGRST116") {
    console.error("Error checking onboarding status:", profileError);
  }

  // If no profile or onboarding not completed, redirect to onboarding
  if (!profileData || !profileData.onboarding_completed) {
    return redirect("/onboarding");
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const saveOnboardingData = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Extract form data
  const personalData = {
    age: formData.get("age")?.toString(),
    gender: formData.get("gender")?.toString(),
    height: formData.get("height")?.toString(),
    weight: formData.get("weight")?.toString(),
    blood_type: formData.get("bloodType")?.toString(),
  };

  const physicalData = {
    somatotype: formData.getAll("somatotype"),
    training_frequency: formData.get("trainingFrequency")?.toString(),
    training_intensity: formData.get("trainingIntensity")?.toString(),
    training_years: formData.get("trainingYears")?.toString(),
  };

  const healthData = {
    sleep_quality: formData.get("sleepQuality")?.toString(),
    sleep_hours: formData.get("sleepHours")?.toString(),
    stress_level: formData.get("stressLevel")?.toString(),
    medical_conditions: formData.getAll("medicalConditions"),
  };

  const familyData = {
    family_athletic_level: formData.get("familyAthleticLevel")?.toString(),
    family_sports: formData.get("familySports")?.toString(),
    grandparents_age: formData.get("grandparentsAge")?.toString(),
    family_longevity: formData.get("familyLongevity")?.toString(),
    family_health_history: formData.getAll("familyHealthHistory"),
  };

  // Save to user_profiles table
  const { error: profileError } = await supabase.from("user_profiles").upsert({
    user_id: user.id,
    age: parseInt(personalData.age || "0"),
    gender: personalData.gender,
    height: parseFloat(personalData.height || "0"),
    weight: parseFloat(personalData.weight || "0"),
    blood_type: personalData.blood_type,
    somatotype: physicalData.somatotype.join(","),
    training_frequency: parseInt(physicalData.training_frequency || "0"),
    training_intensity: parseInt(physicalData.training_intensity || "0"),
    training_years: parseInt(physicalData.training_years || "0"),
    sleep_quality: parseInt(healthData.sleep_quality || "0"),
    sleep_hours: parseFloat(healthData.sleep_hours || "0"),
    stress_level: parseInt(healthData.stress_level || "0"),
    medical_conditions: healthData.medical_conditions.join(","),
    family_athletic_level: familyData.family_athletic_level,
    family_sports: familyData.family_sports,
    grandparents_age: parseInt(familyData.grandparents_age || "0"),
    family_longevity: familyData.family_longevity,
    family_health_history: familyData.family_health_history.join(","),
    onboarding_completed: true,
    updated_at: new Date().toISOString(),
  });

  if (profileError) {
    console.error("Error saving onboarding data:", profileError);
    return encodedRedirect(
      "error",
      "/onboarding",
      "Failed to save profile data. Please try again.",
    );
  }

  // Calculate initial metrics based on the provided data
  // This is a simplified version - in a real app, you'd have more complex calculations
  const initialMetrics = calculateInitialMetrics(
    personalData,
    physicalData,
    healthData,
    familyData,
  );

  // Save initial metrics
  const { error: metricsError } = await supabase.from("metrics").insert({
    user_id: user.id,
    volume: initialMetrics.volume,
    potential: initialMetrics.potential,
    endurance: initialMetrics.endurance,
    strength: initialMetrics.strength,
    adaptability: initialMetrics.adaptability,
    progress: initialMetrics.progress,
    coordination: initialMetrics.coordination,
    agility: initialMetrics.agility,
    consistency: initialMetrics.consistency,
    fit_score: initialMetrics.fitScore,
    dna_grade: initialMetrics.dnaGrade,
    created_at: new Date().toISOString(),
  });

  if (metricsError) {
    console.error("Error saving initial metrics:", metricsError);
  }

  return redirect("/onboarding/metrics");
};

// Helper function to calculate initial metrics based on onboarding data
function calculateInitialMetrics(
  personalData: any,
  physicalData: any,
  healthData: any,
  familyData: any,
) {
  // Volume calculation based on training frequency, intensity, and years
  const trainingFrequency = parseInt(physicalData.training_frequency || "0");
  const trainingIntensity = parseInt(physicalData.training_intensity || "0");
  const trainingYears = parseInt(physicalData.training_years || "0");

  const volume = Math.min(
    (trainingFrequency * trainingIntensity) / 7 +
      Math.min(trainingYears * 2, 20),
    100,
  );

  // Potential calculation based on age, genetics (family athletic background)
  let potential = 0;
  const age = parseInt(personalData.age || "0");

  // Age factor - younger people have higher potential
  if (age < 20) potential += 50;
  else if (age < 30) potential += 40;
  else if (age < 40) potential += 30;
  else if (age < 50) potential += 20;
  else potential += 10;

  // Family athletic background
  if (familyData.family_athletic_level === "professional") potential += 30;
  else if (familyData.family_athletic_level === "amateur") potential += 20;
  else if (familyData.family_athletic_level === "recreational") potential += 10;

  // Family longevity as a genetic indicator
  if (familyData.family_longevity === "high") potential += 20;
  else if (familyData.family_longevity === "above-average") potential += 15;
  else if (familyData.family_longevity === "average") potential += 10;
  else if (familyData.family_longevity === "below-average") potential += 5;

  potential = Math.min(potential, 100);

  // Endurance calculation
  let endurance = 0;
  // Base from training frequency and years
  endurance += trainingFrequency * 5;
  endurance += Math.min(trainingYears * 3, 30);

  // Adjust for somatotype
  if (physicalData.somatotype.includes("ectomorph")) endurance += 15;
  if (physicalData.somatotype.includes("mesomorph")) endurance += 10;

  // Adjust for sleep and stress
  const sleepQuality = parseInt(healthData.sleep_quality || "0");
  const stressLevel = parseInt(healthData.stress_level || "0");
  endurance += sleepQuality / 5;
  endurance -= stressLevel / 10;

  endurance = Math.max(0, Math.min(endurance, 100));

  // Strength calculation
  let strength = 0;
  // Base from training intensity
  strength += trainingIntensity / 2;

  // Adjust for somatotype
  if (physicalData.somatotype.includes("mesomorph")) strength += 25;
  if (physicalData.somatotype.includes("endomorph")) strength += 15;

  // Adjust for gender (simplified approach)
  if (personalData.gender === "male") strength += 10;

  // Adjust for age
  if (age < 30) strength += 15;
  else if (age < 40) strength += 10;
  else if (age < 50) strength += 5;

  strength = Math.max(0, Math.min(strength, 100));

  // Adaptability calculation
  let adaptability = 50; // Start at middle

  // Sleep quality improves adaptability
  adaptability += sleepQuality / 5;

  // Stress reduces adaptability
  adaptability -= stressLevel / 5;

  // Medical conditions reduce adaptability
  const medicalConditionsCount = healthData.medical_conditions.filter(
    (c: string) => c !== "none",
  ).length;
  adaptability -= medicalConditionsCount * 5;

  // Age affects adaptability
  if (age > 50) adaptability -= 15;
  else if (age > 40) adaptability -= 10;
  else if (age > 30) adaptability -= 5;

  adaptability = Math.max(0, Math.min(adaptability, 100));

  // Progress - calculated based on training consistency and intensity
  let progress = 40; // Base value
  progress += trainingFrequency * 3; // Frequency contributes to progress
  progress += trainingIntensity / 5; // Intensity contributes to progress
  progress = Math.min(progress, 100);

  // Coordination - more sophisticated calculation
  let coordination = 50; // Base value

  // Family sports background affects coordination
  const familySports = familyData.family_sports?.toString().toLowerCase() || "";
  if (familySports.includes("tennis") || familySports.includes("badminton"))
    coordination += 10;
  if (familySports.includes("gymnastics") || familySports.includes("dance"))
    coordination += 15;
  if (familySports.includes("martial") || familySports.includes("boxing"))
    coordination += 8;
  if (familySports.includes("soccer") || familySports.includes("football"))
    coordination += 7;

  // Age affects coordination
  if (age < 20) coordination += 10;
  else if (age > 60) coordination -= 15;
  else if (age > 50) coordination -= 10;
  else if (age > 40) coordination -= 5;

  coordination = Math.max(0, Math.min(coordination, 100));

  // Agility - more detailed calculation
  let agility = 40; // Base value

  // Age significantly affects agility
  if (age < 20) agility += 25;
  else if (age < 30) agility += 20;
  else if (age < 40) agility += 15;
  else if (age < 50) agility += 10;
  else if (age < 60) agility += 5;

  // Somatotype affects agility
  if (physicalData.somatotype.includes("ectomorph")) agility += 15;
  if (physicalData.somatotype.includes("mesomorph")) agility += 10;
  if (physicalData.somatotype.includes("endomorph")) agility -= 5;

  // Training intensity affects agility
  agility += trainingIntensity / 10;

  agility = Math.max(0, Math.min(agility, 100));

  // Consistency based on training frequency and routine
  const consistency = Math.min(trainingFrequency * 14, 100);

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

  // Additional metrics that could be calculated
  const testosterone = calculateTestosteroneLevel(
    age,
    personalData.gender,
    trainingIntensity,
  );
  const boneDensity = calculateBoneDensity(
    age,
    personalData.gender,
    familyData.family_longevity,
  );
  const muscleStructure = determineMuscleStructure(physicalData.somatotype);
  const geneticOrigins = determineGeneticOrigins(familyData);
  const geneticMutations = determineGeneticMutations(familyData);

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
    fitScore,
    dnaGrade,
    // Additional metrics
    testosterone,
    boneDensity,
    muscleStructure,
    geneticOrigins,
    geneticMutations,
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
function determineMuscleStructure(somatotype: string[]): string {
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
function determineGeneticOrigins(familyData: any): string[] {
  // This would normally be based on more detailed genetic data
  // For now, we'll return a simplified placeholder
  const origins = [];

  // Based on family longevity
  if (familyData.family_longevity === "high") {
    origins.push("Longevity genes");
  }

  // Based on family athletic level
  if (familyData.family_athletic_level === "professional") {
    origins.push("Elite athletic predisposition");
  } else if (familyData.family_athletic_level === "amateur") {
    origins.push("Athletic predisposition");
  }

  // Add a default if empty
  if (origins.length === 0) {
    origins.push("Standard genetic profile");
  }

  return origins;
}

// Helper function to determine genetic mutations
function determineGeneticMutations(familyData: any): string[] {
  // This would normally be based on more detailed genetic data
  // For now, we'll return a simplified placeholder based on family health history
  const mutations = [];
  const healthHistory = familyData.family_health_history || [];

  if (healthHistory.includes("hypertension")) {
    mutations.push("ACE gene variant");
  }

  if (healthHistory.includes("diabetes")) {
    mutations.push("TCF7L2 variant");
  }

  if (healthHistory.includes("alzheimers")) {
    mutations.push("APOE4 variant");
  }

  // Add a default if empty
  if (mutations.length === 0) {
    mutations.push("No significant mutations detected");
  }

  return mutations;
}

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
