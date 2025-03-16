"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ParameterName, UserProfile } from "@/types";

interface ParameterWheelProps {
  profile: UserProfile;
  size?: number;
  className?: string;
}

export default function ParameterWheel({
  profile,
  size = 400,
  className = "",
}: ParameterWheelProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !profile) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const width = size;
    const height = size;
    const radius = Math.min(width, height) / 2 - 40;
    const centerX = width / 2;
    const centerY = height / 2;

    // Create the parameter data array
    const parameters: ParameterName[] = [
      "volume",
      "potential",
      "endurance",
      "strength",
      "adaptability",
      "progress",
      "coordination",
      "agility",
      "consistency",
    ];

    const parameterData = parameters.map((param) => ({
      name: param,
      value: profile.parameters[param]?.value || 0,
    }));

    // Create scales
    const angleScale = d3
      .scaleLinear()
      .domain([0, parameters.length])
      .range([0, 2 * Math.PI]);

    const radiusScale = d3.scaleLinear().domain([0, 100]).range([0, radius]);

    // Draw background circles
    const circles = [20, 40, 60, 80, 100];
    circles.forEach((value) => {
      svg
        .append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", radiusScale(value))
        .attr("fill", "none")
        .attr("stroke", "#e2e8f0")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2");
    });

    // Draw parameter lines
    parameters.forEach((_, i) => {
      const angle = angleScale(i);
      const x2 = centerX + radius * Math.sin(angle);
      const y2 = centerY - radius * Math.cos(angle);

      svg
        .append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "#e2e8f0")
        .attr("stroke-width", 1);
    });

    // Draw parameter labels
    parameters.forEach((param, i) => {
      const angle = angleScale(i);
      const labelRadius = radius + 20;
      const x = centerX + labelRadius * Math.sin(angle);
      const y = centerY - labelRadius * Math.cos(angle);

      svg
        .append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#64748b")
        .text(param.charAt(0).toUpperCase() + param.slice(1));
    });

    // Create the area generator
    const areaGenerator = d3
      .areaRadial<{ name: string; value: number }>()
      .angle((d, i) => angleScale(i))
      .innerRadius(0)
      .outerRadius((d) => radiusScale(d.value));

    // Draw the parameter area
    const area = svg
      .append("path")
      .datum(parameterData)
      .attr("d", areaGenerator)
      .attr("fill", "rgba(99, 102, 241, 0.5)")
      .attr("stroke", "rgb(99, 102, 241)")
      .attr("stroke-width", 2)
      .attr("transform", `translate(${centerX}, ${centerY})`);

    // Add parameter value circles
    parameterData.forEach((d, i) => {
      const angle = angleScale(i);
      const x = centerX + radiusScale(d.value) * Math.sin(angle);
      const y = centerY - radiusScale(d.value) * Math.cos(angle);

      svg
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 4)
        .attr("fill", "rgb(99, 102, 241)");
    });

    // Add center text for Fit Score
    svg
      .append("text")
      .attr("x", centerX)
      .attr("y", centerY - 15)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "#64748b")
      .text("Fit Score");

    svg
      .append("text")
      .attr("x", centerX)
      .attr("y", centerY + 15)
      .attr("text-anchor", "middle")
      .attr("font-size", "24px")
      .attr("font-weight", "bold")
      .attr("fill", "#1e293b")
      .text(profile.fitScore);

    // Add DNA Grade
    svg
      .append("text")
      .attr("x", centerX)
      .attr("y", centerY + 45)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("fill", getDnaGradeColor(profile.dnaGrade))
      .text(`DNA: ${profile.dnaGrade}`);
  }, [profile, size]);

  function getDnaGradeColor(grade: string): string {
    switch (grade) {
      case "SS":
        return "#FFD700"; // Gold
      case "S":
        return "#C0C0C0"; // Silver
      case "A":
        return "#CD7F32"; // Bronze
      case "B":
        return "#4CAF50"; // Green
      case "C":
        return "#2196F3"; // Blue
      case "E":
        return "#9E9E9E"; // Gray
      default:
        return "#000000";
    }
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        className="overflow-visible"
      ></svg>
    </div>
  );
}
