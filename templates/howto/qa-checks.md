# How-To Guide (Affiliate) — Template QA Checks

> Template-specific checks for `howto`. Base checks (BC/BL/BS/BD) and pipeline checks (C/L/S/D/X/I) are applied separately.

---

## How-To Checks (TH)

| ID | Critical | Check | How to Verify |
|----|----------|-------|---------------|
| TH01 | YES | Imports HowToGuide.astro layout | Page file must contain `import` of `HowToGuide.astro` from the layouts directory. No manual layout construction. |
| TH02 | YES | Required slots all present | Page must populate all required slots: `lead`, `quick-answer`, `what-youll-need`, `steps`. Check each named slot is rendered inside the layout component. |
| TH03 | YES | Required props all present | Frontmatter/component props must include: `slug`, `title`, `description`, `category`, `datePublished`, `dateModified`, `heroSteps`, `tocItems`, `faqItems`, `schemaSteps`. Each must have a non-empty value. |
| TH04 | YES | heroSteps prop is valid object | `heroSteps` must be an object with `title` (string), `subtitle` (string), `steps` (array of objects with `label`, `icon`, `actions` (string[]), `time`), `outcome` (string), and optional `footer` (string). |
| TH05 | YES | schemaSteps prop matches step content | `schemaSteps` must be an array matching the steps in the `steps` slot. Each item must have `name` and `text` fields for HowTo schema generation. |
| TH06 | YES | steps slot has numbered steps | The `steps` slot must contain at least 3 sequentially numbered steps, each with a heading and body text. |
| TH07 | YES | what-youll-need slot has list | The `what-youll-need` slot must contain a list of materials, tools, or prerequisites. |
| TH08 | NO | Word count in template range | Total body word count should be 800-1200 words (10% grace above max). |
| TH09 | NO | Optional troubleshooting slot used | If the process has common failure modes, the `troubleshooting` slot should be populated. |
| TH10 | NO | heroSteps outcome prop present | `heroSteps` should include an `outcome` prop describing the end result. |
