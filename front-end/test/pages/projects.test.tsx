import { render, screen } from "@testing-library/react";
import type { GetStaticPathsContext } from "next";
import { describe, expect, it } from "vitest";
import Projects, { getStaticPaths, getStaticProps } from "@/pages/projets/[specialty]";

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
  ] as const)("presents at /projets/%s the %s specialty", async (slug, specialty) => {
    expect(await getStaticProps({ params: { specialty: slug } })).toEqual({ props: { specialty } });
  });

  it.each([
    ["data", "Projets data", /apprendre à collecter, nettoyer et faire parler les données/],
    ["cybersecurity", "Projets cybersécurité", /comprendre les attaques et apprendre à s'en défendre/],
    ["artificial-intelligence", "Projets IA", /entraîner, évaluer et déployer des modèles/],
  ] as const)("introduces the %s projects within the site frame", (specialty, title, lead) => {
    render(<Projects specialty={specialty} />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getByText(lead)).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
