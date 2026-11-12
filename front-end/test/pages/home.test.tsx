import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import Home from "@/pages/index";

vi.mock("next/head", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe("Home page", () => {
  it("frames its content with the site header and footer", () => {
    render(<Home />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("introduces DevXplore to students", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Trouve ton prochain projet de développement." }),
    ).toBeInTheDocument();
    expect(screen.getByText(/DevXplore rassemble des ressources pour les étudiants/)).toBeInTheDocument();
  });

  it("illustrates the hero with the site sections listed in a terminal", () => {
    render(<Home />);

    for (const folder of ["projets/", "tendances/", "outils/", "github/", "data/", "cybersecurite/", "ia/"]) {
      expect(screen.getByText(folder)).toBeInTheDocument();
    }
  });
});
