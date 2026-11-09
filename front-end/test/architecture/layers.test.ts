import { describe, expect, it } from "vitest";
import { importsOf, listSourceFiles, segment } from "./source-graph";

const allowedLayers = {
  domain: ["domain"],
  application: ["domain", "application"],
  infrastructure: ["domain", "application", "infrastructure"],
  composition: ["domain", "application", "infrastructure", "composition"],
  ui: ["domain", "ui"],
  pages: ["domain", "application", "composition", "ui", "styles", "pages"],
} as const satisfies Record<string, readonly string[]>;

type Layer = keyof typeof allowedLayers;

const layers = Object.keys(allowedLayers) as Layer[];
const frameworkFreeLayers: Layer[] = ["domain", "application"];

const isLayer = (name: string): name is Layer => Object.hasOwn(allowedLayers, name);
const layerOf = (file: string) => segment(file, 0);

const files = listSourceFiles();
const imports = files.flatMap(importsOf);

describe("clean architecture", () => {
  it("places every source file in a known layer", () => {
    expect(files.filter((file) => !isLayer(layerOf(file)))).toEqual([]);
  });

  it.each(layers)("lets %s depend only on its allowed layers", (layer) => {
    const allowed: readonly string[] = allowedLayers[layer];
    const violations = imports
      .filter(({ file, target }) => layerOf(file) === layer && target !== null)
      .filter(({ target }) => !allowed.includes(layerOf(target!)))
      .map(({ file, specifier }) => `${file} -> ${specifier}`);

    expect(violations).toEqual([]);
  });

  it.each(frameworkFreeLayers)("keeps %s free of external packages", (layer) => {
    const violations = imports
      .filter(({ file, target }) => layerOf(file) === layer && target === null)
      .map(({ file, specifier }) => `${file} -> ${specifier}`);

    expect(violations).toEqual([]);
  });
});
