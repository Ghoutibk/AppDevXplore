import { levels, type Level } from "@/domain/level";
import type { Project } from "@/domain/project";
import type { Specialty } from "@/domain/specialty";
import type { ProjectCatalog } from "./project-catalog";

export interface LevelProjects {
  readonly level: Level;
  readonly projects: Project[];
}

/** Use case: the project ideas of a specialty, level by level, from the most accessible. */
export async function getProjectIdeas(catalog: ProjectCatalog, specialty: Specialty): Promise<LevelProjects[]> {
  const projects = await catalog.findBySpecialty(specialty);

  return levels.map((level) => ({ level, projects: projects.filter((project) => project.level === level) }));
}
