import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FamilyTreeExtended } from "@/components/genealogy/family-tree-extended";
import { FamilyMemberExtendedCard } from "@/components/genealogy/family-member-extended-card";
import { Users, Map, Dna } from "lucide-react";
import { createClient } from "../../../../supabase/server";
import { AddFamilyMemberDialog } from "@/components/genealogy/add-family-member-dialog";

// Mock family members data with 4 generations
const mockFamilyMembers = [
  {
    id: "user",
    name: "You",
    relationship: "self",
    generation: 0,
    origin: "Mixed",
    ethnicity: "Mediterranean/Northern European",
    somatotype: "Mesomorph",
    eyeColor: "Brown",
    hairColor: "Black",
    height: "180 cm",
    build: "Athletic",
    athleticHistory: "Regular strength training, occasional running",
    geneticTraits: [
      "Fast-twitch muscle fibers",
      "Average metabolism",
      "Good recovery",
    ],
    medicalHistory: [],
  },
  // Generation 1 - Parents
  {
    id: "father",
    name: "John Doe",
    relationship: "Father",
    generation: 1,
    side: "paternal",
    parentId: "user",
    origin: "Spain",
    ethnicity: "Basque",
    somatotype: "Mesomorph",
    eyeColor: "Brown",
    hairColor: "Black",
    height: "185 cm",
    build: "Athletic",
    athleticHistory: "Former soccer player, good endurance",
    geneticTraits: [
      "Fast-twitch muscle fibers",
      "High testosterone",
      "Good cardiovascular capacity",
    ],
    medicalHistory: [],
  },
  {
    id: "mother",
    name: "Maria Doe",
    relationship: "Mother",
    generation: 1,
    side: "maternal",
    parentId: "user",
    origin: "Italy",
    ethnicity: "Sicilian",
    somatotype: "Ectomorph",
    eyeColor: "Green",
    hairColor: "Brown",
    height: "165 cm",
    build: "Slim",
    athleticHistory: "Dancer, good flexibility",
    geneticTraits: [
      "Excellent flexibility",
      "Efficient metabolism",
      "Good coordination",
    ],
    medicalHistory: [],
  },
  // Generation 2 - Grandparents (Paternal)
  {
    id: "paternal_grandfather",
    name: "Antonio Doe",
    relationship: "Paternal Grandfather",
    generation: 2,
    side: "paternal",
    parentId: "father",
    origin: "Spain",
    ethnicity: "Basque",
    somatotype: "Mesomorph",
    eyeColor: "Brown",
    hairColor: "Black",
    height: "190 cm",
    build: "Muscular",
    athleticHistory: "Manual laborer, naturally strong",
    geneticTraits: [
      "High muscle density",
      "Natural strength",
      "Robust bone structure",
    ],
    medicalHistory: ["Hypertension (late onset)"],
  },
  {
    id: "paternal_grandmother",
    name: "Elena Doe",
    relationship: "Paternal Grandmother",
    generation: 2,
    side: "paternal",
    parentId: "father",
    origin: "Spain",
    ethnicity: "Catalan",
    somatotype: "Mesomorph",
    eyeColor: "Brown",
    hairColor: "Black",
    height: "170 cm",
    build: "Athletic",
    athleticHistory: "Active lifestyle, hiking enthusiast",
    geneticTraits: [
      "Good endurance",
      "Efficient oxygen utilization",
      "Strong connective tissue",
    ],
    medicalHistory: [],
  },
  // Generation 2 - Grandparents (Maternal)
  {
    id: "maternal_grandfather",
    name: "Giuseppe Rossi",
    relationship: "Maternal Grandfather",
    generation: 2,
    side: "maternal",
    parentId: "mother",
    origin: "Italy",
    ethnicity: "Sicilian",
    somatotype: "Endomorph",
    eyeColor: "Brown",
    hairColor: "Black",
    height: "175 cm",
    build: "Stocky",
    athleticHistory: "Former wrestler, good strength",
    geneticTraits: [
      "Explosive power",
      "Good grip strength",
      "Dense muscle tissue",
    ],
    medicalHistory: ["Type 2 diabetes (late onset)"],
  },
  {
    id: "maternal_grandmother",
    name: "Sofia Rossi",
    relationship: "Maternal Grandmother",
    generation: 2,
    side: "maternal",
    parentId: "mother",
    origin: "Italy",
    ethnicity: "Northern Italian",
    somatotype: "Ectomorph",
    eyeColor: "Green",
    hairColor: "Brown",
    height: "160 cm",
    build: "Slim",
    athleticHistory: "Yoga practitioner, excellent flexibility",
    geneticTraits: [
      "Exceptional flexibility",
      "Good balance",
      "Efficient metabolism",
    ],
    medicalHistory: [],
  },
  // Generation 3 - Great Grandparents (Paternal Grandfather's parents)
  {
    id: "paternal_great_grandfather1",
    name: "Carlos Doe",
    relationship: "Paternal Great-Grandfather",
    generation: 3,
    side: "paternal",
    parentId: "paternal_grandfather",
    origin: "Spain",
    ethnicity: "Basque",
    somatotype: "Mesomorph",
    eyeColor: "Brown",
    hairColor: "Black",
    height: "188 cm",
    build: "Muscular",
    athleticHistory: "Farmer, exceptional strength",
    geneticTraits: [
      "Natural strength",
      "High work capacity",
      "Robust skeletal structure",
    ],
    medicalHistory: ["Hypertension"],
  },
  {
    id: "paternal_great_grandmother1",
    name: "Isabella Doe",
    relationship: "Paternal Great-Grandmother",
    generation: 3,
    side: "paternal",
    parentId: "paternal_grandfather",
    origin: "Spain",
    ethnicity: "Basque",
    somatotype: "Mesomorph",
    eyeColor: "Brown",
    hairColor: "Black",
    height: "165 cm",
    build: "Athletic",
    athleticHistory: "Active lifestyle",
    geneticTraits: ["Good cardiovascular health", "Longevity"],
    medicalHistory: [],
  },
  // Generation 3 - Great Grandparents (Paternal Grandmother's parents)
  {
    id: "paternal_great_grandfather2",
    name: "Miguel Vega",
    relationship: "Paternal Great-Grandfather",
    generation: 3,
    side: "paternal",
    parentId: "paternal_grandmother",
    origin: "Spain",
    ethnicity: "Catalan",
    somatotype: "Mesomorph",
    eyeColor: "Brown",
    hairColor: "Black",
    height: "180 cm",
    build: "Athletic",
    athleticHistory: "Mountain guide, exceptional endurance",
    geneticTraits: [
      "Superior aerobic capacity",
      "Efficient oxygen utilization",
      "Good altitude adaptation",
    ],
    medicalHistory: [],
  },
  {
    id: "paternal_great_grandmother2",
    name: "Lucia Vega",
    relationship: "Paternal Great-Grandmother",
    generation: 3,
    side: "paternal",
    parentId: "paternal_grandmother",
    origin: "Spain",
    ethnicity: "Catalan",
    somatotype: "Ectomorph",
    eyeColor: "Brown",
    hairColor: "Brown",
    height: "160 cm",
    build: "Slim",
    athleticHistory: "Active lifestyle",
    geneticTraits: ["Good coordination", "Efficient movement patterns"],
    medicalHistory: [],
  },
  // Generation 3 - Great Grandparents (Maternal Grandfather's parents)
  {
    id: "maternal_great_grandfather1",
    name: "Marco Rossi",
    relationship: "Maternal Great-Grandfather",
    generation: 3,
    side: "maternal",
    parentId: "maternal_grandfather",
    origin: "Italy",
    ethnicity: "Sicilian",
    somatotype: "Endomorph",
    eyeColor: "Brown",
    hairColor: "Black",
    height: "178 cm",
    build: "Stocky",
    athleticHistory: "Fisherman, exceptional strength",
    geneticTraits: ["High strength potential", "Good anaerobic capacity"],
    medicalHistory: ["Type 2 diabetes"],
  },
  {
    id: "maternal_great_grandmother1",
    name: "Giovanna Rossi",
    relationship: "Maternal Great-Grandmother",
    generation: 3,
    side: "maternal",
    parentId: "maternal_grandfather",
    origin: "Italy",
    ethnicity: "Sicilian",
    somatotype: "Mesomorph",
    eyeColor: "Brown",
    hairColor: "Black",
    height: "165 cm",
    build: "Athletic",
    athleticHistory: "Active lifestyle",
    geneticTraits: ["Good muscle tone", "Balanced physique"],
    medicalHistory: [],
  },
  // Generation 3 - Great Grandparents (Maternal Grandmother's parents)
  {
    id: "maternal_great_grandfather2",
    name: "Antonio Bianchi",
    relationship: "Maternal Great-Grandfather",
    generation: 3,
    side: "maternal",
    parentId: "maternal_grandmother",
    origin: "Italy",
    ethnicity: "Northern Italian",
    somatotype: "Ectomorph",
    eyeColor: "Green",
    hairColor: "Brown",
    height: "182 cm",
    build: "Slim",
    athleticHistory: "Long-distance runner",
    geneticTraits: [
      "Exceptional endurance",
      "Efficient metabolism",
      "Low body fat tendency",
    ],
    medicalHistory: [],
  },
  {
    id: "maternal_great_grandmother2",
    name: "Maria Bianchi",
    relationship: "Maternal Great-Grandmother",
    generation: 3,
    side: "maternal",
    parentId: "maternal_grandmother",
    origin: "Italy",
    ethnicity: "Northern Italian",
    somatotype: "Ectomorph",
    eyeColor: "Green",
    hairColor: "Brown",
    height: "158 cm",
    build: "Slim",
    athleticHistory: "Dancer, exceptional flexibility",
    geneticTraits: [
      "Superior flexibility",
      "Excellent coordination",
      "Good balance",
    ],
    medicalHistory: [],
  },
];

export default async function GenealogyPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch family members from database if user is authenticated
  let familyMembers = mockFamilyMembers;

  if (user) {
    const { data, error } = await supabase
      .from("family_members")
      .select("*")
      .eq("user_id", user.id);

    if (!error && data && data.length > 0) {
      // Map database records to FamilyMember format
      familyMembers = data.map((member) => ({
        id: member.id,
        name: member.name,
        relationship: member.relationship,
        generation: member.generation,
        side: member.side,
        parentId: member.parent_id,
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
      }));
    }
  }
  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Genealogy</h1>
          <p className="text-muted-foreground">
            Explore your family tree and genetic heritage
          </p>
        </div>
        <AddFamilyMemberDialog />
      </header>

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
          <FamilyTreeExtended members={familyMembers} />
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
                name={member.name}
                relationship={member.relationship}
                origin={member.origin}
                ethnicity={member.ethnicity}
                somatotype={member.somatotype}
                eyeColor={member.eyeColor}
                hairColor={member.hairColor}
                height={member.height}
                build={member.build}
                athleticHistory={member.athleticHistory}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
