# Vaishnavi Marble: unique product images, branding, animations, admin panel

## 1. Unique images everywhere
- `src/data/catalog.ts` (`makeProduct`, line ~668): replace `image: cat.image` with the subcategory photo from `SUB_IMAGES[sub.slug]`, falling back to the category image only if a slug is ever missing.
- `src/lib/catalog-store.ts` line 86: delete the line that rewrites `merged.image = cat.image`, so generated and admin-uploaded images survive the merge.
- `src/components/product-card.tsx` and `src/routes/product/$productSlug.tsx`: apply `productImageStyle(product.slug)` to the `<img>` (deterministic crop/zoom/tone per slug) so no two products look identical; keep hover scale working by composing transforms.

## 2. Branding swap (TileHaus to Vaishnavi Marble)
- Header and footer: show the uploaded logo (`src/assets/logo.jpeg.asset.json`) plus "Vaishnavi Marble" wordmark; remove all TileHaus text.
- `src/routes/__root.tsx`: favicon link to `/favicon.png`, titles/OG/description updated to Vaishnavi Marble; delete `public/favicon.ico`.
- Same rename in the home page copy and route head tags.

## 3. Home page motion
- Wrap hero, category grid, best sellers and deals sections in `Reveal` with staggered delays.
- Best sellers and Biggest discounts become horizontal scrollers: snap-scrolling flex row with left/right arrow buttons on desktop, native swipe on mobile.

## 4. Admin panel (`src/routes/admin.tsx`)
Client-only, no server or database — everything through the existing `catalog-store.ts` (localStorage + IndexedDB).
- Tabs: Categories, Subcategories, Products.
- Categories: add / edit name, tagline, JPG upload; delete.
- Subcategories: pick parent category, add / rename / delete, JPG upload.
- Products: searchable table with add / edit (name, category, subcategory, brand, price, MRP, unit, stock, description, specs) / delete, plus JPG upload compressed via `fileToJpegDataUrl`.
- Export / Import of the catalog overlay as JSON for backup.
- Linked from the header (discreet "Admin" link) and given a `noindex` head tag.

## Technical notes
- Uploaded JPGs are resized and stored as data URLs in IndexedDB; metadata overlay merges over the static catalog at read time, so the storefront updates instantly and persists per browser.
- No backend is added; all admin data lives in the user's browser and can be exported/imported.
