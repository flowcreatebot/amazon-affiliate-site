# Coffee Gear Lab Page Types

Every page must match one of these types. The type determines required sections, minimum word count, schema markup, and structure.

---

## 1. Money Page (Roundup)

**Min words:** 2,000
**Schema types:** BlogPosting + ItemList + FAQPage
**Internal links:** 3+ to other site pages

### Required Sections (in order)
1. Breadcrumbs
2. Affiliate disclosure (above fold)
3. H1 (contains primary keyword + current year)
4. Quick picks (`.quick-picks` — top 3 with featured #1)
5. Comparison table (`.comparison-table` — all products, sticky first col)
6. How we evaluate (methodology — no "tested" claims)
7. Individual product reviews (each with: h3, pros/cons, best-for badge, CTA button)
8. Buying guide section (`.buying-guide-section`)
9. FAQ section (`.faq-accordion` — minimum 4 questions)
10. Affiliate disclosure (bottom)

---

## 2. VS Comparison

**Min words:** 1,500
**Schema types:** BlogPosting + FAQPage
**Internal links:** 3+

### Required Sections (in order)
1. Breadcrumbs
2. Affiliate disclosure (above fold)
3. H1 (contains both product/category names + year)
4. Quick verdict box (winner + runner-up with CTA buttons)
5. Side-by-side comparison table (specs, features, price)
6. Feature-by-feature comparisons (minimum 3 sections, each with h3)
7. Who should buy which (buyer profiles)
8. FAQ section (`.faq-accordion` — minimum 3 questions)
9. Affiliate disclosure (bottom)

---

## 3. Single Review

**Min words:** 2,500
**Schema types:** BlogPosting + Product + Review + FAQPage
**Internal links:** 3+

### Required Sections (in order)
1. Breadcrumbs
2. Affiliate disclosure (above fold)
3. H1 (product name + "Review" + year)
4. Verdict card (rating, one-line verdict, CTA button)
5. Specs table (key specifications)
6. Pros/cons (`.pros-cons`)
7. Who should buy this
8. Performance deep-dive (minimum 3 subsections)
9. Alternatives section (2-3 alternatives with CTA buttons)
10. FAQ section (`.faq-accordion` — minimum 4 questions)
11. Affiliate disclosure (bottom)

---

## 4. How-To Guide

**Min words:** 1,200
**Schema types:** BlogPosting + HowTo + FAQPage
**Internal links:** 2+

### Required Sections (in order)
1. Breadcrumbs
2. Affiliate disclosure (above fold, if contains product links)
3. H1 ("How to..." + descriptive title)
4. Quick answer (TL;DR in 2-3 sentences)
5. What you'll need (supplies/tools list, with product links if relevant)
6. Numbered steps (each step: h3, explanation paragraph, tip/warning if applicable)
7. Common mistakes section
8. FAQ section (`.faq-accordion` — minimum 3 questions)
9. Affiliate disclosure (bottom, if contains product links)

---

## 5. Hub / Category Page

**Min words:** 500
**Schema types:** CollectionPage
**Internal links:** Links to all pages in category

### Required Sections (in order)
1. Breadcrumbs
2. H1 (category name)
3. Category introduction (2-3 paragraphs)
4. Subcategory card grids (`.card-grid` with links to money pages)
5. Supporting guides section (links to how-to and educational content)

---

## 6. Buying Guide

**Min words:** 1,800
**Schema types:** BlogPosting + FAQPage
**Internal links:** 3+

### Required Sections (in order)
1. Breadcrumbs
2. Affiliate disclosure (above fold)
3. H1 (contains "Guide" or "How to Choose" + year)
4. Quick answer (TL;DR summary)
5. Types comparison table (types/categories of products)
6. What matters most (key factors with explanations)
7. Budget tiers (budget/mid-range/premium with price ranges and recommendations)
8. Common mistakes to avoid
9. Our picks (links to specific product roundups with CTA buttons)
10. FAQ section (`.faq-accordion` — minimum 4 questions)
11. Affiliate disclosure (bottom)

---

## Universal Requirements (All Page Types)

- **Breadcrumbs:** Semantic `<nav class="breadcrumbs">` with `aria-label="Breadcrumb"`
- **Affiliate disclosure:** Above fold AND at bottom on any page with affiliate links
- **Internal links:** Minimum count per type (see above), contextual not forced
- **Meta title:** 30-60 characters
- **Meta description:** 120-160 characters
- **Canonical URL:** `https://coffeegearpicks.com/posts/{slug}.html`
- **OG tags:** `og:title`, `og:description`, `og:url`, `og:type`, `og:image` (if available)
- **Schema markup:** JSON-LD in `<script type="application/ld+json">` in `<head>`
- **H1:** Exactly one per page, contains primary keyword
- **Amazon links:** `rel="nofollow sponsored noopener"`, `target="_blank"`, format `/dp/{ASIN}`
- **Images:** `width`, `height`, `alt`, `loading="lazy"` attributes required
- **CSS:** Link to `styles-v2.css` only (not `styles.css`)
