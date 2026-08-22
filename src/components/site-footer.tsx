import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { useCatalog } from "@/lib/catalog-store";
import { SocialLinks } from "@/components/social-links";
import { SITE, telHref, whatsappHref } from "@/lib/site-info";
import logo from "@/assets/logo.jpeg.asset.json";

export function SiteFooter() {
  const { categories } = useCatalog();

  return (
    <footer className="mt-20 border-t border-border bg-secondary/60">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src={logo.url}
              alt="Vaishnavi Marble logo"
              width={44}
              height={44}
              loading="lazy"
              className="size-11 rounded-md object-cover"
            />
            <p className="font-display text-xl leading-tight">
              Vaishnavi <span className="text-primary">Marble</span>
            </p>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{SITE.blurb}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Tiles, sanitaryware, kitchen sinks, vanities, parking tiles, marble statues, mandirs,
            marble & granite.
          </p>
          <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-foreground">
            Social media
          </p>
          <SocialLinks className="mt-3" />
        </div>

        {categories.slice(0, 2).map((c) => (
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

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Address & contact
          </p>
          <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                {SITE.address}
              </a>
            </li>
            {SITE.phones.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-primary" />
                <a href={telHref(p)} className="hover:text-primary">
                  {p}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <MessageCircle className="size-4 shrink-0 text-primary" />
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                WhatsApp +91 70039 48297
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-primary" />
              <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Vaishnavi Marble. Bulk & wholesale enquiries welcome.</span>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:text-primary"
          >
            <ShieldCheck className="size-3.5" /> Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
