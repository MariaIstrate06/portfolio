export interface ArtistLink {
  label: string;
  url: string;
}

export interface Artist {
  name: string;
  line: string;
  /** Release note for something not out yet, e.g. "out 26 november". */
  upcoming?: string;
  links: ArtistLink[];
}
