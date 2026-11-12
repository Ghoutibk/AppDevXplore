import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./header";

describe("Header", () => {
  it("shows the logo in the site banner", () => {
    render(<Header />);

    expect(within(screen.getByRole("banner")).getByRole("link", { name: "DevXplore" })).toBeInTheDocument();
  });
});
