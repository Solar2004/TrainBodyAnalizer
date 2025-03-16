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
import { HistoryEntry, ParameterName } from "@/types";

interface HistoryChartProps {
  history: HistoryEntry[];
  parameter?: ParameterName;
  className?: string;
}

export function HistoryChart({
  history,
  parameter,
  className = "",
}: HistoryChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !history || history.length === 0) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse dates
    const data = history.map((entry) => ({
      date: new Date(entry.date),
      value: parameter ? entry.parameters[parameter] : entry.fitScore,
    }));

    // Sort by date
    data.sort((a, b) => a.date.getTime() - b.date.getTime());

    // Create scales
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, parameter ? 100 : 1000])
      .nice()
      .range([height, 0]);

    // Create line generator
    const line = d3
      .line<{ date: Date; value: number }>()
      .x((d) => x(d.date))
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    // Add x-axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(5)
          .tickFormat(d3.timeFormat("%b %d") as any),
      )
      .selectAll("text")
      .style("font-size", "10px");

    // Add y-axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .style("font-size", "10px");

    // Add grid lines
    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickSize(-width)
          .tickFormat(() => ""),
      )
      .selectAll("line")
      .style("stroke", "#e2e8f0")
      .style("stroke-opacity", 0.5);

    // Add the line path
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "rgb(99, 102, 241)")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add dots
    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.value))
      .attr("r", 4)
      .attr("fill", "rgb(99, 102, 241)");

    // Add area under the line
    const area = d3
      .area<{ date: Date; value: number }>()
      .x((d) => x(d.date))
      .y0(height)
      .y1((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "rgba(99, 102, 241, 0.1)")
      .attr("d", area);
  }, [history, parameter]);

  const title = parameter
    ? `${parameter.charAt(0).toUpperCase() + parameter.slice(1)} History`
    : "Fit Score History";

  const description = parameter
    ? `Your ${parameter} progress over time`
    : "Your overall fitness score progress";

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <svg ref={svgRef} width="100%" height="100%"></svg>
        </div>
      </CardContent>
    </Card>
  );
}
