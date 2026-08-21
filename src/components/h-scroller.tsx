import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Horizontal snap-scrolling row with desktop arrow controls. */
export function HScroller({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:thin]"
      >
        {children}
      </div>
      <div className="pointer-events-none absolute inset-y-0 -left-3 hidden items-center md:flex">
        <Button
          variant="secondary"
          size="icon"
          aria-label="Scroll left"
          onClick={() => scrollBy(-1)}
          className="pointer-events-auto rounded-full shadow-lift"
        >
          <ChevronLeft className="size-5" />
        </Button>
      </div>
      <div className="pointer-events-none absolute inset-y-0 -right-3 hidden items-center md:flex">
        <Button
          variant="secondary"
          size="icon"
          aria-label="Scroll right"
          onClick={() => scrollBy(1)}
          className="pointer-events-auto rounded-full shadow-lift"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
