import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./hero";

const renderHero = () =>
  render(
    <Hero
      kicker="// l'asso dev de l'école"
      title="Trouve ton prochain projet"
      highlight="de développement."
      lead="DevXplore rassemble des ressources pour les étudiants."
      actions={<a href="#specialites">Choisir ma spécialité</a>}
      aside={<p>Illustration</p>}
    />,
  );

describe("Hero", () => {
  it("titles the page with a level-1 heading ending on its highlight", () => {
    renderHero();

    expect(
      screen.getByRole("heading", { level: 1, name: "Trouve ton prochain projet de développement." }),
    ).toBeInTheDocument();
  });

  it("introduces the page with a kicker and a lead", () => {
    renderHero();

    expect(screen.getByText("// l'asso dev de l'école")).toBeInTheDocument();
    expect(screen.getByText("DevXplore rassemble des ressources pour les étudiants.")).toBeInTheDocument();
  });

  it("shows its actions beside its illustration", () => {
    renderHero();

    expect(screen.getByRole("link", { name: "Choisir ma spécialité" })).toBeInTheDocument();
    expect(screen.getByText("Illustration")).toBeInTheDocument();
  });
});
