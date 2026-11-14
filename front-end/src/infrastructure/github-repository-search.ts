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
  /** Raises the GitHub rate limit; anonymous searches work without it. */
  readonly token?: string;
}

/** Adapter: searches repositories with the GitHub REST API. */
export class GitHubRepositorySearch implements RepositorySearch {
  private readonly fetch: typeof globalThis.fetch;
  private readonly headers: HeadersInit;

  constructor({ fetch, token }: Options) {
    this.fetch = fetch;
    this.headers = token ? { Authorization: `Bearer ${token}` } : {};
  }

  async findMostStarred({ specialty, limit, createdSince }: RepositorySearchCriteria): Promise<Repository[]> {
    const qualifiers = [`topic:${topics[specialty]}`];
    if (createdSince) qualifiers.push(`created:>=${createdSince.toISOString().slice(0, 10)}`);

    const url = new URL(SEARCH_URL);
    url.searchParams.set("q", qualifiers.join(" "));
    url.searchParams.set("sort", "stars");
    url.searchParams.set("order", "desc");
    url.searchParams.set("per_page", String(limit));

    const response = await this.fetch(url, { headers: this.headers });
    if (!response.ok) throw new Error(`GitHub search failed: ${response.status} ${response.statusText}`);

    const { items }: GitHubSearchResponse = await response.json();
    return items.map(toRepository);
  }
}
