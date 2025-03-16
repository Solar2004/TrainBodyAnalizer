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
    training_duration: formData.get("trainingDuration")?.toString(),
    training_years: formData.get("trainingYears")?.toString(),
    // Strength metrics
    bench_press: formData.get("benchPress")?.toString(),
    squat: formData.get("squat")?.toString(),
    deadlift: formData.get("deadlift")?.toString(),
    pullups: formData.get("pullups")?.toString(),
    // Endurance metrics
    resting_heart_rate: formData.get("restingHeartRate")?.toString(),
    max_heart_rate: formData.get("maxHeartRate")?.toString(),
    running_distance: formData.get("runningDistance")?.toString(),
    recovery_time: formData.get("recoveryTime")?.toString(),
    // Coordination & Agility
    coordination_level: formData.get("coordinationLevel")?.toString(),
    sport_specific: formData.get("sportSpecific")?.toString(),
    reaction_time: formData.get("reactionTime")?.toString(),
    balance_level: formData.get("balanceLevel")?.toString(),
  };

  const healthData = {
    sleep_quality: formData.get("sleepQuality")?.toString(),
    sleep_hours: formData.get("sleepHours")?.toString(),
    stress_level: formData.get("stressLevel")?.toString(),
    adaptability_to_change: formData.get("adaptabilityToChange")?.toString(),
    recovery_ability: formData.get("recoveryAbility")?.toString(),
    training_consistency: formData.get("trainingConsistency")?.toString(),
    progress_rate: formData.get("progressRate")?.toString(),
    tracking_method: formData.get("trackingMethod")?.toString(),
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
    training_duration: parseInt(physicalData.training_duration || "0"),
    training_years: parseInt(physicalData.training_years || "0"),
    bench_press: parseFloat(physicalData.bench_press || "0"),
    squat: parseFloat(physicalData.squat || "0"),
    deadlift: parseFloat(physicalData.deadlift || "0"),
    pullups: parseInt(physicalData.pullups || "0"),
    resting_heart_rate: parseInt(physicalData.resting_heart_rate || "0"),
    max_heart_rate: parseInt(physicalData.max_heart_rate || "0"),
    running_distance: parseFloat(physicalData.running_distance || "0"),
    recovery_time: parseInt(physicalData.recovery_time || "0"),
    coordination_level: physicalData.coordination_level,
    sport_specific: physicalData.sport_specific,
    reaction_time: physicalData.reaction_time,
    balance_level: physicalData.balance_level,
    sleep_quality: parseInt(healthData.sleep_quality || "0"),
    sleep_hours: parseFloat(healthData.sleep_hours || "0"),
    stress_level: parseInt(healthData.stress_level || "0"),
    adaptability_to_change: parseInt(healthData.adaptability_to_change || "0"),
    recovery_ability: healthData.recovery_ability,
    training_consistency: healthData.training_consistency,
    progress_rate: healthData.progress_rate,
    tracking_method: healthData.tracking_method,
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
  // Volume calculation based on training frequency, intensity, duration, and years
  const trainingFrequency = parseInt(physicalData.training_frequency || "0");
  const trainingIntensity = parseInt(physicalData.training_intensity || "0");
  const trainingDuration = parseInt(physicalData.training_duration || "0");
  const trainingYears = parseInt(physicalData.training_years || "0");

  // More comprehensive volume calculation including duration
  const volume = Math.min(
    (trainingFrequency * trainingIntensity * (trainingDuration / 60)) / 10 +
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

  // Endurance calculation with heart rate data and running distance
  let endurance = 0;
  // Base from training frequency and years
  endurance += trainingFrequency * 3;
  endurance += Math.min(trainingYears * 2, 20);

  // Heart rate data - lower resting heart rate indicates better cardiovascular fitness
  const restingHeartRate = parseInt(physicalData.resting_heart_rate || "60");
  const maxHeartRate = parseInt(physicalData.max_heart_rate || "180");
  const heartRateReserve = maxHeartRate - restingHeartRate;

  // Heart rate contribution - lower resting heart rate is better
  if (restingHeartRate < 50) endurance += 20;
  else if (restingHeartRate < 60) endurance += 15;
  else if (restingHeartRate < 70) endurance += 10;
  else if (restingHeartRate < 80) endurance += 5;

  // Heart rate reserve contribution - higher reserve is better
  endurance += Math.min(heartRateReserve / 5, 15);

  // Running distance contribution
  const runningDistance = parseFloat(physicalData.running_distance || "0");
  endurance += Math.min(runningDistance * 3, 20);

  // Recovery time - faster recovery indicates better endurance
  const recoveryTime = parseInt(physicalData.recovery_time || "10");
  if (recoveryTime < 5) endurance += 10;
  else if (recoveryTime < 10) endurance += 5;
  else if (recoveryTime > 20) endurance -= 5;

  // Adjust for somatotype
  if (physicalData.somatotype.includes("ectomorph")) endurance += 10;
  if (physicalData.somatotype.includes("mesomorph")) endurance += 5;

  // Adjust for sleep and stress
  const sleepQuality = parseInt(healthData.sleep_quality || "0");
  const stressLevel = parseInt(healthData.stress_level || "0");
  endurance += sleepQuality / 10;
  endurance -= stressLevel / 10;

  endurance = Math.max(0, Math.min(endurance, 100));

  // Strength calculation with max lifts data
  let strength = 0;

  // Get max lift values
  const benchPress = parseFloat(physicalData.bench_press || "0");
  const squat = parseFloat(physicalData.squat || "0");
  const deadlift = parseFloat(physicalData.deadlift || "0");
  const pullups = parseInt(physicalData.pullups || "0");

  // Calculate strength based on weight and gender-specific standards
  const weight = parseFloat(personalData.weight || "70");
  const isMale = personalData.gender === "male";

  // Strength-to-weight ratios (simplified)
  const benchRatio = benchPress / weight;
  const squatRatio = squat / weight;
  const deadliftRatio = deadlift / weight;

  // Assign points based on strength-to-weight ratios
  // Bench press contribution
  if (isMale) {
    if (benchRatio > 1.5) strength += 20;
    else if (benchRatio > 1.2) strength += 15;
    else if (benchRatio > 1.0) strength += 10;
    else if (benchRatio > 0.8) strength += 5;
    else strength += benchRatio * 5;
  } else {
    if (benchRatio > 1.1) strength += 20;
    else if (benchRatio > 0.9) strength += 15;
    else if (benchRatio > 0.7) strength += 10;
    else if (benchRatio > 0.5) strength += 5;
    else strength += benchRatio * 8;
  }

  // Squat contribution
  if (isMale) {
    if (squatRatio > 2.0) strength += 20;
    else if (squatRatio > 1.5) strength += 15;
    else if (squatRatio > 1.2) strength += 10;
    else if (squatRatio > 1.0) strength += 5;
    else strength += squatRatio * 5;
  } else {
    if (squatRatio > 1.5) strength += 20;
    else if (squatRatio > 1.2) strength += 15;
    else if (squatRatio > 1.0) strength += 10;
    else if (squatRatio > 0.8) strength += 5;
    else strength += squatRatio * 6;
  }

  // Deadlift contribution
  if (isMale) {
    if (deadliftRatio > 2.5) strength += 20;
    else if (deadliftRatio > 2.0) strength += 15;
    else if (deadliftRatio > 1.5) strength += 10;
    else if (deadliftRatio > 1.2) strength += 5;
    else strength += deadliftRatio * 4;
  } else {
    if (deadliftRatio > 2.0) strength += 20;
    else if (deadliftRatio > 1.5) strength += 15;
    else if (deadliftRatio > 1.2) strength += 10;
    else if (deadliftRatio > 1.0) strength += 5;
    else strength += deadliftRatio * 5;
  }

  // Pull-ups contribution
  if (isMale) {
    if (pullups > 20) strength += 15;
    else if (pullups > 15) strength += 12;
    else if (pullups > 10) strength += 8;
    else if (pullups > 5) strength += 4;
    else strength += pullups * 0.5;
  } else {
    if (pullups > 15) strength += 15;
    else if (pullups > 10) strength += 12;
    else if (pullups > 5) strength += 8;
    else if (pullups > 2) strength += 4;
    else strength += pullups * 1;
  }

  // Base from training intensity if no lift data provided
  if (benchPress === 0 && squat === 0 && deadlift === 0 && pullups === 0) {
    strength += trainingIntensity / 2;

    // Adjust for somatotype
    if (physicalData.somatotype.includes("mesomorph")) strength += 25;
    if (physicalData.somatotype.includes("endomorph")) strength += 15;

    // Adjust for gender (simplified approach)
    if (isMale) strength += 10;
  } else {
    // Minor adjustments for somatotype
    if (physicalData.somatotype.includes("mesomorph")) strength += 10;
    if (physicalData.somatotype.includes("endomorph")) strength += 5;
  }

  // Adjust for age
  if (age < 30) strength += 10;
  else if (age < 40) strength += 5;
  else if (age < 50) strength += 2;
  else if (age >= 60) strength -= 5;

  strength = Math.max(0, Math.min(strength, 100));

  // Adaptability calculation with more comprehensive factors
  let adaptability = 40; // Base value

  // Direct adaptability assessment from user input
  const adaptabilityToChange = parseInt(
    healthData.adaptability_to_change || "50",
  );
  adaptability += adaptabilityToChange * 0.3; // 30% weight to self-assessment

  // Recovery ability significantly affects adaptability
  const recoveryAbility = healthData.recovery_ability || "average";
  if (recoveryAbility === "excellent") adaptability += 20;
  else if (recoveryAbility === "good") adaptability += 15;
  else if (recoveryAbility === "average") adaptability += 10;
  else if (recoveryAbility === "poor") adaptability += 5;

  // Sleep quality improves adaptability
  adaptability += sleepQuality / 10;

  // Stress reduces adaptability
  adaptability -= stressLevel / 8;

  // Training variety (based on sport-specific skills)
  const sportSpecific = physicalData.sport_specific || "";
  const sportVariety = sportSpecific.split(",").length;
  adaptability += Math.min(sportVariety * 3, 15);

  // Medical conditions reduce adaptability
  const medicalConditionsCount = healthData.medical_conditions.filter(
    (c: string) => c !== "none",
  ).length;
  adaptability -= medicalConditionsCount * 3;

  // Age affects adaptability
  if (age > 60) adaptability -= 15;
  else if (age > 50) adaptability -= 12;
  else if (age > 40) adaptability -= 8;
  else if (age > 30) adaptability -= 4;

  // Training experience can improve adaptability (up to a point)
  if (trainingYears > 0 && trainingYears <= 5) {
    adaptability += trainingYears * 2; // More adaptable as you gain experience
  } else if (trainingYears > 5) {
    adaptability += 10; // Experienced athletes have good adaptability
  }

  adaptability = Math.max(0, Math.min(adaptability, 100));

  // Progress - calculated based on user-reported progress rate and tracking methods
  let progress = 30; // Base value

  // User-reported progress rate
  const progressRate = healthData.progress_rate || "steady";
  if (progressRate === "veryfast") progress += 40;
  else if (progressRate === "fast") progress += 30;
  else if (progressRate === "steady") progress += 20;
  else if (progressRate === "slow") progress += 10;
  else if (progressRate === "none") progress += 0;

  // Tracking method affects progress measurement accuracy
  const trackingMethodProgress = healthData.tracking_method || "mental";
  if (trackingMethodProgress === "coach") progress += 15;
  else if (trackingMethodProgress === "app") progress += 12;
  else if (trackingMethodProgress === "journal") progress += 10;
  else if (trackingMethodProgress === "mental") progress += 5;
  else if (trackingMethodProgress === "none") progress -= 5;

  // Training factors still contribute
  progress += trainingFrequency * 1; // Frequency contributes to progress
  progress += trainingIntensity / 10; // Intensity contributes to progress

  // Training years indicate historical progress
  if (trainingYears > 0) {
    // Diminishing returns for very experienced athletes
    if (trainingYears <= 3) progress += trainingYears * 2;
    else if (trainingYears <= 10) progress += 6 + (trainingYears - 3);
    else progress += 13; // Maximum bonus for experience
  }

  progress = Math.max(0, Math.min(progress, 100));

  // Coordination - more comprehensive calculation with direct assessment
  let coordination = 30; // Base value

  // Direct coordination level assessment
  const coordinationLevel = physicalData.coordination_level || "medium";
  if (coordinationLevel === "expert") coordination += 40;
  else if (coordinationLevel === "advanced") coordination += 30;
  else if (coordinationLevel === "medium") coordination += 20;
  else if (coordinationLevel === "beginner") coordination += 10;

  // Sport-specific skills that require coordination
  const sportSpecificForCoord =
    physicalData.sport_specific?.toString().toLowerCase() || "";
  if (
    sportSpecificForCoord.includes("tennis") ||
    sportSpecificForCoord.includes("badminton")
  )
    coordination += 8;
  if (
    sportSpecificForCoord.includes("gymnastics") ||
    sportSpecificForCoord.includes("dance")
  )
    coordination += 10;
  if (
    sportSpecificForCoord.includes("martial") ||
    sportSpecificForCoord.includes("boxing")
  )
    coordination += 7;
  if (
    sportSpecificForCoord.includes("soccer") ||
    sportSpecificForCoord.includes("football")
  )
    coordination += 6;
  if (
    sportSpecificForCoord.includes("basketball") ||
    sportSpecificForCoord.includes("volleyball")
  )
    coordination += 8;
  if (
    sportSpecificForCoord.includes("climbing") ||
    sportSpecificForCoord.includes("parkour")
  )
    coordination += 9;

  // Balance level affects coordination
  const balanceLevel = physicalData.balance_level || "medium";
  if (balanceLevel === "excellent") coordination += 10;
  else if (balanceLevel === "good") coordination += 7;
  else if (balanceLevel === "medium") coordination += 4;
  else if (balanceLevel === "poor") coordination += 0;

  // Family sports background affects coordination (genetic component)
  const familySports = familyData.family_sports?.toString().toLowerCase() || "";
  if (familySports.includes("tennis") || familySports.includes("badminton"))
    coordination += 3;
  if (familySports.includes("gymnastics") || familySports.includes("dance"))
    coordination += 4;
  if (familySports.includes("martial") || familySports.includes("boxing"))
    coordination += 2;
  if (familySports.includes("soccer") || familySports.includes("football"))
    coordination += 2;

  // Age affects coordination
  if (age < 20) coordination += 5;
  else if (age > 60) coordination -= 10;
  else if (age > 50) coordination -= 7;
  else if (age > 40) coordination -= 3;

  coordination = Math.max(0, Math.min(coordination, 100));

  // Agility - comprehensive calculation including reaction time
  let agility = 30; // Base value

  // Reaction time is a key component of agility
  const reactionTime = physicalData.reaction_time || "average";
  if (reactionTime === "veryfast") agility += 25;
  else if (reactionTime === "fast") agility += 20;
  else if (reactionTime === "average") agility += 10;
  else if (reactionTime === "slow") agility += 5;

  // Sport-specific skills that require agility
  const sportSpecificForAgility =
    physicalData.sport_specific?.toString().toLowerCase() || "";
  if (
    sportSpecificForAgility.includes("tennis") ||
    sportSpecificForAgility.includes("badminton")
  )
    agility += 7;
  if (
    sportSpecificForAgility.includes("martial") ||
    sportSpecificForAgility.includes("boxing")
  )
    agility += 8;
  if (
    sportSpecificForAgility.includes("soccer") ||
    sportSpecificForAgility.includes("football")
  )
    agility += 8;
  if (
    sportSpecificForAgility.includes("basketball") ||
    sportSpecificForAgility.includes("hockey")
  )
    agility += 9;
  if (
    sportSpecificForAgility.includes("sprinting") ||
    sportSpecificForAgility.includes("track")
  )
    agility += 7;

  // Age significantly affects agility
  if (age < 20) agility += 15;
  else if (age < 30) agility += 12;
  else if (age < 40) agility += 8;
  else if (age < 50) agility += 5;
  else if (age < 60) agility += 2;
  else agility -= 5;

  // Somatotype affects agility
  if (physicalData.somatotype.includes("ectomorph")) agility += 8;
  if (physicalData.somatotype.includes("mesomorph")) agility += 5;
  if (physicalData.somatotype.includes("endomorph")) agility -= 3;

  // Training intensity affects agility
  agility += trainingIntensity / 15;

  // Balance affects agility
  const balanceLevelForAgility = physicalData.balance_level || "medium";
  if (balanceLevelForAgility === "excellent") agility += 8;
  else if (balanceLevelForAgility === "good") agility += 5;
  else if (balanceLevelForAgility === "medium") agility += 3;

  // Recovery ability affects agility performance
  const recoveryAbilityAgility = healthData.recovery_ability || "average";
  if (recoveryAbilityAgility === "excellent") agility += 4;
  else if (recoveryAbilityAgility === "good") agility += 2;

  agility = Math.max(0, Math.min(agility, 100));

  // Consistency based on self-reported consistency and tracking methods
  let consistency = 0;

  // Self-reported training consistency is the primary factor
  const trainingConsistency = healthData.training_consistency || "moderate";
  if (trainingConsistency === "veryhigh") consistency += 70;
  else if (trainingConsistency === "high") consistency += 55;
  else if (trainingConsistency === "moderate") consistency += 40;
  else if (trainingConsistency === "low") consistency += 25;
  else if (trainingConsistency === "verylow") consistency += 10;

  // Tracking method affects consistency
  const trackingMethodConsistency = healthData.tracking_method || "mental";
  if (trackingMethodConsistency === "coach") consistency += 15;
  else if (trackingMethodConsistency === "app") consistency += 12;
  else if (trackingMethodConsistency === "journal") consistency += 10;
  else if (trackingMethodConsistency === "mental") consistency += 5;

  // Training frequency still contributes to consistency
  consistency += Math.min(trainingFrequency * 3, 15);

  // Training years indicate long-term consistency
  if (trainingYears >= 5) consistency += 10;
  else if (trainingYears >= 2) consistency += 5;

  consistency = Math.max(0, Math.min(consistency, 100));

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
  const metabolicEfficiency = calculateMetabolicEfficiency(
    personalData,
    physicalData,
    healthData,
  );
  const injuryRisk = calculateInjuryRisk(
    personalData,
    physicalData,
    healthData,
  );
  const mentalToughness = calculateMentalToughness(healthData, physicalData);

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
    metabolicEfficiency,
    injuryRisk,
    mentalToughness,
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

// Helper function to calculate metabolic efficiency
function calculateMetabolicEfficiency(
  personalData: any,
  physicalData: any,
  healthData: any,
): number {
  let efficiency = 50; // Base value

  // Age factor - metabolism slows with age
  const age = parseInt(personalData.age || "0");
  if (age < 25) efficiency += 15;
  else if (age < 35) efficiency += 10;
  else if (age < 45) efficiency += 5;
  else if (age > 55) efficiency -= 10;
  else if (age > 65) efficiency -= 15;

  // Body composition factor
  if (physicalData.somatotype.includes("ectomorph")) efficiency += 15;
  if (physicalData.somatotype.includes("mesomorph")) efficiency += 10;
  if (physicalData.somatotype.includes("endomorph")) efficiency -= 5;

  // Training intensity and frequency
  const trainingIntensity = parseInt(physicalData.training_intensity || "0");
  const trainingFrequency = parseInt(physicalData.training_frequency || "0");
  efficiency += trainingIntensity / 10 + trainingFrequency * 2;

  // Sleep quality affects metabolism
  const sleepQuality = parseInt(healthData.sleep_quality || "0");
  efficiency += sleepQuality / 5;

  // Stress level affects metabolism negatively
  const stressLevel = parseInt(healthData.stress_level || "0");
  efficiency -= stressLevel / 5;

  return Math.max(0, Math.min(100, efficiency));
}

// Helper function to calculate injury risk
function calculateInjuryRisk(
  personalData: any,
  physicalData: any,
  healthData: any,
): number {
  let risk = 50; // Base value (higher is worse)

  // Age factor - injury risk increases with age
  const age = parseInt(personalData.age || "0");
  if (age > 50) risk += 20;
  else if (age > 40) risk += 15;
  else if (age > 30) risk += 10;
  else if (age < 20) risk += 5; // Young athletes also have some risk due to growth

  // Training intensity vs recovery balance
  const trainingIntensity = parseInt(physicalData.training_intensity || "0");
  const recoveryAbility = healthData.recovery_ability || "average";

  // High intensity with poor recovery is risky
  if (trainingIntensity > 80) {
    if (recoveryAbility === "poor") risk += 25;
    else if (recoveryAbility === "average") risk += 15;
    else if (recoveryAbility === "good") risk += 5;
  }

  // Medical conditions increase risk
  const medicalConditions = healthData.medical_conditions || [];
  risk += medicalConditions.filter((c: string) => c !== "none").length * 5;

  // Sleep quality affects recovery and injury risk
  const sleepQuality = parseInt(healthData.sleep_quality || "0");
  risk -= sleepQuality / 5;

  // Stress increases injury risk
  const stressLevel = parseInt(healthData.stress_level || "0");
  risk += stressLevel / 5;

  // Training experience reduces risk
  const trainingYears = parseInt(physicalData.training_years || "0");
  risk -= Math.min(trainingYears * 2, 20);

  return Math.max(0, Math.min(100, risk));
}

// Helper function to calculate mental toughness
function calculateMentalToughness(healthData: any, physicalData: any): number {
  let toughness = 40; // Base value

  // Adaptability to change is a key component of mental toughness
  const adaptabilityToChange = parseInt(
    healthData.adaptability_to_change || "50",
  );
  toughness += adaptabilityToChange * 0.3;

  // Stress management is crucial for mental toughness
  const stressLevel = parseInt(healthData.stress_level || "50");
  toughness -= stressLevel * 0.2;
  toughness += (100 - stressLevel) * 0.1; // Ability to handle stress

  // Training consistency shows discipline
  const trainingConsistency = healthData.training_consistency || "moderate";
  if (trainingConsistency === "veryhigh") toughness += 20;
  else if (trainingConsistency === "high") toughness += 15;
  else if (trainingConsistency === "moderate") toughness += 10;
  else if (trainingConsistency === "low") toughness += 5;

  // Training intensity shows willingness to push limits
  const trainingIntensity = parseInt(physicalData.training_intensity || "0");
  toughness += trainingIntensity / 10;

  // Training years indicate perseverance
  const trainingYears = parseInt(physicalData.training_years || "0");
  toughness += Math.min(trainingYears, 10);

  return Math.max(0, Math.min(100, toughness));
}

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
