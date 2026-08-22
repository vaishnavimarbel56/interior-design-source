import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShieldCheck, Headphones, Package } from "lucide-react";
import { useCatalog } from "@/lib/catalog-store";
import { categoryLogo } from "@/data/category-logos";
import { ProductCard } from "@/components/product-card";
import { HScroller } from "@/components/h-scroller";
import { HeroCarousel } from "@/components/hero-carousel";
import { Reveal } from "@/components/reveal";
import { SocialLinks } from "@/components/social-links";
import { SITE } from "@/lib/site-info";



const TITLE = "Vaishnavi Marble – Tiles, Sanitaryware, Marble Statues & Granite";
const DESCRIPTION =
  "Buy floor tiles, wall tiles, parking tiles, sanitaryware, kitchen sinks, bathroom vanities, marble statues, marble mandirs, marble and granite at best prices.";

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
  const { categories, products } = useCatalog();
  const bestSellers = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 12);
  const topDeals = [...products].sort((a, b) => b.discount - a.discount).slice(0, 12);

  return (
    <div>
      <HeroCarousel />


      {/* Category logo area — one unique logo image per category */}
      <section className="border-b border-border bg-card">
        <div className="container-page py-10">
          <Reveal>
            <h2 className="text-center text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Browse our collections
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-7 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-3 md:justify-center md:flex-wrap md:overflow-visible">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/category/$categorySlug"
                  params={{ categorySlug: c.slug }}
                  className="group flex w-24 shrink-0 snap-start flex-col items-center gap-2 text-center"
                >
                  <span className="size-20 overflow-hidden rounded-full border-2 border-border bg-muted shadow-card transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary group-hover:shadow-lift">
                    <img
                      src={categoryLogo(c.slug, c.image)}
                      alt={`${c.name} logo`}
                      loading="lazy"
                      width={160}
                      height={160}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span className="text-xs font-medium leading-tight text-foreground">{c.name}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/50">
        <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Truck, label: "Delivery across India" },
            { icon: Package, label: "Secure packaging" },
            { icon: ShieldCheck, label: "Warranty where applicable" },
            { icon: Headphones, label: "Bulk & wholesale enquiry" },
          ].map(({ icon: Icon, label }, i) => (
            <Reveal key={label} delay={i * 70}>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Icon className="size-5 text-primary" />
                {label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <Reveal>
          <h2 className="font-display text-3xl">Shop by category</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 90}>
              <Link
                to="/category/$categorySlug"
                params={{ categorySlug: c.slug }}
                className="group block h-full overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-lift"
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
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <Reveal>
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
        </Reveal>
        <Reveal delay={100} className="mt-8">
          <HScroller>
            {bestSellers.map((p) => (
              <div key={p.slug} className="w-[280px] shrink-0 snap-start sm:w-[320px]">
                <ProductCard product={p} />
              </div>
            ))}
          </HScroller>
        </Reveal>
      </section>

      <section className="container-page pb-20">
        <Reveal>
          <h2 className="font-display text-3xl">Biggest discounts</h2>
        </Reveal>
        <Reveal delay={100} className="mt-8">
          <HScroller>
            {topDeals.map((p) => (
              <div key={p.slug} className="w-[280px] shrink-0 snap-start sm:w-[320px]">
                <ProductCard product={p} />
              </div>
            ))}
          </HScroller>
        </Reveal>
      </section>

      <section className="border-t border-border bg-secondary/50">
        <div className="container-page py-14 text-center">
          <Reveal>
            <h2 className="font-display text-3xl">Visit us in Kolkata</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              {SITE.blurb} {SITE.address}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-6 flex flex-col items-center gap-4">
              <p className="text-sm text-muted-foreground">
                {SITE.phones.join("  ·  ")}  ·  WhatsApp +91 70039 48297
              </p>
              <SocialLinks className="justify-center" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>

  );
}
