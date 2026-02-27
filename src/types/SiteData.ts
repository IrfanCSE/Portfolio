export interface Personal {
  name: string;
  shortName: string;
  title: string;
  brandName: string;
  resumePath: string;
}

export interface TechIcon {
  name: string;
  iconKey: string;
}

export interface HeroStat {
  label: string;
  value: number | null;
  dynamicKey?: string;
  suffix?: string;
}

export interface Hero {
  greeting: string;
  typewriterTexts: string[];
  ctaText: string;
  techIcons: TechIcon[];
  stats?: HeroStat[];
}

export interface About {
  photo: string;
  paragraphs: string[];
  highlights?: string[];
}

export interface Experience {
  role: string;
  company: string;
  companyUrl: string;
  logo: string;
  period: string;
  startDate: string;
  endDate: string | null;
  description: string;
  responsibilities: string[];
}

export interface PrimarySkill {
  name: string;
  percentage: number;
}

export interface AdditionalSkill {
  name: string;
  icon: string;
  color: string;
}

export interface Skills {
  primary: PrimarySkill[];
  additional: AdditionalSkill[];
}

export interface Project {
  title: string;
  company: string;
  description: string;
  image: string;
  demo: string;
  github: string | null;
  technologies: string[];
  featured?: boolean;
}

export interface ContactLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
  color: string;
}

export interface Contact {
  heading: string;
  subtext: string;
  email: string;
  phone: string;
  links: ContactLink[];
}

export interface Footer {
  text: string;
  year: number;
}

export interface BlogPost {
  title: string;
  url: string;
  date: string;
  platform: string;
  tags: string[];
}

export interface SiteData {
  personal: Personal;
  hero: Hero;
  about: About;
  experience: Experience[];
  skills: Skills;
  projects: Project[];
  contact: Contact;
  footer: Footer;
  startDate: string;
  blog?: BlogPost[];
}
