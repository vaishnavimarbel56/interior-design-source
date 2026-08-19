import { Link } from "@tanstack/react-router";
import { Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { categories } from "@/data/catalog";
import { cartCount, useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function SiteHeader() {
  const cart = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4">
        <Link to="/" className="font-display text-2xl tracking-tight text-foreground">
          Tile<span className="text-primary">Haus</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$categorySlug"
              params={{ categorySlug: c.slug }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="relative">
            <Link to="/cart" aria-label="Cart">
              <ShoppingCart className="size-5" />
              {cartCount(cart) > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                  {cartCount(cart)}
                </span>
              )}
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <div className="mt-8 space-y-6">
                {categories.map((c) => (
                  <div key={c.slug}>
                    <Link
                      to="/category/$categorySlug"
                      params={{ categorySlug: c.slug }}
                      onClick={() => setOpen(false)}
                      className="font-display text-lg text-foreground"
                    >
                      {c.name}
                    </Link>
                    <ul className="mt-2 space-y-1">
                      {c.subcategories.map((s) => (
                        <li key={s.slug}>
                          <Link
                            to="/category/$categorySlug"
                            params={{ categorySlug: c.slug }}
                            search={{ sub: s.slug }}
                            onClick={() => setOpen(false)}
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
