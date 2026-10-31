export interface CaseStudyMeta {
  role: string;
  for: string;
  when: string;
  channels: string;
}

export interface CaseStudyTactic {
  title: string;
  text: string;
}

export interface CaseStudyResult {
  number: string;
  label: string;
}

export interface CaseStudyImage {
  file: string | null;
  caption: string;
}

export interface CaseStudySections {
  context: string;
  problem: string;
  idea: string;
  whatWeDid: CaseStudyTactic[];
  results: CaseStudyResult[];
  myPart: string;
}

export interface CaseStudy {
  slug: string;
  project: string;
  hook: string;
  line: string;
  tags: string[];
  cover: string | null;
  meta: CaseStudyMeta;
  sections: CaseStudySections;
  images: CaseStudyImage[];
  featuredOnHome: boolean;
}
