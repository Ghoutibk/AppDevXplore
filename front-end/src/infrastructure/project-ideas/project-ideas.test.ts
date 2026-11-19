import { describe, expect, it } from "vitest";
import { levels } from "@/domain/level";
import type { Project } from "@/domain/project";
import type { Specialty } from "@/domain/specialty";
import { artificialIntelligenceProjects } from "./artificial-intelligence";
import { cybersecurityProjects } from "./cybersecurity";
import { dataProjects } from "./data";

const levelsCovered = (projects: readonly Project[], specialty: Specialty) =>
  levels.filter((level) => projects.some((project) => project.specialty === specialty && project.level === level));

describe("project ideas", () => {
  it("offers data projects at every level", () => {
    expect(levelsCovered(dataProjects, "data")).toEqual(levels);
  });

  it("offers cybersecurity projects at every level", () => {
    expect(levelsCovered(cybersecurityProjects, "cybersecurity")).toEqual(levels);
  });

  it("offers artificial intelligence projects at every level", () => {
    expect(levelsCovered(artificialIntelligenceProjects, "artificial-intelligence")).toEqual(levels);
  });
});
