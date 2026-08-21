import { Link, useNavigate } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/catalog";
import { addToCart, inr } from "@/lib/cart";
import { productImageStyle } from "@/components/product-image";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  const add = () => {
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-lift">
      <Link
        to="/product/$productSlug"
        params={{ productSlug: product.slug }}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={768}
          style={productImageStyle(product.slug)}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
          {product.discount}% OFF
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.brand}</p>
        <h3 className="mt-1 font-display text-lg leading-snug text-foreground">
          <Link to="/product/$productSlug" params={{ productSlug: product.slug }}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-semibold text-foreground">{inr(product.price)}</span>
          <span className="text-sm text-muted-foreground line-through">{inr(product.mrp)}</span>
          <span className="text-sm font-semibold text-primary">{product.discount}% OFF</span>
        </div>
        <p className="text-xs text-muted-foreground">Unit: {product.unit}</p>

        <div className="mt-2 flex items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1 text-foreground">
            <Star className="size-4 fill-primary text-primary" />
            {product.rating}
          </span>
          <span className={product.inStock ? "text-success" : "text-destructive"}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/product/$productSlug" params={{ productSlug: product.slug }}>
              View Details
            </Link>
          </Button>
          <Button size="sm" onClick={add} disabled={!product.inStock}>
            Add to Cart
          </Button>
          <Button
            size="sm"
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
      </div>
    </article>
  );
}
