import { Link } from "@tanstack/react-router";
import { Menu, ShoppingCart, Settings } from "lucide-react";
import { useState } from "react";
import { useCatalog } from "@/lib/catalog-store";
import { cartCount, useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/assets/logo.jpeg.asset.json";

export function SiteHeader() {
  const cart = useCart();
  const { categories } = useCatalog();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logo.url}
            alt="Vaishnavi Marble logo"
            width={40}
            height={40}
            className="size-10 rounded-md object-cover"
          />
          <span className="font-display text-xl leading-none tracking-tight text-foreground">
            Vaishnavi <span className="text-primary">Marble</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$categorySlug"
              params={{ categorySlug: c.slug }}
              className="group relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              <span className="relative z-10">{c.name}</span>
              <span className="absolute inset-x-2 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              <span className="absolute inset-0 -z-0 scale-90 rounded-md bg-secondary opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
            </Link>
          ))}
        </nav>


        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/admin" aria-label="Admin panel">
              <Settings className="size-4" />
              Admin
            </Link>
          </Button>

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
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="block text-sm font-medium text-primary"
                >
                  Admin panel
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
