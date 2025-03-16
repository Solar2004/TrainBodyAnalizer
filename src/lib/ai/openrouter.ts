import { HistoryEntry, UserProfile } from "@/types";

// Define the OpenRouter API URL
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Use environment variable for API key
const OPENROUTER_API_KEY =
  process.env.OPENROUTER_API_KEY ||
  "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";

// Define the models to use
const MODELS = {
  primary: "google/gemini-2.0-pro-exp-02-05:free",
  backup: "openai/gpt-4o-mini",
  simple: "mistralai/mistral-large-latest:free",
};

// Define the types for the analysis results
interface AnalysisResult {
  fitScore: number;
  dnaGrade: string;
  potential: number;
  recommendations: Recommendation[];
  dietaryRecommendations?: Recommendation[];
  insights: {
    strengths: string[];
    weaknesses: string[];
    genetic_advantages: string[];
    limiting_factors: string[];
    progress_rate: string;
    dietary_patterns?: {
      protein_intake: string;
      carb_timing: string;
      meal_frequency: string;
      hydration: string;
    };
  };
  genetic_insights?: {
    ancestry_influence: {
      primary_influences: string[];
      athletic_predispositions: string[];
      notable_traits: string;
    };
    inherited_traits: {
      dominant_somatotype: string;
      physical_advantages: string[];
      potential_limitations: string[];
    };
    genetic_markers: {
      confirmed: string[];
      predicted: string[];
    };
  };
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: string;
  impact: number;
  isImplemented: boolean;
}

/**
 * Analyze user data using OpenRouter API
 */
export async function analyzeUserData(
  profile: UserProfile,
  history: HistoryEntry[],
  trainingLogs?: any[],
  dietaryLogs?: any[],
  familyMembers?: any[],
): Promise<AnalysisResult> {
  try {
    // Build the prompt for the AI model
    const prompt = buildComprehensivePrompt({
      profile,
      history,
      trainingLogs,
      dietaryLogs,
      familyMembers,
    });

    // Call the OpenRouter API
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://trainbodyanalyzer.com", // Replace with your actual domain
        "X-Title": "Train Body Analyzer",
      },
      body: JSON.stringify({
        model: MODELS.primary,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2, // Low temperature for more deterministic results
      }),
    });

    if (!response.ok) {
      throw new Error(
        `OpenRouter API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    const result = data.choices[0].message.content;

    // Parse and validate the AI response
    return processAIResponse(JSON.parse(result));
  } catch (error) {
    console.error("Error analyzing user data:", error);
    return fallbackAnalysis(profile);
  }
}

/**
 * Build a comprehensive prompt for the AI model
 */
function buildComprehensivePrompt(data: {
  profile: UserProfile;
  history: HistoryEntry[];
  trainingLogs?: any[];
  dietaryLogs?: any[];
  familyMembers?: any[];
}): string {
  const { profile, history, trainingLogs, dietaryLogs, familyMembers } = data;

  // Convert history to a more concise format for the prompt
  const historyData = history.map((entry) => ({
    date: entry.date,
    fitScore: entry.fitScore,
    parameters: entry.parameters,
  }));

  // Build the prompt object
  const promptObject = {
    user_id: profile.id,
    timestamp: new Date().toISOString(),
    task: "analyze_fitness",
    data: {
      physical_metrics: {
        volume: profile.parameters.volume.value,
        potential: profile.parameters.potential.value,
        endurance: profile.parameters.endurance.value,
        strength: profile.parameters.strength.value,
        adaptability: profile.parameters.adaptability.value,
        progress: profile.parameters.progress.value,
        coordination: profile.parameters.coordination.value,
        agility: profile.parameters.agility.value,
        consistency: profile.parameters.consistency.value,
      },
      genetic_data: {
        dna_haplogroup: profile.geneticOrigins
          ? profile.geneticOrigins.join(", ")
          : "Unknown",
        known_polymorphisms: profile.geneticMutations || [],
        testosterone: profile.testosterone,
        muscle_structure: profile.muscleStructure,
        bone_density: profile.boneDensity,
      },
      history_data: historyData,
      training_logs: trainingLogs || [],
      dietary_logs: dietaryLogs || [],
      family_members: familyMembers || [],
      previous_scores: {
        fit_score_history: history.map((h) => h.fitScore),
        dna_grade: profile.dnaGrade,
      },
    },
    output_format: {
      fit_score: "number",
      dna_grade: "letter",
      potential: "decimal",
      recommendations: "array",
      dietary_recommendations: "array",
      genetic_insights: "object",
      insights: "object",
    },
    instructions: `
You are a fitness and genetic analysis AI for Train Body Analyzer.

Analyze the user's data and provide the following:

1. Calculate the Fit Score (0-1000) based on the 9 parameters using this formula:
   Fit Score = ((Volume × 0.10) + (Potential × 0.15) + (Endurance × 0.15) + (Strength × 0.15) + 
               (Adaptability × 0.10) + (Progress × 0.05) + (Coordination × 0.05) + 
               (Agility × 0.05) + (Consistency × 0.10)) × 10

2. Determine the DNA Grade (E, C, B, A, S, SS) based on genetic data and performance metrics.
   - SS: Exceptional genetic potential (99-100 percentile)
   - S: Superior genetic potential (95-98 percentile)
   - A: Above average genetic potential (85-94 percentile)
   - B: Good genetic potential (70-84 percentile)
   - C: Average genetic potential (40-69 percentile)
   - E: Below average genetic potential (0-39 percentile)

3. Calculate potential (0-1.0) using:
   Potential = BaseGenetic × AgeFactor × (1 - (CurrentFitScore / MaxTheoretical)²) × RecoveryQuality
   Where:
   - BaseGenetic: Value based on DNA Grade (SS=1.0, S=0.9, A=0.8, etc.)
   - AgeFactor: Estimated from performance trends
   - MaxTheoretical: Maximum possible score for their DNA Grade
   - RecoveryQuality: Estimated from training data if available

4. Provide personalized recommendations based on strengths and weaknesses.

5. Analyze genetic insights if genetic data is available.

Respond ONLY with a valid JSON object matching the output_format.
`,
  };

  return JSON.stringify(promptObject);
}

/**
 * Process and validate the AI response
 */
function processAIResponse(response: any): AnalysisResult {
  // Validate response
  if (!response.fit_score || !response.dna_grade) {
    throw new Error("Invalid AI response: missing required fields");
  }

  // Generate IDs for recommendations
  const formattedRecommendations = (response.recommendations || []).map(
    (rec: any, index: number) => ({
      id: `rec-${Date.now()}-${index}`,
      title: rec.title || "Recommendation",
      description: rec.description || "",
      priority: rec.priority || "medium",
      category: rec.category || "general",
      impact: rec.expected_impact || 0.1,
      isImplemented: false,
    }),
  );

  // Format dietary recommendations if present
  const formattedDietaryRecommendations = (
    response.dietary_recommendations || []
  ).map((rec: any, index: number) => ({
    id: `diet-rec-${Date.now()}-${index}`,
    title: rec.title || "Dietary Recommendation",
    description: rec.description || "",
    priority: rec.priority || "medium",
    category: rec.category || "nutrition",
    impact: rec.expected_impact || 0.1,
    isImplemented: false,
  }));

  // Return formatted result
  return {
    fitScore: response.fit_score,
    dnaGrade: response.dna_grade,
    potential: response.potential || 0.5,
    recommendations: formattedRecommendations,
    dietaryRecommendations:
      formattedDietaryRecommendations.length > 0
        ? formattedDietaryRecommendations
        : undefined,
    insights: response.insights || {
      strengths: [],
      weaknesses: [],
      genetic_advantages: [],
      limiting_factors: [],
      progress_rate: "average",
    },
    genetic_insights: response.genetic_insights,
  };
}

/**
 * Fallback analysis when AI fails
 */
function fallbackAnalysis(profile: UserProfile): AnalysisResult {
  // Calculate a basic fit score
  const parameters = profile.parameters;
  const fitScore = Math.round(
    (parameters.volume.value * 0.1 +
      parameters.potential.value * 0.15 +
      parameters.endurance.value * 0.15 +
      parameters.strength.value * 0.15 +
      parameters.adaptability.value * 0.1 +
      parameters.progress.value * 0.05 +
      parameters.coordination.value * 0.05 +
      parameters.agility.value * 0.05 +
      parameters.consistency.value * 0.1) *
      10,
  );

  // Use existing DNA grade or default to 'C'
  const dnaGrade = profile.dnaGrade || "C";

  // Return basic analysis
  return {
    fitScore,
    dnaGrade,
    potential: 0.5, // Default value
    recommendations: [
      {
        id: `rec-${Date.now()}-1`,
        title: "Maintain consistent training",
        description:
          "Focus on maintaining a regular training schedule to build consistency.",
        priority: "high",
        category: "training",
        impact: 0.2,
        isImplemented: false,
      },
      {
        id: `rec-${Date.now()}-2`,
        title: "Balance your training",
        description:
          "Ensure you're working on all aspects of fitness including strength, endurance, and flexibility.",
        priority: "medium",
        category: "training",
        impact: 0.15,
        isImplemented: false,
      },
    ],
    insights: {
      strengths: ["consistency"],
      weaknesses: [],
      genetic_advantages: [],
      limiting_factors: [],
      progress_rate: "average",
    },
  };
}

/**
 * Process dietary description using AI
 */
export async function processDietaryDescription(
  description: string,
): Promise<any> {
  try {
    const prompt = `
      Analyze the following description of a meal and extract:
      1. Macronutrients (proteins, carbohydrates, fats)
      2. Estimated calories
      3. Nutritional quality (high, medium, low)
      4. Potential deficiencies or excesses
      
      Description: "${description}"
      
      Respond only with a valid JSON object with this structure:
      {
        "macros": {
          "proteins": "Xg",
          "carbohydrates": "Xg",
          "fats": "Xg"
        },
        "calories": X,
        "quality": "high/medium/low",
        "observations": ["observation 1", "observation 2"]
      }
    `;

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://trainbodyanalyzer.com",
        "X-Title": "Train Body Analyzer",
      },
      body: JSON.stringify({
        model: MODELS.simple, // Use simpler model for this task
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `OpenRouter API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    const result = data.choices[0].message.content;

    return JSON.parse(result);
  } catch (error) {
    console.error("Error analyzing dietary description:", error);
    return fallbackDietaryAnalysis(description);
  }
}

/**
 * Fallback dietary analysis
 */
function fallbackDietaryAnalysis(description: string): any {
  return {
    macros: {
      proteins: "unknown",
      carbohydrates: "unknown",
      fats: "unknown",
    },
    calories: 0,
    quality: "medium",
    observations: ["Unable to analyze meal description"],
  };
}
