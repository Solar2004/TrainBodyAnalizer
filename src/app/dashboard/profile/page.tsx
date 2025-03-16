import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DNAGradeCard } from "@/components/profile/dna-grade-card";
import { PhysicalMetricsCard } from "@/components/profile/physical-metrics-card";
import { getUserProfile } from "@/lib/supabase/api";
import { getMockUserProfile } from "@/lib/mock-data";
import { createClient } from "../../../../supabase/server";
import { User, UserCircle, Users, Dna, Activity, Settings } from "lucide-react";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Try to get real user data, fall back to mock data if not available
  let profile = user ? await getUserProfile(user.id) : null;

  // If no real data is available, use mock data
  if (!profile) {
    profile = getMockUserProfile();
  }

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and genetic data
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings size={16} />
          <span>Edit Profile</span>
        </Button>
      </header>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User size={16} />
            <span>Personal</span>
          </TabsTrigger>
          <TabsTrigger value="genetic" className="flex items-center gap-2">
            <Dna size={16} />
            <span>Genetic</span>
          </TabsTrigger>
          <TabsTrigger value="family" className="flex items-center gap-2">
            <Users size={16} />
            <span>Family</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Your basic profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <UserCircle size={64} className="text-primary" />
                    <div>
                      <h3 className="font-medium text-lg">
                        {user?.user_metadata?.full_name || "User"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-medium">32</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Height</p>
                      <p className="font-medium">180 cm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-medium">78 kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Blood Type
                      </p>
                      <p className="font-medium">O+</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <PhysicalMetricsCard
              testosterone={profile.testosterone}
              muscleStructure={profile.muscleStructure}
              boneDensity={profile.boneDensity}
            />
          </div>
        </TabsContent>

        <TabsContent value="genetic" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DNAGradeCard
              dnaGrade={profile.dnaGrade}
              geneticOrigins={profile.geneticOrigins}
              geneticMutations={profile.geneticMutations}
            />

            <Card>
              <CardHeader>
                <CardTitle>Genetic Testing</CardTitle>
                <CardDescription>
                  Connect genetic test results to enhance your analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Connect your genetic test results from services like
                    23andMe, AncestryDNA, or MyHeritage to get more accurate DNA
                    analysis and personalized recommendations.
                  </p>

                  <div className="flex gap-2">
                    <Button variant="outline">Connect Test Results</Button>
                    <Button variant="ghost">Learn More</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="family" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Family Tree</CardTitle>
              <CardDescription>
                Build your family tree to analyze inherited traits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex flex-col items-center justify-center border rounded-md">
                <p className="text-muted-foreground mb-4">
                  You haven't added any family members yet
                </p>
                <Button className="flex items-center gap-2">
                  <PlusCircle size={16} />
                  <span>Add Family Member</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
