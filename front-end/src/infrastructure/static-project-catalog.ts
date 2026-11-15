import type { ProjectCatalog } from "@/application/project-catalog";
import type { Project } from "@/domain/project";
import type { Specialty } from "@/domain/specialty";

/** Adapter: a catalog of project ideas written in the source code. */
export class StaticProjectCatalog implements ProjectCatalog {
  private readonly projects: readonly Project[];

  constructor(projects: readonly Project[]) {
    this.projects = projects;
  }

  async findBySpecialty(specialty: Specialty): Promise<Project[]> {
    return this.projects.filter((project) => project.specialty === specialty);
  }
}
