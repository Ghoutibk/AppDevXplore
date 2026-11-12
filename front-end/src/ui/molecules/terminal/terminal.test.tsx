import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Terminal } from "./terminal";

const commands = [{ directory: "~/devxplore", input: "ls", output: ["projets/", "tendances/"] }];

describe("Terminal", () => {
  it("is hidden from assistive technologies", () => {
    const { container } = render(<Terminal commands={commands} directory="~/devxplore/projets" />);

    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("prints each command followed by its output", () => {
    render(<Terminal commands={commands} directory="~/devxplore/projets" />);

    expect(screen.getByText("ls")).toBeInTheDocument();
    expect(screen.getByText("projets/")).toBeInTheDocument();
    expect(screen.getByText("tendances/")).toBeInTheDocument();
  });

  it("ends on a prompt waiting in the current directory", () => {
    render(<Terminal commands={commands} directory="~/devxplore/projets" />);

    expect(screen.getByText("~/devxplore/projets")).toBeInTheDocument();
  });
});
