import { render, screen, within } from "@testing-library/react";
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

  it("describes itself to search engines", () => {
    render(<Home />);

    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "Idées de projets en data, cybersécurité et IA, tendances, outils et dépôts GitHub : les ressources de DevXplore, l'association de développement de l'école.",
    );
  });

  it("introduces DevXplore to students", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Trouve ton prochain projet de développement." }),
    ).toBeInTheDocument();
    expect(screen.getByText(/DevXplore rassemble des ressources pour les étudiants/)).toBeInTheDocument();
  });

  it("lets students jump from the hero to the home sections", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: "Choisir ma spécialité" })).toHaveAttribute("href", "#specialites");
    expect(screen.getByRole("link", { name: "Voir les autres ressources" })).toHaveAttribute("href", "#ressources");
  });

  it("illustrates the hero with the site sections listed in a terminal", () => {
    render(<Home />);

    for (const folder of ["projets/", "tendances/", "outils/", "github/", "data/", "cybersecurite/", "ia/"]) {
      expect(screen.getByText(folder)).toBeInTheDocument();
    }
  });

  it("offers project ideas for each specialty, coming soon", () => {
    render(<Home />);

    const specialties = within(screen.getByRole("region", { name: "Choisis ta spécialité" }));
    for (const specialty of ["Data", "Cybersécurité", "Intelligence artificielle"]) {
      expect(specialties.getByRole("heading", { level: 3, name: specialty })).toBeInTheDocument();
    }
    expect(specialties.getAllByText("Bientôt")).toHaveLength(3);
  });

  it("points to the other resources, coming soon", () => {
    render(<Home />);

    const resources = within(screen.getByRole("region", { name: "Pour aller plus loin" }));
    for (const resource of ["Tendances", "Outils et skills", "Tendances GitHub"]) {
      expect(resources.getByRole("heading", { level: 3, name: resource })).toBeInTheDocument();
    }
    expect(resources.getAllByText("Bientôt")).toHaveLength(3);
  });

  it("invites students to contribute on the repository", () => {
    render(<Home />);

    const invitation = within(screen.getByRole("region", { name: "Le site est fait par les étudiants." }));
    expect(invitation.getByRole("link", { name: "Voir le dépôt sur GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/Ghoutibk/AppDevXplore",
    );
  });
});
