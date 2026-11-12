import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./logo";

describe("Logo", () => {
  it("links to the home page under the site name", () => {
    render(<Logo />);

    expect(screen.getByRole("link", { name: "DevXplore" })).toHaveAttribute("href", "/");
  });
});
