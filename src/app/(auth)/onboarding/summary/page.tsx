"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  User,
  Activity,
  Users,
  Dna,
} from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface UserProfile {
  age: number;
  gender: string;
  height: number;
  weight: number;
  blood_type: string;
  somatotype: string;
  training_frequency: number;
  training_intensity: number;
  training_years: number;
  sleep_quality: number;
  sleep_hours: number;
  stress_level: number;
  medical_conditions: string;
  family_athletic_level: string;
  family_sports: string;
  grandparents_age: number;
  family_longevity: string;
  family_health_history: string;
}

interface Metrics {
  volume: number;
  potential: number;
  endurance: number;
  strength: number;
  adaptability: number;
  progress: number;
  coordination: number;
  agility: number;
  consistency: number;
  fit_score: number;
  dna_grade: string;
}

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
}

export default function OnboardingSummary() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [familyCount, setFamilyCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/sign-in");
          return;
        }

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (profileError && profileError.code !== "PGRST116") {
          throw profileError;
        }

        if (profileData) {
          setProfile(profileData);
        }

        // Fetch metrics
        const { data: metricsData, error: metricsError } = await supabase
          .from("metrics")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (metricsError && metricsError.code !== "PGRST116") {
          throw metricsError;
        }

        if (metricsData) {
          setMetrics(metricsData);
        }

        // Count family members
        const { data: familyData, error: familyError } = await supabase
          .from("family_members")
          .select("id")
          .eq("user_id", user.id);

        if (familyError) {
          throw familyError;
        }

        setFamilyCount(familyData?.length || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [supabase, router]);

  const handleComplete = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/sign-in");
        return;
      }

      // Update onboarding_completed flag
      const { error } = await supabase
        .from("user_profiles")
        .update({ onboarding_completed: true })
        .eq("user_id", user.id);

      if (error) throw error;

      router.push("/dashboard");
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  const handleBack = () => {
    router.push("/onboarding/genealogy");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-4xl rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Resumen de Perfil
          </h1>
          <p className="text-muted-foreground mt-2">
            Revisa la información de tu perfil antes de completar el proceso
          </p>
        </div>

        <OnboardingProgress currentStep={5} totalSteps={5} />

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <p>Cargando datos...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-primary" />
                    <CardTitle className="text-lg">Datos Personales</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Edad:</dt>
                      <dd className="font-medium">{profile?.age} años</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Género:</dt>
                      <dd className="font-medium">{profile?.gender}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Altura:</dt>
                      <dd className="font-medium">{profile?.height} cm</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Peso:</dt>
                      <dd className="font-medium">{profile?.weight} kg</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">
                        Grupo sanguíneo:
                      </dt>
                      <dd className="font-medium">{profile?.blood_type}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Somatotipo:</dt>
                      <dd className="font-medium">{profile?.somatotype}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Activity size={18} className="text-primary" />
                    <CardTitle className="text-lg">Actividad Física</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Frecuencia:</dt>
                      <dd className="font-medium">
                        {profile?.training_frequency} días/semana
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Intensidad:</dt>
                      <dd className="font-medium">
                        {profile?.training_intensity}/100
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">
                        Años entrenando:
                      </dt>
                      <dd className="font-medium">
                        {profile?.training_years} años
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">
                        Calidad de sueño:
                      </dt>
                      <dd className="font-medium">
                        {profile?.sleep_quality}/100
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Horas de sueño:</dt>
                      <dd className="font-medium">{profile?.sleep_hours} h</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">
                        Nivel de estrés:
                      </dt>
                      <dd className="font-medium">
                        {profile?.stress_level}/100
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Dna size={18} className="text-primary" />
                    <CardTitle className="text-lg">Métricas</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Fit Score:</dt>
                      <dd className="font-medium">{metrics?.fit_score}/1000</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">DNA Grade:</dt>
                      <dd className="font-medium">{metrics?.dna_grade}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Volumen:</dt>
                      <dd className="font-medium">{metrics?.volume}/100</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Potencial:</dt>
                      <dd className="font-medium">{metrics?.potential}/100</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Resistencia:</dt>
                      <dd className="font-medium">{metrics?.endurance}/100</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Fuerza:</dt>
                      <dd className="font-medium">{metrics?.strength}/100</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-primary" />
                  <CardTitle className="text-lg">Genealogía Familiar</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    Has añadido{" "}
                    <span className="font-medium">{familyCount}</span> miembros
                    a tu árbol genealógico.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/onboarding/genealogy")}
                  >
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>

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
                onClick={handleComplete}
                className="flex items-center gap-2"
              >
                <Check size={16} />
                <span>Completar Perfil</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
