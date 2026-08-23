import { Youtube, Facebook, MessageCircle, Mail, Phone } from "lucide-react";
import { telHref, waHref } from "@/lib/site-info";
import { useLiveSite } from "@/lib/site-settings";

export function SocialLinks({ className = "" }: { className?: string }) {
  const { info } = useLiveSite();
  const items = [
    { href: info.youtube, label: "YouTube", Icon: Youtube },
    { href: info.facebook, label: "Facebook reel", Icon: Facebook },
    { href: waHref(info.whatsapp), label: "WhatsApp", Icon: MessageCircle },
    { href: `mailto:${info.email}`, label: "Email", Icon: Mail },
    { href: telHref(info.phones[0] ?? ""), label: "Call", Icon: Phone },
  ].filter((i) => Boolean(i.href));

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="grid size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-lift"
        >
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  );
}
