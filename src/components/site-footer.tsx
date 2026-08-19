import { Link } from "@tanstack/react-router";
import { categories } from "@/data/catalog";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/60">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl">
            Tile<span className="text-primary">Haus</span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Tiles, sanitaryware, kitchen sinks, vanities, parking tiles, marble & granite — delivered
            across India with secure packaging and bulk pricing.
          </p>
        </div>
        {categories.slice(0, 3).map((c) => (
          <div key={c.slug}>
            <p className="text-sm font-semibold uppercase tracking-wide text-foreground">{c.name}</p>
            <ul className="mt-3 space-y-2">
              {c.subcategories.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/category/$categorySlug"
                    params={{ categorySlug: c.slug }}
                    search={{ sub: s.slug }}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TileHaus. Bulk & wholesale enquiries welcome.
      </div>
    </footer>
  );
}
