# Single Review — Template QA Checks

> Template-specific checks for `single-review`. Base checks (BC/BL/BS/BD) and pipeline checks (C/L/S/D/X/I) are applied separately.

---

## Single Review Checks (TR)

| ID | Critical | Check | How to Verify |
|----|----------|-------|---------------|
| TR01 | YES | Imports SingleReview.astro layout | Page file must contain `import` of `SingleReview.astro` from the layouts directory. No manual layout construction. |
| TR02 | YES | Required slots all present | Page must populate all required slots: `lead`, `verdict-detail`, `specs-table`, `performance`. Check each named slot is rendered inside the layout component. |
| TR03 | YES | Required props all present | Frontmatter/component props must include: `slug`, `title`, `description`, `category`, `datePublished`, `dateModified`, `product`, `tocItems`, `verdict`, `pros`, `cons`, `faqItems`. Each must have a non-empty value. |
| TR04 | YES | product prop is valid object | `product` must be an object with at least `name` and `asin` fields. |
| TR05 | YES | verdict prop is valid object | `verdict` must be an object with `score` (number), `summary` (string), and `bestFor` (string). |
| TR06 | YES | pros and cons are non-empty arrays | `pros` must have at least 3 items. `cons` must have at least 2 items. Each item must be a non-empty string. |
| TR07 | YES | specs-table slot has table element | The `specs-table` slot must contain a `<table>` with at least 5 spec rows. |
| TR08 | NO | Word count in template range | Total body word count should be 1800-2200 words (10% grace above max). |
| TR09 | NO | Alternatives slot populated | If the page discusses alternatives, the `alternatives` slot should be used rather than ad-hoc mentions in the body. |
