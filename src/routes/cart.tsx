import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cartTotal, inr, removeFromCart, setQty, useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cart")({
  head: () => {
    const title = "Your Cart | Vaishnavi Marble";
    const description = "Review your selected tiles, sanitaryware, sinks and vanities before checkout.";
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
  component: CartPage,
});

function CartPage() {
  const items = useCart();
  const total = cartTotal(items);

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-4xl">Your Cart</h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button asChild className="mt-4">
            <Link to="/">Continue shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="space-y-4">
            {items.map((i) => (
              <li key={i.slug} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                <img src={i.image} alt={i.name} loading="lazy" className="size-24 rounded-md object-cover" />
                <div className="flex-1">
                  <Link
                    to="/product/$productSlug"
                    params={{ productSlug: i.slug }}
                    className="font-display text-lg hover:text-primary"
                  >
                    {i.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {inr(i.price)} · {i.unit}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center rounded-md border border-border">
                      <button className="px-2 py-1" onClick={() => setQty(i.slug, i.qty - 1)}>
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{i.qty}</span>
                      <button className="px-2 py-1" onClick={() => setQty(i.slug, i.qty + 1)}>
                        +
                      </button>
                    </div>
                    <button
                      className="inline-flex items-center gap-1 text-sm text-destructive"
                      onClick={() => removeFromCart(i.slug)}
                    >
                      <Trash2 className="size-4" /> Remove
                    </button>
                  </div>
                </div>
                <p className="font-semibold">{inr(i.price * i.qty)}</p>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-xl">Order Summary</h2>
            <div className="mt-4 flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-foreground">{inr(total)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm text-muted-foreground">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="mt-4 flex justify-between border-t border-border pt-4 text-lg font-semibold">
              <span>Total</span>
              <span>{inr(total)}</span>
            </div>
            <Button className="mt-5 w-full" onClick={() => toast.success("Our team will contact you to confirm the order.")}>
              Place Order Enquiry
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
