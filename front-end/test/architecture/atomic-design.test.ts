// @vitest-environment node
import { describe, expect, it } from "vitest";
import { importsOf, listSourceFiles, segment } from "./source-graph";

const levels = ["atoms", "molecules", "organisms", "templates"] as const;

type Level = (typeof levels)[number];

const levelOf = (file: string) => segment(file, 1);
const rankOf = (file: string) => levels.indexOf(levelOf(file) as Level);
const isUi = (file: string) => segment(file, 0) === "ui";

const uiFiles = listSourceFiles().filter(isUi);

describe("atomic design", () => {
  it("places every ui file in an atomic level", () => {
    expect(uiFiles.filter((file) => rankOf(file) === -1)).toEqual([]);
  });

  it.each(levels)("keeps %s from depending on higher levels", (level) => {
    const rank = levels.indexOf(level);
    const violations = uiFiles
      .filter((file) => levelOf(file) === level)
      .flatMap(importsOf)
      .filter(({ target }) => target !== null && isUi(target) && rankOf(target) > rank)
      .map(({ file, specifier }) => `${file} -> ${specifier}`);

    expect(violations).toEqual([]);
  });
});
