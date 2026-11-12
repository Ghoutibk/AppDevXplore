import type { RepositorySearch, RepositorySearchCriteria } from "@/application/repository-search";
import type { Repository } from "@/domain/repository";
import type { Specialty } from "@/domain/specialty";

const SEARCH_URL = "https://api.github.com/search/repositories";

/** The GitHub topic that best gathers the repositories of each specialty. */
const topics: Record<Specialty, string> = {
  data: "data-science",
  cybersecurity: "cybersecurity",
  "artificial-intelligence": "machine-learning",
};

interface Options {
  readonly fetch: typeof globalThis.fetch;
}

/** Adapter: searches repositories with the GitHub REST API. */
export class GitHubRepositorySearch implements RepositorySearch {
  private readonly fetch: typeof globalThis.fetch;

  constructor({ fetch }: Options) {
    this.fetch = fetch;
  }

  async findMostStarred({ specialty, limit }: RepositorySearchCriteria): Promise<Repository[]> {
    const url = new URL(SEARCH_URL);
    url.searchParams.set("q", `topic:${topics[specialty]}`);
    url.searchParams.set("sort", "stars");
    url.searchParams.set("order", "desc");
    url.searchParams.set("per_page", String(limit));

    await this.fetch(url);
    return [];
  }
}
