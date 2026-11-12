import { render, screen, within } from "@testing-library/react";
import type { GetStaticPropsContext } from "next";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import type { SpecialtyTrends } from "@/application/get-github-trends";
import type { Repository } from "@/domain/repository";
import GitHubTrends, { getStaticProps } from "@/pages/tendances-github";

const { trends } = vi.hoisted(() => ({
  trends: [
    { specialty: "data", rising: [], mostStarred: [] },
    { specialty: "cybersecurity", rising: [], mostStarred: [] },
    { specialty: "artificial-intelligence", rising: [], mostStarred: [] },
  ] as SpecialtyTrends[],
}));

vi.mock("next/head", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("@/composition/github-trends", () => ({
  loadGitHubTrends: async () => trends,
}));

const repository = (fullName: string): Repository => ({
  fullName,
  url: `https://github.com/${fullName}`,
  description: null,
  stars: 1000,
  language: null,
});

describe("GitHub trends page", () => {
  it("presents the GitHub trends within the site frame", () => {
    render(<GitHubTrends trends={trends} />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Tendances GitHub" })).toBeInTheDocument();
    expect(screen.getByText(/Les dépôts open source qui montent en ce moment/)).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("loads the GitHub trends when the site is built", async () => {
    expect(await getStaticProps({} as GetStaticPropsContext)).toEqual({ props: { trends } });
  });

  it.each([
    ["data", "Data"],
    ["cybersecurity", "Cybersécurité"],
    ["artificial-intelligence", "Intelligence artificielle"],
  ] as const)("shows the rising then the most starred %s repositories", (specialty, title) => {
    const specialtyTrends = trends.map((trend) =>
      trend.specialty === specialty
        ? { specialty, rising: [repository("rising/repo")], mostStarred: [repository("starred/repo")] }
        : trend,
    );

    render(<GitHubTrends trends={specialtyTrends} />);

    const section = within(screen.getByRole("region", { name: title }));
    expect(section.getAllByRole("heading", { level: 3 }).map(({ textContent }) => textContent)).toEqual([
      "Ceux qui montent",
      "Les incontournables",
    ]);
    expect(section.getAllByRole("link").map(({ textContent }) => textContent)).toEqual(["rising/repo", "starred/repo"]);
  });
});
