import { getGitHubTrends, type SpecialtyTrends } from "@/application/get-github-trends";
import { GitHubRepositorySearch } from "@/infrastructure/github-repository-search";

/** Loads today's GitHub trends through the GitHub REST API (set GITHUB_TOKEN to raise the rate limit). */
export function loadGitHubTrends(): Promise<SpecialtyTrends[]> {
  const search = new GitHubRepositorySearch({ fetch, token: process.env.GITHUB_TOKEN });
  return getGitHubTrends(search, new Date());
}
