"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  generation: number; // 0 = self, 1 = parents, 2 = grandparents, 3 = great-grandparents
  side?: "paternal" | "maternal" | null;
  origin?: string;
  ethnicity?: string;
  somatotype?: string;
  eyeColor?: string;
  hairColor?: string;
  height?: string;
  build?: string;
  athleticHistory?: string;
  geneticTraits?: string[];
  medicalHistory?: string[];
  parentId?: string; // ID of parent node in the tree
}

interface FamilyTreeExtendedProps {
  members: FamilyMember[];
  onAddMember?: () => void;
  onSelectMember?: (member: FamilyMember) => void;
  className?: string;
}

export function FamilyTreeExtended({
  members = [],
  onAddMember,
  onSelectMember,
  className = "",
}: FamilyTreeExtendedProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(
    null,
  );

  useEffect(() => {
    if (!svgRef.current) return;

    // If no members, show empty state
    if (members.length === 0) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = 600; // Increased height for 4 generations
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // Create a hierarchical structure
    const stratify = d3
      .stratify<FamilyMember>()
      .id((d) => d.id)
      .parentId((d) => d.parentId);

    // Find the root member (user) or create one if not present
    let rootMember = members.find((m) => m.relationship === "self");
    if (!rootMember) {
      rootMember = {
        id: "user",
        name: "You",
        relationship: "self",
        generation: 0,
      };
      members = [rootMember, ...members];
    }

    // Create the hierarchy
    const root = stratify(members);

    // Create the tree layout - vertical orientation for generations
    const treeLayout = d3
      .tree<FamilyMember>()
      .size([
        width - margin.left - margin.right,
        height - margin.top - margin.bottom,
      ]);

    // Apply the layout
    const treeData = treeLayout(root);

    // Create a group for the tree
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add links between nodes
    g.selectAll(".link")
      .data(treeData.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkVertical<
            d3.HierarchyPointLink<FamilyMember>,
            d3.HierarchyPointNode<FamilyMember>
          >()
          .x((d) => d.x)
          .y((d) => d.y),
      )
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1.5);

    // Add nodes
    const nodes = g
      .selectAll(".node")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    // Add circles for nodes
    nodes
      .append("circle")
      .attr("r", 25)
      .attr("fill", (d) => getNodeColor(d.data))
      .attr("stroke", (d) =>
        selectedMember?.id === d.data.id ? "#000" : "#fff",
      )
      .attr("stroke-width", (d) => (selectedMember?.id === d.data.id ? 3 : 2))
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        setSelectedMember(d.data);
        if (onSelectMember) onSelectMember(d.data);
      });

    // Add labels
    nodes
      .append("text")
      .attr("dy", ".35em")
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .style("pointer-events", "none")
      .text((d) => getInitials(d.data.name));

    // Add name labels below nodes
    nodes
      .append("text")
      .attr("dy", "3em")
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("fill", "#333")
      .style("pointer-events", "none")
      .text((d) => d.data.name);

    // Add relationship labels
    nodes
      .append("text")
      .attr("dy", "4em")
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("fill", "#666")
      .attr("font-size", "0.8em")
      .style("pointer-events", "none")
      .text((d) => d.data.relationship);

    // Add generation labels on the left side
    const generations = [
      "You",
      "Parents",
      "Grandparents",
      "Great-grandparents",
    ];
    svg
      .append("g")
      .selectAll(".generation-label")
      .data(generations)
      .enter()
      .append("text")
      .attr("class", "generation-label")
      .attr("x", 10)
      .attr("y", (d, i) => margin.top + (i * height) / 5 + 10)
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "#666")
      .text((d) => d);
  }, [members, selectedMember, onSelectMember]);

  // Helper function to get node color based on relationship and side
  function getNodeColor(member: FamilyMember): string {
    // Base colors
    const baseColors = {
      self: "#4f46e5", // indigo
      paternal: {
        parent: "#2563eb", // blue
        grandparent: "#1e40af", // dark blue
        greatgrandparent: "#1e3a8a", // darker blue
      },
      maternal: {
        parent: "#db2777", // pink
        grandparent: "#9d174d", // dark pink
        greatgrandparent: "#831843", // darker pink
      },
      sibling: "#4f46e5", // indigo
    };

    // Determine color based on generation and side
    if (member.relationship === "self") return baseColors.self;

    if (member.side === "paternal") {
      if (member.generation === 1) return baseColors.paternal.parent;
      if (member.generation === 2) return baseColors.paternal.grandparent;
      if (member.generation === 3) return baseColors.paternal.greatgrandparent;
    }

    if (member.side === "maternal") {
      if (member.generation === 1) return baseColors.maternal.parent;
      if (member.generation === 2) return baseColors.maternal.grandparent;
      if (member.generation === 3) return baseColors.maternal.greatgrandparent;
    }

    if (
      member.relationship.includes("brother") ||
      member.relationship.includes("sister")
    ) {
      return baseColors.sibling;
    }

    // Default color
    return "#6b7280"; // gray
  }

  // Helper function to get initials from name
  function getInitials(name: string): string {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("");
  }

  // If no members, show empty state
  if (members.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Family Tree</CardTitle>
          <CardDescription>
            Build your family tree to analyze inherited traits across 4
            generations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex flex-col items-center justify-center border rounded-md">
            <p className="text-muted-foreground mb-4">
              No family members added yet
            </p>
            {onAddMember && (
              <Button onClick={onAddMember} className="flex items-center gap-2">
                <PlusCircle size={16} />
                <span>Add Family Member</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Family Tree</CardTitle>
            <CardDescription>
              Your family tree showing inherited traits across 4 generations
            </CardDescription>
          </div>
          {onAddMember && (
            <Button
              onClick={onAddMember}
              size="sm"
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              <span>Add Member</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[600px] overflow-auto border rounded-md bg-gray-50">
          <svg ref={svgRef} width="100%" height="600"></svg>
        </div>
        {selectedMember && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <h3 className="text-lg font-medium mb-2">{selectedMember.name}</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Relationship:</span>{" "}
                <span className="font-medium">
                  {selectedMember.relationship}
                </span>
              </div>
              {selectedMember.origin && (
                <div>
                  <span className="text-muted-foreground">Origin:</span>{" "}
                  <span className="font-medium">{selectedMember.origin}</span>
                </div>
              )}
              {selectedMember.ethnicity && (
                <div>
                  <span className="text-muted-foreground">Ethnicity:</span>{" "}
                  <span className="font-medium">
                    {selectedMember.ethnicity}
                  </span>
                </div>
              )}
              {selectedMember.somatotype && (
                <div>
                  <span className="text-muted-foreground">Somatotype:</span>{" "}
                  <span className="font-medium">
                    {selectedMember.somatotype}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
