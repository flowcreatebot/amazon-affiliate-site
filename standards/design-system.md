# Coffee Gear Lab Design System

All pages must use `styles-v2.css`. This document defines every colour, typographic rule, and component available. Agents must use ONLY these classes — never invent new ones.

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
| `--cta` | `#D97706` | Primary CTA buttons (Amazon) |
| `--cta-hover` | `#B45309` | CTA hover state |
| `--cta-light` | `#FEF3C7` | CTA background tint |
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

### `.product-card`

```html
<article class="product-card">
  <img src="image.jpg" alt="Product Name" width="300" height="300" loading="lazy">
  <div class="product-card__body">
    <span class="best-for-badge --overall">Best Overall</span>
    <h3 class="product-card__title">Product Name</h3>
    <div class="star-rating" aria-label="4.5 out of 5 stars">
      <span class="star-rating__stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
      <span class="star-rating__score">4.5</span>
    </div>
    <p class="product-card__price">$49.99</p>
    <a href="https://www.amazon.com/dp/ASIN/ref=nosim?tag=coffee-site-20" class="cta-button --primary --sm" rel="nofollow sponsored noopener" target="_blank">
      Check Price on Amazon <span class="cta-button__arrow" aria-hidden="true">&rarr;</span>
    </a>
  </div>
</article>
```

- Card has warm border-radius `12px`, `--surface-latte` background
- Image fills top, 1:1 aspect ratio on mobile, natural on desktop
- Body has `--sp-4` padding

### `.comparison-table`

```html
<div class="comparison-table">
  <p class="comparison-table__timestamp">Prices updated: March 7, 2026</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Best For</th>
          <th>Price</th>
          <th>Rating</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Product Name</td>
          <td><span class="best-for-badge --budget">Budget</span></td>
          <td>$29.99</td>
          <td>4.3</td>
          <td><a href="https://www.amazon.com/dp/ASIN/ref=nosim?tag=coffee-site-20" class="cta-button --primary --sm" rel="nofollow sponsored noopener" target="_blank">Check Price <span class="cta-button__arrow" aria-hidden="true">&rarr;</span></a></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

- First column sticky on mobile (`position: sticky; left: 0`)
- Zebra striping on `tbody tr:nth-child(even)`
- CTA button in last column per row
- Timestamp header above table in `--brand-400` small text

### `.cta-button`

```html
<a href="..." class="cta-button --primary" rel="nofollow sponsored noopener" target="_blank">
  Check Price on Amazon <span class="cta-button__arrow" aria-hidden="true">&rarr;</span>
</a>
```

**Variants:**
- `--primary`: `--cta` background, white text (Amazon links)
- `--secondary`: `--secondary` border + text, transparent bg (internal links)
- `--sm`: Smaller padding for use in tables

**Arrow animation:** Arrow moves 4px right on hover via `transform: translateX(4px)` with `0.2s ease` transition.

### `.pros-cons`

```html
<div class="pros-cons">
  <div class="pros-cons__col --pros">
    <h4>Pros</h4>
    <ul>
      <li>&#10003; Great value</li>
      <li>&#10003; Durable build</li>
    </ul>
  </div>
  <div class="pros-cons__col --cons">
    <h4>Cons</h4>
    <ul>
      <li>&#10007; Noisy motor</li>
      <li>&#10007; Large footprint</li>
    </ul>
  </div>
</div>
```

- Two-column grid (stack on mobile <640px)
- `--pros`: green `--success` left border (4px)
- `--cons`: red `--error` left border (4px)
- Check/X marks in list items (unicode, not icons)

### `.quick-picks`

```html
<div class="quick-picks">
  <h2>Our Top Picks</h2>
  <div class="quick-picks__grid">
    <article class="product-card --featured">
      <!-- featured item: amber border + shadow -->
    </article>
    <article class="product-card"><!-- #2 --></article>
    <article class="product-card"><!-- #3 --></article>
  </div>
</div>
```

- Hero box with `--surface-latte` background, `--sp-8` padding
- Featured item (`.--featured`): `2px solid var(--cta)` border + `0 4px 16px rgba(44,24,16,0.1)` shadow
- Grid: featured takes full width on mobile, 1/3 each on desktop

### `.best-for-badge`

```html
<span class="best-for-badge --overall">Best Overall</span>
```

**Variants:**
| Class | Colour | Background |
|-------|--------|------------|
| `--overall` | `#92400E` | `#FEF3C7` (gold) |
| `--budget` | `#166534` | `#F0FDF4` (green) |
| `--espresso` | `#7C2D12` | `#FFF7ED` (terracotta) |
| `--pourover` | `#1E40AF` | `#EFF6FF` (blue) |
| `--beginners` | `#6B21A8` | `#FAF5FF` (purple) |
| `--upgrade` | `#9D174D` | `#FDF2F8` (pink) |

- Inline pill: `border-radius: 999px`, `padding: 0.15rem 0.6rem`, `font-size: 0.8rem`, `font-weight: 600`

### `.star-rating`

```html
<div class="star-rating" aria-label="4.5 out of 5 stars">
  <span class="star-rating__stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
  <span class="star-rating__score">4.5</span>
</div>
```

- Filled stars: `--cta` colour, empty stars: `--brand-400`
- Score in `--brand-700`, `font-weight: 600`

### `.buying-guide-section`

```html
<section class="buying-guide-section">
  <h2>Buying Guide</h2>
  <p>Content here...</p>
</section>
```

- `--surface-latte` background, `--brand-800` left border (4px), `--sp-6` padding
- `border-radius: 12px`

### `.faq-accordion`

```html
<div class="faq-accordion">
  <details>
    <summary>Question here?</summary>
    <div class="faq-accordion__answer">
      <p>Answer here.</p>
    </div>
  </details>
</div>
```

- Pure CSS, no JavaScript
- `<summary>` has `cursor: pointer`, `font-weight: 600`, `padding: --sp-3 0`
- Bottom border between items
- `[open] summary` gets `--brand-900` colour
- Answer area has `--sp-4` padding-bottom

### `.affiliate-disclosure`

```html
<aside class="affiliate-disclosure">
  <p><strong>Affiliate Disclosure:</strong> This page contains Amazon affiliate links. If you purchase through our links, we may earn a small commission at no extra cost to you. This helps us keep the site running.</p>
</aside>
```

- `--warning-bg` background, `--warning` left border (4px)
- `border-radius: 8px`, `--sp-4` padding
- Must appear: once above the fold, once at page bottom

### `.breadcrumbs`

```html
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/posts/category.html">Category</a></li>
    <li aria-current="page">Page Title</li>
  </ol>
</nav>
```

- Semantic `<nav><ol>` with `aria-label="Breadcrumb"`
- Inline `<li>` separated by CSS `::before` content `" / "`
- `font-size: 0.875rem`, `--brand-600` colour
- Links use `--secondary` colour

### `.toc`

```html
<nav class="toc" aria-label="Table of Contents">
  <h4>Contents</h4>
  <ol>
    <li><a href="#section">Section Title</a></li>
  </ol>
</nav>
```

- On desktop (960px+): `position: sticky; top: 5rem` in a sidebar
- On mobile: inline block with `--surface-latte` background
- Scrollable if content overflows (`max-height: calc(100vh - 8rem)`)
- `border-radius: 12px`, `--sp-4` padding
