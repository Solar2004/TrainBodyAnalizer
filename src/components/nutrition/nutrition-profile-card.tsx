import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Utensils, Clock, Apple, Beef, Fish, Leaf } from "lucide-react";

interface NutritionProfileCardProps {
  dietType?: string;
  mealFrequency?: number;
  proteinIntake?: number; // g/kg of bodyweight
  carbIntake?: number; // % of total calories
  fatIntake?: number; // % of total calories
  fiberIntake?: number; // g/day
  waterIntake?: number; // liters/day
  supplementsUsed?: string[];
  foodSensitivities?: string[];
  nutritionalGoals?: string[];
}

export function NutritionProfileCard({
  dietType = "Mixed",
  mealFrequency = 3,
  proteinIntake = 1.6,
  carbIntake = 45,
  fatIntake = 30,
  fiberIntake = 25,
  waterIntake = 2.5,
  supplementsUsed = [],
  foodSensitivities = [],
  nutritionalGoals = [],
}: NutritionProfileCardProps) {
  // Helper function to determine status color
  const getStatusColor = (
    value: number,
    target: number,
    isInverted: boolean = false,
  ) => {
    const percentage = (value / target) * 100;
    if (isInverted) {
      if (percentage <= 80) return "text-green-500";
      if (percentage <= 120) return "text-yellow-500";
      return "text-red-500";
    } else {
      if (percentage >= 90) return "text-green-500";
      if (percentage >= 70) return "text-yellow-500";
      return "text-red-500";
    }
  };

  // Diet type icon mapping
  const getDietTypeIcon = () => {
    switch (dietType.toLowerCase()) {
      case "vegetarian":
        return <Leaf className="h-4 w-4 text-green-500" />;
      case "vegan":
        return <Leaf className="h-4 w-4 text-green-600" />;
      case "pescatarian":
        return <Fish className="h-4 w-4 text-blue-500" />;
      case "keto":
        return <Beef className="h-4 w-4 text-red-500" />;
      case "paleo":
        return <Apple className="h-4 w-4 text-red-500" />;
      default:
        return <Utensils className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-5 w-5 text-primary" />
          Nutrition Profile
        </CardTitle>
        <CardDescription>
          Your dietary patterns and nutritional intake
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Diet Type & Meal Frequency */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {getDietTypeIcon()}
            <span className="font-medium">Diet Type</span>
          </div>
          <Badge variant="outline">{dietType}</Badge>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">Meal Frequency</span>
          </div>
          <span className="font-semibold">{mealFrequency} meals/day</span>
        </div>

        {/* Macronutrient Distribution */}
        <div className="space-y-4">
          <h4 className="font-medium">Macronutrient Distribution</h4>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Protein</span>
              <span className="text-sm font-medium">
                {proteinIntake} g/kg bodyweight
              </span>
            </div>
            <Progress
              value={Math.min((proteinIntake / 2) * 100, 100)}
              className="h-2 bg-muted"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Carbohydrates</span>
              <span className="text-sm font-medium">
                {carbIntake}% of calories
              </span>
            </div>
            <Progress value={carbIntake} className="h-2 bg-muted" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Fats</span>
              <span className="text-sm font-medium">
                {fatIntake}% of calories
              </span>
            </div>
            <Progress value={fatIntake} className="h-2 bg-muted" />
          </div>
        </div>

        {/* Fiber & Water Intake */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Fiber Intake</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">g/day</span>
              <span
                className={`text-sm font-semibold ${getStatusColor(fiberIntake, 30)}`}
              >
                {fiberIntake}
              </span>
            </div>
            <Progress
              value={(fiberIntake / 40) * 100}
              className="h-1.5 bg-muted"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Water Intake</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">liters/day</span>
              <span
                className={`text-sm font-semibold ${getStatusColor(waterIntake, 3)}`}
              >
                {waterIntake}
              </span>
            </div>
            <Progress
              value={(waterIntake / 4) * 100}
              className="h-1.5 bg-muted"
            />
          </div>
        </div>

        {/* Supplements */}
        {supplementsUsed && supplementsUsed.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Supplements</h4>
            <div className="flex flex-wrap gap-1">
              {supplementsUsed.map((supplement, index) => (
                <Badge key={index} variant="secondary">
                  {supplement}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Food Sensitivities */}
        {foodSensitivities && foodSensitivities.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Food Sensitivities</h4>
            <div className="flex flex-wrap gap-1">
              {foodSensitivities.map((sensitivity, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-red-500 border-red-200"
                >
                  {sensitivity}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Nutritional Goals */}
        {nutritionalGoals && nutritionalGoals.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Nutritional Goals</h4>
            <div className="flex flex-wrap gap-1">
              {nutritionalGoals.map((goal, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-blue-500 border-blue-200"
                >
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
