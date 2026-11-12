import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeatureCard } from "./feature-card";

const card = {
  icon: "chart",
  title: "Data",
  description: "Collecter, nettoyer et visualiser des données.",
} as const;

describe("FeatureCard", () => {
  it.each(["boxed", "ruled"] as const)("titles a %s card with a level-3 heading", (appearance) => {
    render(<FeatureCard {...card} appearance={appearance} />);

    expect(screen.getByRole("heading", { level: 3, name: "Data" })).toBeInTheDocument();
    expect(screen.getByText("Collecter, nettoyer et visualiser des données.")).toBeInTheDocument();
  });

  it("links to its page when the page exists", () => {
    render(<FeatureCard {...card} appearance="boxed" link={{ href: "/projets/data", label: "Voir les projets data" }} />);

    expect(screen.getByRole("link", { name: "Voir les projets data" })).toHaveAttribute("href", "/projets/data");
    expect(screen.queryByText("Bientôt")).not.toBeInTheDocument();
  });

  it("announces its page as coming soon when the page does not exist yet", () => {
    render(<FeatureCard {...card} appearance="boxed" />);

    expect(screen.getByText("Bientôt")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
