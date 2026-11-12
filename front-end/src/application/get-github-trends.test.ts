import { describe, expect, it } from "vitest";
import type { Repository } from "@/domain/repository";
import type { RepositorySearch, RepositorySearchCriteria } from "./repository-search";
import { getGitHubTrends } from "./get-github-trends";

const today = new Date("2026-11-12T10:00:00Z");

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

    const trends = await getGitHubTrends(search, today);

    expect(search.criteria).toContainEqual({ specialty: "data", limit: 6 });
    expect(search.criteria).toContainEqual({ specialty: "cybersecurity", limit: 6 });
    expect(search.criteria).toContainEqual({ specialty: "artificial-intelligence", limit: 6 });
    expect(trends.map(({ specialty, mostStarred }) => [specialty, mostStarred.map(({ fullName }) => fullName)])).toEqual([
      ["data", ["data/all-time"]],
      ["cybersecurity", ["cybersecurity/all-time"]],
      ["artificial-intelligence", ["artificial-intelligence/all-time"]],
    ]);
  });

  it("lists the six repositories rising in each specialty", async () => {
    const search = new FakeRepositorySearch();

    const trends = await getGitHubTrends(search, today);

    const createdSince = new Date("2026-10-13T10:00:00Z");
    expect(search.criteria).toContainEqual({ specialty: "data", limit: 6, createdSince });
    expect(search.criteria).toContainEqual({ specialty: "cybersecurity", limit: 6, createdSince });
    expect(search.criteria).toContainEqual({ specialty: "artificial-intelligence", limit: 6, createdSince });
    expect(trends.map(({ specialty, rising }) => [specialty, rising.map(({ fullName }) => fullName)])).toEqual([
      ["data", ["data/2026-10-13"]],
      ["cybersecurity", ["cybersecurity/2026-10-13"]],
      ["artificial-intelligence", ["artificial-intelligence/2026-10-13"]],
    ]);
  });
});
