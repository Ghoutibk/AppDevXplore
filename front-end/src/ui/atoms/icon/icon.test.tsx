import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon, type IconName } from "./icon";

const names: IconName[] = ["chart", "shield", "chip", "trending", "terminal", "star", "arrow-right"];

describe("Icon", () => {
  it.each(names)("hides the %s icon from assistive technologies", (name) => {
    const { container } = render(<Icon name={name} />);

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
