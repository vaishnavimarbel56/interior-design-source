import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Star, Truck, ShieldCheck, RefreshCcw, Headphones, Package } from "lucide-react";
import { toast } from "sonner";
import { getProduct, products } from "@/data/catalog";
import { addToCart, inr } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { productImageStyle } from "@/components/product-image";

export const Route = createFileRoute("/product/$productSlug")({
  loader: ({ params }) => {
    const product = getProduct(params.productSlug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} – ${inr(p.price)} ${p.unit} | Vaishnavi Marble` : "Product | Vaishnavi Marble";
    const description = p
      ? `${p.description} Buy at ${inr(p.price)} (${p.discount}% off MRP ${inr(p.mrp)}).`
      : "Product details";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const related = products
    .filter((p) => p.subcategory === product.subcategory && p.slug !== product.slug)
    .slice(0, 3);

  const add = () => {
    addToCart(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: product.image,
      },
      qty,
    );
    toast.success(`${qty} × ${product.name} added to cart`);
  };

  return (
    <div className="container-page py-8">
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          to="/category/$categorySlug"
          params={{ categorySlug: product.category }}
          className="hover:text-primary"
        >
          {product.categoryName}
        </Link>
        <span className="mx-2">/</span>
        <Link
          to="/category/$categorySlug"
          params={{ categorySlug: product.category }}
          search={{ sub: product.subcategory }}
          className="hover:text-primary"
        >
          {product.subcategoryName}
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={768}
            style={productImageStyle(product.slug)}
            className="aspect-[4/3] w-full object-cover"
          />
          <p className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
            Image: {product.imageFile}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.brand}</p>
          <h1 className="mt-1 font-display text-4xl text-foreground">{product.name}</h1>

          <div className="mt-3 flex items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1">
              <Star className="size-4 fill-primary text-primary" /> {product.rating}
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </span>
            <span className={product.inStock ? "text-success" : "text-destructive"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-3xl font-semibold text-foreground">
              {inr(product.price)} <span className="text-base font-normal text-muted-foreground">/ {product.unit.replace("Per ", "")}</span>
            </span>
            <span className="pb-1 text-muted-foreground line-through">{inr(product.mrp)}</span>
            <span className="pb-1 font-semibold text-primary">{product.discount}% OFF</span>
          </div>

          <p className="mt-5 text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-md border border-border">
              <button
                aria-label="Decrease quantity"
                className="px-3 py-2 text-muted-foreground hover:text-foreground"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button
                aria-label="Increase quantity"
                className="px-3 py-2 text-muted-foreground hover:text-foreground"
                onClick={() => setQty((q) => q + 1)}
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button onClick={add} disabled={!product.inStock}>
              Add to Cart
            </Button>
            <Button
              variant="secondary"
              disabled={!product.inStock}
              onClick={() => {
                add();
                navigate({ to: "/cart" });
              }}
            >
              Buy Now
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { icon: Truck, label: "Delivery available across India" },
              { icon: Package, label: "Secure, breakage-safe packaging" },
              { icon: RefreshCcw, label: "Easy returns where applicable" },
              { icon: ShieldCheck, label: "Product warranty where applicable" },
              { icon: Headphones, label: "Customer support 7 days a week" },
              { icon: Package, label: "Bulk / wholesale enquiry welcome" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="size-4 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl">Specifications</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <tbody>
              {[...product.specs, { label: "Availability", value: product.inStock ? "In Stock" : "Out of Stock" }].map(
                (s, i) => (
                  <tr key={s.label} className={i % 2 ? "bg-secondary/50" : "bg-card"}>
                    <th className="w-56 px-4 py-3 text-left font-medium text-muted-foreground">{s.label}</th>
                    <td className="px-4 py-3 text-foreground">{s.value}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-2xl">Similar products</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
