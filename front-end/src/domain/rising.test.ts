import { describe, expect, it } from "vitest";
import { risingSince } from "./rising";

describe("risingSince", () => {
  it("looks back thirty days for repositories on the rise", () => {
    expect(risingSince(new Date("2026-11-12T10:00:00Z"))).toEqual(new Date("2026-10-13T10:00:00Z"));
  });
});
