import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeading } from "./section-heading";

const renderHeading = () =>
  render(
    <SectionHeading
      kicker="// projets"
      title="Choisis ta spécialité"
      description="Des idées de projets à réaliser, classées par domaine."
      titleId="specialites-title"
    />,
  );

describe("SectionHeading", () => {
  it("titles its section with a level-2 heading", () => {
    renderHeading();

    expect(screen.getByRole("heading", { level: 2, name: "Choisis ta spécialité" })).toHaveAttribute(
      "id",
      "specialites-title",
    );
  });

  it("introduces the section with a kicker and a description", () => {
    renderHeading();

    expect(screen.getByText("// projets")).toBeInTheDocument();
    expect(screen.getByText("Des idées de projets à réaliser, classées par domaine.")).toBeInTheDocument();
  });
});
