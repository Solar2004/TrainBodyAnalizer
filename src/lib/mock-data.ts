import { UserProfile, HistoryEntry, ParameterName } from "@/types";

// Generate mock data for the user profile
export function getMockUserProfile(): UserProfile {
  return {
    id: "user-1",
    fitScore: 720,
    dnaGrade: "A",
    parameters: {
      volume: {
        name: "volume",
        value: 75,
        description:
          "Total training volume considering frequency, duration and intensity",
      },
      potential: {
        name: "potential",
        value: 85,
        description: "Genetic potential and capacity for future improvement",
      },
      endurance: {
        name: "endurance",
        value: 68,
        description: "Cardiovascular and muscular endurance",
      },
      strength: {
        name: "strength",
        value: 82,
        description: "Overall muscular strength across different muscle groups",
      },
      adaptability: {
        name: "adaptability",
        value: 77,
        description:
          "Ability to adapt to different training stimuli and conditions",
      },
      progress: {
        name: "progress",
        value: 65,
        description: "Rate of improvement over time",
      },
      coordination: {
        name: "coordination",
        value: 70,
        description: "Motor and neuromuscular coordination",
      },
      agility: {
        name: "agility",
        value: 72,
        description: "Ability to change direction and position quickly",
      },
      consistency: {
        name: "consistency",
        value: 80,
        description: "Regularity and consistency in training",
      },
    },
    testosterone: 650,
    geneticOrigins: ["Mediterranean", "Northern European", "West African"],
    geneticMutations: ["ACTN3 R577X", "ACE I/D", "PPARGC1A Gly482Ser"],
    muscleStructure: "Mixed fiber type (50% fast-twitch, 50% slow-twitch)",
    boneDensity: 1.3,
  };
}

// Generate mock history data
export function getMockHistoryData(days: number = 30): HistoryEntry[] {
  const history: HistoryEntry[] = [];
  const today = new Date();
  const parameters: ParameterName[] = [
    "volume",
    "potential",
    "endurance",
    "strength",
    "adaptability",
    "progress",
    "coordination",
    "agility",
    "consistency",
  ];

  // Start with base values
  const baseValues: Record<ParameterName, number> = {
    volume: 60,
    potential: 85, // Potential stays relatively constant
    endurance: 55,
    strength: 65,
    adaptability: 70,
    progress: 50,
    coordination: 60,
    agility: 62,
    consistency: 70,
  };

  // Generate entries for each day with slight improvements
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Calculate parameter values with some randomness and general improvement
    const paramValues: Record<ParameterName, number> = {} as Record<
      ParameterName,
      number
    >;
    let totalValue = 0;

    parameters.forEach((param) => {
      // Add improvement factor (more recent days have more improvement)
      const improvementFactor = ((days - i) / days) * 15; // Max 15 points improvement

      // Add some randomness
      const randomFactor = Math.random() * 10 - 5; // -5 to +5

      // Calculate value with constraints
      let value = baseValues[param] + improvementFactor + randomFactor;
      value = Math.max(0, Math.min(100, value)); // Ensure between 0-100

      paramValues[param] = Math.round(value);
      totalValue += value;
    });

    // Calculate fit score based on parameters (simplified)
    const fitScore = Math.round((totalValue / parameters.length) * 10);

    history.push({
      date: date.toISOString().split("T")[0],
      fitScore,
      parameters: paramValues,
    });
  }

  return history;
}
