import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DNAGradeCardProps {
  dnaGrade: string;
  geneticOrigins?: string[];
  geneticMutations?: string[];
  className?: string;
}

export function DNAGradeCard({
  dnaGrade,
  geneticOrigins = [],
  geneticMutations = [],
  className = "",
}: DNAGradeCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          DNA Profile
          <Badge variant="outline" className={getDnaGradeClass(dnaGrade)}>
            Grade {dnaGrade}
          </Badge>
        </CardTitle>
        <CardDescription>Your genetic profile and potential</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Genetic Potential</h4>
            <p className="text-sm text-muted-foreground">
              {getDnaGradeDescription(dnaGrade)}
            </p>
          </div>

          {geneticOrigins.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Genetic Origins</h4>
              <div className="flex flex-wrap gap-2">
                {geneticOrigins.map((origin, index) => (
                  <Badge key={index} variant="secondary">
                    {origin}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {geneticMutations.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">
                Notable Genetic Variants
              </h4>
              <div className="flex flex-wrap gap-2">
                {geneticMutations.map((mutation, index) => (
                  <Badge key={index} variant="outline">
                    {mutation}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                These genetic variants may influence your physical performance
                and response to training.
              </p>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium mb-2">Recommendations</h4>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              {getDnaRecommendations(dnaGrade).map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getDnaGradeClass(grade: string): string {
  switch (grade) {
    case "SS":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "S":
      return "bg-gray-100 text-gray-800 border-gray-300";
    case "A":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "B":
      return "bg-green-100 text-green-800 border-green-300";
    case "C":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "E":
      return "bg-gray-100 text-gray-500 border-gray-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
}

function getDnaGradeDescription(grade: string): string {
  switch (grade) {
    case "SS":
      return "You possess exceptional genetic potential found in less than 1% of the population. Your body has optimal muscle fiber composition, hormone response, and recovery capabilities.";
    case "S":
      return "You have superior genetic potential found in approximately 5% of the population. Your genetic profile indicates excellent adaptability to training and above-average recovery capabilities.";
    case "A":
      return "You have above average genetic potential found in approximately 15% of the population. Your body responds well to training stimuli and has good recovery capabilities.";
    case "B":
      return "You have good genetic potential found in approximately 30% of the population. With consistent training, you can achieve significant improvements in most physical parameters.";
    case "C":
      return "You have average genetic potential found in approximately 40% of the population. Your body responds normally to training stimuli and requires standard recovery periods.";
    case "E":
      return "You have below average genetic potential found in approximately 10% of the population. Your body may require more time to adapt to training stimuli and longer recovery periods.";
    default:
      return "Your genetic potential is currently undetermined.";
  }
}

function getDnaRecommendations(grade: string): string[] {
  const baseRecommendations = [
    "Focus on consistency in training and nutrition",
    "Ensure adequate recovery between training sessions",
    "Monitor your progress and adjust your program accordingly",
  ];

  switch (grade) {
    case "SS":
      return [
        "Your exceptional recovery ability allows for higher training frequency",
        "You can benefit from higher training volume without overtraining",
        "Focus on maximizing your potential through advanced training techniques",
        ...baseRecommendations,
      ];
    case "S":
      return [
        "Your superior recovery ability allows for slightly higher training frequency",
        "You can handle higher training volumes than average",
        "Consider specialized training to maximize your genetic advantages",
        ...baseRecommendations,
      ];
    case "A":
      return [
        "Your above-average recovery allows for moderate to high training frequency",
        "Balance intensity and volume to optimize results",
        "Consider periodization to maximize long-term progress",
        ...baseRecommendations,
      ];
    case "B":
      return [
        "Focus on consistent progressive overload",
        "Pay attention to recovery signals from your body",
        "Consider longer adaptation phases in your training cycles",
        ...baseRecommendations,
      ];
    case "C":
      return [
        "Follow standard training protocols with gradual progression",
        "Ensure adequate recovery between intense training sessions",
        "Focus on technique to maximize efficiency",
        ...baseRecommendations,
      ];
    case "E":
      return [
        "Extend recovery periods between intense training sessions",
        "Focus on quality over quantity in your training",
        "Consider longer adaptation phases before increasing intensity",
        "Pay extra attention to nutrition and recovery strategies",
        ...baseRecommendations,
      ];
    default:
      return baseRecommendations;
  }
}
