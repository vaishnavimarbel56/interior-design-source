import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLiveSite } from "@/lib/site-settings";

export function HeroCarousel() {
  const { slides } = useLiveSite();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const active = slides[Math.min(i, count - 1)];

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % count), 5200);
    return () => clearInterval(t);
  }, [paused, count]);

  const go = (dir: 1 | -1) => setI((v) => (v + dir + count) % count);

  if (!active) return null;

  return (
    <section
      className="relative overflow-hidden border-b border-border"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {slides.map((s, idx) => (
        <img
          key={s.id}
          src={s.image}
          alt={s.title}
          loading={idx === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 size-full object-cover transition-all duration-[1200ms] ease-out ${
            idx === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-deep/90 via-stone-deep/70 to-stone-deep/30" />

      <div className="container-page relative py-16 sm:py-20 md:py-28">
        <div key={i} className="animate-fade-in">
          <p className="text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
            {active.eyebrow}
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl leading-tight text-accent sm:text-4xl md:text-6xl">
            {active.title}
          </h1>
          <p className="mt-4 max-w-xl text-base text-accent/85 sm:text-lg">{active.text}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/category/$categorySlug" params={{ categorySlug: active.to }}>
                Explore collection <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/category/$categorySlug" params={{ categorySlug: "marble-statues" }}>
                Marble Statues
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
          <Button
            variant="secondary"
            size="icon"
            aria-label="Previous slide"
            className="rounded-full"
            onClick={() => go(-1)}
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Next slide"
            className="rounded-full"
            onClick={() => go(1)}
          >
            <ChevronRight className="size-5" />
          </Button>
          <div className="ml-1 flex gap-2 sm:ml-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === i ? "w-8 bg-primary" : "w-3 bg-accent/50 hover:bg-accent"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
