import { describe, expect, it } from "vitest";
import type { Project } from "@/domain/project";
import type { Specialty } from "@/domain/specialty";
import { StaticProjectCatalog } from "./static-project-catalog";

const project = (title: string, specialty: Specialty): Project => ({
  title,
  specialty,
  level: "beginner",
  summary: "",
  skills: [],
  startingPoint: { label: "", url: "" },
});

describe("StaticProjectCatalog", () => {
  it("finds the projects of a specialty, in the order they were written", async () => {
    const catalog = new StaticProjectCatalog([
      project("Dashboard", "data"),
      project("Capture the flag", "cybersecurity"),
      project("Scraper", "data"),
    ]);

    const projects = await catalog.findBySpecialty("data");

    expect(projects.map(({ title }) => title)).toEqual(["Dashboard", "Scraper"]);
  });
});
