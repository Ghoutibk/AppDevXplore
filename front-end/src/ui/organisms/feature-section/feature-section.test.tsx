import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeatureSection } from "./feature-section";

const renderSection = () =>
  render(
    <FeatureSection
      id="specialites"
      kicker="// projets"
      title="Choisis ta spécialité"
      description="Des idées de projets à réaliser, classées par domaine."
    >
      <article>Data</article>
    </FeatureSection>,
  );

describe("FeatureSection", () => {
  it("is a region named by its title", () => {
    renderSection();

    expect(screen.getByRole("region", { name: "Choisis ta spécialité" })).toBeInTheDocument();
  });

  it("can be reached through its anchor", () => {
    renderSection();

    expect(screen.getByRole("region", { name: "Choisis ta spécialité" })).toHaveAttribute("id", "specialites");
  });

  it("shows its cards", () => {
    renderSection();

    expect(within(screen.getByRole("region")).getByText("Data")).toBeInTheDocument();
  });
});
