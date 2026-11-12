const RISING_WINDOW_IN_DAYS = 30;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

/** A repository is on the rise when it was created within the last thirty days. */
export function risingSince(today: Date): Date {
  return new Date(today.getTime() - RISING_WINDOW_IN_DAYS * DAY_IN_MS);
}
