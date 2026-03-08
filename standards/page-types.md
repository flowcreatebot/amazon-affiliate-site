# Coffee Gear Lab Page Types

Every page must match one of these types. The type determines required sections, minimum word count, schema markup, and structure.

All pages are Astro files (`.astro`) in `src/pages/posts/`. They use Astro components from `src/components/` and layouts from `src/layouts/`.

---

## 1. Money Page (Roundup)

**Min words:** 2,000
**Schema types:** BlogPosting + ItemList + FAQPage
**Internal links:** 3+ to other site pages
**Layout:** `PostLayout`

### Required Sections (in order)
1. Breadcrumbs — via `PostLayout` `breadcrumbs` prop
2. Affiliate disclosure (above fold) — automatic via `PostLayout`
3. H1 (contains primary keyword + current year)
4. Quick picks — `<QuickPicks>` with 3 `<ProductCard>` components (first `featured`)
5. Comparison table — `<ComparisonTable>` with `<table>` in slot, `data-label` on every `<td>`
6. How we evaluate (methodology — no "tested" claims)
7. Individual product reviews (each with: h3, `<ProsCons>`, `<BestForBadge>`, `<CtaButton external>`)
8. Buying guide section — `<BuyingGuideSection>`
9. FAQ section — `<FaqAccordion>` with minimum 4 `<FaqItem>` components
10. Affiliate disclosure (bottom) — automatic via `PostLayout`

### Template

```astro
---
import PostLayout from '../../layouts/PostLayout.astro';
import JsonLd from '../../components/JsonLd.astro';
import QuickPicks from '../../components/QuickPicks.astro';
import ProductCard from '../../components/ProductCard.astro';
import ComparisonTable from '../../components/ComparisonTable.astro';
import ProsCons from '../../components/ProsCons.astro';
import BuyingGuideSection from '../../components/BuyingGuideSection.astro';
import FaqAccordion from '../../components/FaqAccordion.astro';
import FaqItem from '../../components/FaqItem.astro';
import CtaButton from '../../components/CtaButton.astro';
import { blogPosting, publisher, SITE } from '../../data/site';

const canonical = `${SITE.url}/posts/{slug}.html`;
---
<PostLayout
  title="Page Title — Coffee Gear Lab"
  description="Meta description 120-160 chars"
  canonical={canonical}
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "All Guides", href: "/posts/" },
    { label: "Page Title" },
  ]}
>
  <Fragment slot="head">
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      blogPosting({ headline: "...", description: "...", slug: "{slug}", datePublished: "...", dateModified: "..." }),
      { "@type": "ItemList", itemListElement: [ /* ... */ ] },
      { "@type": "FAQPage", mainEntity: [ /* ... */ ] },
    ]}} />
  </Fragment>

  <h1>Title with Primary Keyword 2026</h1>
  <p class="lead">Intro paragraph.</p>

  <QuickPicks>
    <ProductCard featured title="..." badge={{ label: "Best Overall", variant: "overall" }} ... />
    <ProductCard title="..." ... />
    <ProductCard title="..." ... />
  </QuickPicks>

  <ComparisonTable timestamp="Month Day, Year">
    <table><!-- ... --></table>
  </ComparisonTable>

  <h2>How We Evaluate</h2>
  <!-- methodology -->

  <h2 id="product-slug">Product Name</h2>
  <ProsCons pros={[...]} cons={[...]} />
  <CtaButton href="https://www.amazon.com/dp/ASIN/ref=nosim?tag=coffee-site-20" external>Check Price on Amazon</CtaButton>

  <BuyingGuideSection>
    <h2>Buying Guide</h2>
    <!-- content -->
  </BuyingGuideSection>

  <h2>Frequently Asked Questions</h2>
  <FaqAccordion>
    <FaqItem question="Question?"><p>Answer.</p></FaqItem>
  </FaqAccordion>
</PostLayout>
```

---

## 2. VS Comparison

**Min words:** 1,500
**Schema types:** BlogPosting + FAQPage
**Internal links:** 3+
**Layout:** `PostLayout`

### Required Sections (in order)
1. Breadcrumbs — via `PostLayout`
2. Affiliate disclosure (above fold) — via `PostLayout`
3. H1 (contains both product/category names + year)
4. Quick verdict box (winner + runner-up with `<CtaButton external>`)
5. Side-by-side comparison table — `<ComparisonTable>` with specs/features/price
6. Feature-by-feature comparisons (minimum 3 sections, each with h3)
7. Who should buy which (buyer profiles)
8. FAQ section — `<FaqAccordion>` with minimum 3 `<FaqItem>` components
9. Affiliate disclosure (bottom) — via `PostLayout`

---

## 3. Single Review

**Min words:** 2,500
**Schema types:** BlogPosting + Product + Review + FAQPage
**Internal links:** 3+
**Layout:** `PostLayout`

### Required Sections (in order)
1. Breadcrumbs — via `PostLayout`
2. Affiliate disclosure (above fold) — via `PostLayout`
3. H1 (product name + "Review" + year)
4. Verdict card (rating, one-line verdict, `<CtaButton external>`)
5. Specs table (key specifications)
6. Pros/cons — `<ProsCons>`
7. Who should buy this
8. Performance deep-dive (minimum 3 subsections)
9. Alternatives section (2-3 alternatives with `<CtaButton external>`)
10. FAQ section — `<FaqAccordion>` with minimum 4 `<FaqItem>` components
11. Affiliate disclosure (bottom) — via `PostLayout`

---

## 4. How-To Guide

**Min words:** 1,200
**Schema types:** BlogPosting + HowTo + FAQPage
**Internal links:** 2+
**Layout:** `PostLayout`

### Required Sections (in order)
1. Breadcrumbs — via `PostLayout`
2. Affiliate disclosure (above fold, if contains product links) — via `PostLayout` (`showDisclosure` prop)
3. H1 ("How to..." + descriptive title)
4. Quick answer (TL;DR in 2-3 sentences)
5. What you'll need (supplies/tools list, with product links if relevant)
6. Numbered steps (each step: h3, explanation paragraph, tip/warning if applicable)
7. Common mistakes section
8. FAQ section — `<FaqAccordion>` with minimum 3 `<FaqItem>` components
9. Affiliate disclosure (bottom, if contains product links) — via `PostLayout`

---

## 5. Hub / Category Page

**Min words:** 500
**Schema types:** CollectionPage
**Internal links:** Links to all pages in category
**Layout:** `BaseLayout` (not PostLayout — different disclosure/breadcrumb pattern)

### Required Sections (in order)
1. Breadcrumbs — use `<Breadcrumbs>` component directly
2. H1 (category name)
3. Category introduction (2-3 paragraphs)
4. Subcategory card grids — `<CardGrid>` with `<Card>` components
5. Supporting guides section (links to how-to and educational content)

---

## 6. Buying Guide

**Min words:** 1,800
**Schema types:** BlogPosting + FAQPage
**Internal links:** 3+
**Layout:** `PostLayout`

### Required Sections (in order)
1. Breadcrumbs — via `PostLayout`
2. Affiliate disclosure (above fold) — via `PostLayout`
3. H1 (contains "Guide" or "How to Choose" + year)
4. Quick answer (TL;DR summary)
5. Types comparison table — `<ComparisonTable>`
6. What matters most (key factors with explanations)
7. Budget tiers (budget/mid-range/premium with price ranges and recommendations)
8. Common mistakes to avoid
9. Our picks (links to specific product roundups with `<CtaButton>`)
10. FAQ section — `<FaqAccordion>` with minimum 4 `<FaqItem>` components
11. Affiliate disclosure (bottom) — via `PostLayout`

---

## Universal Requirements (All Page Types)

- **File location:** `src/pages/posts/{slug}.astro`
- **Layout:** Use `PostLayout` (content pages) or `BaseLayout` (hub pages)
- **Breadcrumbs:** Via `PostLayout` `breadcrumbs` prop, or `<Breadcrumbs>` component for BaseLayout pages
- **Affiliate disclosure:** Automatic via `PostLayout` (above fold AND bottom) on any page with affiliate links
- **Internal links:** Minimum count per type (see above), contextual not forced
- **Meta title:** 30-60 characters, passed as `title` prop to layout
- **Meta description:** 120-160 characters, passed as `description` prop to layout
- **Canonical URL:** `https://coffeegearpicks.com/posts/{slug}.html`, passed as `canonical` prop
- **OG tags:** Automatic via `BaseLayout` from `title`, `description`, `canonical` props. Override with `ogTitle`, `ogDescription`, `ogUrl`, `ogImage` props.
- **Schema markup:** `<JsonLd>` component inside `<Fragment slot="head">` — JSON-LD in `<head>`
- **H1:** Exactly one per page, contains primary keyword
- **Amazon links:** Use `<CtaButton external>` which adds `rel="nofollow sponsored noopener" target="_blank"`. For inline links, manually add `rel="nofollow sponsored noopener" target="_blank"`.
- **Images:** `width`, `height`, `alt`, `loading="lazy"` attributes required
- **Shared constants:** Import `SITE`, `blogPosting`, `publisher` from `../../data/site`
