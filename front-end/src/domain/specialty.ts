/** A field of study at the school, used to sort projects and resources. */
export const specialties = ["data", "cybersecurity", "artificial-intelligence"] as const;

export type Specialty = (typeof specialties)[number];
