# Hub / Category Page — Template QA Checks

> Template-specific checks for `hub-page`. Base checks (BC/BL/BS/BD) and pipeline checks (C/L/S/D/X/I) are applied separately.

---

## Hub Page Checks (TU)

| ID | Critical | Check | How to Verify |
|----|----------|-------|---------------|
| TU01 | YES | Imports HubPage.astro layout | Page file must contain `import` of `HubPage.astro` from the layouts directory. No manual layout construction. |
| TU02 | YES | Required slots all present | Page must populate the required slot: `intro`. Check the named slot is rendered inside the layout component. |
| TU03 | YES | Required props all present | Frontmatter/component props must include: `title`, `description`, `category`. Each must have a non-empty value. |
| TU04 | YES | No slug, date, or toc props used | Hub pages must NOT include `slug`, `datePublished`, `dateModified`, or `tocItems` props (these are not required for hub pages and indicate wrong template usage). |
| TU05 | YES | Intro slot is concise | The `intro` slot must contain category-level introductory content. It should be 1-3 paragraphs, not a full article. |
| TU06 | YES | No product-level content | Hub pages must not contain individual product reviews, comparison tables, or product-specific affiliate links. They link to child pages only. |
| TU07 | NO | Word count in template range | Total body word count should be 300-500 words (10% grace above max). |
| TU08 | NO | Category links present | The page should link to at least 2 child pages within the category. |
