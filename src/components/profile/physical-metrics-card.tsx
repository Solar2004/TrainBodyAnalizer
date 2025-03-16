import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PhysicalMetricsCardProps {
  testosterone?: number;
  muscleStructure?: string;
  boneDensity?: number;
  className?: string;
}

export function PhysicalMetricsCard({
  testosterone,
  muscleStructure,
  boneDensity,
  className = "",
}: PhysicalMetricsCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Physical Metrics</CardTitle>
        <CardDescription>
          Additional physical parameters that influence your performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {testosterone !== undefined && (
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Testosterone Levels</span>
                <span className="text-sm">{testosterone} ng/dL</span>
              </div>
              <Progress
                value={getTestosteronePercentage(testosterone)}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {getTestosteroneDescription(testosterone)}
              </p>
            </div>
          )}

          {muscleStructure && (
            <div>
              <h4 className="text-sm font-medium mb-1">Muscle Structure</h4>
              <p className="text-sm">{muscleStructure}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your muscle fiber composition affects your response to different
                types of training.
              </p>
            </div>
          )}

          {boneDensity !== undefined && (
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Bone Density</span>
                <span className="text-sm">{boneDensity.toFixed(1)} g/cm²</span>
              </div>
              <Progress
                value={getBoneDensityPercentage(boneDensity)}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {getBoneDensityDescription(boneDensity)}
              </p>
            </div>
          )}

          <div className="text-sm text-muted-foreground pt-2 border-t">
            <p>
              These metrics are estimated based on your reported data and
              activity patterns. For more accurate measurements, consider
              consulting with healthcare professionals.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getTestosteronePercentage(value: number): number {
  // Normal range for males is roughly 300-1000 ng/dL
  // This function converts that to a 0-100 percentage
  return Math.min(100, Math.max(0, ((value - 200) / 800) * 100));
}

function getTestosteroneDescription(value: number): string {
  if (value < 300) {
    return "Below normal range. This may affect muscle growth, recovery, and energy levels.";
  } else if (value < 500) {
    return "Low-normal range. Adequate for basic functions but may limit optimal performance.";
  } else if (value < 800) {
    return "Mid-normal range. Good levels for performance and recovery.";
  } else {
    return "High-normal range. Excellent for muscle growth, recovery, and performance.";
  }
}

function getBoneDensityPercentage(value: number): number {
  // Normal range is roughly 1.0-1.5 g/cm²
  return Math.min(100, Math.max(0, ((value - 0.8) / 0.7) * 100));
}

function getBoneDensityDescription(value: number): string {
  if (value < 1.0) {
    return "Below average. Consider weight-bearing exercises and adequate calcium intake.";
  } else if (value < 1.2) {
    return "Average. Maintain with regular weight-bearing exercise and proper nutrition.";
  } else if (value < 1.4) {
    return "Above average. Good bone health supporting higher impact activities.";
  } else {
    return "Excellent. Superior bone density supporting high-impact activities and resistance training.";
  }
}
