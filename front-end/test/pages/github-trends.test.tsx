import { render, screen } from "@testing-library/react";
import type { GetStaticPropsContext } from "next";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import GitHubTrends, { getStaticProps } from "@/pages/tendances-github";

const { trends } = vi.hoisted(() => ({
  trends: [
    { specialty: "data", rising: [], mostStarred: [] },
    { specialty: "cybersecurity", rising: [], mostStarred: [] },
    { specialty: "artificial-intelligence", rising: [], mostStarred: [] },
  ],
}));

vi.mock("next/head", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("@/composition/github-trends", () => ({
  loadGitHubTrends: async () => trends,
}));

describe("GitHub trends page", () => {
  it("presents the GitHub trends within the site frame", () => {
    render(<GitHubTrends />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Tendances GitHub" })).toBeInTheDocument();
    expect(screen.getByText(/Les dépôts open source qui montent en ce moment/)).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("loads the GitHub trends when the site is built", async () => {
    expect(await getStaticProps({} as GetStaticPropsContext)).toEqual({ props: { trends } });
  });
});
