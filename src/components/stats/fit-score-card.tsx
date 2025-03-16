import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FitScoreCardProps {
  score: number;
  dnaGrade: string;
  className?: string;
}

export function FitScoreCard({
  score,
  dnaGrade,
  className = "",
}: FitScoreCardProps) {
  // Calculate the level based on the score
  const level = Math.floor(score / 100) + 1;
  const maxLevel = 10;

  // Calculate progress to next level
  const currentLevelMinScore = (level - 1) * 100;
  const nextLevelMinScore = level * 100;
  const progressToNextLevel =
    ((score - currentLevelMinScore) /
      (nextLevelMinScore - currentLevelMinScore)) *
    100;

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">Fit Score</CardTitle>
        <CardDescription>
          Your overall fitness rating based on all parameters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className="text-4xl font-bold">{score}</span>
          <span
            className={`text-2xl font-bold px-3 py-1 rounded ${getDnaGradeClass(dnaGrade)}`}
          >
            DNA: {dnaGrade}
          </span>
        </div>

        <div className="mt-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm">Level {level}</span>
            <span className="text-sm">{progressToNextLevel.toFixed(0)}%</span>
          </div>
          <Progress value={progressToNextLevel} className="h-2" />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>{currentLevelMinScore}</span>
            <span>{nextLevelMinScore}</span>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Your Fit Score places you in the top {getPercentile(score)}% of
            users.
          </p>
          <p className="mt-2">
            DNA Grade {dnaGrade} indicates {getDnaGradeDescription(dnaGrade)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function getDnaGradeClass(grade: string): string {
  switch (grade) {
    case "SS":
      return "bg-yellow-100 text-yellow-800";
    case "S":
      return "bg-gray-100 text-gray-800";
    case "A":
      return "bg-amber-100 text-amber-800";
    case "B":
      return "bg-green-100 text-green-800";
    case "C":
      return "bg-blue-100 text-blue-800";
    case "E":
      return "bg-gray-100 text-gray-500";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getPercentile(score: number): number {
  // This is a placeholder calculation - in a real app, this would be based on actual user data
  return Math.max(0, Math.min(99, 100 - score / 10));
}

function getDnaGradeDescription(grade: string): string {
  switch (grade) {
    case "SS":
      return "exceptional genetic potential, found in less than 1% of the population.";
    case "S":
      return "superior genetic potential, found in approximately 5% of the population.";
    case "A":
      return "above average genetic potential, found in approximately 15% of the population.";
    case "B":
      return "good genetic potential, found in approximately 30% of the population.";
    case "C":
      return "average genetic potential, found in approximately 40% of the population.";
    case "E":
      return "below average genetic potential, found in approximately 10% of the population.";
    default:
      return "undetermined genetic potential.";
  }
}
