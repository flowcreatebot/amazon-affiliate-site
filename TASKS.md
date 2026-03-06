# Amazon Affiliate TASKS

Current phase: Foundation -> First indexed traffic

In progress (overseer-prioritized)
- [ ] Research governance (P1): Create `research/keyword-map.csv` (>=20 keywords with intent, business value, difficulty proxy, target URL, status) and lock the next **5-page queue** with at least 3 non-grinder targets.
- [ ] Content mix correction (P1): Ship 2 supporting pages outside grinder maintenance topics (espresso workflow + brewer comparison) and add >=3 contextual links to each from existing money pages.
- [ ] SEO QA system (P1): Add `research/templates/publish-checklist.md` and run it across all `posts/*.html` (canonical, robots, title/H1 alignment, schema fit, <=3-click crawl depth).
- [ ] Observability cadence (P2): Keep 6-hour snapshots in `metrics/` (00/06/12/18), include topic-mix ratios and newly shipped URLs, and retain 7 days.
- [ ] Deployment health doc (P1): Add `DEPLOYMENT.md` with Render service URL/name, production domain, and smoke commands for `/`, `/robots.txt`, `/sitemap.xml`, and one money page.

Guardrails (anti-churn)
- [ ] Until keyword-map exists, do not publish new grinder-focused money pages.
- [ ] For next 6 shipped URLs, maintain at least a 1:1 ratio of supporting pages to money pages.

Ops / blockers
- [ ] BLOCKER: Render service URL/name is still missing in-repo; Dan must provide Render reference to complete deployment verification.
- [ ] BLOCKED: `www.coffeegearlab.co` does not resolve from this environment (`curl: Could not resolve host`), so public-domain uptime/indexability checks cannot be verified here.

Recently completed
- [x] Rebuilt `posts/best-single-serve-coffee-maker-with-grinder.html` to match single-serve SERP template lock (section order, compatibility-first table, workflow realism, required FAQ intent) and shipped new workflow editorial asset.
- [x] Published `posts/best-coffee-maker-with-grinder-and-k-cup-combo.html` with full 2026 money-page structure, schema, and fresh editorial assets.
- [x] Added cluster internal links pointing to the new K-Cup combo page from core grind-and-brew and single-serve money pages plus site hubs.
- [x] Rebuilt `posts/best-manual-coffee-grinder-under-100.html` to 2026 template with refreshed asset and stricter structure.
- [x] Published `posts/best-hand-grinder-for-espresso-under-100.html` and linked it into cluster hubs/pages.
- [x] Refreshed sitewide SEO/navigation pass (canonicalized links, sitemap refresh, robots coverage updates).
- [x] Added SERP research + briefs for espresso/french-press/manual-grinder targets and updated template rules.
- [x] Added first KPI snapshot baseline at `metrics/2026-03-06-0000.json`.
