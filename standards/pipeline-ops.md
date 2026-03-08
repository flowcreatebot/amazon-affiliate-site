# Pipeline Operations Reference

Project-specific pipeline operations for Coffee Gear Lab. For the generic queue mechanism (structure, movement rules, log format, priority, backpressure), see `standards/queue-ops.md` at workspace root. This file defines the project-specific stages, frontmatter fields, and station responsibilities.

---

## Queue File Format

Every page in the pipeline is tracked by a Markdown file with YAML frontmatter. The filename is always `{slug}.md` and stays the same as it moves between directories.

### Frontmatter Schema

```yaml
---
slug: best-pour-over-kettle-2026        # URL slug, matches filename
page_type: money                         # money | vs | review | howto | hub | buying-guide
primary_keyword: "best pour over kettle" # Target keyword for SEO
secondary_keywords: ["gooseneck kettle"] # Supporting keywords (array)
status: brief                            # brief → draft → qa-passed → design-passed → published | rejected
created_by: strategist                   # Station that created the file
created_at: "2026-03-07T09:15:00+07:00"  # ISO 8601 with timezone
writer_completed_at: null                # Set by Writer when done
qa_result: null                          # pass | fail (set by QA)
qa_rejection_reason: null                # "FAIL:L01,S04" (set by QA on rejection)
designer_completed_at: null              # Set by Designer when done
deployed_url: null                       # Set by Deployer: https://coffeegearpicks.com/posts/{slug}.html
asins_verified: []                       # List of ASINs the Writer verified
word_count: null                         # Actual word count set by Writer
source: null                             # "backfill" or "new" — distinguishes refresh from net-new
priority_rank: null                      # 1 = highest priority, used for ordering backfill briefs
---
```

### Field Update Rules

| Station | Fields to Update |
|---------|-----------------|
| Strategist | `slug`, `page_type`, `primary_keyword`, `secondary_keywords`, `status: brief`, `created_by: strategist`, `created_at` |
| Writer | `status: draft`, `writer_completed_at`, `asins_verified`, `word_count`. On rework: clear `qa_result` and `qa_rejection_reason` |
| QA (pass) | `status: qa-passed`, `qa_result: pass` |
| QA (fail) | `status: rejected`, `qa_result: fail`, `qa_rejection_reason: "FAIL:{check IDs}"` |
| Designer | `status: design-passed`, `designer_completed_at` |
| Deployer | `status: published`, `deployed_url` |

---

## Queue Directories

All under `queue/` relative to the project root:

| Directory | Contains | Who writes | Who reads |
|-----------|----------|-----------|-----------|
| `briefs/` | New content briefs | Strategist | Writer |
| `drafts/` | Written pages pending QA | Writer | QA |
| `qa-passed/` | QA-approved pages | QA | Designer |
| `design-passed/` | Design-polished pages | Designer | Deployer |
| `published/` | Archive of deployed pages | Deployer | PM (audit) |
| `rejected/` | QA failures pending rework | QA | Writer (priority!) |
| `backfill/` | Pre-generated refresh briefs for legacy pages | Manual (one-time batch) | Backfill feeder cron job |

### Movement Rules

- Use `mv` to move files between directories (not copy)
- Always update the `status` field in frontmatter BEFORE moving
- Always append to `pipeline.log` AFTER moving
- The Astro source file stays at `src/pages/posts/{slug}.astro` — only the queue tracking file moves

### Priority Rules

- **Writer:** Check `rejected/` FIRST. If files exist, pick the oldest and fix it. Only check `briefs/` if rejected is empty.
- **All stations:** Pick the OLDEST file when multiple are available (by `created_at` or file modification time).
- **Strategist guardrail:** If `briefs/` has 5+ files, reply `NO_REPLY` (pipeline is backed up).
- **Empty queue:** If a station's input queue is empty, reply `NO_REPLY`.

---

## Pipeline Log

**File:** `queue/pipeline.log` (append-only, never truncate)

### Format

```
{ISO timestamp} | {station} | {action} | {slug} | {details}
```

### Actions by Station

| Station | Action | Details Format |
|---------|--------|---------------|
| Strategist | `CREATED` | `briefs/` |
| Writer | `MOVED` | `briefs/ → drafts/ \| words:{n} asins:{n}` |
| Writer | `MOVED` | `rejected/ → drafts/ \| rework:fixed-{n}-issues` |
| QA | `MOVED` | `drafts/ → qa-passed/ \| PASS:{passed}/{total}` |
| QA | `MOVED` | `drafts/ → rejected/ \| FAIL:{check IDs}` |
| Designer | `MOVED` | `qa-passed/ → design-passed/ \| changes:{brief list}` |
| Designer | `MIGRATED` | `legacy→v2` (for existing page migrations) |
| Feeder | `PROMOTED` | `backfill/ → briefs/` |
| Deployer | `MOVED` | `design-passed/ → published/ \| deployed` |

### Example Log

```
2026-03-07T09:35:00+07:00 | strategist | CREATED | best-pour-over-kettle-2026 | briefs/
2026-03-07T11:17:00+07:00 | writer     | MOVED   | best-pour-over-kettle-2026 | briefs/ → drafts/ | words:2340 asins:5
2026-03-07T12:18:00+07:00 | qa         | MOVED   | best-pour-over-kettle-2026 | drafts/ → rejected/ | FAIL:L01,S04
2026-03-07T13:17:00+07:00 | writer     | MOVED   | best-pour-over-kettle-2026 | rejected/ → drafts/ | rework:fixed-2-issues
2026-03-07T14:18:00+07:00 | qa         | MOVED   | best-pour-over-kettle-2026 | drafts/ → qa-passed/ | PASS:34/34
2026-03-07T15:45:00+07:00 | designer   | MOVED   | best-pour-over-kettle-2026 | qa-passed/ → design-passed/ | changes:added-schema,fixed-badge-classes
2026-03-07T15:50:00+07:00 | deployer   | MOVED   | best-pour-over-kettle-2026 | design-passed/ → published/ | deployed
```

---

## Station Quick Reference

### Strategist
- **Input:** PLAN.md (current phase), standards/page-types.md
- **Output:** Queue file in `briefs/` with frontmatter + section outline + product suggestions
- **Guardrail:** Max 3 briefs in queue. Align to current phase.

### Writer
- **Input:** Queue file from `rejected/` (priority) or `briefs/`, standards/design-system.md, standards/page-types.md
- **Output:** Astro page at `src/pages/posts/{slug}.astro` using `PostLayout` and components from `src/components/`, updated queue file moved to `drafts/`
- **Key rules:**
  - Import components explicitly in frontmatter (`import ProductCard from '../../components/ProductCard.astro'`)
  - Use `PostLayout` with `breadcrumbs`, `title`, `description`, `canonical` props
  - Use `<JsonLd>` in `<Fragment slot="head">` for schema markup
  - Use `<CtaButton external>` for Amazon links, `<ProsCons>` for pros/cons, `<FaqAccordion>`/`<FaqItem>` for FAQs
  - Import shared constants from `../../data/site` (`SITE`, `blogPosting`, `publisher`)
  - See standards/page-types.md for template examples per page type
- **Guardrails:** Verify ASINs via Brave Search. No fabricated data. No sync/deploy.

### QA
- **Input:** Queue file from `drafts/`, standards/qa-checklist.md
- **Output:** Queue file moved to `qa-passed/` or `rejected/`
- **Key checks for Astro pages:**
  - Page uses `PostLayout` (or `BaseLayout` for hubs) — not raw HTML
  - All components imported and used correctly (no raw CSS class markup where a component exists)
  - `<JsonLd>` present in `<Fragment slot="head">`
  - `data-label` on all `<td>` elements in comparison tables
  - Amazon links use `<CtaButton external>` or have `rel="nofollow sponsored noopener" target="_blank"`
- **Guardrails:** Don't fix issues — reject only. Spot-check 2 ASINs via Brave Search.

### Designer
- **Input:** Queue file from `qa-passed/`, standards/design-system.md, src/styles/global.css
- **Output:** Polished Astro page, queue file moved to `design-passed/`
- **Key responsibilities:**
  - Review component prop usage (correct badge variants, rating scores, image dimensions)
  - Verify visual consistency with the design system
  - Ensure proper component composition (not mixing raw HTML classes with Astro components)
- **Guardrails:** Don't change content/copy. Don't add new CSS classes. Don't sync/deploy.

### Deployer
- **Input:** ALL files from `design-passed/`, BRIEF.md
- **Output:** Updated sitemap/index, queue files moved to `published/`
- **Actions:** Run `npm run build` to generate static HTML in `dist/`, then run `sync-to-deploy.sh` to sync `dist/` to the live server, update BRIEF.md (published pages list)
- **Guardrail:** Only deploy pipeline-completed pages. Verify build exit code before sync.

---

## Rejection Handling

When QA rejects a page:

1. QA sets `qa_rejection_reason: "FAIL:L01,S04,C08"` (comma-separated check IDs)
2. QA moves the queue file to `rejected/`
3. Writer picks up from `rejected/` on next cycle
4. Writer reads the failed check IDs and fixes ONLY those specific issues
5. Writer clears `qa_result` and `qa_rejection_reason`, sets new `writer_completed_at`
6. Writer moves queue file back to `drafts/`
7. QA re-evaluates on next cycle

If the same slug is rejected 2+ times, the PM daily audit flags it as a rejection loop.
