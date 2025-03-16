import { Check, CircleDashed, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({
  currentStep,
  totalSteps = 7,
}: OnboardingProgressProps) {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={index} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${isCompleted ? "bg-primary text-primary-foreground" : isCurrent ? "border-2 border-primary text-primary" : "border-2 border-muted text-muted-foreground"}`}
            >
              {isCompleted ? (
                <Check size={16} />
              ) : isCurrent ? (
                <CircleDot size={16} />
              ) : (
                <CircleDashed size={16} />
              )}
            </div>

            {index < totalSteps - 1 && (
              <div
                className={`w-8 h-0.5 ${index < currentStep ? "bg-primary" : "bg-muted"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
