import { describe, expect, it } from "vitest";
import type { Repository } from "@/domain/repository";
import type { RepositorySearch, RepositorySearchCriteria } from "./repository-search";
import { getGitHubTrends } from "./get-github-trends";

const repository = (fullName: string): Repository => ({
  fullName,
  url: `https://github.com/${fullName}`,
  description: null,
  stars: 1,
  language: null,
});

class FakeRepositorySearch implements RepositorySearch {
  readonly criteria: RepositorySearchCriteria[] = [];

  async findMostStarred(criteria: RepositorySearchCriteria): Promise<Repository[]> {
    this.criteria.push(criteria);
    const period = criteria.createdSince ? criteria.createdSince.toISOString().slice(0, 10) : "all-time";
    return [repository(`${criteria.specialty}/${period}`)];
  }
}

describe("getGitHubTrends", () => {
  it("lists the six most starred repositories of each specialty", async () => {
    const search = new FakeRepositorySearch();

    const trends = await getGitHubTrends(search);

    expect(search.criteria).toEqual([
      { specialty: "data", limit: 6 },
      { specialty: "cybersecurity", limit: 6 },
      { specialty: "artificial-intelligence", limit: 6 },
    ]);
    expect(trends.map(({ specialty, mostStarred }) => [specialty, mostStarred.map(({ fullName }) => fullName)])).toEqual([
      ["data", ["data/all-time"]],
      ["cybersecurity", ["cybersecurity/all-time"]],
      ["artificial-intelligence", ["artificial-intelligence/all-time"]],
    ]);
  });
});
