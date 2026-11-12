import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ButtonLink } from "./button-link";

describe("ButtonLink", () => {
  it.each(["primary", "secondary"] as const)("links to its target under its label as a %s action", (variant) => {
    render(
      <ButtonLink href="#specialites" variant={variant}>
        Choisir ma spécialité
      </ButtonLink>,
    );

    expect(screen.getByRole("link", { name: "Choisir ma spécialité" })).toHaveAttribute("href", "#specialites");
  });
});
