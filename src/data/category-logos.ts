import { SUB_IMAGES, UPLOADED_IMAGES } from "@/data/sub-images";

/**
 * One distinct logo image per category. Values are asserted unique at module
 * load so the homepage logo strip can never show the same picture twice.
 */
export const CATEGORY_LOGOS: Record<string, string> = {
  tiles: SUB_IMAGES["floor-tiles"]!,
  sanitaryware: SUB_IMAGES["wall-hung-wc"]!,
  "kitchen-sink": SUB_IMAGES["stainless-steel-sink"]!,
  "bathroom-vanity": SUB_IMAGES["wall-mounted-vanity"]!,
  "parking-tiles": SUB_IMAGES["car-parking-tiles"]!,
  "marble-and-granite": SUB_IMAGES["granite"]!,
  "marble-statues": UPLOADED_IMAGES.radhaKrishna,
  "marble-home-interiors": UPLOADED_IMAGES.marbleFireplace,
};

const seen = new Set<string>();
for (const [slug, url] of Object.entries(CATEGORY_LOGOS)) {
  if (seen.has(url)) throw new Error(`Duplicate category logo image for "${slug}"`);
  seen.add(url);
}

export const categoryLogo = (slug: string, fallback: string) => CATEGORY_LOGOS[slug] ?? fallback;
