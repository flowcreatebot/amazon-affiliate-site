# VS Comparison — Template QA Checks

> Template-specific checks for `vs-comparison`. Base checks (BC/BL/BS/BD) and pipeline checks (C/L/S/D/X/I) are applied separately.

---

## VS Comparison Checks (TV)

| ID | Critical | Check | How to Verify |
|----|----------|-------|---------------|
| TV01 | YES | Imports VsComparison.astro layout | Page file must contain `import` of `VsComparison.astro` from the layouts directory. No manual layout construction. |
| TV02 | YES | Required slots all present | Page must populate all required slots: `lead`, `quick-verdict`, `comparison-table`, `feature-comparisons`, `buyer-profiles`. Check each named slot is rendered inside the layout component. |
| TV03 | YES | Required props all present | Frontmatter/component props must include: `slug`, `title`, `description`, `category`, `datePublished`, `dateModified`, `heroVersus`, `tocItems`, `faqItems`. Each must have a non-empty value. |
| TV04 | YES | heroVersus prop has both sides | `heroVersus` must have `left` and `right` objects, each with `name`, `icon`, `color`, `bestFor`. |
| TV05 | YES | heroVersus has stats array | `heroVersus.stats` must be an array of 3-7 items comparing both sides. |
| TV06 | YES | heroVersus has verdict | `heroVersus.verdict` must be a non-empty string. |
| TV07 | YES | Buyer profiles section has distinct profiles | The `buyer-profiles` slot must contain at least 2 distinct buyer persona sections, each with a recommendation. |
| TV08 | NO | Word count in template range | Total body word count should be 1200-1600 words (10% grace above max). |
| TV09 | NO | Optional slots used where appropriate | If page recommends supporting accessories, the `supporting-gear` slot should be used rather than inline HTML. |
