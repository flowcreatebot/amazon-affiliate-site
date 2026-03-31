# Buying Guide — Template QA Checks

> Template-specific checks for `buying-guide`. Base checks (BC/BL/BS/BD) and pipeline checks (C/L/S/D/X/I) are applied separately.

---

## Buying Guide Checks (TB)

| ID | Critical | Check | How to Verify |
|----|----------|-------|---------------|
| TB01 | YES | Imports BuyingGuide.astro layout | Page file must contain `import` of `BuyingGuide.astro` from the layouts directory. No manual layout construction. |
| TB02 | YES | Required slots all present | Page must populate all required slots: `lead`, `types-comparison`, `key-factors`, `budget-tiers`, `common-mistakes`. Check each named slot is rendered inside the layout component. |
| TB03 | YES | Required props all present | Frontmatter/component props must include: `slug`, `title`, `description`, `category`, `datePublished`, `dateModified`, `tocItems`, `faqItems`. Each must have a non-empty value. |
| TB04 | YES | types-comparison slot has structured comparison | The `types-comparison` slot must present at least 2 product types/categories with distinguishing characteristics. |
| TB05 | YES | budget-tiers slot has distinct tiers | The `budget-tiers` slot must contain at least 2 budget levels (e.g., budget, mid-range, premium) with price context and expectations. |
| TB06 | YES | key-factors slot covers decision criteria | The `key-factors` slot must contain at least 3 distinct buying factors, each with an explanation. |
| TB07 | YES | common-mistakes slot has actionable items | The `common-mistakes` slot must contain at least 3 mistakes, each explaining what to avoid and why. |
| TB08 | NO | Word count in template range | Total body word count should be 1400-1800 words (10% grace above max). |
| TB09 | NO | Featured picks slot used if products mentioned | If the guide references specific products, the `featured-picks` optional slot should be used. |
