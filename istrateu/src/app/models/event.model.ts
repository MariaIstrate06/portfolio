export interface EventStat {
  number: string;
  label: string;
}

export interface BigEvent {
  name: string;
  years: string;
  role: string;
  line: string;
  image: string | null;
  caseStudy: string;
}

export interface SmallEvent {
  year: string;
  name: string;
  role: string;
  line: string;
}

export interface Events {
  stats: EventStat[];
  big: BigEvent[];
  small: SmallEvent[];
}
