/** The experience a project asks for, from the most accessible to the most demanding. */
export const levels = ["beginner", "intermediate", "advanced"] as const;

export type Level = (typeof levels)[number];
