import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditFamilyMemberDialog } from "./edit-family-member-dialog";
import { DeleteFamilyMemberDialog } from "./delete-family-member-dialog";

interface FamilyMemberExtendedCardProps {
  id?: string;
  name: string;
  relationship: string;
  generation?: number;
  side?: "paternal" | "maternal" | null;
  origin?: string;
  ethnicity?: string;
  somatotype?: string;
  eyeColor?: string;
  hairColor?: string;
  height?: string;
  build?: string;
  athleticHistory?: string;
  geneticTraits?: string[];
  medicalHistory?: string[];
  onEdit?: () => void;
  onDelete?: () => void;
  onSuccess?: () => void;
  className?: string;
}

export function FamilyMemberExtendedCard({
  id,
  name,
  relationship,
  generation,
  side,
  origin,
  ethnicity,
  somatotype,
  eyeColor,
  hairColor,
  height,
  build,
  athleticHistory,
  geneticTraits = [],
  medicalHistory = [],
  onEdit,
  onDelete,
  onSuccess,
  className = "",
}: FamilyMemberExtendedCardProps) {
  const member = {
    id,
    name,
    relationship,
    generation,
    side,
    origin,
    ethnicity,
    somatotype,
    eyeColor,
    hairColor,
    height,
    build,
    athleticHistory,
    geneticTraits,
    medicalHistory,
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge
            variant="outline"
            className={getRelationshipClass(relationship, side)}
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

          {/* Genetic traits */}
          {geneticTraits.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Genetic Traits</h4>
              <div className="flex flex-wrap gap-1">
                {geneticTraits.map((trait, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Medical history */}
          {medicalHistory.length > 0 && medicalHistory[0] !== "" && (
            <div>
              <h4 className="text-sm font-medium mb-1">Medical History</h4>
              <div className="flex flex-wrap gap-1">
                {medicalHistory.map((condition, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Inherited traits analysis */}
          <div className="text-xs text-muted-foreground pt-2 border-t">
            <p>
              {getInheritanceAnalysis(relationship, generation, somatotype)}
            </p>
          </div>
        </div>
      </CardContent>
      {id && (
        <CardFooter className="flex justify-end gap-2 pt-2">
          <EditFamilyMemberDialog
            member={member}
            onSuccess={onSuccess || onEdit}
          />
          <DeleteFamilyMemberDialog
            memberId={id}
            memberName={name}
            onSuccess={onSuccess || onDelete}
          />
        </CardFooter>
      )}
    </Card>
  );
}

function getRelationshipClass(
  relationship: string,
  side?: "paternal" | "maternal" | null,
): string {
  // Base classes for paternal side
  const paternalClasses: Record<string, string> = {
    father: "bg-blue-100 text-blue-800 border-blue-300",
    "paternal grandfather": "bg-indigo-100 text-indigo-800 border-indigo-300",
    "paternal grandmother": "bg-purple-100 text-purple-800 border-purple-300",
    "paternal great-grandfather": "bg-blue-50 text-blue-900 border-blue-200",
    "paternal great-grandmother":
      "bg-indigo-50 text-indigo-900 border-indigo-200",
  };

  // Base classes for maternal side
  const maternalClasses: Record<string, string> = {
    mother: "bg-pink-100 text-pink-800 border-pink-300",
    "maternal grandfather": "bg-cyan-100 text-cyan-800 border-cyan-300",
    "maternal grandmother":
      "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300",
    "maternal great-grandfather": "bg-cyan-50 text-cyan-900 border-cyan-200",
    "maternal great-grandmother":
      "bg-fuchsia-50 text-fuchsia-900 border-fuchsia-200",
  };

  // Other relationships
  const otherClasses: Record<string, string> = {
    self: "bg-emerald-100 text-emerald-800 border-emerald-300",
    brother: "bg-emerald-100 text-emerald-800 border-emerald-300",
    sister: "bg-teal-100 text-teal-800 border-teal-300",
  };

  // First check exact relationship match
  const relationshipLower = relationship.toLowerCase();
  if (paternalClasses[relationshipLower]) {
    return paternalClasses[relationshipLower];
  }
  if (maternalClasses[relationshipLower]) {
    return maternalClasses[relationshipLower];
  }
  if (otherClasses[relationshipLower]) {
    return otherClasses[relationshipLower];
  }

  // If no exact match, use side information
  if (side === "paternal") {
    if (relationshipLower.includes("grandfather")) {
      return paternalClasses["paternal grandfather"];
    }
    if (relationshipLower.includes("grandmother")) {
      return paternalClasses["paternal grandmother"];
    }
    if (
      relationshipLower.includes("great") &&
      relationshipLower.includes("father")
    ) {
      return paternalClasses["paternal great-grandfather"];
    }
    if (
      relationshipLower.includes("great") &&
      relationshipLower.includes("mother")
    ) {
      return paternalClasses["paternal great-grandmother"];
    }
    return "bg-blue-50 text-blue-800 border-blue-200";
  }

  if (side === "maternal") {
    if (relationshipLower.includes("grandfather")) {
      return maternalClasses["maternal grandfather"];
    }
    if (relationshipLower.includes("grandmother")) {
      return maternalClasses["maternal grandmother"];
    }
    if (
      relationshipLower.includes("great") &&
      relationshipLower.includes("father")
    ) {
      return maternalClasses["maternal great-grandfather"];
    }
    if (
      relationshipLower.includes("great") &&
      relationshipLower.includes("mother")
    ) {
      return maternalClasses["maternal great-grandmother"];
    }
    return "bg-pink-50 text-pink-800 border-pink-200";
  }

  // Default
  return "bg-gray-100 text-gray-800 border-gray-300";
}

function getInheritanceAnalysis(
  relationship: string,
  generation: number,
  somatotype?: string,
): string {
  // Base message based on generation
  let baseMessage = "";
  switch (generation) {
    case 0:
      baseMessage = "Your own traits form the baseline for analysis.";
      break;
    case 1:
      baseMessage = `Your ${relationship.toLowerCase()}'s traits have a strong direct influence on your genetic potential.`;
      break;
    case 2:
      baseMessage = `Your ${relationship.toLowerCase()}'s traits have a significant influence on your genetic makeup.`;
      break;
    case 3:
      baseMessage = `Your ${relationship.toLowerCase()}'s traits contribute to your genetic background.`;
      break;
    default:
      baseMessage = `Traits from your ${relationship.toLowerCase()} influence your genetic potential.`;
  }

  // Add somatotype-specific information if available
  if (somatotype) {
    switch (somatotype.toLowerCase()) {
      case "mesomorph":
        return `${baseMessage} The mesomorphic traits may contribute to your natural muscle development and athletic potential.`;
      case "ectomorph":
        return `${baseMessage} The ectomorphic traits may influence your metabolism and endurance capabilities.`;
      case "endomorph":
        return `${baseMessage} The endomorphic traits may affect your strength potential and recovery capacity.`;
      default:
        return `${baseMessage} The ${somatotype} traits contribute to your genetic profile.`;
    }
  }

  return baseMessage;
}
