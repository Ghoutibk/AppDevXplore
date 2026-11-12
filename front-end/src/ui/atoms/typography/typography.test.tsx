import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Typography } from "./typography";

describe("Typography", () => {
  it.each([
    ["display", 1],
    ["h1", 1],
    ["h2", 2],
    ["h3", 3],
    ["h4", 4],
    ["h5", 5],
  ] as const)("renders %s as a level-%i heading", (variant, level) => {
    render(<Typography variant={variant}>DevXplore</Typography>);

    expect(screen.getByRole("heading", { level, name: "DevXplore" })).toBeInTheDocument();
  });

  it.each(["lead", "body-lg", "body-base", "body-sm"] as const)("renders %s as a paragraph", (variant) => {
    render(<Typography variant={variant}>Des ressources pour les étudiants</Typography>);

    expect(screen.getByRole("paragraph")).toHaveTextContent("Des ressources pour les étudiants");
  });

  it.each(["caption1", "caption2", "caption3", "caption4"] as const)("renders %s inline", (variant) => {
    render(<Typography variant={variant}>Bientôt</Typography>);

    expect(screen.getByText("Bientôt").tagName).toBe("SPAN");
  });
});
