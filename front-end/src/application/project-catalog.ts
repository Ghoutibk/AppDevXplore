import type { Project } from "@/domain/project";
import type { Specialty } from "@/domain/specialty";

/** Port: the project ideas the site offers to students. */
export interface ProjectCatalog {
  findBySpecialty(specialty: Specialty): Promise<Project[]>;
}
