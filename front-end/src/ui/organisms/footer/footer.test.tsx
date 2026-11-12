import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Footer } from "./footer";

describe("Footer", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("presents the association in the site footer", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("link", { name: "DevXplore" })).toBeInTheDocument();
    expect(within(footer).getByText("L'association de développement de l'école.")).toBeInTheDocument();
  });

  it("links to the source code of the site", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Code source du site" })).toHaveAttribute(
      "href",
      "https://github.com/Ghoutibk/AppDevXplore",
    );
  });

  it("credits DevXplore for the current year", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2027-03-01"));

    render(<Footer />);

    expect(screen.getByText("© 2027 DevXplore")).toBeInTheDocument();
  });
});
