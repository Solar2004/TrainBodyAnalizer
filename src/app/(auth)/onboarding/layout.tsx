import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check if user has already completed onboarding
  const { data: profileData, error: profileError } = await supabase
    .from("user_profiles")
    .select("onboarding_completed")
    .eq("user_id", user.id)
    .single();

  if (profileData?.onboarding_completed) {
    return redirect("/dashboard");
  }

  return <>{children}</>;
}
