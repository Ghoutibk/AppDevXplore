import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageIntro } from "./page-intro";

const renderIntro = () =>
  render(<PageIntro kicker="// github" title="Tendances GitHub" lead="Les dépôts qui montent, par spécialité." />);

describe("PageIntro", () => {
  it("titles the page with a level-1 heading", () => {
    renderIntro();

    expect(screen.getByRole("heading", { level: 1, name: "Tendances GitHub" })).toBeInTheDocument();
  });

  it("introduces the page with a kicker and a lead", () => {
    renderIntro();

    expect(screen.getByText("// github")).toBeInTheDocument();
    expect(screen.getByText("Les dépôts qui montent, par spécialité.")).toBeInTheDocument();
  });
});
