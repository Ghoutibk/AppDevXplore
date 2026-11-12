import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MainTemplate } from "./main-template";

describe("MainTemplate", () => {
  it("frames the page content between the header and the footer", () => {
    render(
      <MainTemplate>
        <p>Contenu de la page</p>
      </MainTemplate>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(within(screen.getByRole("main")).getByText("Contenu de la page")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
