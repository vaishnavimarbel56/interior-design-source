import { Youtube, Facebook, MessageCircle, Mail, Phone } from "lucide-react";
import { SITE, whatsappHref, telHref } from "@/lib/site-info";

const items = [
  { href: SITE.social.youtube, label: "YouTube", Icon: Youtube },
  { href: SITE.social.facebook, label: "Facebook reel", Icon: Facebook },
  { href: whatsappHref, label: "WhatsApp", Icon: MessageCircle },
  { href: `mailto:${SITE.email}`, label: "Email", Icon: Mail },
  { href: telHref(SITE.phones[0]), label: "Call", Icon: Phone },
];

export function SocialLinks({ className = "" }: { className?: string }) {
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
