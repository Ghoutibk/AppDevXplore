import { render, screen, within } from "@testing-library/react";
import type { GetStaticPathsContext } from "next";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import type { LevelProjects } from "@/application/get-project-ideas";
import type { Level } from "@/domain/level";
import type { Project } from "@/domain/project";
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

vi.mock("next/head", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("@/composition/project-ideas", () => ({
  loadProjectIdeas: async (specialty: Specialty) => ideasOf(specialty),
}));

const project = (title: string, level: Level): Project => ({
  title,
  specialty: "data",
  level,
  summary: "",
  skills: [],
  startingPoint: { label: "", url: "" },
});

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

  it.each([
    [
      "data",
      "Projets data · DevXplore",
      "Des idées de projets data pour les étudiants, classées par niveau : du premier jeu de données au pipeline automatisé.",
    ],
    [
      "cybersecurity",
      "Projets cybersécurité · DevXplore",
      "Des idées de projets de cybersécurité pour les étudiants, classées par niveau : défis, durcissement de serveur, détection d'intrusion.",
    ],
    [
      "artificial-intelligence",
      "Projets IA · DevXplore",
      "Des idées de projets d'intelligence artificielle pour les étudiants, classées par niveau : du premier classifieur à l'agent.",
    ],
  ] as const)("describes the %s projects to browsers and search engines", (specialty, title, description) => {
    render(<Projects specialty={specialty} ideas={[]} />);

    expect(document.title).toBe(title);
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute("content", description);
  });

  it.each([
    ["beginner", "Débutant"],
    ["intermediate", "Intermédiaire"],
    ["advanced", "Avancé"],
  ] as const)("gathers the %s project ideas in a section titled %s", (level, title) => {
    const ideas = [{ level, projects: [project("Dashboard", level), project("Exploration", level)] }];

    render(<Projects specialty="data" ideas={ideas} />);

    const section = within(screen.getByRole("region", { name: title }));
    expect(section.getAllByRole("heading", { level: 3 }).map(({ textContent }) => textContent)).toEqual([
      "Dashboard",
      "Exploration",
    ]);
  });

  it("invites students to share a project idea, with the guide that explains how", () => {
    render(<Projects specialty="data" ideas={[]} />);

    const invitation = within(screen.getByRole("region", { name: "Une idée de projet à partager ?" }));
    expect(invitation.getByRole("link", { name: "Proposer une idée" })).toHaveAttribute(
      "href",
      "https://github.com/Ghoutibk/AppDevXplore/blob/main/CONTRIBUTING.md#proposer-une-idée-de-projet",
    );
  });
});
