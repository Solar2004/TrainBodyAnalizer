import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ParameterWheel from "@/components/stats/parameter-wheel";
import { FitScoreCard } from "@/components/stats/fit-score-card";
import { ParameterDetailCard } from "@/components/stats/parameter-detail-card";
import { HistoryChart } from "@/components/stats/history-chart";
import { DNAGradeCard } from "@/components/profile/dna-grade-card";
import { PhysicalMetricsCard } from "@/components/profile/physical-metrics-card";
import { UserProfile, HistoryEntry, ParameterName } from "@/types";

interface DashboardStatsProps {
  profile: UserProfile;
  history: HistoryEntry[];
}

export function DashboardStats({ profile, history }: DashboardStatsProps) {
  // Get all parameter names
  const parameterNames = Object.keys(profile.parameters) as ParameterName[];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ParameterWheel
            profile={profile}
            size={400}
            className="bg-white dark:bg-gray-950 rounded-lg p-4"
          />
        </div>
        <div className="space-y-6">
          <FitScoreCard score={profile.fitScore} dnaGrade={profile.dnaGrade} />
          <DNAGradeCard
            dnaGrade={profile.dnaGrade}
            geneticOrigins={profile.geneticOrigins}
            geneticMutations={profile.geneticMutations}
          />
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HistoryChart history={history} />
            <PhysicalMetricsCard
              testosterone={profile.testosterone}
              muscleStructure={profile.muscleStructure}
              boneDensity={profile.boneDensity}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {parameterNames.slice(0, 3).map((name) => (
              <ParameterDetailCard
                key={name}
                parameter={profile.parameters[name]}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="parameters" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {parameterNames.map((name) => (
              <ParameterDetailCard
                key={name}
                parameter={profile.parameters[name]}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HistoryChart history={history} />
            {parameterNames.slice(0, 4).map((name) => (
              <HistoryChart key={name} history={history} parameter={name} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
