// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import { GitHubRepositorySearch } from "./github-repository-search";

const fakeFetch = (body: unknown, init: ResponseInit = { status: 200 }) =>
  vi.fn<typeof fetch>(async () => new Response(JSON.stringify(body), init));

const requestedUrl = (fetch: ReturnType<typeof fakeFetch>) => new URL(String(fetch.mock.calls[0][0]));

describe("GitHubRepositorySearch", () => {
  it.each([
    ["data", "data-science"],
    ["cybersecurity", "cybersecurity"],
    ["artificial-intelligence", "machine-learning"],
  ] as const)("searches %s repositories through the %s topic, most starred first", async (specialty, topic) => {
    const fetch = fakeFetch({ items: [] });

    await new GitHubRepositorySearch({ fetch }).findMostStarred({ specialty, limit: 6 });

    const url = requestedUrl(fetch);
    expect(`${url.origin}${url.pathname}`).toBe("https://api.github.com/search/repositories");
    expect(Object.fromEntries(url.searchParams)).toEqual({
      q: `topic:${topic}`,
      sort: "stars",
      order: "desc",
      per_page: "6",
    });
  });

  it("turns the repositories found by GitHub into repositories", async () => {
    const fetch = fakeFetch({
      items: [
        {
          full_name: "pandas-dev/pandas",
          html_url: "https://github.com/pandas-dev/pandas",
          description: "Flexible and powerful data analysis",
          stargazers_count: 50501,
          language: "Python",
          forks_count: 19000,
        },
      ],
    });

    const repositories = await new GitHubRepositorySearch({ fetch }).findMostStarred({ specialty: "data", limit: 6 });

    expect(repositories).toEqual([
      {
        fullName: "pandas-dev/pandas",
        url: "https://github.com/pandas-dev/pandas",
        description: "Flexible and powerful data analysis",
        stars: 50501,
        language: "Python",
      },
    ]);
  });
});
