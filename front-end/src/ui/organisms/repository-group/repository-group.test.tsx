import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Repository } from "@/domain/repository";
import { RepositoryGroup } from "./repository-group";

const repository = (fullName: string, stars: number): Repository => ({
  fullName,
  url: `https://github.com/${fullName}`,
  description: null,
  stars,
  language: null,
});

describe("RepositoryGroup", () => {
  it("titles the group with a level-3 heading and a description", () => {
    render(<RepositoryGroup title="Les incontournables" description="Les plus étoilés." repositories={[]} />);

    expect(screen.getByRole("heading", { level: 3, name: "Les incontournables" })).toBeInTheDocument();
    expect(screen.getByText("Les plus étoilés.")).toBeInTheDocument();
  });

  it("lists the repositories in ranking order", () => {
    render(
      <RepositoryGroup
        title="Les incontournables"
        description="Les plus étoilés."
        repositories={[repository("tensorflow/tensorflow", 201580), repository("pytorch/pytorch", 105459)]}
      />,
    );

    const names = screen
      .getAllByRole("listitem")
      .map((item) => within(item).getByRole("link").textContent);
    expect(names).toEqual(["tensorflow/tensorflow", "pytorch/pytorch"]);
  });

  it("says when there is no repository to show", () => {
    render(<RepositoryGroup title="Ceux qui montent" description="Créés ces 30 derniers jours." repositories={[]} />);

    expect(screen.getByText("Aucun dépôt pour le moment.")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
