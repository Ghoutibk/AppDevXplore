import type { Repository } from "@/domain/repository";
import { specialties, type Specialty } from "@/domain/specialty";
import type { RepositorySearch } from "./repository-search";

const REPOSITORIES_PER_LIST = 6;

export interface SpecialtyTrends {
  readonly specialty: Specialty;
  readonly mostStarred: Repository[];
}

/** Use case: the GitHub repositories worth a look, for each specialty. */
export async function getGitHubTrends(search: RepositorySearch): Promise<SpecialtyTrends[]> {
  return Promise.all(
    specialties.map(async (specialty) => ({
      specialty,
      mostStarred: await search.findMostStarred({ specialty, limit: REPOSITORIES_PER_LIST }),
    })),
  );
}
