// Core parameter types for the Train Body Analyzer
export interface BodyParameter {
  name: string;
  value: number; // 0-100 scale
  description: string;
}

export type ParameterName =
  | "volume"
  | "potential"
  | "endurance"
  | "strength"
  | "adaptability"
  | "progress"
  | "coordination"
  | "agility"
  | "consistency";

export interface UserProfile {
  id: string;
  fitScore: number; // 0-1000
  dnaGrade: "E" | "C" | "B" | "A" | "S" | "SS";
  parameters: Record<ParameterName, BodyParameter>;
  // Additional metrics
  testosterone?: number;
  geneticOrigins?: string[];
  geneticMutations?: string[];
  muscleStructure?: string;
  boneDensity?: number;
}

export interface HistoryEntry {
  date: string;
  fitScore: number;
  parameters: Record<ParameterName, number>;
  // Additional metrics for history tracking
  testosterone?: number;
  boneDensity?: number;
}

export interface GeneticProfile {
  origins: string[];
  mutations: string[];
  muscleStructure: string;
  boneDensity: number;
  testosterone: number;
  metabolismType?: string;
  recoverySpeed?: string;
  injuryRisk?: number; // 0-100 scale
}

export interface BiomechanicalProfile {
  posture: number; // 0-100 scale
  flexibility: number; // 0-100 scale
  balance: number; // 0-100 scale
  symmetry: number; // 0-100 scale
  movementEfficiency: number; // 0-100 scale
}

export interface BiochemicalProfile {
  testosterone: number; // ng/dL
  cortisol?: number; // μg/dL
  growthHormone?: number; // ng/mL
  insulinSensitivity?: number; // 0-100 scale
  inflammationMarkers?: number; // 0-100 scale
  oxidativeStress?: number; // 0-100 scale
}

export interface TrainingProfile {
  volume: number; // 0-100 scale
  intensity: number; // 0-100 scale
  frequency: number; // days per week
  consistency: number; // 0-100 scale
  technique: number; // 0-100 scale
  periodization: number; // 0-100 scale
  recoveryQuality: number; // 0-100 scale
}

export interface NutritionProfile {
  proteinIntake: number; // g/kg of bodyweight
  calorieBalance: number; // % of maintenance
  mealTiming: number; // 0-100 scale
  hydration: number; // 0-100 scale
  micronutrientQuality: number; // 0-100 scale
  supplementStrategy: number; // 0-100 scale
}
