import { createClient } from "../../../../supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirect_to = requestUrl.searchParams.get("redirect_to");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);

    // Get the user to check if they've completed onboarding
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Check if user has completed onboarding
      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("onboarding_completed")
        .eq("user_id", user.id)
        .single();

      if (!profileData || !profileData.onboarding_completed) {
        // If no profile or onboarding not completed, redirect to onboarding
        return NextResponse.redirect(new URL("/onboarding", requestUrl.origin));
      }
    }
  }

  // URL to redirect to after sign in process completes
  const redirectTo = redirect_to || "/dashboard";
  return NextResponse.redirect(new URL(redirectTo, requestUrl.origin));
}
