"use client";

import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { saveOnboardingData } from "@/app/actions";
import Navbar from "@/components/navbar";
import { UrlProvider } from "@/components/url-provider";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  User,
  Dna,
  Users,
  Activity,
  Heart,
  Plus,
  GitBranch,
  Apple,
  Utensils,
  Droplet,
  Flame,
} from "lucide-react";
import { AddFamilyMemberDialog } from "@/components/genealogy/add-family-member-dialog";
import { FamilyTreeExtended } from "@/components/genealogy/family-tree-extended";
import { MetabolicHealthCard } from "@/components/nutrition/metabolic-health-card";
import { NutritionProfileCard } from "@/components/nutrition/nutrition-profile-card";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: "user-self",
      name: "You",
      relation: "self",
      generation: 0,
      age: 30,
      healthConditions: [],
    },
  ]);

  // Metabolic health state
  const [metabolicHealth, setMetabolicHealth] = useState({
    basalMetabolism: 1800,
    hydrationLevel: 70,
    insulinSensitivity: 65,
    ironLevels: 80,
    chronicInflammation: 25,
    metabolicAge: 30,
  });

  // Nutrition profile state
  const [nutritionProfile, setNutritionProfile] = useState({
    dietType: "Mixed",
    mealFrequency: 3,
    proteinIntake: 1.6,
    carbIntake: 45,
    fatIntake: 30,
    fiberIntake: 25,
    waterIntake: 2.5,
    supplementsUsed: [],
    foodSensitivities: [],
    nutritionalGoals: [],
  });

  const addFamilyMember = (member) => {
    setFamilyMembers([
      ...familyMembers,
      {
        id: Date.now(),
        ...member,
      },
    ]);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-4xl rounded-lg border border-border bg-card p-6 shadow-sm">
          <UrlProvider>
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">
                Complete Your Profile
              </h1>
              <p className="text-muted-foreground mt-2">
                Help us personalize your experience by providing some additional
                information
              </p>
            </div>

            <OnboardingProgress currentStep={currentStep} totalSteps={7} />

            <Tabs
              defaultValue="personal"
              className="w-full"
              onValueChange={(value) => {
                const stepMap = {
                  personal: 0,
                  physical: 1,
                  health: 2,
                  metabolic: 3,
                  nutrition: 4,
                  family: 5,
                  genealogy: 6,
                };
                setCurrentStep(stepMap[value] || 0);
              }}
            >
              <TabsList className="grid grid-cols-7 w-full mb-8">
                <TabsTrigger
                  value="personal"
                  className="flex items-center gap-2"
                >
                  <User size={16} />
                  <span>Personal</span>
                </TabsTrigger>
                <TabsTrigger
                  value="physical"
                  className="flex items-center gap-2"
                >
                  <Activity size={16} />
                  <span>Physical</span>
                </TabsTrigger>
                <TabsTrigger value="health" className="flex items-center gap-2">
                  <Heart size={16} />
                  <span>Health</span>
                </TabsTrigger>
                <TabsTrigger
                  value="metabolic"
                  className="flex items-center gap-2"
                >
                  <Flame size={16} />
                  <span>Metabolic</span>
                </TabsTrigger>
                <TabsTrigger
                  value="nutrition"
                  className="flex items-center gap-2"
                >
                  <Utensils size={16} />
                  <span>Nutrition</span>
                </TabsTrigger>
                <TabsTrigger value="family" className="flex items-center gap-2">
                  <Users size={16} />
                  <span>Family</span>
                </TabsTrigger>
                <TabsTrigger
                  value="genealogy"
                  className="flex items-center gap-2"
                >
                  <GitBranch size={16} />
                  <span>Genealogy</span>
                </TabsTrigger>
              </TabsList>

              <form action={saveOnboardingData}>
                <TabsContent value="personal" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Basic information about yourself
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            name="age"
                            type="number"
                            min="1"
                            max="120"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Select name="gender" defaultValue="">
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="height">Height (cm)</Label>
                          <Input
                            id="height"
                            name="height"
                            type="number"
                            min="50"
                            max="250"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input
                            id="weight"
                            name="weight"
                            type="number"
                            min="20"
                            max="300"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bloodType">Blood Type</Label>
                          <Select name="bloodType" defaultValue="">
                            <SelectTrigger>
                              <SelectValue placeholder="Select blood type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                              <SelectItem value="unknown">Unknown</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ethnicity">Ethnicity</Label>
                          <Select name="ethnicity" defaultValue="">
                            <SelectTrigger>
                              <SelectValue placeholder="Select ethnicity" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Basque">Basque</SelectItem>
                              <SelectItem value="Catalan">Catalan</SelectItem>
                              <SelectItem value="Galician">Galician</SelectItem>
                              <SelectItem value="Andalusian">
                                Andalusian
                              </SelectItem>
                              <SelectItem value="Northern European">
                                Northern European
                              </SelectItem>
                              <SelectItem value="Mediterranean">
                                Mediterranean
                              </SelectItem>
                              <SelectItem value="Slavic">Slavic</SelectItem>
                              <SelectItem value="Celtic">Celtic</SelectItem>
                              <SelectItem value="Germanic">Germanic</SelectItem>
                              <SelectItem value="Nordic">Nordic</SelectItem>
                              <SelectItem value="Mixed">Mixed</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="countryOfBirth">
                            Country of Birth
                          </Label>
                          <Input
                            id="countryOfBirth"
                            name="countryOfBirth"
                            type="text"
                            placeholder="Enter country"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          className="flex items-center gap-2"
                          onClick={() => {
                            document
                              .querySelector('[data-value="physical"]')
                              ?.click();
                          }}
                        >
                          <span>Next</span>
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="physical" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Physical Attributes</CardTitle>
                      <CardDescription>
                        Information about your physical capabilities and
                        training
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <Label>Somatotype (Body Type)</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="ectomorph"
                              name="somatotype"
                              value="ectomorph"
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor="ectomorph"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Ectomorph
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Lean, long, difficulty gaining weight
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="mesomorph"
                              name="somatotype"
                              value="mesomorph"
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor="mesomorph"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Mesomorph
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Athletic, easily gains muscle
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="endomorph"
                              name="somatotype"
                              value="endomorph"
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor="endomorph"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Endomorph
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Wider frame, tendency to store fat
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Training Experience</Label>
                        <div className="space-y-2">
                          <Label
                            htmlFor="trainingFrequency"
                            className="text-sm text-muted-foreground"
                          >
                            Training Frequency (days per week)
                          </Label>
                          <Slider
                            id="trainingFrequency"
                            name="trainingFrequency"
                            defaultValue={[3]}
                            max={7}
                            step={1}
                            className="py-4"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>0</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>7</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="trainingIntensity"
                            className="text-sm text-muted-foreground"
                          >
                            Training Intensity
                          </Label>
                          <Slider
                            id="trainingIntensity"
                            name="trainingIntensity"
                            defaultValue={[50]}
                            max={100}
                            step={10}
                            className="py-4"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Low</span>
                            <span>Medium</span>
                            <span>High</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="trainingDuration"
                            className="text-sm text-muted-foreground"
                          >
                            Average Training Duration (minutes per session)
                          </Label>
                          <Slider
                            id="trainingDuration"
                            name="trainingDuration"
                            defaultValue={[60]}
                            max={180}
                            step={15}
                            className="py-4"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>15</span>
                            <span>60</span>
                            <span>120</span>
                            <span>180</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="trainingYears" className="text-sm">
                            Years of Consistent Training
                          </Label>
                          <Input
                            id="trainingYears"
                            name="trainingYears"
                            type="number"
                            min="0"
                            max="50"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Strength Metrics</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="benchPress" className="text-sm">
                              Bench Press Max (kg)
                            </Label>
                            <Input
                              id="benchPress"
                              name="benchPress"
                              type="number"
                              min="0"
                              max="300"
                              placeholder="0"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="squat" className="text-sm">
                              Squat Max (kg)
                            </Label>
                            <Input
                              id="squat"
                              name="squat"
                              type="number"
                              min="0"
                              max="400"
                              placeholder="0"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="deadlift" className="text-sm">
                              Deadlift Max (kg)
                            </Label>
                            <Input
                              id="deadlift"
                              name="deadlift"
                              type="number"
                              min="0"
                              max="400"
                              placeholder="0"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pullups" className="text-sm">
                              Max Pull-ups (reps)
                            </Label>
                            <Input
                              id="pullups"
                              name="pullups"
                              type="number"
                              min="0"
                              max="100"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Endurance Metrics</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="restingHeartRate"
                              className="text-sm"
                            >
                              Resting Heart Rate (bpm)
                            </Label>
                            <Input
                              id="restingHeartRate"
                              name="restingHeartRate"
                              type="number"
                              min="40"
                              max="120"
                              placeholder="60"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="maxHeartRate" className="text-sm">
                              Max Heart Rate (bpm)
                            </Label>
                            <Input
                              id="maxHeartRate"
                              name="maxHeartRate"
                              type="number"
                              min="120"
                              max="220"
                              placeholder="180"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="runningDistance"
                              className="text-sm"
                            >
                              Max Running Distance (km)
                            </Label>
                            <Input
                              id="runningDistance"
                              name="runningDistance"
                              type="number"
                              min="0"
                              max="100"
                              step="0.5"
                              placeholder="5"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="recoveryTime" className="text-sm">
                              Recovery Time (minutes)
                            </Label>
                            <Input
                              id="recoveryTime"
                              name="recoveryTime"
                              type="number"
                              min="1"
                              max="60"
                              placeholder="10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Coordination & Agility</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="coordinationLevel"
                              className="text-sm"
                            >
                              Coordination Level
                            </Label>
                            <Select
                              name="coordinationLevel"
                              defaultValue="medium"
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beginner">
                                  Beginner
                                </SelectItem>
                                <SelectItem value="medium">
                                  Intermediate
                                </SelectItem>
                                <SelectItem value="advanced">
                                  Advanced
                                </SelectItem>
                                <SelectItem value="expert">Expert</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="sportSpecific" className="text-sm">
                              Sport-Specific Skills
                            </Label>
                            <Input
                              id="sportSpecific"
                              name="sportSpecific"
                              type="text"
                              placeholder="e.g., Tennis, Martial Arts, Dance"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="reactionTime" className="text-sm">
                              Reaction Time
                            </Label>
                            <Select name="reactionTime" defaultValue="average">
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="slow">Slow</SelectItem>
                                <SelectItem value="average">Average</SelectItem>
                                <SelectItem value="fast">Fast</SelectItem>
                                <SelectItem value="veryfast">
                                  Very Fast
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="balanceLevel" className="text-sm">
                              Balance Level
                            </Label>
                            <Select name="balanceLevel" defaultValue="medium">
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="poor">Poor</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="good">Good</SelectItem>
                                <SelectItem value="excellent">
                                  Excellent
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => {
                            document
                              .querySelector('[data-value="personal"]')
                              ?.click();
                          }}
                        >
                          <ArrowRight size={16} className="rotate-180" />
                          <span>Previous</span>
                        </Button>
                        <Button
                          type="button"
                          className="flex items-center gap-2"
                          onClick={() => {
                            document
                              .querySelector('[data-value="health"]')
                              ?.click();
                          }}
                        >
                          <span>Next</span>
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="health" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Health & Lifestyle</CardTitle>
                      <CardDescription>
                        Information about your health and daily habits
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <Label>Sleep Quality</Label>
                        <div className="space-y-2">
                          <Label
                            htmlFor="sleepQuality"
                            className="text-sm text-muted-foreground"
                          >
                            Average Sleep Quality
                          </Label>
                          <Slider
                            id="sleepQuality"
                            name="sleepQuality"
                            defaultValue={[50]}
                            max={100}
                            step={10}
                            className="py-4"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Poor</span>
                            <span>Average</span>
                            <span>Excellent</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="sleepHours" className="text-sm">
                            Average Hours of Sleep
                          </Label>
                          <Input
                            id="sleepHours"
                            name="sleepHours"
                            type="number"
                            min="3"
                            max="12"
                            step="0.5"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Stress & Recovery</Label>
                        <div className="space-y-2">
                          <Label
                            htmlFor="stressLevel"
                            className="text-sm text-muted-foreground"
                          >
                            Daily Stress Level
                          </Label>
                          <Slider
                            id="stressLevel"
                            name="stressLevel"
                            defaultValue={[50]}
                            max={100}
                            step={10}
                            className="py-4"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Low</span>
                            <span>Medium</span>
                            <span>High</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="adaptabilityToChange"
                            className="text-sm text-muted-foreground"
                          >
                            Adaptability to New Training Stimuli
                          </Label>
                          <Slider
                            id="adaptabilityToChange"
                            name="adaptabilityToChange"
                            defaultValue={[50]}
                            max={100}
                            step={10}
                            className="py-4"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Slow</span>
                            <span>Average</span>
                            <span>Fast</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="recoveryAbility" className="text-sm">
                            Recovery Ability
                          </Label>
                          <Select name="recoveryAbility" defaultValue="average">
                            <SelectTrigger>
                              <SelectValue placeholder="Select recovery ability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="poor">
                                Poor - Need extra rest days
                              </SelectItem>
                              <SelectItem value="average">
                                Average - Standard recovery time
                              </SelectItem>
                              <SelectItem value="good">
                                Good - Faster than average
                              </SelectItem>
                              <SelectItem value="excellent">
                                Excellent - Very quick recovery
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Consistency & Progress Tracking</Label>
                        <div className="space-y-2">
                          <Label
                            htmlFor="trainingConsistency"
                            className="text-sm"
                          >
                            Training Consistency
                          </Label>
                          <Select
                            name="trainingConsistency"
                            defaultValue="moderate"
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select consistency level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="verylow">
                                Very Low - Often miss workouts
                              </SelectItem>
                              <SelectItem value="low">
                                Low - Frequently inconsistent
                              </SelectItem>
                              <SelectItem value="moderate">
                                Moderate - Sometimes miss workouts
                              </SelectItem>
                              <SelectItem value="high">
                                High - Rarely miss workouts
                              </SelectItem>
                              <SelectItem value="veryhigh">
                                Very High - Never miss workouts
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="progressRate" className="text-sm">
                            Rate of Progress (last 3 months)
                          </Label>
                          <Select name="progressRate" defaultValue="steady">
                            <SelectTrigger>
                              <SelectValue placeholder="Select progress rate" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">
                                None - No visible progress
                              </SelectItem>
                              <SelectItem value="slow">
                                Slow - Minimal progress
                              </SelectItem>
                              <SelectItem value="steady">
                                Steady - Consistent progress
                              </SelectItem>
                              <SelectItem value="fast">
                                Fast - Significant progress
                              </SelectItem>
                              <SelectItem value="veryfast">
                                Very Fast - Exceptional progress
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="trackingMethod" className="text-sm">
                            How do you track your progress?
                          </Label>
                          <Select name="trackingMethod" defaultValue="mental">
                            <SelectTrigger>
                              <SelectValue placeholder="Select tracking method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">
                                Don't track progress
                              </SelectItem>
                              <SelectItem value="mental">
                                Mental notes only
                              </SelectItem>
                              <SelectItem value="journal">
                                Written journal/log
                              </SelectItem>
                              <SelectItem value="app">Fitness app</SelectItem>
                              <SelectItem value="coach">
                                Coach/trainer feedback
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Medical Conditions</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="hypertension"
                              name="medicalConditions"
                              value="hypertension"
                            />
                            <Label htmlFor="hypertension">Hypertension</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="diabetes"
                              name="medicalConditions"
                              value="diabetes"
                            />
                            <Label htmlFor="diabetes">Diabetes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="asthma"
                              name="medicalConditions"
                              value="asthma"
                            />
                            <Label htmlFor="asthma">Asthma</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="heartDisease"
                              name="medicalConditions"
                              value="heartDisease"
                            />
                            <Label htmlFor="heartDisease">Heart Disease</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="arthritis"
                              name="medicalConditions"
                              value="arthritis"
                            />
                            <Label htmlFor="arthritis">Arthritis</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="none"
                              name="medicalConditions"
                              value="none"
                            />
                            <Label htmlFor="none">None</Label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => {
                            document
                              .querySelector('[data-value="physical"]')
                              ?.click();
                          }}
                        >
                          <ArrowRight size={16} className="rotate-180" />
                          <span>Previous</span>
                        </Button>
                        <Button
                          type="button"
                          className="flex items-center gap-2"
                          onClick={() => {
                            document
                              .querySelector('[data-value="metabolic"]')
                              ?.click();
                          }}
                        >
                          <span>Next</span>
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="metabolic" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Metabolic Health</CardTitle>
                      <CardDescription>
                        Information about your metabolic health and function
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <Label>Basal Metabolism</Label>
                        <div className="space-y-2">
                          <Label
                            htmlFor="basalMetabolism"
                            className="text-sm text-muted-foreground"
                          >
                            Estimated Basal Metabolic Rate (kcal/day)
                          </Label>
                          <Input
                            id="basalMetabolism"
                            name="basalMetabolism"
                            type="number"
                            min="800"
                            max="3000"
                            defaultValue={metabolicHealth.basalMetabolism}
                            onChange={(e) =>
                              setMetabolicHealth({
                                ...metabolicHealth,
                                basalMetabolism: parseInt(e.target.value),
                              })
                            }
                          />
                          <p className="text-xs text-muted-foreground">
                            This is the amount of energy your body needs at
                            complete rest
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Hydration Level</Label>
                        <div className="space-y-2">
                          <Label
                            htmlFor="hydrationLevel"
                            className="text-sm text-muted-foreground"
                          >
                            Average Hydration Level
                          </Label>
                          <Slider
                            id="hydrationLevel"
                            name="hydrationLevel"
                            defaultValue={[metabolicHealth.hydrationLevel]}
                            max={100}
                            step={5}
                            className="py-4"
                            onValueChange={(value) =>
                              setMetabolicHealth({
                                ...metabolicHealth,
                                hydrationLevel: value[0],
                              })
                            }
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Poor</span>
                            <span>Average</span>
                            <span>Excellent</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Insulin Sensitivity</Label>
                        <div className="space-y-2">
                          <Label
                            htmlFor="insulinSensitivity"
                            className="text-sm text-muted-foreground"
                          >
                            Insulin Response
                          </Label>
                          <Slider
                            id="insulinSensitivity"
                            name="insulinSensitivity"
                            defaultValue={[metabolicHealth.insulinSensitivity]}
                            max={100}
                            step={5}
                            className="py-4"
                            onValueChange={(value) =>
                              setMetabolicHealth({
                                ...metabolicHealth,
                                insulinSensitivity: value[0],
                              })
                            }
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Poor</span>
                            <span>Average</span>
                            <span>Excellent</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Iron Levels</Label>
                        <div className="space-y-2">
                          <Label
                            htmlFor="ironLevels"
                            className="text-sm text-muted-foreground"
                          >
                            Iron Status
                          </Label>
                          <Slider
                            id="ironLevels"
                            name="ironLevels"
                            defaultValue={[metabolicHealth.ironLevels]}
                            max={100}
                            step={5}
                            className="py-4"
                            onValueChange={(value) =>
                              setMetabolicHealth({
                                ...metabolicHealth,
                                ironLevels: value[0],
                              })
                            }
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Low</span>
                            <span>Normal</span>
                            <span>Optimal</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Chronic Inflammation</Label>
                        <div className="space-y-2">
                          <Label
                            htmlFor="chronicInflammation"
                            className="text-sm text-muted-foreground"
                          >
                            Inflammation Level
                          </Label>
                          <Slider
                            id="chronicInflammation"
                            name="chronicInflammation"
                            defaultValue={[metabolicHealth.chronicInflammation]}
                            max={100}
                            step={5}
                            className="py-4"
                            onValueChange={(value) =>
                              setMetabolicHealth({
                                ...metabolicHealth,
                                chronicInflammation: value[0],
                              })
                            }
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Low (Good)</span>
                            <span>Moderate</span>
                            <span>High (Poor)</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Lower values are better for inflammation
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Metabolic Age</Label>
                        <div className="space-y-2">
                          <Label
                            htmlFor="metabolicAge"
                            className="text-sm text-muted-foreground"
                          >
                            Estimated Metabolic Age (years)
                          </Label>
                          <Input
                            id="metabolicAge"
                            name="metabolicAge"
                            type="number"
                            min="15"
                            max="100"
                            defaultValue={metabolicHealth.metabolicAge}
                            onChange={(e) =>
                              setMetabolicHealth({
                                ...metabolicHealth,
                                metabolicAge: parseInt(e.target.value),
                              })
                            }
                          />
                          <p className="text-xs text-muted-foreground">
                            Your body's biological age based on metabolic
                            function
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <MetabolicHealthCard
                          basalMetabolism={metabolicHealth.basalMetabolism}
                          hydrationLevel={metabolicHealth.hydrationLevel}
                          insulinSensitivity={
                            metabolicHealth.insulinSensitivity
                          }
                          ironLevels={metabolicHealth.ironLevels}
                          chronicInflammation={
                            metabolicHealth.chronicInflammation
                          }
                          metabolicAge={metabolicHealth.metabolicAge}
                        />
                      </div>

                      <input
                        type="hidden"
                        name="metabolicHealth"
                        value={JSON.stringify(metabolicHealth)}
                      />

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => {
                            document
                              .querySelector('[data-value="health"]')
                              ?.click();
                          }}
                        >
                          <ArrowRight size={16} className="rotate-180" />
                          <span>Previous</span>
                        </Button>
                        <Button
                          type="button"
                          className="flex items-center gap-2"
                          onClick={() => {
                            document
                              .querySelector('[data-value="nutrition"]')
                              ?.click();
                          }}
                        >
                          <span>Next</span>
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="nutrition" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Nutrition Profile</CardTitle>
                      <CardDescription>
                        Information about your dietary patterns and nutritional
                        intake
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <Label>Diet Type</Label>
                        <div className="space-y-2">
                          <Select
                            name="dietType"
                            defaultValue={nutritionProfile.dietType}
                            onValueChange={(value) =>
                              setNutritionProfile({
                                ...nutritionProfile,
                                dietType: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select diet type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Mixed">
                                Mixed / Omnivore
                              </SelectItem>
                              <SelectItem value="Vegetarian">
                                Vegetarian
                              </SelectItem>
                              <SelectItem value="Vegan">Vegan</SelectItem>
                              <SelectItem value="Pescatarian">
                                Pescatarian
                              </SelectItem>
                              <SelectItem value="Keto">Ketogenic</SelectItem>
                              <SelectItem value="Paleo">Paleo</SelectItem>
                              <SelectItem value="Mediterranean">
                                Mediterranean
                              </SelectItem>
                              <SelectItem value="Low-Carb">Low Carb</SelectItem>
                              <SelectItem value="High-Protein">
                                High Protein
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Meal Frequency</Label>
                        <div className="space-y-2">
                          <Label
                            htmlFor="mealFrequency"
                            className="text-sm text-muted-foreground"
                          >
                            Meals per day (including snacks)
                          </Label>
                          <Slider
                            id="mealFrequency"
                            name="mealFrequency"
                            defaultValue={[nutritionProfile.mealFrequency]}
                            min={1}
                            max={8}
                            step={1}
                            className="py-4"
                            onValueChange={(value) =>
                              setNutritionProfile({
                                ...nutritionProfile,
                                mealFrequency: value[0],
                              })
                            }
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>7</span>
                            <span>8+</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Macronutrient Distribution</Label>
                        <div className="space-y-2">
                          <Label
                            htmlFor="proteinIntake"
                            className="text-sm text-muted-foreground"
                          >
                            Protein Intake (g/kg of bodyweight)
                          </Label>
                          <Slider
                            id="proteinIntake"
                            name="proteinIntake"
                            defaultValue={[nutritionProfile.proteinIntake * 10]}
                            min={5}
                            max={30}
                            step={1}
                            className="py-4"
                            onValueChange={(value) =>
                              setNutritionProfile({
                                ...nutritionProfile,
                                proteinIntake: value[0] / 10,
                              })
                            }
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>0.5</span>
                            <span>1.0</span>
                            <span>1.5</span>
                            <span>2.0</span>
                            <span>2.5</span>
                            <span>3.0</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Current: {nutritionProfile.proteinIntake} g/kg
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="carbIntake"
                            className="text-sm text-muted-foreground"
                          >
                            Carbohydrate Intake (% of total calories)
                          </Label>
                          <Slider
                            id="carbIntake"
                            name="carbIntake"
                            defaultValue={[nutritionProfile.carbIntake]}
                            min={5}
                            max={75}
                            step={5}
                            className="py-4"
                            onValueChange={(value) =>
                              setNutritionProfile({
                                ...nutritionProfile,
                                carbIntake: value[0],
                              })
                            }
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>5%</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="fatIntake"
                            className="text-sm text-muted-foreground"
                          >
                            Fat Intake (% of total calories)
                          </Label>
                          <Slider
                            id="fatIntake"
                            name="fatIntake"
                            defaultValue={[nutritionProfile.fatIntake]}
                            min={10}
                            max={70}
                            step={5}
                            className="py-4"
                            onValueChange={(value) =>
                              setNutritionProfile({
                                ...nutritionProfile,
                                fatIntake: value[0],
                              })
                            }
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>10%</span>
                            <span>30%</span>
                            <span>50%</span>
                            <span>70%</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fiberIntake" className="text-sm">
                            Fiber Intake (g/day)
                          </Label>
                          <Input
                            id="fiberIntake"
                            name="fiberIntake"
                            type="number"
                            min="0"
                            max="100"
                            value={nutritionProfile.fiberIntake}
                            onChange={(e) =>
                              setNutritionProfile({
                                ...nutritionProfile,
                                fiberIntake: Number(e.target.value),
                              })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="waterIntake" className="text-sm">
                            Water Intake (liters/day)
                          </Label>
                          <Input
                            id="waterIntake"
                            name="waterIntake"
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={nutritionProfile.waterIntake}
                            onChange={(e) =>
                              setNutritionProfile({
                                ...nutritionProfile,
                                waterIntake: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Supplements Used</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {[
                            { id: "protein", label: "Protein Powder" },
                            { id: "creatine", label: "Creatine" },
                            { id: "bcaa", label: "BCAAs" },
                            { id: "preworkout", label: "Pre-Workout" },
                            { id: "vitamins", label: "Multivitamin" },
                            { id: "omega3", label: "Omega-3" },
                            { id: "vitaminD", label: "Vitamin D" },
                            { id: "magnesium", label: "Magnesium" },
                            { id: "zinc", label: "Zinc" },
                          ].map((supplement) => (
                            <div
                              key={supplement.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`supplement-${supplement.id}`}
                                checked={nutritionProfile.supplementsUsed.includes(
                                  supplement.id,
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setNutritionProfile({
                                      ...nutritionProfile,
                                      supplementsUsed: [
                                        ...nutritionProfile.supplementsUsed,
                                        supplement.id,
                                      ],
                                    });
                                  } else {
                                    setNutritionProfile({
                                      ...nutritionProfile,
                                      supplementsUsed:
                                        nutritionProfile.supplementsUsed.filter(
                                          (id) => id !== supplement.id,
                                        ),
                                    });
                                  }
                                }}
                              />
                              <Label htmlFor={`supplement-${supplement.id}`}>
                                {supplement.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Food Sensitivities</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {[
                            { id: "gluten", label: "Gluten" },
                            { id: "lactose", label: "Lactose" },
                            { id: "nuts", label: "Nuts" },
                            { id: "eggs", label: "Eggs" },
                            { id: "soy", label: "Soy" },
                            { id: "shellfish", label: "Shellfish" },
                            { id: "none", label: "None" },
                          ].map((sensitivity) => (
                            <div
                              key={sensitivity.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`sensitivity-${sensitivity.id}`}
                                checked={nutritionProfile.foodSensitivities.includes(
                                  sensitivity.id,
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    // If "None" is selected, clear other selections
                                    if (sensitivity.id === "none") {
                                      setNutritionProfile({
                                        ...nutritionProfile,
                                        foodSensitivities: ["none"],
                                      });
                                    } else {
                                      // Remove "none" if it exists and add the new sensitivity
                                      setNutritionProfile({
                                        ...nutritionProfile,
                                        foodSensitivities: [
                                          ...nutritionProfile.foodSensitivities.filter(
                                            (id) => id !== "none",
                                          ),
                                          sensitivity.id,
                                        ],
                                      });
                                    }
                                  } else {
                                    setNutritionProfile({
                                      ...nutritionProfile,
                                      foodSensitivities:
                                        nutritionProfile.foodSensitivities.filter(
                                          (id) => id !== sensitivity.id,
                                        ),
                                    });
                                  }
                                }}
                              />
                              <Label htmlFor={`sensitivity-${sensitivity.id}`}>
                                {sensitivity.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Nutritional Goals</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            { id: "weightLoss", label: "Weight Loss" },
                            { id: "muscleGain", label: "Muscle Gain" },
                            { id: "maintenance", label: "Maintenance" },
                            { id: "performance", label: "Performance" },
                            { id: "health", label: "General Health" },
                            { id: "energy", label: "Energy Levels" },
                          ].map((goal) => (
                            <div
                              key={goal.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`goal-${goal.id}`}
                                checked={nutritionProfile.nutritionalGoals.includes(
                                  goal.id,
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setNutritionProfile({
                                      ...nutritionProfile,
                                      nutritionalGoals: [
                                        ...nutritionProfile.nutritionalGoals,
                                        goal.id,
                                      ],
                                    });
                                  } else {
                                    setNutritionProfile({
                                      ...nutritionProfile,
                                      nutritionalGoals:
                                        nutritionProfile.nutritionalGoals.filter(
                                          (id) => id !== goal.id,
                                        ),
                                    });
                                  }
                                }}
                              />
                              <Label htmlFor={`goal-${goal.id}`}>
                                {goal.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <NutritionProfileCard
                          dietType={nutritionProfile.dietType}
                          mealFrequency={nutritionProfile.mealFrequency}
                          proteinIntake={nutritionProfile.proteinIntake}
                          carbIntake={nutritionProfile.carbIntake}
                          fatIntake={nutritionProfile.fatIntake}
                          fiberIntake={nutritionProfile.fiberIntake}
                          waterIntake={nutritionProfile.waterIntake}
                          supplementsUsed={nutritionProfile.supplementsUsed}
                          foodSensitivities={nutritionProfile.foodSensitivities}
                          nutritionalGoals={nutritionProfile.nutritionalGoals}
                        />
                      </div>

                      <input
                        type="hidden"
                        name="nutritionProfile"
                        value={JSON.stringify(nutritionProfile)}
                      />

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => {
                            document
                              .querySelector('[data-value="metabolic"]')
                              ?.click();
                          }}
                        >
                          <ArrowRight size={16} className="rotate-180" />
                          <span>Previous</span>
                        </Button>
                        <Button
                          type="button"
                          className="flex items-center gap-2"
                          onClick={() => {
                            document
                              .querySelector('[data-value="family"]')
                              ?.click();
                          }}
                        >
                          <span>Next</span>
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="family" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Family History</CardTitle>
                      <CardDescription>
                        Information about your family's health and athletic
                        background
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <Label>Family Athletic Background</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="familyAthleticLevel"
                              className="text-sm"
                            >
                              Athletic Level in Family
                            </Label>
                            <Select name="familyAthleticLevel" defaultValue="">
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="professional">
                                  Professional Athletes
                                </SelectItem>
                                <SelectItem value="amateur">
                                  Amateur Athletes
                                </SelectItem>
                                <SelectItem value="recreational">
                                  Recreational Sports
                                </SelectItem>
                                <SelectItem value="none">
                                  No Athletic Background
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="familySports" className="text-sm">
                              Main Sports in Family
                            </Label>
                            <Input
                              id="familySports"
                              name="familySports"
                              type="text"
                              placeholder="e.g., Soccer, Swimming"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Family Longevity</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="grandparentsAge"
                              className="text-sm"
                            >
                              Average Age of Grandparents
                            </Label>
                            <Input
                              id="grandparentsAge"
                              name="grandparentsAge"
                              type="number"
                              min="40"
                              max="120"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="familyLongevity"
                              className="text-sm"
                            >
                              Family Longevity
                            </Label>
                            <Select name="familyLongevity" defaultValue="">
                              <SelectTrigger>
                                <SelectValue placeholder="Select longevity" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">
                                  High (90+ years)
                                </SelectItem>
                                <SelectItem value="above-average">
                                  Above Average (80-90 years)
                                </SelectItem>
                                <SelectItem value="average">
                                  Average (70-80 years)
                                </SelectItem>
                                <SelectItem value="below-average">
                                  Below Average (60-70 years)
                                </SelectItem>
                                <SelectItem value="low">
                                  Low (below 60 years)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Family Health History</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="familyHypertension"
                              name="familyHealthHistory"
                              value="hypertension"
                            />
                            <Label htmlFor="familyHypertension">
                              Hypertension
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="familyDiabetes"
                              name="familyHealthHistory"
                              value="diabetes"
                            />
                            <Label htmlFor="familyDiabetes">Diabetes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="familyHeartDisease"
                              name="familyHealthHistory"
                              value="heartDisease"
                            />
                            <Label htmlFor="familyHeartDisease">
                              Heart Disease
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="familyCancer"
                              name="familyHealthHistory"
                              value="cancer"
                            />
                            <Label htmlFor="familyCancer">Cancer</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="familyAlzheimers"
                              name="familyHealthHistory"
                              value="alzheimers"
                            />
                            <Label htmlFor="familyAlzheimers">
                              Alzheimer's
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="familyNone"
                              name="familyHealthHistory"
                              value="none"
                            />
                            <Label htmlFor="familyNone">None</Label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => {
                            document
                              .querySelector('[data-value="nutrition"]')
                              ?.click();
                          }}
                        >
                          <ArrowRight size={16} className="rotate-180" />
                          <span>Previous</span>
                        </Button>
                        <Button
                          type="button"
                          className="flex items-center gap-2"
                          onClick={() => {
                            document
                              .querySelector('[data-value="genealogy"]')
                              ?.click();
                          }}
                        >
                          <span>Next</span>
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="genealogy" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Family Genealogy</CardTitle>
                      <CardDescription>
                        Build your family tree to help us understand your
                        genetic background
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">
                          Your Family Members
                        </h3>
                        <AddFamilyMemberDialog
                          existingMembers={familyMembers}
                          onAddMember={(newMember) => {
                            setFamilyMembers([
                              ...familyMembers,
                              {
                                id: newMember.id,
                                name: newMember.name,
                                relation: newMember.relationship,
                                age: newMember.birthYear
                                  ? new Date().getFullYear() -
                                    newMember.birthYear
                                  : 0,
                                healthConditions:
                                  newMember.medicalHistory || [],
                                // Additional properties
                                side: newMember.side,
                                generation: newMember.generation,
                                origin: newMember.origin,
                                ethnicity: newMember.ethnicity,
                                eyeColor: newMember.eyeColor,
                                hairColor: newMember.hairColor,
                                height: newMember.height,
                                weight: newMember.weight,
                                build: newMember.build,
                                athleticHistory: newMember.athleticHistory,
                                countryOfBirth: newMember.countryOfBirth,
                                description: newMember.description,
                              },
                            ]);
                          }}
                        />
                      </div>

                      {familyMembers.length > 0 ? (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {familyMembers.map((member) => (
                              <div
                                key={member.id}
                                className="border rounded-lg p-4 bg-card"
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-medium">{member.name}</h4>
                                  <div>
                                    <span className="text-sm text-muted-foreground capitalize">
                                      {member.relation}
                                    </span>
                                    {member.side && (
                                      <span className="text-xs text-muted-foreground ml-1">
                                        ({member.side})
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="text-sm space-y-1">
                                  <p>Age: {member.age}</p>
                                  {member.origin && (
                                    <p>Origin: {member.origin}</p>
                                  )}
                                  {member.height && (
                                    <p>Height: {member.height}</p>
                                  )}
                                  {member.hairColor && (
                                    <p>Hair: {member.hairColor}</p>
                                  )}
                                  {member.eyeColor && (
                                    <p>Eyes: {member.eyeColor}</p>
                                  )}
                                  <p className="mt-1">
                                    Health Conditions:{" "}
                                    {member.healthConditions.length > 0 &&
                                    member.healthConditions[0] !== "none"
                                      ? member.healthConditions.join(", ")
                                      : "None"}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="border rounded-lg p-4">
                            <h4 className="font-medium mb-4">
                              Family Tree Visualization
                            </h4>
                            <FamilyTreeExtended
                              members={familyMembers.map((m) => ({
                                id: m.id,
                                name: m.name,
                                relationship: m.relation,
                                generation: m.generation || 0,
                                side: m.side as "paternal" | "maternal",
                                parentId: m.parentId,
                                origin: m.origin,
                                ethnicity: m.ethnicity,
                                somatotype: m.build,
                                eyeColor: m.eyeColor,
                                hairColor: m.hairColor,
                                height: m.height,
                                build: m.build,
                                athleticHistory: m.athleticHistory,
                                medicalHistory: m.healthConditions,
                              }))}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="mt-8 p-4 border border-dashed rounded-lg bg-muted/50 flex flex-col items-center justify-center">
                          <GitBranch
                            size={48}
                            className="text-muted-foreground mb-2"
                          />
                          <p className="text-center text-muted-foreground">
                            Your family tree visualization will appear here as
                            you add more family members
                          </p>
                        </div>
                      )}

                      <input
                        type="hidden"
                        name="familyTree"
                        value={JSON.stringify(familyMembers)}
                      />

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => {
                            document
                              .querySelector('[data-value="family"]')
                              ?.click();
                          }}
                        >
                          <ArrowRight size={16} className="rotate-180" />
                          <span>Previous</span>
                        </Button>
                        <SubmitButton className="flex items-center gap-2">
                          <span>Complete Profile</span>
                          <Check size={16} />
                        </SubmitButton>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </form>
            </Tabs>
          </UrlProvider>
        </div>
      </div>
    </>
  );
}
