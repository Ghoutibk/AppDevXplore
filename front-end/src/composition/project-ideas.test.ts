import { describe, expect, it } from "vitest";
import { levels } from "@/domain/level";
import { specialties } from "@/domain/specialty";
import { loadProjectIdeas } from "./project-ideas";

describe("loadProjectIdeas", () => {
  it.each(specialties)("loads the %s project ideas of the catalog, at every level", async (specialty) => {
    const ideas = await loadProjectIdeas(specialty);

    expect(ideas.map(({ level }) => level)).toEqual(levels);
    expect(new Set(ideas.flatMap(({ projects }) => projects.map((project) => project.specialty)))).toEqual(
      new Set([specialty]),
    );
  });
});
