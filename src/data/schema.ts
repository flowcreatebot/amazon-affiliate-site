// JSON-LD schema builder helpers for page-type templates
// Reuses blogPosting() and publisher from site.ts (generated at build time)

import { SITE, blogPosting, publisher } from './site';
import type { ResolvedProduct } from './products';

interface FaqItem {
  q: string;
  a: string;
}

// --- Generic builders (used by multiple page types) ---

export function buildFaqSchema(items: FaqItem[]) {
  return {
    '@type': 'FAQPage' as const,
    mainEntity: items.map((item) => ({
      '@type': 'Question' as const,
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: item.a,
      },
    })),
  };
}

export function buildItemListSchema(names: string[]) {
  return {
    '@type': 'ItemList' as const,
    itemListElement: names.map((name, i) => ({
      '@type': 'ListItem' as const,
      position: i + 1,
      name,
    })),
  };
}

interface HowToStep {
  name: string;
  text: string;
}

export function buildHowToSchema(opts: {
  name: string;
  description: string;
  supplies?: string[];
  tools?: string[];
  steps: HowToStep[];
}) {
  return {
    '@type': 'HowTo' as const,
    name: opts.name,
    description: opts.description,
    ...(opts.supplies
      ? { supply: opts.supplies.map((s) => ({ '@type': 'HowToSupply' as const, name: s })) }
      : {}),
    ...(opts.tools
      ? { tool: opts.tools.map((t) => ({ '@type': 'HowToTool' as const, name: t })) }
      : {}),
    step: opts.steps.map((s) => ({
      '@type': 'HowToStep' as const,
      name: s.name,
      text: s.text,
    })),
  };
}

export function buildProductSchema(
  product: ResolvedProduct,
  review?: { score: number; summary: string }
) {
  const schema: Record<string, any> = {
    '@type': 'Product' as const,
    name: product.name,
    brand: { '@type': 'Brand' as const, name: product.brand },
    ...(product.image ? { image: product.image } : {}),
  };
  if (review) {
    schema.review = {
      '@type': 'Review' as const,
      reviewRating: {
        '@type': 'Rating' as const,
        ratingValue: review.score,
        bestRating: 5,
      },
      reviewBody: review.summary,
      author: publisher,
    };
  }
  return schema;
}

// --- Blog page type graph builders ---

/** Standard article with optional FAQ */
export function articleWithFaqGraph(opts: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  faqItems?: FaqItem[];
}) {
  const graph: any[] = [
    blogPosting({
      headline: opts.title,
      description: opts.description,
      slug: opts.slug,
      datePublished: opts.datePublished,
      dateModified: opts.dateModified,
      image: opts.image,
    }),
  ];
  if (opts.faqItems && opts.faqItems.length > 0) {
    graph.push(buildFaqSchema(opts.faqItems));
  }
  graph.push(publisher);
  return { '@context': 'https://schema.org', '@graph': graph };
}

// --- Affiliate page type graph builders ---

/** Money/roundup page */
export function moneyPageGraph(opts: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  productNames: string[];
  faqItems: FaqItem[];
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      blogPosting({
        headline: opts.title,
        description: opts.description,
        slug: opts.slug,
        datePublished: opts.datePublished,
        dateModified: opts.dateModified,
        image: opts.image,
      }),
      buildItemListSchema(opts.productNames),
      buildFaqSchema(opts.faqItems),
      publisher,
    ],
  };
}

/** VS comparison page */
export function vsPageGraph(opts: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  faqItems: FaqItem[];
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      blogPosting({
        headline: opts.title,
        description: opts.description,
        slug: opts.slug,
        datePublished: opts.datePublished,
        dateModified: opts.dateModified,
        image: opts.image,
      }),
      buildFaqSchema(opts.faqItems),
      publisher,
    ],
  };
}

/** How-to guide page */
export function howToPageGraph(opts: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  howToName: string;
  howToDescription: string;
  supplies?: string[];
  tools?: string[];
  howToSteps: HowToStep[];
  faqItems: FaqItem[];
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      blogPosting({
        headline: opts.title,
        description: opts.description,
        slug: opts.slug,
        datePublished: opts.datePublished,
        dateModified: opts.dateModified,
        image: opts.image,
      }),
      buildHowToSchema({
        name: opts.howToName,
        description: opts.howToDescription,
        supplies: opts.supplies,
        tools: opts.tools,
        steps: opts.howToSteps,
      }),
      buildFaqSchema(opts.faqItems),
      publisher,
    ],
  };
}

/** Single review page */
export function reviewPageGraph(opts: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  product: ResolvedProduct;
  review: { score: number; summary: string };
  faqItems: FaqItem[];
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      blogPosting({
        headline: opts.title,
        description: opts.description,
        slug: opts.slug,
        datePublished: opts.datePublished,
        dateModified: opts.dateModified,
        image: opts.image,
      }),
      buildProductSchema(opts.product, opts.review),
      buildFaqSchema(opts.faqItems),
      publisher,
    ],
  };
}

/** Buying guide page */
export function buyingGuidePageGraph(opts: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  faqItems: FaqItem[];
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      blogPosting({
        headline: opts.title,
        description: opts.description,
        slug: opts.slug,
        datePublished: opts.datePublished,
        dateModified: opts.dateModified,
        image: opts.image,
      }),
      buildFaqSchema(opts.faqItems),
      publisher,
    ],
  };
}

/** Hub/category page */
export function hubPageGraph(opts: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage' as const,
        name: opts.title,
        description: opts.description,
        url: opts.url,
      },
      publisher,
    ],
  };
}

// --- Backward-compatible exports for blog page types ---
// These accept siteUrl/authorName params but ignore them (site.ts handles it)

interface LegacySchemaOpts {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  siteUrl: string;
  authorName: string;
}

export function blogPostingSchema(opts: LegacySchemaOpts) {
  return {
    '@context': 'https://schema.org',
    ...blogPosting({
      headline: opts.title,
      description: opts.description,
      slug: opts.slug,
      datePublished: opts.datePublished,
      dateModified: opts.dateModified,
      image: opts.image,
    }),
  };
}

export function faqPageSchema(faqItems: FaqItem[]) {
  if (!faqItems || faqItems.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    ...buildFaqSchema(faqItems),
  };
}

export function articleWithFaqSchema(opts: LegacySchemaOpts & { faqItems?: FaqItem[] }) {
  return articleWithFaqGraph(opts);
}

export function howToSchema(opts: LegacySchemaOpts & {
  howToName: string;
  howToDescription: string;
  steps: { name: string; text: string }[];
  supplies?: string[];
  tools?: string[];
}) {
  return howToPageGraph({
    ...opts,
    howToSteps: opts.steps,
    faqItems: [],
  });
}
