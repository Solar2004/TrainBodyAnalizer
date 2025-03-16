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
} from "lucide-react";
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
    { id: 1, name: "You", relation: "self", age: 30, healthConditions: [] },
  ]);

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

            <OnboardingProgress currentStep={currentStep} totalSteps={5} />

            <Tabs
              defaultValue="personal"
              className="w-full"
              onValueChange={(value) => {
                const stepMap = {
                  personal: 0,
                  physical: 1,
                  health: 2,
                  family: 3,
                  genealogy: 4,
                };
                setCurrentStep(stepMap[value] || 0);
              }}
            >
              <TabsList className="grid grid-cols-5 w-full mb-8">
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="flex items-center gap-2"
                            >
                              <Plus size={16} />
                              <span>Add Family Member</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Family Member</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="memberName">Name</Label>
                                <Input
                                  id="memberName"
                                  placeholder="Enter name"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="relation">Relation</Label>
                                <Select defaultValue="">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select relation" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="father">
                                      Father
                                    </SelectItem>
                                    <SelectItem value="mother">
                                      Mother
                                    </SelectItem>
                                    <SelectItem value="brother">
                                      Brother
                                    </SelectItem>
                                    <SelectItem value="sister">
                                      Sister
                                    </SelectItem>
                                    <SelectItem value="grandfather">
                                      Grandfather
                                    </SelectItem>
                                    <SelectItem value="grandmother">
                                      Grandmother
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="memberAge">Age</Label>
                                <Input
                                  id="memberAge"
                                  type="number"
                                  min="1"
                                  max="120"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Health Conditions</Label>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id="memberHypertension"
                                      value="hypertension"
                                    />
                                    <Label htmlFor="memberHypertension">
                                      Hypertension
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id="memberDiabetes"
                                      value="diabetes"
                                    />
                                    <Label htmlFor="memberDiabetes">
                                      Diabetes
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id="memberHeartDisease"
                                      value="heartDisease"
                                    />
                                    <Label htmlFor="memberHeartDisease">
                                      Heart Disease
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id="memberCancer"
                                      value="cancer"
                                    />
                                    <Label htmlFor="memberCancer">Cancer</Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <Button
                                type="button"
                                onClick={() => {
                                  // In a real implementation, we would collect the form data
                                  // and call addFamilyMember with the collected data
                                  addFamilyMember({
                                    name: "New Member",
                                    relation: "other",
                                    age: 50,
                                    healthConditions: [],
                                  });
                                }}
                              >
                                Add Member
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {familyMembers.map((member) => (
                          <div
                            key={member.id}
                            className="border rounded-lg p-4 bg-card"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">{member.name}</h4>
                              <span className="text-sm text-muted-foreground capitalize">
                                {member.relation}
                              </span>
                            </div>
                            <div className="text-sm">
                              <p>Age: {member.age}</p>
                              <p className="mt-1">
                                Health Conditions:{" "}
                                {member.healthConditions.length > 0
                                  ? member.healthConditions.join(", ")
                                  : "None"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 p-4 border border-dashed rounded-lg bg-muted/50 flex flex-col items-center justify-center">
                        <GitBranch
                          size={48}
                          className="text-muted-foreground mb-2"
                        />
                        <p className="text-center text-muted-foreground">
                          Your family tree visualization will appear here as you
                          add more family members
                        </p>
                      </div>

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
