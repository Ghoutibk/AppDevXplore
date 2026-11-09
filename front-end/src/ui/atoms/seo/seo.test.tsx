import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Seo } from "./seo";

vi.mock("next/head", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe("Seo", () => {
  it("uses the title as the page title", () => {
    render(<Seo title="DevXplore" description="Ressources pour les étudiants" />);

    expect(document.title).toBe("DevXplore");
  });
});
