import type { CSSProperties } from "react";

/**
 * Every product gets its own distinct rendering of its subcategory photo:
 * a deterministic crop, zoom and tone derived from the product slug, so no
 * two products in the catalog look like the same picture.
 */
export function productImageStyle(slug: string): CSSProperties {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  const x = 20 + (h % 61); // 20% – 80%
  const y = 20 + ((h >> 5) % 61);
  const zoom = 1 + ((h >> 11) % 26) / 100; // 1.00 – 1.25
  const hue = ((h >> 17) % 17) - 8; // -8deg – +8deg
  const sat = 0.92 + ((h >> 23) % 21) / 100; // 0.92 – 1.12
  const bright = 0.94 + ((h >> 3) % 15) / 100; // 0.94 – 1.08
  return {
    objectPosition: `${x}% ${y}%`,
    transform: `scale(${zoom})`,
    filter: `hue-rotate(${hue}deg) saturate(${sat}) brightness(${bright})`,
  };
}
