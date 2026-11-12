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

interface GitHubRepository {
  readonly full_name: string;
  readonly html_url: string;
  readonly description: string | null;
  readonly stargazers_count: number;
  readonly language: string | null;
}

interface GitHubSearchResponse {
  readonly items: GitHubRepository[];
}

const toRepository = (repository: GitHubRepository): Repository => ({
  fullName: repository.full_name,
  url: repository.html_url,
  description: repository.description,
  stars: repository.stargazers_count,
  language: repository.language,
});

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

    const response = await this.fetch(url);
    const { items }: GitHubSearchResponse = await response.json();
    return items.map(toRepository);
  }
}
