"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { MetricsWheel } from "@/components/metrics/metrics-wheel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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

export default function MetricsOnboarding() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/sign-in");
          return;
        }

        const { data, error } = await supabase
          .from("metrics")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== "PGRST116") {
          throw error;
        }

        if (data) {
          setMetrics(data);
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [supabase, router]);

  const handleContinue = () => {
    router.push("/onboarding/genealogy");
  };

  const handleBack = () => {
    router.push("/onboarding");
  };

  // Format metrics for the wheel component
  const wheelMetrics = metrics
    ? [
        {
          name: "Volumen",
          value: metrics.volume,
          color: "#4f46e5",
          description: "Mide el volumen total de entrenamiento",
        },
        {
          name: "Potencial",
          value: metrics.potential,
          color: "#2563eb",
          description: "Representa el potencial genético y capacidad de mejora",
        },
        {
          name: "Resistencia",
          value: metrics.endurance,
          color: "#0891b2",
          description: "Evalúa la resistencia cardiovascular y muscular",
        },
        {
          name: "Fuerza",
          value: metrics.strength,
          color: "#7c3aed",
          description: "Cuantifica la fuerza muscular en diferentes grupos",
        },
        {
          name: "Adaptabilidad",
          value: metrics.adaptability,
          color: "#db2777",
          description: "Mide la capacidad de adaptarse a diferentes estímulos",
        },
        {
          name: "Progreso",
          value: metrics.progress,
          color: "#16a34a",
          description: "Analiza la tasa de mejora a lo largo del tiempo",
        },
        {
          name: "Coordinación",
          value: metrics.coordination,
          color: "#ca8a04",
          description: "Evalúa la coordinación motriz y neuromuscular",
        },
        {
          name: "Agilidad",
          value: metrics.agility,
          color: "#f97316",
          description: "Mide la capacidad de cambiar de dirección rápidamente",
        },
        {
          name: "Consistencia",
          value: metrics.consistency,
          color: "#9333ea",
          description: "Evalúa la regularidad y constancia en el entrenamiento",
        },
      ]
    : [];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-4xl rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Tus Métricas Iniciales
          </h1>
          <p className="text-muted-foreground mt-2">
            Basado en la información que proporcionaste, hemos calculado tus
            métricas iniciales
          </p>
        </div>

        <OnboardingProgress currentStep={3} totalSteps={5} />

        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <p>Cargando métricas...</p>
            </div>
          ) : metrics ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Rueda de Parámetros</CardTitle>
                    <CardDescription>
                      Visualización de tus 9 parámetros principales
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MetricsWheel metrics={wheelMetrics} />
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Fit Score</CardTitle>
                    <CardDescription>
                      Tu puntuación general de condición física
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center p-6">
                      <div className="text-6xl font-bold text-primary mb-2">
                        {metrics.fit_score}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        de 1000 puntos posibles
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>DNA Grade</CardTitle>
                    <CardDescription>
                      Clasificación de tu potencial genético
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center p-6">
                      <div className="text-6xl font-bold text-primary mb-2">
                        {metrics.dna_grade}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        SS es la clasificación más alta
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-96">
              <div className="text-center">
                <Info className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p>
                  No se encontraron métricas. Por favor completa la información
                  personal primero.
                </p>
              </div>
            </div>
          )}

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
