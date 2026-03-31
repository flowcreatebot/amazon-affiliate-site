# Style Guide: Money Page (Roundup)

## Purpose & Reader Intent

The reader has decided to buy something and wants to know which one. They are comparing options, looking for a clear recommendation, and scanning for the product that fits their situation. They want confidence, not a lecture.

## Word Range

**Target: 1,800–2,500 words**

Five to seven products at 150-200 words of prose each, plus intro, methodology, buying guide, and FAQ. The comparison table and HeroPicks carry most of the factual load, so prose should add opinion and context, not restate data.

## Structure Rhythm

1. **Lead** (1-2 sentences) — name the top pick immediately
2. **Quick answer** (2-3 sentences) — name specific products for specific buyer types
3. **Comparison table** — no prose wrapper needed, the table speaks for itself
4. **How we evaluate** (1-2 paragraphs) — state the criteria, not a narrative of your process
5. **Product reviews** (150-200 words each) — see section guidance below
6. **Buying guide** (2-3 subsections, 1-2 paragraphs each) — factors, not features
7. **FAQ** (min 4 items, 2-4 sentences each) — answer first, context second

## Section-Specific Guidance

### Lead Paragraph

**Density:** 1-2 sentences
**What belongs here:** The top pick by name, why it won, and a one-sentence frame for the article.
**What to cut:** Background on the category, history of coffee grinders, "we researched 47 models" narrative.

### Quick Answer

**Density:** 2-3 sentences
**What belongs here:** "Buy X if you want Y. Buy A if you want B." Specific product-to-buyer mappings.
**What to cut:** Caveats, hedging, "it depends" phrasing. Be direct.

### Methodology (How We Evaluate)

**Density:** 1-2 paragraphs
**What belongs here:** The criteria you used and why they matter to the reader. Use analogies to make technical concepts accessible.
**What to cut:** Narrative about your process ("first we looked at..., then we compared..."). State what matters, not what you did.

**Good example** from `best-burr-coffee-grinder-under-200`:
> Grind consistency came first. When the grounds come out uneven, your coffee tastes muddy, sharp, hollow, or just plain confused. Good burr grinders break beans into more even pieces, which means the brew tastes sweeter and more balanced. Think of it like chopping vegetables with a sharp knife instead of smashing them with a rock.

**Why this works:** Explains why the criterion matters using a sensory analogy, not just that you checked it.

### Product Reviews

**Density:** 2-3 paragraphs of prose per product (not counting ProductCard and ProsCons components)
**What belongs here:** What makes this product different from the others. Who it is for and who should skip it. One standout strength, one honest downside.
**What to cut:** Restating badge/price/bestFor text from the ProductCard. Repeating specs visible in the comparison table. Generic praise ("excellent build quality, great value").

**Anti-pattern to avoid:**
> The Baratza Encore ESP is our Best Overall pick, priced at $169, and it's best for most households.

**Why this fails:** All three facts are already in the ProductCard component. The review should add insight the component cannot show.

### Buying Guide

**Density:** 1-2 paragraphs per factor
**What belongs here:** Decision factors the reader should weigh. Budget tiers. Common mistakes specific to this category.
**What to cut:** Factors already covered in methodology. Generic advice that applies to any product category.

### FAQ

**Density:** 2-4 sentences per answer
**What belongs here:** Direct answer first, then brief context. Name specific products where relevant.
**What to cut:** Answers that just rephrase the question. Answers that restate article content verbatim.

## Pre-Submission Checklist

- [ ] Every paragraph adds information not shown in components or tables
- [ ] Product reviews do not restate ProductCard badge, price, or bestFor
- [ ] Methodology focuses on criteria and why they matter, not process narrative
- [ ] No section restates its H2 heading as its opening sentence
- [ ] Word count is within 1,800-2,500
- [ ] Components (ComparisonTable, HeroPicks, ProsCons) carry structured data; prose carries opinion
