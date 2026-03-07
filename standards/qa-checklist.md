# Coffee Gear Lab QA Checklist

Machine-readable checklist. Each check has a unique ID. Checks marked **CRITICAL** cause instant rejection. Non-critical checks produce warnings.

Run every check against the HTML file at `posts/{slug}.html`.

---

## Content Checks

| ID | Critical | Check | How to Verify |
|----|----------|-------|---------------|
| C01 | YES | Word count meets page type minimum | Strip HTML tags, count words. Compare to `standards/page-types.md` minimum for the `page_type` in frontmatter. |
| C02 | YES | Heading hierarchy valid | No skipped levels (e.g., h1 → h3). Exactly one h1. |
| C03 | YES | No placeholder text | Grep for: `TODO`, `PLACEHOLDER`, `Lorem ipsum`, `[insert`, `TBD`, `XXX`, `FIXME` |
| C04 | YES | Required sections present | Match sections list from `standards/page-types.md` for the page type. All required sections must exist. |
| C05 | YES | Required sections in correct order | Sections must appear in the order specified in `standards/page-types.md`. |
| C06 | YES | Product data complete | Every product mention has: name, ASIN link, price (or "Check price"), best-for badge. |
| C07 | YES | Price timestamp present | Comparison tables must have a "Prices updated" date within 30 days. |
| C08 | YES | No "tested" or "hands-on" claims | Grep for: `we tested`, `hands-on`, `in our lab`, `our testing`, `we tried`. Must use: `researched`, `compared`, `analyzed`. |
| C09 | NO | Lead paragraph under 3 sentences | First `<p>` after h1 should be concise. |
| C10 | NO | FAQ has minimum questions | Check `page-types.md` for minimum FAQ count per type. |

## Link Checks

| ID | Critical | Check | How to Verify |
|----|----------|-------|---------------|
| L01 | YES | No Amazon search URLs | Grep for `amazon.com/s?k=` or `amazon.com/s\?k=`. Must be zero matches. |
| L02 | YES | Valid ASIN format | Every `/dp/` link ASIN must be exactly 10 alphanumeric characters: `/dp/[A-Z0-9]{10}` |
| L02b | YES | Affiliate tag present | Every Amazon `/dp/` link must include `?tag=coffee-site-20` or `&tag=coffee-site-20`. Grep for amazon.com links missing the tag. |
| L03 | YES | Correct rel attributes on affiliate links | All `amazon.com` links must have `rel="nofollow sponsored noopener"` |
| L04 | YES | Internal link count met | Count internal links (`href="/posts/` or `href="https://coffeegearpicks.com/`). Compare to minimum in `page-types.md`. |
| L05 | YES | No broken internal links | Every internal link target must exist as a file in `posts/`. |
| L06 | YES | No bare URLs in body text | Grep for `https://` or `http://` not inside `href="..."` or `src="..."`. URLs must be hyperlinked. |
| L07 | YES | Correct canonical domain | All internal links and canonical use `coffeegearpicks.com`, not `coffeegearlab.co`. |
| L08 | NO | Affiliate links open in new tab | All Amazon links should have `target="_blank"`. |

## SEO Checks

| ID | Critical | Check | How to Verify |
|----|----------|-------|---------------|
| S01 | YES | Title tag 30-60 characters | Extract `<title>` content, count characters. |
| S02 | YES | Meta description 120-160 characters | Extract `<meta name="description" content="...">`, count characters. |
| S03 | YES | Canonical URL present and correct | `<link rel="canonical" href="https://coffeegearpicks.com/posts/{slug}.html">` |
| S04 | YES | OG tags present | Must have: `og:title`, `og:description`, `og:url`, `og:type`. |
| S05 | YES | Schema JSON-LD present | `<script type="application/ld+json">` must exist and parse as valid JSON. |
| S06 | YES | Schema types match page type | Schema `@type` values must match those listed in `page-types.md` for this page type. |
| S07 | YES | H1 contains primary keyword | The `primary_keyword` from the queue file frontmatter must appear in the h1 text. |
| S08 | YES | H1 contains current year | h1 must contain `2026` (or current year). |
| S09 | NO | Meta description contains keyword | `primary_keyword` should appear in meta description. |
| S10 | NO | URL slug matches keyword | Slug should reflect the primary keyword (hyphens, lowercase). |

## Design Checks

| ID | Critical | Check | How to Verify |
|----|----------|-------|---------------|
| D01 | YES | Uses v2 CSS classes | Page links to `styles-v2.css`. Key components use design system classes (`.product-card`, `.cta-button`, `.comparison-table`, etc.) |
| D02 | YES | Tables wrapped in `.table-wrap` | Every `<table>` must be inside a `<div class="table-wrap">` or `<div class="comparison-table">`. |
| D03 | YES | Images have required attributes | Every `<img>` must have `width`, `height`, `alt`, `loading="lazy"`. |
| D04 | YES | CTA buttons use correct classes | Amazon CTAs: `.cta-button.--primary`. Internal CTAs: `.cta-button.--secondary`. |
| D05 | YES | Skip link present | `<a class="skip-link" href="#main">Skip to content</a>` as first body child. |
| D06 | YES | Semantic breadcrumbs | `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>...</ol></nav>` present. |
| D07 | NO | Star ratings have aria-label | `.star-rating` elements should have `aria-label` describing the rating. |
| D08 | NO | Responsive table structure | Tables should not exceed viewport on mobile (`.table-wrap` with `overflow-x: auto`). |

## Disclosure Checks

| ID | Critical | Check | How to Verify |
|----|----------|-------|---------------|
| X01 | YES | Affiliate disclosure above fold | `.affiliate-disclosure` element appears before the comparison table / first product. |
| X02 | YES | Affiliate disclosure at bottom | `.affiliate-disclosure` element appears after last content section, before footer. |
| X03 | YES | Honest disclosure language | Disclosure must NOT contain: `best deal`, `limited time`, `act now`, `exclusive`, `special offer`. |
| X04 | YES | No fake urgency | Grep for: `hurry`, `selling fast`, `only X left`, `limited stock`, `act now`. Must be zero. |

---

## Summary

**Total critical checks:** 35
**Total non-critical checks:** 7
**Total checks:** 42

### Pass/Fail Rules
- **PASS:** All 34 critical checks pass. Non-critical warnings are noted but don't block.
- **FAIL:** Any critical check fails. File moves to `queue/rejected/` with failed check IDs in `qa_rejection_reason`.

### QA Output Format
```
QA: {slug} | Result: {PASS|FAIL} | Checks: {passed}/{total} | Critical fails: {list of IDs}
```

### ASIN Spot-Check
In addition to automated checks, the QA agent must:
1. Pick 2 random ASINs from the page
2. Search each via Brave Search: `site:amazon.com {ASIN}`
3. Verify the ASIN corresponds to the correct product
4. If an ASIN is wrong/dead, add `L02` to critical failures
