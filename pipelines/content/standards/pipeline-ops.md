# Pipeline Operations Reference

> **🚫 STRUCTURAL CHANGE LOCK:** No agent may add, remove, or modify pipeline scripts, gates, guardrails, stage definitions, routing rules, or standards without explicit approval from Dan via Telegram. If an audit identifies a structural improvement, message Dan with the problem and proposed fix, then WAIT. See AGENTS.md for full policy.

Project-specific pipeline operations for Coffee Gear Lab. For the generic queue mechanism (structure, movement rules, log format, priority, backpressure), see `standards/queue-ops.md` at workspace root. This file defines the project-specific stages, frontmatter fields, and station responsibilities.

---

## How the Pipeline Works

The pipeline is a production line that turns content briefs into published web pages. Each page is tracked by a single `.md` file (the "queue file") that moves through stage directories as different agents do their work.

### The flow

```
backfill → briefs → drafts → images → design → qa → published
                                                 ↓
                                             rejected → (back to drafts/images/design)
                                             rework   → (back to drafts/images/design)
```

### Key concepts

- **Queue file** — A Markdown file with YAML frontmatter. The filename is `{slug}.md` and never changes. It moves between `pipelines/content/queue/` subdirectories as it progresses. The frontmatter tracks status, timestamps, and metadata. The actual web page lives separately at `src/pages/posts/{slug}.astro`.

- **Stage** — A directory under `pipelines/content/queue/` (e.g. `pipelines/content/queue/drafts/`). Each stage has one agent that writes TO it (the operator) and one that reads FROM it (the next station). An item's physical location in a stage directory IS its status.

- **Station/Agent** — An AI agent on a cron schedule that processes items at a specific stage. Each agent picks up one item per run, does its work, updates the frontmatter, moves the file to the next stage, and logs the move.

- **Rejection** — QA fails an item and routes it to `rejected/` with `rejection_stages` specifying which agents need to fix it (e.g. `[drafts, images]`). Agents process their stage in pipeline order, removing themselves from the array. When the array is empty, the item re-enters the normal flow.

- **Rework** — A human (via the Central Command dashboard) sends a published or in-progress item back for fixes. Works identically to rejection but is triggered manually and uses `rework_stages` instead of `rejection_stages`. Items go to `rework/` and agents pick them up as highest priority.

- **Pipeline log** — Append-only file at `pipelines/content/pipeline.log`. Every move, creation, and rejection is logged. This is the source of truth for activity history and metrics (throughput, cycle time, dwell time). Central Command reads this file to power the dashboard.

- **Backfill** — Pre-generated briefs for legacy pages that need rewriting. The feeder agent promotes them to `briefs/` on a schedule (2 at a time, lowest priority_rank first), gated by a "briefs >= 3 → stop" guardrail.

- **Priority order** — Every agent checks rework first, then rejected, then their normal input queue. Within each, oldest item first.

### Who does what

| Agent | Reads from | Writes to | What they do |
|-------|-----------|-----------|--------------|
| Feeder | `backfill/` | `briefs/` | Promotes backfill briefs when pipeline has capacity |
| Strategist | PLAN.md | `briefs/` | Creates new content briefs |
| Writer | `briefs/` | `drafts/` | Writes the Astro page from the brief |
| Image Agent | `drafts/` | `images/` | Creates SVG graphics, removes IMAGE_PLACEHOLDERs |
| Designer | `images/` | `design/` | Polishes component usage and design system compliance |
| QA | `design/` | `qa/` or `rejected/` | Validates against checklist, passes or rejects |
| Deployer | `qa/` | `published/` | Builds, syncs to deploy repo, deploys to Render |

### Central Command integration

Central Command (the monitoring dashboard at `~/central-command/`) reads from this pipeline's filesystem to visualise it:
- Stage directories → node counts on the production line diagram
- `pipelines/content/pipeline.json` → visual layout (node positions, connections)
- `pipelines/content/pipeline.log` → activity feed, throughput metrics, dwell times, bottleneck detection
- `cron/jobs.json` → agent schedules and health shown in stage modals

See `~/central-command/README.md` for how the dashboard computes metrics and determines health colours.

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
status: brief                            # brief → draft → images → design → qa → published | rejected | rework
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
refresh_override: false                  # true required when slug already exists in queue/published
priority_rank: null                      # 1 = highest priority, used for ordering backfill briefs
image_agent_completed_at: null           # Set by Image Agent when done
images_created: []                       # List of SVG filenames created by Image Agent
rework_target: null                      # (legacy) Single stage to re-enter — use rework_stages instead
rework_stages: null                      # Inline array of stages needing rework, e.g. [drafts, images]
rework_reason: null                      # Why the rework is needed
rework_initiated_by: null                # Who initiated the rework (e.g. "dan", "pm")
rework_initiated_at: null                # ISO 8601 timestamp of rework initiation
rejection_stages: null                   # Inline array of stages needing work after QA rejection, e.g. [drafts, images]
---
```

### Field Update Rules

| Station | Fields to Update |
|---------|-----------------|
| Strategist | `slug`, `page_type`, `primary_keyword`, `secondary_keywords`, `status: brief`, `created_by: strategist`, `created_at`, `refresh_override` |
| Writer | `status: draft`, `writer_completed_at`, `asins_verified`, `word_count`. On rework: clear `qa_result` and `qa_rejection_reason` |
| Image Agent | `status: images`, `image_agent_completed_at`, `images_created`. On rework: clear `rework_stages`/`rejection_stages` (if empty), `rework_reason`, `rework_initiated_by`, `rework_initiated_at` |
| Designer | `status: design`, `designer_completed_at` |
| QA (pass) | `status: qa`, `qa_result: pass` |
| QA (fail) | `status: rejected`, `qa_result: fail`, `qa_rejection_reason: "FAIL:{check IDs}"`, `rejection_stages: [{mapped stages}]` |
| Deployer | `status: published`, `deployed_url` |

---

## Queue Directories

All under `pipelines/content/queue/` relative to the project root:

| Directory | Contains | Who writes | Who reads |
|-----------|----------|-----------|-----------|
| `briefs/` | New content briefs | Strategist | Writer |
| `drafts/` | Written pages pending images | Writer | Image Agent |
| `images/` | Image-completed pages | Image Agent | Designer |
| `design/` | Design-polished pages pending QA | Designer | QA |
| `qa/` | QA-approved pages ready to deploy | QA | Deployer |
| `published/` | Archive of deployed pages | Deployer | PM (audit) |
| `rejected/` | QA failures routed to responsible agents | QA | Writer, Image Agent, Designer (by `rejection_stages`) |
| `backfill/` | Pre-generated refresh briefs for legacy pages | Manual (one-time batch) | Backfill feeder cron job |
| `rework/` | Post-publish fixes routed to specific stages | Dashboard/PM | Target agents (based on `rework_stages` array) |

### Movement Rules

- Use `mv` to move files between directories (not copy)
- Always update the `status` field in frontmatter BEFORE moving
- Always append to `pipeline.log` AFTER moving
- The Astro source file stays at `src/pages/posts/{slug}.astro` — only the queue tracking file moves

### Priority Rules

- **Writer:** 1) `rework/` items with "drafts" in `rework_stages`, 2) `rejected/` items with "drafts" in `rejection_stages`, 3) `briefs/`.
- **Image Agent:** 1) `rework/` items with "images" in `rework_stages`, 2) `rejected/` items with "images" in `rejection_stages`, 3) `drafts/`.
- **Designer:** 1) `rework/` items with "design" in `rework_stages`, 2) `rejected/` items with "design" in `rejection_stages`, 3) `images/`.
- **All stations:** Pick the OLDEST file when multiple are available (by `created_at` or file modification time).
- **Strategist guardrail:** If `briefs/` has 5+ files, reply `NO_REPLY` (pipeline is backed up).
- **Duplicate-slug guardrail:** If a candidate slug already exists in `queue/published/`, strategist/feeder must run `python3 scripts/validate-refresh-override.py queue/{stage}/{slug}.md`; only proceed when `refresh_override: true` is set in frontmatter.
- **Empty queue:** If a station's input queue is empty, reply `NO_REPLY`.

---

## Pipeline Log

**File:** `pipelines/content/pipeline.log` (append-only, never truncate)

### Format

```
{ISO timestamp} | {station} | {action} | {slug} | {details}
```

### Actions by Station

| Station | Action | Details Format |
|---------|--------|---------------|
| Strategist | `REFRESH_GUARD_PASS` | `published-duplicate-allowed or new-or-unpublished` |
| Strategist | `CREATED` | `briefs/` |
| Writer | `PREQA_PASS` | `checks:C01,C04,C05,C06,C07,C08,S07,L01,L02b,D03` |
| Writer | `MOVED` | `briefs/ → drafts/ \| source:brief` |
| Writer | `MOVED` | `rejected/ → drafts/ \| source:rework` |
| Writer | `PARTIAL_REWORK` | `drafts done, remaining: images` |
| Image Agent | `PARTIAL_REWORK` | `images done, remaining: design` |
| Designer | `PARTIAL_REWORK` | `design done, remaining: drafts` |
| Dashboard | `MOVED` | `{source}/ → rework/ \| rework_stages:{stage1},{stage2}` |
| Image Agent | `MOVED` | `drafts/ → images/ \| created:{count} images` |
| Image Agent | `REWORK_PICKUP` | `rework/ → images/ \| reason:{brief}` |
| Designer | `MOVED` | `images/ → design/ \| changes:{brief list}` |
| QA | `MOVED` | `design/ → qa/ \| PASS:{passed}/{total}` |
| QA | `MOVED` | `design/ → rejected/ \| FAIL:{check IDs}` |
| Designer | `MIGRATED` | `legacy→v2` (for existing page migrations) |
| Feeder | `REFRESH_GUARD_PASS` | `published-duplicate-allowed or new-or-unpublished` |
| Feeder | `PROMOTED` | `backfill/ → briefs/` |
| Deployer | `MOVED` | `qa/ → published/ \| deployed` |

> **Note:** Log entries before 2026-03-10 reference legacy directories `qa-passed/` and `design-passed/`. These no longer exist. Current flow: `design/ → qa/ → published/`.

### Example Log

```
2026-03-07T09:35:00+07:00 | strategist    | CREATED    | best-pour-over-kettle-2026 | briefs/
2026-03-07T11:16:48+07:00 | writer        | PREQA_PASS | best-pour-over-kettle-2026 | checks:C01,C04,C05,C06,C07,C08,S07,L01,L02b,D03
2026-03-07T11:17:00+07:00 | writer        | MOVED      | best-pour-over-kettle-2026 | briefs/ → drafts/ | source:brief
2026-03-07T12:30:00+07:00 | image-agent   | MOVED      | best-pour-over-kettle-2026 | drafts/ → images/ | created:2 images
2026-03-07T14:45:00+07:00 | designer      | MOVED      | best-pour-over-kettle-2026 | images/ → design/ | changes:added-schema,fixed-badge-classes
2026-03-07T16:18:00+07:00 | qa            | MOVED      | best-pour-over-kettle-2026 | design/ → rejected/ | FAIL:L01,S04
2026-03-07T17:16:52+07:00 | writer        | PREQA_PASS | best-pour-over-kettle-2026 | checks:C01,C04,C05,C06,C07,C08,S07,L01,L02b,D03
2026-03-07T17:17:00+07:00 | writer        | MOVED      | best-pour-over-kettle-2026 | rejected/ → drafts/ | source:rework
2026-03-07T18:30:00+07:00 | image-agent   | MOVED      | best-pour-over-kettle-2026 | drafts/ → images/ | created:2 images
2026-03-07T20:45:00+07:00 | designer      | MOVED      | best-pour-over-kettle-2026 | images/ → design/ | changes:fixed-badge-classes
2026-03-07T22:18:00+07:00 | qa            | MOVED      | best-pour-over-kettle-2026 | design/ → qa/ | PASS:34/34
2026-03-07T22:50:00+07:00 | deployer      | MOVED      | best-pour-over-kettle-2026 | qa/ → published/ | deployed
```

---

## Station Quick Reference

### Strategist
- **Input:** PLAN.md (current phase), standards/page-types.md
- **Output:** Queue file in `briefs/` with frontmatter + section outline + product suggestions
- **Guardrail:** Max 3 briefs in queue. Align to current phase.

### Writer
- **Input:** Queue file from `rework/` (where "drafts" in `rework_stages`) or `rejected/` (where "drafts" in `rejection_stages`) or `briefs/`, standards/design-system.md, standards/page-types.md
- **Output:** Astro page at `src/pages/posts/{slug}.astro` using `PostLayout` and components from `src/components/`, updated queue file moved to `drafts/`
- **Key rules:**
  - Import components explicitly in frontmatter (`import ProductCard from '../../components/ProductCard.astro'`)
  - Use `PostLayout` with `breadcrumbs`, `title`, `description`, `canonical` props
  - Use `<JsonLd>` in `<Fragment slot="head">` for schema markup
  - Use `<CtaButton external>` for Amazon links, `<ProsCons>` for pros/cons, `<FaqAccordion>`/`<FaqItem>` for FAQs
  - Import shared constants from `../../data/site` (`SITE`, `blogPosting`, `publisher`)
  - See standards/page-types.md for template examples per page type
- **Guardrails:** Verify ASINs via Brave Search. No fabricated data. No sync/deploy.
- **Pre-QA gate (enforced):** Use `bash scripts/writer-draft-handoff.sh queue/{stage}/{slug}.md {brief|rework}` for every handoff to `drafts/`. The script blocks on PREQA failure and logs `PREQA_PASS` evidence before `MOVED`.

### QA
- **Input:** Queue file from `design/`, standards/qa-checklist.md
- **Output:** Queue file moved to `qa/` or `rejected/`
- **Key checks for Astro pages:**
  - Page uses `PostLayout` (or `BaseLayout` for hubs) — not raw HTML
  - All components imported and used correctly (no raw CSS class markup where a component exists)
  - `<JsonLd>` present in `<Fragment slot="head">`
  - `data-label` on all `<td>` elements in comparison tables
  - Amazon links use `<CtaButton external>` or have `rel="nofollow sponsored noopener" target="_blank"`
- **Guardrails:** Don't fix issues — reject only. Spot-check 2 ASINs via Brave Search.

### Image Agent
- **Input:** Queue file from `rework/` (where "images" in `rework_stages`) or `rejected/` (where "images" in `rejection_stages`) or `drafts/`, standards/image-spec.md, standards/design-system.md
- **Output:** Compliant SVG files at `public/assets/images/`, updated queue file moved to `images/`
- **Key responsibilities:**
  - Find `IMAGE_PLACEHOLDER` comments in Astro source and create SVG files
  - Validate existing SVGs against image-spec.md; recreate if non-compliant
  - For rework items: read existing SVG, understand intent, recreate with compliant colors/fonts
  - Remove placeholder comments from Astro source after creating images
- **Guardrails:** Never change content/copy. Never deploy. All SVGs must use design system colors and Inter font.

### Designer
- **Input:** Queue file from `rework/` (where "design" in `rework_stages`) or `rejected/` (where "design" in `rejection_stages`) or `images/`, standards/design-system.md, src/styles/global.css
- **Output:** Polished Astro page, queue file moved to `design/`
- **Key responsibilities:**
  - Review component prop usage (correct badge variants, rating scores, image dimensions)
  - Verify visual consistency with the design system
  - Ensure proper component composition (not mixing raw HTML classes with Astro components)
- **Guardrails:** Don't change content/copy. Don't add new CSS classes. Don't sync/deploy.

### Deployer
- **Input:** ALL files from `qa/`, BRIEF.md
- **Output:** Updated sitemap/index, queue files moved to `published/`
- **Actions:** Run `npm run build` to generate static HTML in `dist/`, then run `sync-to-deploy.sh` to sync `dist/` to the live server, update BRIEF.md (published pages list)
- **Guardrail:** Only deploy pipeline-completed pages. Verify build exit code before sync.

---

## Rejection Handling

When QA rejects a page:

1. QA sets `qa_rejection_reason: "FAIL:L01,S04,C08"` (comma-separated check IDs)
2. QA sets `rejection_stages` as an inline YAML array, mapping error codes to responsible stages:
   - C-series, S-series (except S06), L-series, X-series, D-series, I01-I03, I05-I06 → `drafts` (Writer)
   - I04 (SVG compliance) → `images` (Image Agent)
   - S06 (schema types) → `design` (Designer)
   - Example: `FAIL:C01,I04` → `rejection_stages: [drafts, images]`
3. QA moves the queue file to `rejected/`
### Stage Processing Order (Ordering Guard)

When multiple stages need work, they MUST be processed in pipeline order:

| Stage  | Order |
|--------|-------|
| drafts | 1     |
| images | 2     |
| design | 3     |

**Guard rule:** An agent MUST NOT process a rejected/ item if any stage with a LOWER order number than their own still appears in the `rejection_stages` array. Skip the item silently — the earlier agent will handle it first.

Example: `rejection_stages: [drafts, images]`
- Writer (order 1): no lower stages → PROCEED
- Image Agent (order 2): "drafts" (order 1) still present → SKIP

4. Each agent checks `rejected/` for items listing **their** stage in `rejection_stages`
5. Agent fixes ONLY the issues relevant to their stage
6. Agent removes their stage from `rejection_stages`
7. If stages remain → item stays in `rejected/` for the next agent (log `PARTIAL_REWORK`)
8. If array is now empty → agent clears `rejection_stages`, `qa_result`, `qa_rejection_reason`, moves to the next normal pipeline stage after their own
9. Normal pipeline flow resumes from there

**Next stage after processing:** Writer → `images/` (via drafts), Image Agent → `design/`, Designer → `qa/`

**Legacy:** Items without `rejection_stages` must have it set by the PM before processing. Agents encountering such items must skip them.

If the same slug is rejected 2+ times, the PM daily audit flags it as a rejection loop.

---

## Rework Handling

Rework is for post-publish fixes routed to specific pipeline stages. It is separate from rejection (QA-initiated), though both use the same multi-stage routing pattern.

### How It Works

1. Dashboard moves queue file from `published/` (or any stage) to `rework/`.
2. Frontmatter is set automatically:
   ```yaml
   status: rework
   rework_stages: [drafts, images]    # Inline array of stages needing work
   rework_reason: "Content has stale ASINs and hero SVG uses dark background"
   rework_initiated_by: dashboard
   rework_initiated_at: "2026-03-10T10:00:00+07:00"
   ```
### Stage Processing Order (Ordering Guard)

When multiple stages need work, they MUST be processed in pipeline order:

| Stage  | Order |
|--------|-------|
| drafts | 1     |
| images | 2     |
| design | 3     |

**Guard rule:** An agent MUST NOT process a rework/ item if any stage with a LOWER order number than their own still appears in the `rework_stages` array. Skip the item silently — the earlier agent will handle it first.

Example: `rework_stages: [drafts, images]`
- Writer (order 1): no lower stages → PROCEED
- Image Agent (order 2): "drafts" (order 1) still present → SKIP

3. Each agent checks `rework/` as HIGHEST priority for items listing **their** stage in `rework_stages`:
   - Writer: "drafts" in `rework_stages`
   - Image Agent: "images" in `rework_stages`
   - Designer: "design" in `rework_stages`
4. Agent processes their part, then removes their stage from `rework_stages`.
5. If stages remain → item stays in `rework/` for the next agent (log `PARTIAL_REWORK`).
6. If array is now empty → agent clears all `rework_*` fields, moves to the next normal pipeline stage after their own.
7. Normal pipeline flow resumes from there.

**Next stage after processing:** Writer → `images/` (via drafts), Image Agent → `design/`, Designer → `qa/`

**Legacy:** Items with `rework_target` (single string, no `rework_stages`) are treated as `rework_stages: [<rework_target>]`.

### Pipeline Log for Rework

```
{timestamp} | dashboard | MOVED | {slug} | {source}/ → rework/ | rework_stages:{stage1},{stage2}
{timestamp} | {role} | PARTIAL_REWORK | {slug} | {my stage} done, remaining: {other stages}
{timestamp} | {role} | REWORK_PICKUP | {slug} | rework/ → {stage}/ | reason:{brief}
```

### Key Benefit

An item needing both content and image fixes gets routed to Writer AND Image Agent sequentially, without re-running unrelated stages like QA or Design.
