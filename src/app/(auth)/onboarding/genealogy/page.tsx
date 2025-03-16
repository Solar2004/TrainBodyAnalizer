"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FamilyTreeExtended } from "@/components/genealogy/family-tree-extended";
import { AddFamilyMemberDialog } from "@/components/genealogy/add-family-member-dialog";
import { FamilyMemberExtendedCard } from "@/components/genealogy/family-member-extended-card";
import { Button } from "@/components/ui/button";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { createClientSideClient } from "../../../supabase/client-side";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  generation: number;
  side?: "paternal" | "maternal" | null;
  origin?: string;
  ethnicity?: string;
  somatotype?: string;
  eye_color?: string;
  hair_color?: string;
  height?: string;
  build?: string;
  athletic_history?: string;
  genetic_traits?: string[];
  medical_history?: string[];
}

export default function GenealogyOnboarding() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientSideClient();

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/sign-in");
          return;
        }

        const { data, error } = await supabase
          .from("family_members")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;

        // Transform data to match component props
        const transformedData = data.map((member: any) => ({
          id: member.id,
          name: member.name,
          relationship: member.relationship,
          generation: member.generation,
          side: member.side,
          origin: member.origin,
          ethnicity: member.ethnicity,
          somatotype: member.somatotype,
          eyeColor: member.eye_color,
          hairColor: member.hair_color,
          height: member.height,
          build: member.build,
          athleticHistory: member.athletic_history,
          geneticTraits: member.genetic_traits
            ? JSON.parse(member.genetic_traits)
            : [],
          medicalHistory: member.medical_history
            ? JSON.parse(member.medical_history)
            : [],
          parentId: determineParentId(member.relationship, member.side),
        }));

        setFamilyMembers(transformedData);
      } catch (error) {
        console.error("Error fetching family members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFamilyMembers();
  }, [supabase, router]);

  // Helper function to determine parent ID based on relationship
  function determineParentId(relationship: string, side?: string | null) {
    const relationshipLower = relationship.toLowerCase();

    // Self has no parent in the tree
    if (relationshipLower === "self") return null;

    // First generation (parents)
    if (relationshipLower === "father") return "user";
    if (relationshipLower === "mother") return "user";

    // Second generation (grandparents)
    if (relationshipLower.includes("grandfather") && side === "paternal")
      return "father";
    if (relationshipLower.includes("grandmother") && side === "paternal")
      return "father";
    if (relationshipLower.includes("grandfather") && side === "maternal")
      return "mother";
    if (relationshipLower.includes("grandmother") && side === "maternal")
      return "mother";

    // Third generation (great-grandparents)
    if (relationshipLower.includes("great") && side === "paternal") {
      if (relationshipLower.includes("grandfather"))
        return "paternal grandfather";
      if (relationshipLower.includes("grandmother"))
        return "paternal grandmother";
    }
    if (relationshipLower.includes("great") && side === "maternal") {
      if (relationshipLower.includes("grandfather"))
        return "maternal grandfather";
      if (relationshipLower.includes("grandmother"))
        return "maternal grandmother";
    }

    // Default fallback
    return null;
  }

  const handleAddMemberSuccess = () => {
    // Refresh the family members list
    router.refresh();
  };

  const handleSelectMember = (member: any) => {
    setSelectedMember(member);
  };

  const handleContinue = () => {
    router.push("/onboarding/summary");
  };

  const handleBack = () => {
    router.push("/onboarding");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-4xl rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Genealogía Familiar
          </h1>
          <p className="text-muted-foreground mt-2">
            Añade información sobre tu familia para analizar patrones
            hereditarios y predisposiciones genéticas
          </p>
        </div>

        <OnboardingProgress currentStep={4} totalSteps={5} />

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FamilyTreeExtended
                members={familyMembers}
                onAddMember={() => {}}
                onSelectMember={handleSelectMember}
              />
            </div>
            <div>
              {selectedMember ? (
                <FamilyMemberExtendedCard
                  name={selectedMember.name}
                  relationship={selectedMember.relationship}
                  generation={selectedMember.generation}
                  side={selectedMember.side}
                  origin={selectedMember.origin}
                  ethnicity={selectedMember.ethnicity}
                  somatotype={selectedMember.somatotype}
                  eyeColor={selectedMember.eyeColor}
                  hairColor={selectedMember.hairColor}
                  height={selectedMember.height}
                  build={selectedMember.build}
                  athleticHistory={selectedMember.athleticHistory}
                  geneticTraits={selectedMember.geneticTraits}
                  medicalHistory={selectedMember.medicalHistory}
                />
              ) : (
                <div className="h-full flex flex-col justify-center items-center p-6 border rounded-lg">
                  <p className="text-muted-foreground text-center mb-4">
                    Selecciona un miembro de la familia para ver sus detalles o
                    añade nuevos miembros
                  </p>
                  <AddFamilyMemberDialog onSuccess={handleAddMemberSuccess} />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>Atrás</span>
            </Button>
            <Button
              onClick={handleContinue}
              className="flex items-center gap-2"
            >
              <span>Continuar</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
