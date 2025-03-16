import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Droplet, Activity, Dna, Heart } from "lucide-react";

interface MetabolicHealthCardProps {
  basalMetabolism?: number; // kcal/day
  hydrationLevel?: number; // 0-100
  insulinSensitivity?: number; // 0-100
  ironLevels?: number; // 0-100
  chronicInflammation?: number; // 0-100
  metabolicAge?: number; // years
}

export function MetabolicHealthCard({
  basalMetabolism = 1800,
  hydrationLevel = 70,
  insulinSensitivity = 65,
  ironLevels = 80,
  chronicInflammation = 25,
  metabolicAge,
}: MetabolicHealthCardProps) {
  // Helper function to determine status color
  const getStatusColor = (value: number, isInverted: boolean = false) => {
    if (isInverted) {
      if (value <= 30) return "text-green-500";
      if (value <= 60) return "text-yellow-500";
      return "text-red-500";
    } else {
      if (value >= 70) return "text-green-500";
      if (value >= 40) return "text-yellow-500";
      return "text-red-500";
    }
  };

  // Helper function to determine progress color
  const getProgressColor = (value: number, isInverted: boolean = false) => {
    if (isInverted) {
      if (value <= 30) return "bg-green-500";
      if (value <= 60) return "bg-yellow-500";
      return "bg-red-500";
    } else {
      if (value >= 70) return "bg-green-500";
      if (value >= 40) return "bg-yellow-500";
      return "bg-red-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dna className="h-5 w-5 text-primary" />
          Metabolic Health
        </CardTitle>
        <CardDescription>
          Key indicators of your metabolic health and function
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basal Metabolism */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Basal Metabolism</span>
            </div>
            <span className="font-semibold">{basalMetabolism} kcal/day</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your resting energy expenditure - calories burned at complete rest
          </p>
        </div>

        {/* Hydration Level */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Droplet className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Hydration Level</span>
            </div>
            <span className={`font-semibold ${getStatusColor(hydrationLevel)}`}>
              {hydrationLevel}%
            </span>
          </div>
          <Progress
            value={hydrationLevel}
            className="h-2"
            indicatorClassName={getProgressColor(hydrationLevel)}
          />
          <p className="text-sm text-muted-foreground">
            Your body's water balance - affects energy, recovery, and nutrient
            transport
          </p>
        </div>

        {/* Insulin Sensitivity */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-500" />
              <span className="font-medium">Insulin Sensitivity</span>
            </div>
            <span
              className={`font-semibold ${getStatusColor(insulinSensitivity)}`}
            >
              {insulinSensitivity}%
            </span>
          </div>
          <Progress
            value={insulinSensitivity}
            className="h-2"
            indicatorClassName={getProgressColor(insulinSensitivity)}
          />
          <p className="text-sm text-muted-foreground">
            How efficiently your body responds to insulin - key for metabolism
            and energy
          </p>
        </div>

        {/* Iron Levels */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Dna className="h-4 w-4 text-red-500" />
              <span className="font-medium">Iron Levels</span>
            </div>
            <span className={`font-semibold ${getStatusColor(ironLevels)}`}>
              {ironLevels}%
            </span>
          </div>
          <Progress
            value={ironLevels}
            className="h-2"
            indicatorClassName={getProgressColor(ironLevels)}
          />
          <p className="text-sm text-muted-foreground">
            Essential for oxygen transport and energy production
          </p>
        </div>

        {/* Chronic Inflammation */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="font-medium">Chronic Inflammation</span>
            </div>
            <span
              className={`font-semibold ${getStatusColor(
                chronicInflammation,
                true,
              )}`}
            >
              {chronicInflammation}%
            </span>
          </div>
          <Progress
            value={chronicInflammation}
            className="h-2"
            indicatorClassName={getProgressColor(chronicInflammation, true)}
          />
          <p className="text-sm text-muted-foreground">
            Persistent low-grade inflammation - affects recovery and long-term
            health
          </p>
        </div>

        {/* Metabolic Age */}
        {metabolicAge && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-primary" />
                <span className="font-medium">Metabolic Age</span>
              </div>
              <span className="font-semibold">{metabolicAge} years</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your body's biological age based on metabolic function
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
