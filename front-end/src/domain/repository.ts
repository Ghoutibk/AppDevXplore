/** An open source project hosted on GitHub. */
export interface Repository {
  readonly fullName: string;
  readonly url: string;
  readonly description: string | null;
  readonly stars: number;
  readonly language: string | null;
}
