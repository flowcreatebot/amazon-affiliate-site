// Shared types for page-type template components

export interface BasePageProps {
  slug: string;
  title: string;
  description: string;
  category: string;
  datePublished: string;
  dateModified: string;
  ogImage?: string;
  ogDescription?: string;
}

export interface TocItem {
  href: string;
  label: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface HeroPick {
  category: string;
  tagline: string;
  icon: string;
  features: string[];
  topPick: string;
  price: string;
  subtitle: string;
  asin: string;
  color: string;
}

export interface HeroVersusConfig {
  title: string;
  subtitle: string;
  left: { name: string; icon: string; color: string; bestFor: string };
  right: { name: string; icon: string; color: string; bestFor: string };
  stats: Array<{ label: string; value: string; winner?: 'left' | 'right' | 'tie' }>;
  verdict: string;
  footer?: string;
}

export interface HeroStepsConfig {
  title: string;
  subtitle: string;
  steps: Array<{ label: string; icon: string; actions: string[]; time: string }>;
  outcome: string;
  footer?: string;
}
