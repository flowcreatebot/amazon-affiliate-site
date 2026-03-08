export const SITE = {
  name: 'Coffee Gear Lab',
  url: 'https://coffeegearpicks.com',
  gaId: 'G-3Q4RL7QGN4',
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'All Guides', href: '/posts/' },
  { label: 'Espresso', href: '/posts/best-espresso-machine-under-200.html' },
  { label: 'Grinders', href: '/posts/best-coffee-grinder-for-pour-over.html' },
];

export const publisher = {
  '@type': 'Organization' as const,
  name: SITE.name,
};

export function blogPosting(opts: {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}) {
  return {
    '@type': 'BlogPosting',
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: publisher,
    publisher,
    mainEntityOfPage: `${SITE.url}/posts/${opts.slug}.html`,
    ...(opts.image ? { image: opts.image } : {}),
  };
}
