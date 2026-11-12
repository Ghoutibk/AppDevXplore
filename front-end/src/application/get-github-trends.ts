import type { Repository } from "@/domain/repository";
import { risingSince } from "@/domain/rising";
import { specialties, type Specialty } from "@/domain/specialty";
import type { RepositorySearch } from "./repository-search";

const REPOSITORIES_PER_LIST = 6;

export interface SpecialtyTrends {
  readonly specialty: Specialty;
  readonly rising: Repository[];
  readonly mostStarred: Repository[];
}

/** Use case: the GitHub repositories worth a look, for each specialty. */
export async function getGitHubTrends(search: RepositorySearch, today: Date): Promise<SpecialtyTrends[]> {
  const createdSince = risingSince(today);

  return Promise.all(
    specialties.map(async (specialty) => {
      const [rising, mostStarred] = await Promise.all([
        search.findMostStarred({ specialty, limit: REPOSITORIES_PER_LIST, createdSince }),
        search.findMostStarred({ specialty, limit: REPOSITORIES_PER_LIST }),
      ]);
      return { specialty, rising, mostStarred };
    }),
  );
}
