import { getProjectIdeas, type LevelProjects } from "@/application/get-project-ideas";
import type { Specialty } from "@/domain/specialty";
import { artificialIntelligenceProjects } from "@/infrastructure/project-ideas/artificial-intelligence";
import { cybersecurityProjects } from "@/infrastructure/project-ideas/cybersecurity";
import { dataProjects } from "@/infrastructure/project-ideas/data";
import { StaticProjectCatalog } from "@/infrastructure/static-project-catalog";

const catalog = new StaticProjectCatalog([
  ...dataProjects,
  ...cybersecurityProjects,
  ...artificialIntelligenceProjects,
]);

/** Loads the project ideas of a specialty from the catalog written in the source code. */
export function loadProjectIdeas(specialty: Specialty): Promise<LevelProjects[]> {
  return getProjectIdeas(catalog, specialty);
}
