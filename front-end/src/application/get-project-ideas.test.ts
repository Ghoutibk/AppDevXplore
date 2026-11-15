import { describe, expect, it } from "vitest";
import type { Level } from "@/domain/level";
import type { Project } from "@/domain/project";
import type { Specialty } from "@/domain/specialty";
import { getProjectIdeas } from "./get-project-ideas";
import type { ProjectCatalog } from "./project-catalog";

const project = (title: string, specialty: Specialty, level: Level): Project => ({
  title,
  specialty,
  level,
  summary: "",
  skills: [],
  startingPoint: { label: "", url: "" },
});

class FakeProjectCatalog implements ProjectCatalog {
  private readonly projects: Project[];

  constructor(projects: Project[]) {
    this.projects = projects;
  }

  async findBySpecialty(specialty: Specialty): Promise<Project[]> {
    return this.projects.filter((project) => project.specialty === specialty);
  }
}

describe("getProjectIdeas", () => {
  it("lists the project ideas of a specialty level by level, most accessible first", async () => {
    const catalog = new FakeProjectCatalog([
      project("Forecast", "data", "advanced"),
      project("Dashboard", "data", "beginner"),
      project("Scraper", "data", "intermediate"),
      project("Exploration", "data", "beginner"),
      project("Capture the flag", "cybersecurity", "beginner"),
    ]);

    const ideas = await getProjectIdeas(catalog, "data");

    expect(ideas.map(({ level, projects }) => [level, projects.map(({ title }) => title)])).toEqual([
      ["beginner", ["Dashboard", "Exploration"]],
      ["intermediate", ["Scraper"]],
      ["advanced", ["Forecast"]],
    ]);
  });

  it("leaves out the levels that have no project idea yet", async () => {
    const catalog = new FakeProjectCatalog([
      project("Exploration", "data", "beginner"),
      project("Forecast", "data", "advanced"),
    ]);

    const ideas = await getProjectIdeas(catalog, "data");

    expect(ideas.map(({ level }) => level)).toEqual(["beginner", "advanced"]);
  });
});
