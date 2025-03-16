import { InfoIcon, UserCircle } from "lucide-react";
import { createClient } from "../../../supabase/server";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { getMockUserProfile, getMockHistoryData } from "@/lib/mock-data";
import { getUserProfile, getUserHistory } from "@/lib/supabase/api";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Try to get real user data, fall back to mock data if not available
  let profile = user ? await getUserProfile(user.id) : null;
  let history = user ? await getUserHistory(user.id, 30) : [];

  // If no real data is available, use mock data
  if (!profile) {
    profile = getMockUserProfile();
  }

  if (history.length === 0) {
    history = getMockHistoryData(30);
  }

  return (
    <>
      {/* Header Section */}
      <header className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Body Analysis Dashboard</h1>
        <div className="bg-secondary/50 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
          <InfoIcon size="14" />
          <span>Welcome to your personalized body analysis dashboard</span>
        </div>
      </header>

      {/* Body Analyzer Stats */}
      <section className="mt-6">
        <DashboardStats profile={profile} history={history} />
      </section>

      {/* User Profile Section */}
      <section className="bg-card rounded-xl p-6 border shadow-sm mt-8">
        <div className="flex items-center gap-4 mb-6">
          <UserCircle size={48} className="text-primary" />
          <div>
            <h2 className="font-semibold text-xl">User Profile</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 overflow-hidden">
          <pre className="text-xs font-mono max-h-48 overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </section>
    </>
  );
}
