import { useSyncExternalStore } from "react";
import {
  categories as baseCategories,
  products as baseProducts,
  slugify,
  type Category,
  type Product,
  type Subcategory,
} from "@/data/catalog";

/* ------------------------------------------------------------------ *
 * Fully client-side catalog store.
 * No server, no database — everything lives in the browser (IndexedDB),
 * so uploaded JPG images and admin edits persist on this device.
 * ------------------------------------------------------------------ */

export type CategoryPatch = { name?: string; tagline?: string; image?: string; deleted?: boolean };
export type SubPatch = { name?: string; deleted?: boolean };
export type ProductPatch = Partial<Product> & { deleted?: boolean };

export type Overlay = {
  categoryPatches: Record<string, CategoryPatch>;
  newCategories: Category[];
  subPatches: Record<string, SubPatch>; // key: `${categorySlug}/${subSlug}`
  newSubcategories: { category: string; sub: Subcategory }[];
  productPatches: Record<string, ProductPatch>;
  newProducts: Product[];
};

const emptyOverlay = (): Overlay => ({
  categoryPatches: {},
  newCategories: [],
  subPatches: {},
  newSubcategories: [],
  productPatches: {},
  newProducts: [],
});

export type CatalogSnapshot = {
  categories: Category[];
  products: Product[];
  overlay: Overlay;
  loaded: boolean;
};

/* ----------------------------- merging ----------------------------- */

function merge(overlay: Overlay, loaded: boolean): CatalogSnapshot {
  const cats: Category[] = [...baseCategories, ...overlay.newCategories]
    .map((c) => {
      const patch = overlay.categoryPatches[c.slug] ?? {};
      const extraSubs = overlay.newSubcategories
        .filter((s) => s.category === c.slug)
        .map((s) => s.sub);
      const subcategories = [...c.subcategories, ...extraSubs]
        .map((s) => {
          const sp = overlay.subPatches[`${c.slug}/${s.slug}`] ?? {};
          return sp.deleted ? null : { ...s, ...(sp.name ? { name: sp.name } : {}) };
        })
        .filter((s): s is Subcategory => s !== null);
      return patch.deleted
        ? null
        : {
            ...c,
            ...(patch.name ? { name: patch.name } : {}),
            ...(patch.tagline ? { tagline: patch.tagline } : {}),
            ...(patch.image ? { image: patch.image } : {}),
            subcategories,
          };
    })
    .filter((c): c is Category => c !== null);

  const catBySlug = new Map(cats.map((c) => [c.slug, c]));

  const products = [...baseProducts, ...overlay.newProducts]
    .map((p) => {
      const patch = overlay.productPatches[p.slug] ?? {};
      if (patch.deleted) return null;
      const merged: Product = { ...p, ...patch } as Product;
      const cat = catBySlug.get(merged.category);
      if (!cat) return null;
      const sub = cat.subcategories.find((s) => s.slug === merged.subcategory);
      if (!sub) return null;
      merged.categoryName = cat.name;
      merged.subcategoryName = sub.name;
      
      return merged;
    })
    .filter((p): p is Product => p !== null);

  return { categories: cats, products, overlay, loaded };
}

/* --------------------------- persistence --------------------------- */

const DB_NAME = "tilehaus-admin";
const STORE = "kv";
const KEY = "overlay";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet(): Promise<Overlay | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(KEY);
    req.onsuccess = () => resolve((req.result as Overlay) ?? null);
    req.onerror = () => reject(req.error);
  });
}

async function idbSet(value: Overlay) {
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(value, KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/* ------------------------------ store ------------------------------ */

let overlay: Overlay = emptyOverlay();
let snapshot: CatalogSnapshot = merge(overlay, false);
const serverSnapshot: CatalogSnapshot = merge(emptyOverlay(), false);
const listeners = new Set<() => void>();
let hydrating = false;

const notify = () => listeners.forEach((l) => l());

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (typeof window !== "undefined" && !hydrating && !snapshot.loaded) {
    hydrating = true;
    idbGet()
      .then((stored) => {
        overlay = { ...emptyOverlay(), ...(stored ?? {}) };
        snapshot = merge(overlay, true);
        notify();
      })
      .catch(() => {
        snapshot = merge(overlay, true);
        notify();
      });
  }
  return () => listeners.delete(listener);
}

function commit(next: Overlay) {
  overlay = next;
  snapshot = merge(overlay, true);
  notify();
  void idbSet(overlay).catch(() => undefined);
}

export function useCatalog(): CatalogSnapshot {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => serverSnapshot,
  );
}

export const getSnapshot = () => snapshot;

/* ------------------------------- API ------------------------------- */

export function upsertCategory(input: { slug?: string; name: string; tagline: string; image: string }) {
  const isBase = baseCategories.some((c) => c.slug === input.slug);
  const slug = input.slug ?? slugify(input.name);
  if (input.slug && isBase) {
    commit({
      ...overlay,
      categoryPatches: {
        ...overlay.categoryPatches,
        [slug]: { ...overlay.categoryPatches[slug], name: input.name, tagline: input.tagline, image: input.image },
      },
    });
    return slug;
  }
  const existing = overlay.newCategories.find((c) => c.slug === slug);
  if (existing) {
    commit({
      ...overlay,
      newCategories: overlay.newCategories.map((c) =>
        c.slug === slug ? { ...c, name: input.name, tagline: input.tagline, image: input.image } : c,
      ),
    });
    return slug;
  }
  commit({
    ...overlay,
    newCategories: [
      ...overlay.newCategories,
      { slug, name: input.name, tagline: input.tagline, image: input.image, subcategories: [] },
    ],
  });
  return slug;
}

export function deleteCategory(slug: string) {
  commit({
    ...overlay,
    newCategories: overlay.newCategories.filter((c) => c.slug !== slug),
    categoryPatches: { ...overlay.categoryPatches, [slug]: { ...overlay.categoryPatches[slug], deleted: true } },
  });
}

export function upsertSubcategory(category: string, input: { slug?: string; name: string }) {
  const slug = input.slug ?? slugify(input.name);
  const key = `${category}/${slug}`;
  const isNew = overlay.newSubcategories.some((s) => s.category === category && s.sub.slug === slug);
  if (input.slug) {
    if (isNew) {
      commit({
        ...overlay,
        newSubcategories: overlay.newSubcategories.map((s) =>
          s.category === category && s.sub.slug === slug ? { ...s, sub: { ...s.sub, name: input.name } } : s,
        ),
      });
    } else {
      commit({
        ...overlay,
        subPatches: { ...overlay.subPatches, [key]: { ...overlay.subPatches[key], name: input.name } },
      });
    }
    return slug;
  }
  commit({
    ...overlay,
    newSubcategories: [...overlay.newSubcategories, { category, sub: { slug, name: input.name, topics: [] } }],
  });
  return slug;
}

export function deleteSubcategory(category: string, slug: string) {
  const key = `${category}/${slug}`;
  commit({
    ...overlay,
    newSubcategories: overlay.newSubcategories.filter((s) => !(s.category === category && s.sub.slug === slug)),
    subPatches: { ...overlay.subPatches, [key]: { ...overlay.subPatches[key], deleted: true } },
  });
}

export type ProductInput = {
  slug?: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  image: string;
  brand: string;
  material: string;
  size: string;
  finish: string;
  color: string;
  unit: string;
  price: number;
  mrp: number;
  inStock: boolean;
  specs: { label: string; value: string }[];
};

export function upsertProduct(input: ProductInput) {
  const discount = input.mrp > input.price ? Math.round(((input.mrp - input.price) / input.mrp) * 100) : 0;
  const cat = snapshot.categories.find((c) => c.slug === input.category);
  const sub = cat?.subcategories.find((s) => s.slug === input.subcategory);
  const patch: ProductPatch = {
    name: input.name,
    description: input.description,
    category: input.category,
    subcategory: input.subcategory,
    categoryName: cat?.name ?? input.category,
    subcategoryName: sub?.name ?? input.subcategory,
    image: input.image,
    brand: input.brand,
    material: input.material,
    size: input.size,
    finish: input.finish,
    color: input.color,
    unit: input.unit,
    price: input.price,
    mrp: input.mrp,
    discount,
    inStock: input.inStock,
    specs: input.specs,
  };

  if (input.slug) {
    const isNew = overlay.newProducts.some((p) => p.slug === input.slug);
    if (isNew) {
      commit({
        ...overlay,
        newProducts: overlay.newProducts.map((p) => (p.slug === input.slug ? ({ ...p, ...patch } as Product) : p)),
      });
    } else {
      commit({
        ...overlay,
        productPatches: {
          ...overlay.productPatches,
          [input.slug]: { ...overlay.productPatches[input.slug], ...patch },
        },
      });
    }
    return input.slug;
  }

  const base = slugify(input.name) || "product";
  let slug = base;
  let i = 2;
  const taken = new Set(snapshot.products.map((p) => p.slug));
  while (taken.has(slug)) slug = `${base}-${i++}`;

  const product: Product = {
    slug,
    imageFile: `${slug}.jpg`,
    rating: 4.5,
    reviews: 0,
    popularity: 500,
    newness: 1000,
    ...(patch as Omit<Product, "slug" | "imageFile" | "rating" | "reviews" | "popularity" | "newness">),
  } as Product;

  commit({ ...overlay, newProducts: [...overlay.newProducts, product] });
  return slug;
}

export function setProductImage(slug: string, image: string) {
  const isNew = overlay.newProducts.some((p) => p.slug === slug);
  if (isNew) {
    commit({
      ...overlay,
      newProducts: overlay.newProducts.map((p) => (p.slug === slug ? { ...p, image } : p)),
    });
    return;
  }
  commit({
    ...overlay,
    productPatches: { ...overlay.productPatches, [slug]: { ...overlay.productPatches[slug], image } },
  });
}

export function deleteProduct(slug: string) {
  commit({
    ...overlay,
    newProducts: overlay.newProducts.filter((p) => p.slug !== slug),
    productPatches: { ...overlay.productPatches, [slug]: { ...overlay.productPatches[slug], deleted: true } },
  });
}

export function resetCatalog() {
  commit(emptyOverlay());
}

export function exportOverlay() {
  return JSON.stringify(overlay);
}

export function importOverlay(json: string) {
  const parsed = JSON.parse(json) as Partial<Overlay>;
  commit({ ...emptyOverlay(), ...parsed });
}

/* --------------------------- image upload -------------------------- */

export async function fileToJpegDataUrl(file: File, maxSide = 1400, quality = 0.82): Promise<string> {
  const bitmapUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not read image"));
      el.src = bitmapUrl;
    });
    const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unsupported");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL("image/jpeg", quality);
  } finally {
    URL.revokeObjectURL(bitmapUrl);
  }
}

/* ------------------- duplicate image protection -------------------- */

/**
 * Strict rule: the same picture may never be used twice in the catalog.
 * Returns the name of the item already using this image, or null when unique.
 */
export function findImageOwner(image: string, exclude?: string): string | null {
  if (!image) return null;
  for (const c of snapshot.categories) {
    if (c.slug === exclude) continue;
    if (c.image === image) return `category "${c.name}"`;
  }
  for (const p of snapshot.products) {
    if (p.slug === exclude) continue;
    if (p.image === image) return `product "${p.name}"`;
  }
  return null;
}
