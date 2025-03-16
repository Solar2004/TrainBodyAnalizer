"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PlusCircle } from "lucide-react";

interface AddFamilyMemberDialogProps {
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

export function AddFamilyMemberDialog({
  onSuccess,
  trigger,
}: AddFamilyMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    generation: 1,
    side: "",
    origin: "",
    ethnicity: "",
    somatotype: "",
    eyeColor: "",
    hairColor: "",
    height: "",
    build: "",
    athleticHistory: "",
  });

  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Not authenticated");
      }

      // Determine generation based on relationship
      let generation = 1;
      if (formData.relationship.toLowerCase().includes("parent")) {
        generation = 1;
      } else if (formData.relationship.toLowerCase().includes("grand")) {
        generation = 2;
      } else if (formData.relationship.toLowerCase().includes("great")) {
        generation = 3;
      }

      // Insert family member
      const { error } = await supabase.from("family_members").insert({
        user_id: user.id,
        name: formData.name,
        relationship: formData.relationship,
        generation: generation,
        side: formData.side || null,
        origin: formData.origin || null,
        ethnicity: formData.ethnicity || null,
        somatotype: formData.somatotype || null,
        eye_color: formData.eyeColor || null,
        hair_color: formData.hairColor || null,
        height: formData.height || null,
        build: formData.build || null,
        athletic_history: formData.athleticHistory || null,
        genetic_traits: JSON.stringify([]),
        medical_history: JSON.stringify([]),
      });

      if (error) throw error;

      // Close dialog and refresh
      setOpen(false);
      if (onSuccess) onSuccess();
      router.refresh();
    } catch (error) {
      console.error("Error adding family member:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <PlusCircle size={16} />
            <span>Add Family Member</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
            <DialogDescription>
              Add a new family member to your genealogy tree.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Select
                  name="relationship"
                  value={formData.relationship}
                  onValueChange={(value) =>
                    handleSelectChange("relationship", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Paternal Grandfather">
                      Paternal Grandfather
                    </SelectItem>
                    <SelectItem value="Paternal Grandmother">
                      Paternal Grandmother
                    </SelectItem>
                    <SelectItem value="Maternal Grandfather">
                      Maternal Grandfather
                    </SelectItem>
                    <SelectItem value="Maternal Grandmother">
                      Maternal Grandmother
                    </SelectItem>
                    <SelectItem value="Paternal Great-Grandfather">
                      Paternal Great-Grandfather
                    </SelectItem>
                    <SelectItem value="Paternal Great-Grandmother">
                      Paternal Great-Grandmother
                    </SelectItem>
                    <SelectItem value="Maternal Great-Grandfather">
                      Maternal Great-Grandfather
                    </SelectItem>
                    <SelectItem value="Maternal Great-Grandmother">
                      Maternal Great-Grandmother
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="side">Side</Label>
                <Select
                  name="side"
                  value={formData.side}
                  onValueChange={(value) => handleSelectChange("side", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select side" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paternal">Paternal</SelectItem>
                    <SelectItem value="maternal">Maternal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="origin">Origin/Country</Label>
                <Input
                  id="origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ethnicity">Ethnicity</Label>
                <Input
                  id="ethnicity"
                  name="ethnicity"
                  value={formData.ethnicity}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="somatotype">Somatotype</Label>
                <Select
                  name="somatotype"
                  value={formData.somatotype}
                  onValueChange={(value) =>
                    handleSelectChange("somatotype", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ectomorph">Ectomorph</SelectItem>
                    <SelectItem value="Mesomorph">Mesomorph</SelectItem>
                    <SelectItem value="Endomorph">Endomorph</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eyeColor">Eye Color</Label>
                <Input
                  id="eyeColor"
                  name="eyeColor"
                  value={formData.eyeColor}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hairColor">Hair Color</Label>
                <Input
                  id="hairColor"
                  name="hairColor"
                  value={formData.hairColor}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="e.g. 175 cm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="build">Build</Label>
                <Input
                  id="build"
                  name="build"
                  value={formData.build}
                  onChange={handleChange}
                  placeholder="e.g. Athletic, Slim"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="athleticHistory">Athletic History</Label>
                <Input
                  id="athleticHistory"
                  name="athleticHistory"
                  value={formData.athleticHistory}
                  onChange={handleChange}
                  placeholder="e.g. Former runner"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Add Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
