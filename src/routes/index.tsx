import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, Headphones, Package } from "lucide-react";
import { categories, products } from "@/data/catalog";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/tiles.jpg";

const TITLE = "TileHaus – Tiles, Sanitaryware, Sinks, Vanity, Marble & Granite";
const DESCRIPTION =
  "Buy floor tiles, wall tiles, parking tiles, sanitaryware, kitchen sinks, bathroom vanities, marble and granite at best prices with filters, ratings and fast delivery.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const bestSellers = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 6);
  const topDeals = [...products].sort((a, b) => b.discount - a.discount).slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroImg}
          alt="Marble look vitrified floor tiles in a modern living room"
          width={1024}
          height={768}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-deep/85 via-stone-deep/60 to-transparent" />
        <div className="container-page relative py-28">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">Since 1998 · Pan-India delivery</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl leading-tight text-accent md:text-6xl">
            Tiles, sanitaryware & stone for beautiful Indian homes
          </h1>
          <p className="mt-5 max-w-xl text-lg text-accent/85">
            Six curated categories, hundreds of SKUs, transparent pricing with MRP, discount and
            live stock — filter by brand, size, finish and colour.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/category/$categorySlug" params={{ categorySlug: "tiles" }}>
                Shop Tiles <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/category/$categorySlug" params={{ categorySlug: "marble-and-granite" }}>
                Marble & Granite
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/50">
        <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Truck, label: "Delivery across India" },
            { icon: Package, label: "Secure packaging" },
            { icon: ShieldCheck, label: "Warranty where applicable" },
            { icon: Headphones, label: "Bulk & wholesale enquiry" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
              <Icon className="size-5 text-primary" />
              {label}
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="font-display text-3xl">Shop by category</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$categorySlug"
              params={{ categorySlug: c.slug }}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-lift"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.tagline}</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {c.subcategories.map((s) => s.name).join(" · ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl">Best sellers</h2>
          <Link
            to="/category/$categorySlug"
            params={{ categorySlug: "tiles" }}
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bestSellers.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <h2 className="font-display text-3xl">Biggest discounts</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topDeals.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
