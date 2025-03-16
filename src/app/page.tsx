import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  CheckCircle2,
  Shield,
  Users,
  Zap,
  BarChart2,
  Dna,
  Activity,
  Brain,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Train Body Analyzer Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our advanced body analysis platform helps you understand your
              physical potential and track your progress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<BarChart2 className="w-6 h-6" />}
              title="Performance Metrics"
              description="Track 9 key parameters including volume, strength, and endurance"
            />
            <FeatureCard
              icon={<Dna className="w-6 h-6" />}
              title="DNA Analysis"
              description="Understand your genetic potential with our DNA grading system"
            />
            <FeatureCard
              icon={<Activity className="w-6 h-6" />}
              title="Progress Tracking"
              description="Monitor your improvement over time with detailed charts"
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="Smart Recommendations"
              description="Get personalized advice based on your unique profile"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">9+</div>
              <div className="text-blue-100">Body Parameters</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-blue-100">DNA Grades</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000</div>
              <div className="text-blue-100">Max Fit Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Analyze Your Body?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover your genetic potential and track your fitness progress with
            our advanced platform.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try the Demo
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
