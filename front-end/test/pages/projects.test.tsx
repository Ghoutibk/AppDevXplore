import { render, screen } from "@testing-library/react";
import type { GetStaticPathsContext } from "next";
import { describe, expect, it, vi } from "vitest";
import type { LevelProjects } from "@/application/get-project-ideas";
import type { Specialty } from "@/domain/specialty";
import Projects, { getStaticPaths, getStaticProps } from "@/pages/projets/[specialty]";

const { ideasOf } = vi.hoisted(() => ({
  ideasOf: (specialty: Specialty): LevelProjects[] => [
    {
      level: "beginner",
      projects: [
        {
          title: `First ${specialty} project`,
          specialty,
          level: "beginner",
          summary: "",
          skills: [],
          startingPoint: { label: "", url: "" },
        },
      ],
    },
  ],
}));

vi.mock("@/composition/project-ideas", () => ({
  loadProjectIdeas: async (specialty: Specialty) => ideasOf(specialty),
}));

describe("Projects page", () => {
  it("exists for each specialty, under its French address", async () => {
    expect(await getStaticPaths({} as GetStaticPathsContext)).toEqual({
      paths: [
        { params: { specialty: "data" } },
        { params: { specialty: "cybersecurite" } },
        { params: { specialty: "ia" } },
      ],
      fallback: false,
    });
  });

  it.each([
    ["data", "data"],
    ["cybersecurite", "cybersecurity"],
    ["ia", "artificial-intelligence"],
  ] as const)("loads at /projets/%s the %s project ideas when the site is built", async (slug, specialty) => {
    expect(await getStaticProps({ params: { specialty: slug } })).toEqual({
      props: { specialty, ideas: ideasOf(specialty) },
    });
  });

  it.each([
    ["data", "Projets data", /apprendre à collecter, nettoyer et faire parler les données/],
    ["cybersecurity", "Projets cybersécurité", /comprendre les attaques et apprendre à s'en défendre/],
    ["artificial-intelligence", "Projets IA", /entraîner, évaluer et déployer des modèles/],
  ] as const)("introduces the %s projects within the site frame", (specialty, title, lead) => {
    render(<Projects specialty={specialty} ideas={[]} />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getByText(lead)).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
