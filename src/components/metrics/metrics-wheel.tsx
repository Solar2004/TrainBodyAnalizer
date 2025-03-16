"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface MetricsWheelProps {
  metrics: {
    name: string;
    value: number;
    color: string;
    description?: string;
  }[];
  size?: number;
  className?: string;
}

export function MetricsWheel({
  metrics,
  size = 400,
  className = "",
}: MetricsWheelProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !metrics.length) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const width = size;
    const height = size;
    const radius = Math.min(width, height) / 2;
    const centerX = width / 2;
    const centerY = height / 2;

    // Create a group for the wheel
    const g = svg
      .append("g")
      .attr("transform", `translate(${centerX},${centerY})`);

    // Create scales for the wheel
    const angleScale = d3
      .scaleLinear()
      .domain([0, metrics.length])
      .range([0, 2 * Math.PI]);

    const radiusScale = d3.scaleLinear().domain([0, 100]).range([0, radius]);

    // Draw background circles
    const backgroundCircles = [20, 40, 60, 80, 100];
    backgroundCircles.forEach((value) => {
      g.append("circle")
        .attr("r", radiusScale(value))
        .attr("fill", "none")
        .attr("stroke", "#e5e7eb")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", value === 100 ? "none" : "2,2");
    });

    // Add value labels to background circles
    backgroundCircles.forEach((value) => {
      g.append("text")
        .attr("y", -radiusScale(value) - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", "#9ca3af")
        .text(value);
    });

    // Draw parameter axes
    metrics.forEach((metric, i) => {
      const angle = angleScale(i);
      const x2 = Math.sin(angle) * radius;
      const y2 = -Math.cos(angle) * radius;

      g.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "#d1d5db")
        .attr("stroke-width", 1);

      // Add parameter labels
      const labelRadius = radius + 20;
      const labelX = Math.sin(angle) * labelRadius;
      const labelY = -Math.cos(angle) * labelRadius;

      g.append("text")
        .attr("x", labelX)
        .attr("y", labelY)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", metric.color)
        .text(metric.name);
    });

    // Draw data points
    metrics.forEach((metric, i) => {
      const angle = angleScale(i);
      const x = Math.sin(angle) * radiusScale(metric.value);
      const y = -Math.cos(angle) * radiusScale(metric.value);

      g.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 6)
        .attr("fill", metric.color)
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .append("title")
        .text(
          `${metric.name}: ${metric.value}${metric.description ? ` - ${metric.description}` : ""}`,
        );
    });

    // Create a polygon connecting all data points
    const polygonPoints = metrics.map((metric, i) => {
      const angle = angleScale(i);
      const x = Math.sin(angle) * radiusScale(metric.value);
      const y = -Math.cos(angle) * radiusScale(metric.value);
      return [x, y];
    });

    g.append("polygon")
      .attr("points", polygonPoints.map((point) => point.join(",")).join(" "))
      .attr("fill", "rgba(79, 70, 229, 0.2)")
      .attr("stroke", "rgba(79, 70, 229, 0.6)")
      .attr("stroke-width", 2);

    // Add value labels next to data points
    metrics.forEach((metric, i) => {
      const angle = angleScale(i);
      const x = Math.sin(angle) * (radiusScale(metric.value) + 15);
      const y = -Math.cos(angle) * (radiusScale(metric.value) + 15);

      g.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("fill", metric.color)
        .text(metric.value);
    });
  }, [metrics, size]);

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      ></svg>
    </div>
  );
}
