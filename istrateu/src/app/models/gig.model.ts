export interface Gig {
  date: string;
  event: string;
  role: string;
  note: string;
}

export interface GigQuote {
  line: string;
  attribution: string;
}

export interface GigLog {
  gigs: Gig[];
  quote?: GigQuote;
}
