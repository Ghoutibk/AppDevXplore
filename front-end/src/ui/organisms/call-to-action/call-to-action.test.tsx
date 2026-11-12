import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CallToAction } from "./call-to-action";

const renderCallToAction = () =>
  render(
    <CallToAction
      kicker="// contribuer"
      title="Le site est fait par les étudiants."
      description="Une idée de projet à partager ? Ouvre une pull request."
      action={<a href="https://github.com/Ghoutibk/AppDevXplore">Voir le dépôt sur GitHub</a>}
    />,
  );

describe("CallToAction", () => {
  it("is a region named by its title", () => {
    renderCallToAction();

    expect(screen.getByRole("region", { name: "Le site est fait par les étudiants." })).toBeInTheDocument();
  });

  it("offers its action", () => {
    renderCallToAction();

    expect(within(screen.getByRole("region")).getByRole("link", { name: "Voir le dépôt sur GitHub" })).toBeInTheDocument();
  });
});
