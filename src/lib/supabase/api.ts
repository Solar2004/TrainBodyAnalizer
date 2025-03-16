import { createClient } from "../../../supabase/server";
import { UserProfile, HistoryEntry, ParameterName } from "@/types";

/**
 * Fetch user profile data from Supabase
 */
export async function getUserProfile(
  userId: string,
): Promise<UserProfile | null> {
  const supabase = await createClient();

  // Fetch basic user data
  const { data: userData, error: userError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (userError) {
    console.error("Error fetching user data:", userError);
    // Continue anyway, we'll use mock data if needed
  }

  // Fetch metrics data
  const { data: metricsData, error: metricsError } = await supabase
    .from("metrics")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (metricsError) {
    console.error("Error fetching metrics data:", metricsError);
    // Return null or fallback to mock data for development
    return null;
  }

  // Fetch genetic data
  const { data: geneticData, error: geneticError } = await supabase
    .from("genetic_data")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (geneticError && geneticError.code !== "PGRST116") {
    // PGRST116 is "no rows returned"
    console.error("Error fetching genetic data:", geneticError);
  }

  // If we have real data, construct the profile
  if (metricsData) {
    // Map database fields to our UserProfile structure
    const profile: UserProfile = {
      id: userId,
      fitScore: metricsData.fit_score || 0,
      dnaGrade: metricsData.dna_grade || "C",
      parameters: {
        volume: {
          name: "volume",
          value: metricsData.volume || 0,
          description:
            "Total training volume considering frequency, duration and intensity",
        },
        potential: {
          name: "potential",
          value: metricsData.potential || 0,
          description: "Genetic potential and capacity for future improvement",
        },
        endurance: {
          name: "endurance",
          value: metricsData.endurance || 0,
          description: "Cardiovascular and muscular endurance",
        },
        strength: {
          name: "strength",
          value: metricsData.strength || 0,
          description:
            "Overall muscular strength across different muscle groups",
        },
        adaptability: {
          name: "adaptability",
          value: metricsData.adaptability || 0,
          description:
            "Ability to adapt to different training stimuli and conditions",
        },
        progress: {
          name: "progress",
          value: metricsData.progress || 0,
          description: "Rate of improvement over time",
        },
        coordination: {
          name: "coordination",
          value: metricsData.coordination || 0,
          description: "Motor and neuromuscular coordination",
        },
        agility: {
          name: "agility",
          value: metricsData.agility || 0,
          description: "Ability to change direction and position quickly",
        },
        consistency: {
          name: "consistency",
          value: metricsData.consistency || 0,
          description: "Regularity and consistency in training",
        },
      },
      // Additional metrics from genetic data if available
      testosterone: geneticData?.testosterone,
      geneticOrigins: geneticData?.origins
        ? JSON.parse(geneticData.origins)
        : undefined,
      geneticMutations: geneticData?.mutations
        ? JSON.parse(geneticData.mutations)
        : undefined,
      muscleStructure: geneticData?.muscle_structure,
      boneDensity: geneticData?.bone_density,
    };

    return profile;
  }

  return null;
}

/**
 * Fetch user metrics history from Supabase
 */
export async function getUserHistory(
  userId: string,
  days: number = 30,
): Promise<HistoryEntry[]> {
  const supabase = await createClient();

  // Calculate date range
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  // Fetch metrics history
  const { data, error } = await supabase
    .from("metrics")
    .select("*")
    .eq("user_id", userId)
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString())
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching metrics history:", error);
    return [];
  }

  // Map database records to HistoryEntry format
  const history: HistoryEntry[] = data.map((record) => {
    const parameters: Record<ParameterName, number> = {
      volume: record.volume || 0,
      potential: record.potential || 0,
      endurance: record.endurance || 0,
      strength: record.strength || 0,
      adaptability: record.adaptability || 0,
      progress: record.progress || 0,
      coordination: record.coordination || 0,
      agility: record.agility || 0,
      consistency: record.consistency || 0,
    };

    return {
      date: new Date(record.created_at).toISOString().split("T")[0],
      fitScore: record.fit_score || 0,
      parameters,
    };
  });

  return history;
}

/**
 * Save user metrics to Supabase
 */
export async function saveUserMetrics(
  userId: string,
  metrics: Partial<Record<ParameterName, number>>,
  fitScore?: number,
): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.from("metrics").insert({
    user_id: userId,
    fit_score: fitScore,
    ...metrics,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Error saving metrics:", error);
    return false;
  }

  return true;
}

/**
 * Save genetic data to Supabase
 */
export async function saveGeneticData(
  userId: string,
  geneticData: {
    testosterone?: number;
    origins?: string[];
    mutations?: string[];
    muscle_structure?: string;
    bone_density?: number;
  },
): Promise<boolean> {
  const supabase = await createClient();

  // Check if record exists
  const { data, error: fetchError } = await supabase
    .from("genetic_data")
    .select("id")
    .eq("user_id", userId)
    .single();

  const payload = {
    user_id: userId,
    testosterone: geneticData.testosterone,
    origins: geneticData.origins ? JSON.stringify(geneticData.origins) : null,
    mutations: geneticData.mutations
      ? JSON.stringify(geneticData.mutations)
      : null,
    muscle_structure: geneticData.muscle_structure,
    bone_density: geneticData.bone_density,
    updated_at: new Date().toISOString(),
  };

  let error;

  if (data) {
    // Update existing record
    const { error: updateError } = await supabase
      .from("genetic_data")
      .update(payload)
      .eq("id", data.id);

    error = updateError;
  } else {
    // Insert new record
    const { error: insertError } = await supabase.from("genetic_data").insert({
      ...payload,
      created_at: new Date().toISOString(),
    });

    error = insertError;
  }

  if (error) {
    console.error("Error saving genetic data:", error);
    return false;
  }

  return true;
}
