"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  origin?: string;
  ethnicity?: string;
  somatotype?: string;
  eyeColor?: string;
  hairColor?: string;
  height?: string;
  build?: string;
  athleticHistory?: string;
  parentId?: string; // ID of parent node in the tree
}

interface FamilyTreeProps {
  members: FamilyMember[];
  className?: string;
}

export function FamilyTree({ members = [], className = "" }: FamilyTreeProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || members.length === 0) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = 500;
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
      };
      members = [rootMember, ...members];
    }

    // Create the hierarchy
    const root = stratify(members);

    // Create the tree layout
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
          .linkHorizontal<
            d3.HierarchyPointLink<FamilyMember>,
            d3.HierarchyPointNode<FamilyMember>
          >()
          .x((d) => d.y) // Swap x and y for horizontal layout
          .y((d) => d.x),
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
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    // Add circles for nodes
    nodes
      .append("circle")
      .attr("r", 25)
      .attr("fill", (d) => getNodeColor(d.data.relationship))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Add labels
    nodes
      .append("text")
      .attr("dy", ".35em")
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .text((d) => getInitials(d.data.name));

    // Add name labels below nodes
    nodes
      .append("text")
      .attr("dy", "3em")
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("fill", "#333")
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
      .text((d) => d.data.relationship);
  }, [members]);

  // Helper function to get node color based on relationship
  function getNodeColor(relationship: string): string {
    const colors: Record<string, string> = {
      self: "#4f46e5", // indigo
      father: "#2563eb", // blue
      mother: "#db2777", // pink
      "paternal grandfather": "#1e40af", // dark blue
      "paternal grandmother": "#9d174d", // dark pink
      "maternal grandfather": "#1e40af", // dark blue
      "maternal grandmother": "#9d174d", // dark pink
      brother: "#4f46e5", // indigo
      sister: "#4f46e5", // indigo
    };

    return colors[relationship.toLowerCase()] || "#6b7280"; // gray default
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
            Build your family tree to analyze inherited traits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center border rounded-md">
            <p className="text-muted-foreground">No family members added yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Family Tree</CardTitle>
        <CardDescription>
          Your family tree showing inherited traits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[500px] overflow-auto">
          <svg ref={svgRef} width="100%" height="500"></svg>
        </div>
      </CardContent>
    </Card>
  );
}
