import type { Level } from "./level";
import type { Specialty } from "./specialty";

/** An online resource a student opens to get a project started. */
export interface StartingPoint {
  readonly label: string;
  readonly url: string;
}

/** A project idea a student can build to practise a specialty. */
export interface Project {
  readonly title: string;
  readonly specialty: Specialty;
  readonly level: Level;
  /** What the student builds, in a sentence or two. */
  readonly summary: string;
  /** What the project makes the student practise. */
  readonly skills: readonly string[];
  readonly startingPoint: StartingPoint;
}
