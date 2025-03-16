"use client";

import { useState, useEffect } from "react";
import { createClientSideClient } from "../../../../supabase/client-side";
import { FamilyTreeExtended } from "@/components/genealogy/family-tree-extended";
import { FamilyMemberExtendedCard } from "@/components/genealogy/family-member-extended-card";
import { AddFamilyMemberDialog } from "@/components/genealogy/add-family-member-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Map, Dna, RefreshCw } from "lucide-react";

export default function GenealogyPage() {
  const [familyMembers, setFamilyMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const supabase = createClientSideClient();

  const fetchFamilyMembers = async () => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("family_members")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

      // Transform data to match component props
      const transformedData = data
        ? data.map((member) => ({
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
          }))
        : [];

      setFamilyMembers(transformedData);
    } catch (error) {
      console.error("Error fetching family members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilyMembers();
  }, []);

  const handleSelectMember = (member: any) => {
    setSelectedMember(member);
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Family Genealogy
          </h1>
          <p className="text-muted-foreground mt-1">
            Explore your family tree and genetic connections
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchFamilyMembers}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </Button>
          <AddFamilyMemberDialog onSuccess={fetchFamilyMembers} />
        </div>
      </div>

      <Tabs defaultValue="tree" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="tree" className="flex items-center gap-2">
            <Users size={16} />
            <span>Family Tree</span>
          </TabsTrigger>
          <TabsTrigger value="origins" className="flex items-center gap-2">
            <Map size={16} />
            <span>Origins</span>
          </TabsTrigger>
          <TabsTrigger value="traits" className="flex items-center gap-2">
            <Dna size={16} />
            <span>Inherited Traits</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tree" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FamilyTreeExtended
                members={familyMembers}
                onSelectMember={handleSelectMember}
              />
            </div>

            <div className="space-y-6">
              {selectedMember ? (
                <FamilyMemberExtendedCard
                  id={selectedMember.id}
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
                  onSuccess={fetchFamilyMembers}
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Family Member Details</CardTitle>
                    <CardDescription>
                      Select a family member from the tree to view details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-6">
                    <Users className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      Click on a member in the family tree to view their details
                    </p>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Family Statistics</CardTitle>
                  <CardDescription>
                    Overview of your family genealogy data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Total Members:
                      </span>
                      <span className="font-medium">
                        {familyMembers.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Generations:
                      </span>
                      <span className="font-medium">
                        {Math.max(
                          ...familyMembers.map((m) => m.generation || 0),
                          0,
                        ) + 1}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Paternal Side:
                      </span>
                      <span className="font-medium">
                        {
                          familyMembers.filter((m) => m.side === "paternal")
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Maternal Side:
                      </span>
                      <span className="font-medium">
                        {
                          familyMembers.filter((m) => m.side === "maternal")
                            .length
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="origins" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Origins</CardTitle>
              <CardDescription>
                Your family's geographic and ethnic origins
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  Geographic map view coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traits" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {familyMembers.map((member) => (
              <FamilyMemberExtendedCard
                key={member.id}
                id={member.id}
                name={member.name}
                relationship={member.relationship}
                generation={member.generation}
                side={member.side}
                origin={member.origin}
                ethnicity={member.ethnicity}
                somatotype={member.somatotype}
                eyeColor={member.eyeColor}
                hairColor={member.hairColor}
                height={member.height}
                build={member.build}
                athleticHistory={member.athleticHistory}
                geneticTraits={member.geneticTraits}
                medicalHistory={member.medicalHistory}
                onSuccess={fetchFamilyMembers}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {familyMembers.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            All Family Members
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {familyMembers.map((member) => (
              <FamilyMemberExtendedCard
                key={member.id}
                id={member.id}
                name={member.name}
                relationship={member.relationship}
                generation={member.generation}
                side={member.side}
                origin={member.origin}
                ethnicity={member.ethnicity}
                somatotype={member.somatotype}
                eyeColor={member.eyeColor}
                hairColor={member.hairColor}
                height={member.height}
                build={member.build}
                athleticHistory={member.athleticHistory}
                geneticTraits={member.geneticTraits}
                medicalHistory={member.medicalHistory}
                onSuccess={fetchFamilyMembers}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
