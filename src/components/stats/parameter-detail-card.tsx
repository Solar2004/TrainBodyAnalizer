import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BodyParameter } from "@/types";

interface ParameterDetailCardProps {
  parameter: BodyParameter;
  className?: string;
}

export function ParameterDetailCard({
  parameter,
  className = "",
}: ParameterDetailCardProps) {
  // Get category based on value
  const category = getCategory(parameter.value);

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="capitalize">{parameter.name}</CardTitle>
        <CardDescription>{parameter.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className="text-3xl font-bold">{parameter.value}</span>
          <span
            className={`text-sm font-medium px-2 py-1 rounded ${getCategoryClass(category)}`}
          >
            {category}
          </span>
        </div>

        <Progress value={parameter.value} className="h-2 mt-2" />

        <div className="mt-4 text-sm">
          <p>{getParameterAdvice(parameter.name, parameter.value)}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function getCategory(value: number): string {
  if (value >= 90) return "Exceptional";
  if (value >= 75) return "Excellent";
  if (value >= 60) return "Good";
  if (value >= 40) return "Average";
  if (value >= 25) return "Below Average";
  return "Poor";
}

function getCategoryClass(category: string): string {
  switch (category) {
    case "Exceptional":
      return "bg-purple-100 text-purple-800";
    case "Excellent":
      return "bg-indigo-100 text-indigo-800";
    case "Good":
      return "bg-blue-100 text-blue-800";
    case "Average":
      return "bg-green-100 text-green-800";
    case "Below Average":
      return "bg-yellow-100 text-yellow-800";
    case "Poor":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getParameterAdvice(name: string, value: number): string {
  // Basic advice based on parameter name and value
  if (value < 40) {
    switch (name) {
      case "volume":
        return "Consider increasing your training frequency and duration gradually.";
      case "potential":
        return "Focus on optimizing your training and nutrition to maximize your genetic potential.";
      case "endurance":
        return "Incorporate more cardiovascular training and gradually increase duration.";
      case "strength":
        return "Add progressive resistance training focusing on compound movements.";
      case "adaptability":
        return "Try varying your training stimuli and recovery protocols.";
      case "progress":
        return "Review your training logs and ensure you're implementing progressive overload.";
      case "coordination":
        return "Include more complex movement patterns and skill-based exercises.";
      case "agility":
        return "Add plyometric exercises and directional change drills to your routine.";
      case "consistency":
        return "Establish a sustainable routine and track your adherence.";
      default:
        return "Focus on improving this parameter with targeted training.";
    }
  } else if (value < 70) {
    switch (name) {
      case "volume":
        return "Your training volume is adequate but could be optimized for better results.";
      case "potential":
        return "You're making good use of your genetic potential, but there's room for improvement.";
      case "endurance":
        return "Your endurance is developing well. Consider adding interval training.";
      case "strength":
        return "Your strength is good. Focus on improving technique and progressive overload.";
      case "adaptability":
        return "Your body adapts reasonably well. Try periodizing your training more effectively.";
      case "progress":
        return "You're making steady progress. Keep tracking and adjusting your approach.";
      case "coordination":
        return "Your coordination is good. Continue challenging yourself with complex movements.";
      case "agility":
        return "Your agility is developing well. Add more sport-specific movement patterns.";
      case "consistency":
        return "You're fairly consistent. Try to identify and address factors that disrupt your routine.";
      default:
        return "You're doing well in this area. Continue with your current approach while seeking gradual improvement.";
    }
  } else {
    switch (name) {
      case "volume":
        return "Your training volume is excellent. Focus on quality and recovery to prevent overtraining.";
      case "potential":
        return "You're maximizing your genetic potential very effectively.";
      case "endurance":
        return "Your endurance is excellent. Consider specialized training for your specific goals.";
      case "strength":
        return "Your strength is exceptional. Focus on maintaining while developing other parameters.";
      case "adaptability":
        return "Your body adapts very well to training stimuli. Take advantage of this with periodized training.";
      case "progress":
        return "You're making excellent progress. Continue with your current approach.";
      case "coordination":
        return "Your coordination is exceptional. Consider advanced skill training or sports.";
      case "agility":
        return "Your agility is excellent. Focus on sport-specific applications.";
      case "consistency":
        return "Your consistency is excellent. Continue maintaining your disciplined approach.";
      default:
        return "You excel in this area. Focus on maintaining while developing other parameters.";
    }
  }
}
