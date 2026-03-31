# Money Page (Roundup) — Template QA Checks

> Template-specific checks for `money-page`. Base checks (BC/BL/BS/BD) and pipeline checks (C/L/S/D/X/I) are applied separately.

---

## Money Page Checks (TM)

| ID | Critical | Check | How to Verify |
|----|----------|-------|---------------|
| TM01 | YES | Imports MoneyPage.astro layout | Page file must contain `import` of `MoneyPage.astro` from the layouts directory. No manual layout construction. |
| TM02 | YES | Required slots all present | Page must populate all required slots: `lead`, `quick-answer`, `methodology`, `product-reviews`, `buying-guide`. Check each named slot is rendered inside the layout component. |
| TM03 | YES | Required props all present | Frontmatter/component props must include: `slug`, `title`, `description`, `category`, `datePublished`, `dateModified`, `heroPicks`, `tocItems`, `products`, `faqItems`. Each must have a non-empty value. |
| TM04 | YES | heroPicks prop is valid object | `heroPicks` must be an object with `title` (string), `subtitle` (string), `picks` (array of 3-4 HeroPick objects), and optional `footer` (string). Each pick must have: `category`, `tagline`, `icon`, `color`, `features` (string[]), `topPick`, `price`, `subtitle`, `asin`. |
| TM05 | YES | products prop is valid array | `products` must be an array with at least 3 items. Each item must have `name` and `asin` at minimum. |
| TM06 | YES | tocItems prop has entries | `tocItems` must be an array with at least 4 entries reflecting the major sections. |
| TM07 | YES | faqItems prop has entries | `faqItems` must be an array with at least 4 question/answer pairs. |
| TM08 | NO | Word count in template range | Total body word count should be 1800-2500 words (10% grace above max). |
| TM09 | NO | Optional slots used where appropriate | If page has a comparison table or related guides, the `comparison-table` or `related-guides` slots should be used rather than inline HTML. |
