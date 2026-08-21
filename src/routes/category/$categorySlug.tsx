import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import {
  BRANDS,
  COLORS,
  FINISHES,
  MATERIALS,
  PRICE_RANGES,
  SIZES,
  SORT_OPTIONS,
  categories,
  getCategory,
  products,
  type Product,
} from "@/data/catalog";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

type Search = {
  sub?: string | undefined;
  sort?: string | undefined;
  price?: string[] | undefined;
  brand?: string[] | undefined;
  color?: string[] | undefined;
  material?: string[] | undefined;
  finish?: string[] | undefined;
  size?: string[] | undefined;
  stock?: string | undefined;
  rating?: number | undefined;
  min?: number | undefined;
  max?: number | undefined;
};

type ListKey = "price" | "brand" | "color" | "material" | "finish" | "size";

const toArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : typeof v === "string" && v ? [v] : [];
const toNum = (v: unknown) => (typeof v === "number" && !Number.isNaN(v) ? v : undefined);
const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);

export const Route = createFileRoute("/category/$categorySlug")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    sub: str(search["sub"]),
    sort: str(search["sort"]) ?? "recommended",
    price: toArray(search["price"]),
    brand: toArray(search["brand"]),
    color: toArray(search["color"]),
    material: toArray(search["material"]),
    finish: toArray(search["finish"]),
    size: toArray(search["size"]),
    stock: str(search["stock"]),
    rating: toNum(search["rating"]),
    min: toNum(search["min"]),
    max: toNum(search["max"]),
  }),
  loader: ({ params }) => {
    const category = getCategory(params.categorySlug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.category.name ?? "Products";
    const title = `${name} Online – Buy at Best Price | Vaishnavi Marble`;
    const description = `Shop ${name.toLowerCase()} at Vaishnavi Marble. ${loaderData?.category.tagline ?? ""} Compare brands, sizes, finishes and prices with fast delivery.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

function sortProducts(list: Product[], sort: string) {
  const out = [...list];
  switch (sort) {
    case "newest":
      return out.sort((a, b) => b.newness - a.newness);
    case "popular":
      return out.sort((a, b) => b.popularity - a.popularity);
    case "price-asc":
      return out.sort((a, b) => a.price - b.price);
    case "price-desc":
      return out.sort((a, b) => b.price - a.price);
    case "discount":
      return out.sort((a, b) => b.discount - a.discount);
    case "rating":
      return out.sort((a, b) => b.rating - a.rating);
    default:
      return out.sort((a, b) => b.rating * 100 + b.discount - (a.rating * 100 + a.discount));
  }
}

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const raw = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const search = {
    sub: raw.sub,
    sort: raw.sort ?? "recommended",
    price: raw.price ?? [],
    brand: raw.brand ?? [],
    color: raw.color ?? [],
    material: raw.material ?? [],
    finish: raw.finish ?? [],
    size: raw.size ?? [],
    stock: raw.stock,
    rating: raw.rating,
    min: raw.min,
    max: raw.max,
  };

  const setSearch = (patch: Partial<Search>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const toggle = (key: ListKey, value: string) => {
    const current = search[key];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    setSearch({ [key]: next } as Partial<Search>);
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.category === category.slug);
    if (search.sub) list = list.filter((p) => p.subcategory === search.sub);
    if (search.brand.length) list = list.filter((p) => search.brand.includes(p.brand));
    if (search.color.length) list = list.filter((p) => search.color.includes(p.color));
    if (search.material.length) list = list.filter((p) => search.material.includes(p.material));
    if (search.finish.length) list = list.filter((p) => search.finish.includes(p.finish));
    if (search.size.length) list = list.filter((p) => search.size.includes(p.size));
    if (search.price.length) {
      const ranges = PRICE_RANGES.filter((r) => search.price.includes(r.id));
      list = list.filter((p) => ranges.some((r) => p.price >= r.min && p.price <= r.max));
    }
    if (search.min !== undefined) list = list.filter((p) => p.price >= search.min!);
    if (search.max !== undefined) list = list.filter((p) => p.price <= search.max!);
    if (search.stock === "in") list = list.filter((p) => p.inStock);
    if (search.stock === "out") list = list.filter((p) => !p.inStock);
    if (search.rating) list = list.filter((p) => p.rating >= search.rating!);
    return sortProducts(list, search.sort);
  }, [category.slug, search]);

  const activeCount =
    search.price.length +
    search.brand.length +
    search.color.length +
    search.material.length +
    search.finish.length +
    search.size.length +
    (search.stock ? 1 : 0) +
    (search.rating ? 1 : 0) +
    (search.min !== undefined ? 1 : 0) +
    (search.max !== undefined ? 1 : 0);

  const clearAll = () =>
    navigate({
      search: {
        sub: search.sub,
        sort: search.sort,
        stock: undefined,
        rating: undefined,
        min: undefined,
        max: undefined,
        price: [],
        brand: [],
        color: [],
        material: [],
        finish: [],
        size: [],
      },
    });

  const group = (
    title: string,
    key: ListKey,
    options: { id: string; label: string }[],
  ) => (
    <div key={title} className="border-b border-border py-4">
      <p className="mb-3 text-sm font-semibold text-foreground">{title}</p>
      <div className="space-y-2">
        {options.map((o) => (
          <label key={o.id} className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
            <Checkbox checked={search[key].includes(o.id)} onCheckedChange={() => toggle(key, o.id)} />
            {o.label}
          </label>
        ))}
      </div>
    </div>
  );

  const filterPanel = (
    <div className="pb-8">
      <div className="flex items-center justify-between py-4">
        <p className="font-display text-lg">Filters</p>
        {activeCount > 0 && (
          <button onClick={clearAll} className="inline-flex items-center gap-1 text-xs text-primary">
            <X className="size-3" /> Clear ({activeCount})
          </button>
        )}
      </div>

      <div className="border-b border-border py-4">
        <p className="mb-3 text-sm font-semibold text-foreground">Subcategory</p>
        <div className="space-y-1">
          <button
            onClick={() => setSearch({ sub: undefined })}
            className={`block text-sm ${!search.sub ? "font-medium text-primary" : "text-muted-foreground"}`}
          >
            All {category.name}
          </button>
          {category.subcategories.map((s) => (
            <button
              key={s.slug}
              onClick={() => setSearch({ sub: s.slug })}
              className={`block text-left text-sm ${search.sub === s.slug ? "font-medium text-primary" : "text-muted-foreground"}`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {group("Price", "price", PRICE_RANGES.map((r) => ({ id: r.id, label: r.label })))}

      <div className="border-b border-border py-4">
        <p className="mb-3 text-sm font-semibold text-foreground">Custom Price Range</p>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={search.min ?? ""}
            onChange={(e) => setSearch({ min: e.target.value ? Number(e.target.value) : undefined })}
          />
          <span className="text-muted-foreground">–</span>
          <Input
            type="number"
            placeholder="Max"
            value={search.max ?? ""}
            onChange={(e) => setSearch({ max: e.target.value ? Number(e.target.value) : undefined })}
          />
        </div>
      </div>

      {group("Brand", "brand", BRANDS.map((b) => ({ id: b, label: b })))}
      {group("Color", "color", COLORS.map((c) => ({ id: c, label: c })))}
      {group("Material", "material", MATERIALS.map((m) => ({ id: m, label: m })))}
      {group("Finish", "finish", FINISHES.map((f) => ({ id: f, label: f })))}
      {group("Size", "size", SIZES.map((s) => ({ id: s, label: s })))}

      <div className="border-b border-border py-4">
        <p className="mb-3 text-sm font-semibold text-foreground">Availability</p>
        {[
          { id: "in", label: "In Stock" },
          { id: "out", label: "Out of Stock" },
        ].map((o) => (
          <label key={o.id} className="flex cursor-pointer items-center gap-2 py-1 text-sm text-muted-foreground">
            <Checkbox
              checked={search.stock === o.id}
              onCheckedChange={() => setSearch({ stock: search.stock === o.id ? undefined : o.id })}
            />
            {o.label}
          </label>
        ))}
      </div>

      <div className="py-4">
        <p className="mb-3 text-sm font-semibold text-foreground">Rating</p>
        {[4, 3].map((r) => (
          <label key={r} className="flex cursor-pointer items-center gap-2 py-1 text-sm text-muted-foreground">
            <Checkbox
              checked={search.rating === r}
              onCheckedChange={() => setSearch({ rating: search.rating === r ? undefined : r })}
            />
            ⭐ {r}★ & Above
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container-page py-8">
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>

      <header className="mt-4">
        <h1 className="font-display text-4xl text-foreground">{category.name}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{category.tagline}</p>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        {category.subcategories.map((s) => (
          <button
            key={s.slug}
            onClick={() => setSearch({ sub: search.sub === s.slug ? undefined : s.slug })}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              search.sub === s.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <Separator className="my-6" />

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">{filterPanel}</aside>

        <section>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{filtered.length} products</p>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="mr-2 size-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto px-4">
                  <SheetTitle className="sr-only">Filters</SheetTitle>
                  {filterPanel}
                </SheetContent>
              </Sheet>

              <Select value={search.sort} onValueChange={(v) => setSearch({ sort: v })}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-16 text-center text-muted-foreground">
              No products match these filters.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-2xl">Explore other categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <Link
                key={c.slug}
                to="/category/$categorySlug"
                params={{ categorySlug: c.slug }}
                className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground hover:border-primary hover:text-primary"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
