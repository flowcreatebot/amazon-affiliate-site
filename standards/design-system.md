# Coffee Gear Lab Design System

All pages are built with Astro components and `global.css`. This document defines every colour, typographic rule, and component available. Agents must use ONLY the documented components and CSS classes — never invent new ones.

---

## Source of Truth

- **Visual reference:** `/design-system` — the live rendered page (noindex). This is the canonical visual ground truth.
- **Machine-readable spec:** This file (`standards/design-system.md`) — component props, slot patterns, and usage rules for pipeline agents.
- **CSS implementation:** `src/styles/global.css` — the sole stylesheet, imported by `BaseLayout.astro`.
- **Components:** `src/components/*.astro` — reusable Astro components.

### Rules for Agents
1. ONLY use components documented in this file and defined in `src/components/`
2. NEVER invent inline styles or ad-hoc CSS classes
3. If a page needs a component that doesn't exist yet: create it in `src/components/`, add its styles to `src/styles/global.css`, document it here AND in `design-system.astro`, then use it
4. Every content page MUST use `PostLayout` or `BaseLayout` — never raw HTML files
5. Import components explicitly at the top of the frontmatter block

---

## Colours (CSS Custom Properties)

### Brand Scale
| Token | Hex | Usage |
|-------|-----|-------|
| `--brand-900` | `#2C1810` | Primary text, headings |
| `--brand-800` | `#3D261A` | Secondary headings |
| `--brand-700` | `#5C3D2E` | Body text |
| `--brand-600` | `#7A5B4A` | Muted text |
| `--brand-400` | `#B89B8A` | Captions, faint text |
| `--brand-200` | `#EFDFCE` | Elevated surfaces |
| `--brand-100` | `#F5EDE4` | Card backgrounds (crema) |
| `--brand-50` | `#FAF8F5` | Page background (warm off-white) |

### CTA / Action
| Token | Hex | Usage |
|-------|-----|-------|
| `--cta` | `#059669` | Primary CTA buttons (Amazon) |
| `--cta-hover` | `#047857` | CTA hover state |
| `--cta-light` | `#ECFDF5` | CTA background tint |
| `--secondary` | `#0369A1` | Internal links, secondary buttons |
| `--secondary-hover` | `#075985` | Secondary hover |

### Semantic
| Token | Hex | Usage |
|-------|-----|-------|
| `--success` | `#15803D` | Pros, pass indicators |
| `--success-bg` | `#F0FDF4` | Success background |
| `--warning` | `#D97706` | Warnings, disclosures |
| `--warning-bg` | `#FFFBEB` | Warning background |
| `--error` | `#DC2626` | Cons, fail indicators |
| `--error-bg` | `#FEF2F2` | Error background |
| `--info` | `#0369A1` | Info callouts |
| `--info-bg` | `#EFF6FF` | Info background |

### Surfaces
| Token | Hex | Usage |
|-------|-----|-------|
| `--surface-white` | `#FFFFFF` | Header, cards on dark bg |
| `--surface-warm` | `#FAF8F5` | Page body |
| `--surface-latte` | `#F5EDE4` | Card bg, section bg |
| `--surface-elevated` | `#EFDFCE` | Highlighted cards, hover |

---

## Typography

- **Font stack:** `Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
- **Base size:** `1rem` (16px)
- **Line height:** `1.65` (body), `1.25` (headings)
- **Content max-width:** `720px`

### Type Scale
| Element | Size | Weight |
|---------|------|--------|
| h1 | `clamp(1.75rem, 3vw, 2.5rem)` | 800 |
| h2 | `clamp(1.35rem, 2.5vw, 1.75rem)` | 700 |
| h3 | `1.25rem` | 700 |
| h4 | `1.1rem` | 600 |
| body | `1rem` | 400 |
| small / caption | `0.875rem` | 400 |
| fine print | `0.75rem` | 400 |

---

## Spacing Scale (CSS Custom Properties)

| Token | Value |
|-------|-------|
| `--sp-1` | `0.25rem` (4px) |
| `--sp-2` | `0.5rem` (8px) |
| `--sp-3` | `0.75rem` (12px) |
| `--sp-4` | `1rem` (16px) |
| `--sp-5` | `1.25rem` (20px) |
| `--sp-6` | `1.5rem` (24px) |
| `--sp-8` | `2rem` (32px) |
| `--sp-10` | `2.5rem` (40px) |
| `--sp-12` | `3rem` (48px) |
| `--sp-16` | `4rem` (64px) |

---

## Layout

- **CSS Grid** for page layout
- **Breakpoints:** `640px` (mobile), `960px` (desktop)
- **Container:** `min(720px, calc(100% - 2rem))` centered

---

## Components

Components are Astro files in `src/components/`. Import them in frontmatter and use them as tags. The underlying CSS classes in `global.css` are the same — the components just provide a structured interface.

### `<ProductCard>`

```astro
---
import ProductCard from '../components/ProductCard.astro';
---
<ProductCard
  title="Product Name"
  image={{ src: "https://m.media-amazon.com/images/I/ASIN._AC_SL500_.jpg", alt: "Product Name", width: 500, height: 500 }}
  badge={{ label: "Best Overall", variant: "overall" }}
  rating={{ score: 4.5 }}
  price="$49.99"
  ctaUrl="https://www.amazon.com/dp/ASIN/ref=nosim?tag=coffee-site-20"
  ctaText="Check Price on Amazon"
  featured={true}
/>
```

**Props:**
| Prop | Type | Required | Default |
|------|------|----------|---------|
| `title` | `string` | yes | — |
| `image` | `{ src, alt, width?, height? }` | no | — |
| `badge` | `{ label, variant }` | no | — |
| `rating` | `{ score, outOf? }` | no | — |
| `price` | `string` | no | — |
| `ctaUrl` | `string` | no | — |
| `ctaText` | `string` | no | `"Check Price on Amazon"` |
| `featured` | `boolean` | no | `false` |
| `noImage` | `boolean` | no | `false` |

Badge variants: `overall`, `budget`, `espresso`, `pourover`, `beginners`, `upgrade`

- Card has warm border-radius `12px`, `--surface-latte` background
- Image fills top, 1:1 aspect ratio on mobile, natural on desktop
- Body has `--sp-4` padding
- `featured`: `2px solid var(--cta)` border + box shadow

### `<ComparisonTable>`

```astro
---
import ComparisonTable from '../components/ComparisonTable.astro';
---
<ComparisonTable timestamp="March 7, 2026" headers={["Product", "Best For", "Price", "Rating", ""]} ariaLabel="Coffee maker comparison">
  <table>
    <thead>
      <tr>
        <th>Product</th><th>Best For</th><th>Price</th><th>Rating</th><th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Product">Product Name</td>
        <td data-label="Best For"><span class="best-for-badge --budget">Budget</span></td>
        <td data-label="Price">$29.99</td>
        <td data-label="Rating">4.3</td>
        <td><a href="..." class="cta-button --primary --sm" rel="nofollow sponsored noopener" target="_blank">Check Price <span class="cta-button__arrow" aria-hidden="true">&rarr;</span></a></td>
      </tr>
    </tbody>
  </table>
</ComparisonTable>
```

**Props:**
| Prop | Type | Required |
|------|------|----------|
| `timestamp` | `string` | no |
| `headers` | `string[]` | no |
| `ariaLabel` | `string` | no |

- **`data-label` required:** Every `<td>` (except first and last) must have a `data-label` matching its column header
- Desktop: standard table with zebra striping. Mobile (<960px): stacked cards
- The `<table>` goes in the default slot

### `<ProsCons>`

```astro
---
import ProsCons from '../components/ProsCons.astro';
---
<ProsCons
  pros={["Great value", "Durable build"]}
  cons={["Noisy motor", "Large footprint"]}
/>
```

**Props:**
| Prop | Type | Required |
|------|------|----------|
| `pros` | `string[]` | yes |
| `cons` | `string[]` | yes |

- Two-column grid (stacks on mobile <640px)
- Check/X marks added automatically

### `<QuickPicks>`

```astro
---
import QuickPicks from '../components/QuickPicks.astro';
---
<QuickPicks>
  <ProductCard featured={true} ... />
  <ProductCard ... />
  <ProductCard ... />
</QuickPicks>
```

- Slot accepts `<ProductCard>` components
- Hero box with `--surface-latte` background, `--sp-8` padding
- First card should have `featured={true}`

### `<BestForBadge>`

```astro
<BestForBadge variant="overall" label="Best Overall" />
```

**Variants:**
| Variant | Colour | Background |
|---------|--------|------------|
| `overall` | `#065F46` | `#ECFDF5` (green) |
| `budget` | `#166534` | `#F0FDF4` (green) |
| `espresso` | `#7C2D12` | `#FFF7ED` (terracotta) |
| `pourover` | `#1E40AF` | `#EFF6FF` (blue) |
| `beginners` | `#6B21A8` | `#FAF5FF` (purple) |
| `upgrade` | `#9D174D` | `#FDF2F8` (pink) |

### `<StarRating>`

```astro
<StarRating score={4.5} outOf={5} />
```

### `<CtaButton>`

```astro
<CtaButton href="https://www.amazon.com/dp/ASIN/ref=nosim?tag=coffee-site-20" variant="primary" external>
  Check Price on Amazon
</CtaButton>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `href` | `string` | — (required) |
| `variant` | `"primary" \| "secondary"` | `"primary"` |
| `size` | `"sm" \| "default"` | `"default"` |
| `external` | `boolean` | `false` |

- `external={true}` adds `rel="nofollow sponsored noopener" target="_blank"` — use for ALL Amazon links
- Arrow animation on hover (4px right)

### `<BuyingGuideSection>`

```astro
<BuyingGuideSection>
  <h2>Buying Guide</h2>
  <p>Content here...</p>
</BuyingGuideSection>
```

- `--surface-latte` background, `--brand-800` left border, `--sp-6` padding

### `<FaqAccordion>` + `<FaqItem>`

```astro
---
import FaqAccordion from '../components/FaqAccordion.astro';
import FaqItem from '../components/FaqItem.astro';
---
<FaqAccordion>
  <FaqItem question="Question here?">
    <p>Answer here.</p>
  </FaqItem>
</FaqAccordion>
```

- Pure CSS, no JavaScript
- `<FaqItem>` accepts a `question` prop and answer content in the slot

### `<AffiliateDisclosure>`

Handled automatically by `PostLayout` — appears above fold and at page bottom. Custom text can be passed via the `disclosureText` prop on PostLayout.

### `<Breadcrumbs>`

Handled automatically by `PostLayout`. Pass breadcrumb items as a prop:

```astro
<PostLayout
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "All Guides", href: "/posts/" },
    { label: "Page Title" }
  ]}
  ...
>
```

- Last item (no `href`) gets `aria-current="page"`
- Semantic `<nav><ol>` with `aria-label="Breadcrumb"`

### `<HeroMedia>`

```astro
<HeroMedia
  src="/assets/images/hero.svg"
  alt="Descriptive alt text"
  width={720}
  height={400}
  caption="Image caption text"
/>
```

### `<Toc>`

```astro
<Toc items={[
  { href: "#section-1", label: "Section One" },
  { href: "#section-2", label: "Section Two" },
]} />
```

### `<CardGrid>` + `<Card>`

```astro
<CardGrid>
  <Card href="/posts/page.html" title="Guide Title" description="Short description." />
</CardGrid>
```

- Used on hub/category pages

### `<CategoryPills>` + `<Pill>`

```astro
<CategoryPills>
  <Pill href="/posts/category.html">Grinders</Pill>
  <Pill href="/posts/category.html">Espresso Machines</Pill>
</CategoryPills>
```

### `<JsonLd>`

```astro
---
import JsonLd from '../components/JsonLd.astro';
---
<Fragment slot="head">
  <JsonLd data={{
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    ...
  }} />
</Fragment>
```

- Renders `<script type="application/ld+json">` in `<head>` via the named `head` slot
- Pass a plain JS object — it gets JSON-stringified

### Notes / Callouts

```html
<div class="note">
  <p><strong>Note:</strong> Important information here.</p>
</div>
```

- No component wrapper — use the raw CSS class `.note`
- `--warning-bg` background, `--warning` left border

### `.lead`

```html
<p class="lead">Intro paragraph text.</p>
```

- `1.1rem` font size, `--brand-600` colour
- Used immediately after H1

### `.kicker`

```html
<p class="kicker">Subtitle or category label</p>
```

- Muted subtitle text below H1

---

## Header / Footer

Handled automatically by `BaseLayout`. The header and footer are shared components (`src/components/Header.astro`, `src/components/Footer.astro`) — agents never need to write header/footer markup.

Nav links are defined in `src/data/site.ts` and are identical on every page.
