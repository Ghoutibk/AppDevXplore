import type { Repository } from "@/domain/repository";
import type { Specialty } from "@/domain/specialty";

export interface RepositorySearchCriteria {
  readonly specialty: Specialty;
  readonly limit: number;
  /** Only keeps the repositories created on or after this date. */
  readonly createdSince?: Date;
}

/** Port: finds the most starred repositories matching the criteria, most starred first. */
export interface RepositorySearch {
  findMostStarred(criteria: RepositorySearchCriteria): Promise<Repository[]>;
}
