import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Navigation } from "./navigation";

describe("Navigation", () => {
  it("is a navigation landmark named by its label", () => {
    render(<Navigation label="Navigation principale" />);

    expect(screen.getByRole("navigation", { name: "Navigation principale" })).toBeInTheDocument();
  });

  it("leads to the pages of the site, in menu order", () => {
    render(<Navigation label="Navigation principale" />);

    const links = within(screen.getByRole("navigation")).getAllByRole("link");
    expect(links.map((link) => [link.textContent, link.getAttribute("href")])).toEqual([
      ["Projets", "/#specialites"],
      ["GitHub", "/tendances-github"],
    ]);
  });
});
