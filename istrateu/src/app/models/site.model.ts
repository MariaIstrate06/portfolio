export interface SocialLink {
  label: string;
  url: string;
}

export interface Site {
  hero: {
    title: string;
    tagline: string;
  };
  home: {
    aboutBlurb: string;
    selectedVisualsTitle: string;
    caseStudiesTitle: string;
    connectTitle: string;
    connectTagline: string;
    footer: string;
  };
  about: {
    paragraphs: string[];
  };
  contact: {
    intro: string;
  };
  email: string;
  social: SocialLink[];
}
