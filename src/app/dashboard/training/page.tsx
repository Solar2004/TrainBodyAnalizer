import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Calendar, ClipboardList, BarChart2 } from "lucide-react";

export default function TrainingPage() {
  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Training</h1>
          <p className="text-muted-foreground">
            Manage your training logs and track your progress
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle size={16} />
          <span>New Training Log</span>
        </Button>
      </header>

      <Tabs defaultValue="logs" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <ClipboardList size={16} />
            <span>Training Logs</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Calendar</span>
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <BarChart2 size={16} />
            <span>Statistics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Recent Training Logs */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TrainingLogCard key={i} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Training Calendar</CardTitle>
              <CardDescription>
                View your training schedule and history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  Calendar view coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Training Statistics</CardTitle>
              <CardDescription>
                Analyze your training patterns and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  Statistics view coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

function TrainingLogCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">Strength Training</CardTitle>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            High Intensity
          </span>
        </div>
        <CardDescription>Yesterday at 6:30 PM • 45 minutes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Exercises</span>
            <span>5</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Recovery Quality</span>
            <span>Good</span>
          </div>
          <div className="mt-4 text-sm text-muted-foreground line-clamp-2">
            Focused on compound movements. Felt strong on squats, struggled with
            deadlifts.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
