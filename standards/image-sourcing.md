# Image Sourcing Standard

## Product Images

### Source
Amazon product listing main image via Amazon CDN.

### How to Find
1. Search Brave for: site:amazon.com {ASIN}
2. Visit the product page
3. Find the main product image URL (format: https://m.media-amazon.com/images/I/{id}._AC_SL500_.jpg)
4. Use the _AC_SL500_ size variant (500x500px, suitable for product cards)

### Usage in HTML
```html
<img src="https://m.media-amazon.com/images/I/{id}._AC_SL500_.jpg"
     alt="{Product Name}" width="500" height="500" loading="lazy">
```

### Placement
- **Quick picks section:** Every .product-card gets a product image
- **Individual reviews:** Product image at top of each review article
- **Comparison table:** No images (table stays compact)

### Fallback
If product image cannot be found (delisted product, restricted image):
- Use the page's editorial SVG illustration as fallback
- Add class .product-card--no-image to the product card

### Rules
- Never download/host Amazon images locally (CDN linking only)
- Every product card img src must be UNIQUE (no reusing the same image for different products)
- Always include width, height, alt, loading="lazy"
- Use descriptive alt text: "{Brand} {Model} {Product Type}" (not "product image")
