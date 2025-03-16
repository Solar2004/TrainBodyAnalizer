import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FamilyMemberCardProps {
  name: string;
  relationship: string;
  origin?: string;
  ethnicity?: string;
  somatotype?: string;
  eyeColor?: string;
  hairColor?: string;
  height?: string;
  build?: string;
  athleticHistory?: string;
  className?: string;
}

export function FamilyMemberCard({
  name,
  relationship,
  origin,
  ethnicity,
  somatotype,
  eyeColor,
  hairColor,
  height,
  build,
  athleticHistory,
  className = "",
}: FamilyMemberCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge
            variant="outline"
            className={getRelationshipClass(relationship)}
          >
            {relationship}
          </Badge>
        </div>
        <CardDescription>
          {origin && ethnicity
            ? `${origin} • ${ethnicity}`
            : origin || ethnicity || ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Physical traits */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            {somatotype && (
              <div>
                <span className="text-muted-foreground">Somatotype:</span>{" "}
                <span className="font-medium">{somatotype}</span>
              </div>
            )}
            {eyeColor && (
              <div>
                <span className="text-muted-foreground">Eye Color:</span>{" "}
                <span className="font-medium">{eyeColor}</span>
              </div>
            )}
            {hairColor && (
              <div>
                <span className="text-muted-foreground">Hair Color:</span>{" "}
                <span className="font-medium">{hairColor}</span>
              </div>
            )}
            {height && (
              <div>
                <span className="text-muted-foreground">Height:</span>{" "}
                <span className="font-medium">{height}</span>
              </div>
            )}
            {build && (
              <div>
                <span className="text-muted-foreground">Build:</span>{" "}
                <span className="font-medium">{build}</span>
              </div>
            )}
          </div>

          {/* Athletic history */}
          {athleticHistory && (
            <div>
              <h4 className="text-sm font-medium mb-1">Athletic History</h4>
              <p className="text-sm text-muted-foreground">{athleticHistory}</p>
            </div>
          )}

          {/* Inherited traits analysis */}
          <div className="text-xs text-muted-foreground pt-2 border-t">
            <p>{getInheritanceAnalysis(relationship, somatotype)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getRelationshipClass(relationship: string): string {
  const relationshipMap: Record<string, string> = {
    father: "bg-blue-100 text-blue-800 border-blue-300",
    mother: "bg-pink-100 text-pink-800 border-pink-300",
    "paternal grandfather": "bg-indigo-100 text-indigo-800 border-indigo-300",
    "paternal grandmother": "bg-purple-100 text-purple-800 border-purple-300",
    "maternal grandfather": "bg-cyan-100 text-cyan-800 border-cyan-300",
    "maternal grandmother":
      "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300",
    brother: "bg-emerald-100 text-emerald-800 border-emerald-300",
    sister: "bg-teal-100 text-teal-800 border-teal-300",
  };

  return (
    relationshipMap[relationship.toLowerCase()] ||
    "bg-gray-100 text-gray-800 border-gray-300"
  );
}

function getInheritanceAnalysis(
  relationship: string,
  somatotype?: string,
): string {
  if (!somatotype) {
    return `Traits from your ${relationship.toLowerCase()} influence your genetic potential.`;
  }

  switch (somatotype.toLowerCase()) {
    case "mesomorph":
      return `Your ${relationship.toLowerCase()}'s mesomorphic traits may contribute to your natural muscle development and athletic potential.`;
    case "ectomorph":
      return `Your ${relationship.toLowerCase()}'s ectomorphic traits may influence your metabolism and endurance capabilities.`;
    case "endomorph":
      return `Your ${relationship.toLowerCase()}'s endomorphic traits may affect your strength potential and recovery capacity.`;
    default:
      return `Your ${relationship.toLowerCase()}'s ${somatotype} traits contribute to your genetic profile.`;
  }
}
