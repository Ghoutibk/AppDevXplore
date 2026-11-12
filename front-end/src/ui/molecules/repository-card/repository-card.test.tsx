import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Repository } from "@/domain/repository";
import { RepositoryCard } from "./repository-card";

const pandas: Repository = {
  fullName: "pandas-dev/pandas",
  url: "https://github.com/pandas-dev/pandas",
  description: "Flexible and powerful data analysis",
  stars: 92151,
  language: "Python",
};

describe("RepositoryCard", () => {
  it("links to the repository under its full name", () => {
    render(<RepositoryCard repository={pandas} />);

    expect(screen.getByRole("heading", { level: 4, name: "pandas-dev/pandas" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "pandas-dev/pandas" })).toHaveAttribute(
      "href",
      "https://github.com/pandas-dev/pandas",
    );
  });

  it("describes the repository with its language and its stars", () => {
    render(<RepositoryCard repository={pandas} />);

    expect(screen.getByText("Flexible and powerful data analysis")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("92 k étoiles")).toBeInTheDocument();
  });

  it("leaves out the description and the language GitHub does not know", () => {
    render(<RepositoryCard repository={{ ...pandas, description: null, language: null }} />);

    expect(screen.queryByText("Flexible and powerful data analysis")).not.toBeInTheDocument();
    expect(screen.queryByText("Python")).not.toBeInTheDocument();
  });
});
