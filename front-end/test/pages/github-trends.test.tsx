import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import GitHubTrends from "@/pages/tendances-github";

vi.mock("next/head", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe("GitHub trends page", () => {
  it("presents the GitHub trends within the site frame", () => {
    render(<GitHubTrends />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Tendances GitHub" })).toBeInTheDocument();
    expect(screen.getByText(/Les dépôts open source qui montent en ce moment/)).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
