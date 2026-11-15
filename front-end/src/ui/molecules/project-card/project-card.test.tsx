import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Project } from "@/domain/project";
import { ProjectCard } from "./project-card";

const openData: Project = {
  title: "Faire parler un jeu de données ouvert",
  specialty: "data",
  level: "beginner",
  summary: "Choisis un jeu de données, nettoie-le, puis raconte ce que tu y trouves.",
  skills: ["pandas", "Nettoyage de données", "Visualisation"],
  startingPoint: { label: "data.gouv.fr", url: "https://www.data.gouv.fr/" },
};

describe("ProjectCard", () => {
  it("titles the project with a level-3 heading and sums it up", () => {
    render(<ProjectCard project={openData} />);

    expect(screen.getByRole("heading", { level: 3, name: "Faire parler un jeu de données ouvert" })).toBeInTheDocument();
    expect(screen.getByText("Choisis un jeu de données, nettoie-le, puis raconte ce que tu y trouves.")).toBeInTheDocument();
  });

  it("lists the skills the project makes students practise", () => {
    render(<ProjectCard project={openData} />);

    const skills = within(screen.getByRole("list", { name: "Compétences travaillées" })).getAllByRole("listitem");
    expect(skills.map(({ textContent }) => textContent)).toEqual(["pandas", "Nettoyage de données", "Visualisation"]);
  });

  it("links to the resource that gets the project started", () => {
    render(<ProjectCard project={openData} />);

    expect(screen.getByRole("link", { name: "Pour démarrer : data.gouv.fr" })).toHaveAttribute(
      "href",
      "https://www.data.gouv.fr/",
    );
  });
});
