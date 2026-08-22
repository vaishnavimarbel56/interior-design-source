import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UPLOADED_IMAGES, SUB_IMAGES } from "@/data/sub-images";
import showroom from "@/assets/showroom.png.asset.json";

type Slide = {
  image: string;
  eyebrow: string;
  title: string;
  text: string;
  to: string;
};

/** Eight hand-picked, non-duplicated showcase images for the home hero. */
const SLIDES: Slide[] = [
  {
    image: showroom.url,
    eyebrow: "Kolkata showroom",
    title: "Vaishnavi Marble — Kolkata's marble destination",
    text: "Italian marble, granite, tiles, sanitaryware, mandirs and statues under one roof.",
    to: "tiles",
  },
  {
    image: UPLOADED_IMAGES.radhaKrishna,
    eyebrow: "Marble statues",
    title: "Hand-carved Radha Krishna statues",
    text: "Pure white marble idols finished with gold detailing and vibrant hand painting.",
    to: "marble-statues",
  },
  {
    image: UPLOADED_IMAGES.lakshmi,
    eyebrow: "Devotional collection",
    title: "Goddess Lakshmi in flawless white marble",
    text: "Seated lotus idols crafted by master artisans for homes and temples.",
    to: "marble-statues",
  },
  {
    image: UPLOADED_IMAGES.marbleMandir,
    eyebrow: "Marble home interiors",
    title: "Bespoke marble mandirs",
    text: "Domes, pillars and jaali carving — built to your room size and budget.",
    to: "marble-home-interiors",
  },
  {
    image: UPLOADED_IMAGES.marbleFireplace,
    eyebrow: "Statement pieces",
    title: "Carved marble fireplaces",
    text: "Bas-relief mantels that turn a living room into a centrepiece.",
    to: "marble-home-interiors",
  },
  {
    image: UPLOADED_IMAGES.greenMarble,
    eyebrow: "Natural stone",
    title: "Green marble with dramatic veining",
    text: "Premium slabs selected block by block, polished to a mirror finish.",
    to: "marble-and-granite",
  },
  {
    image: SUB_IMAGES["granite"]!,
    eyebrow: "Granite",
    title: "Hard-wearing granite for kitchens & stairs",
    text: "Scratch and stain resistant surfaces in a wide palette of shades.",
    to: "marble-and-granite",
  },
  {
    image: SUB_IMAGES["floor-tiles"]!,
    eyebrow: "Tiles",
    title: "Vitrified floor & wall tiles",
    text: "Marble-look, wood-look and anti-skid ranges with live stock and bulk pricing.",
    to: "tiles",
  },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = SLIDES.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % count), 5200);
    return () => clearInterval(t);
  }, [paused, count]);

  const go = (dir: 1 | -1) => setI((v) => (v + dir + count) % count);

  return (
    <section
      className="relative overflow-hidden border-b border-border"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {SLIDES.map((s, idx) => (
        <img
          key={s.image}
          src={s.image}
          alt={s.title}
          loading={idx === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 size-full object-cover transition-all duration-[1200ms] ease-out ${
            idx === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-deep/90 via-stone-deep/65 to-stone-deep/20" />

      <div className="container-page relative py-24 md:py-28">
        <div key={i} className="animate-fade-in">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">{SLIDES[i]!.eyebrow}</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-accent md:text-6xl">
            {SLIDES[i]!.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-accent/85">{SLIDES[i]!.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/category/$categorySlug" params={{ categorySlug: SLIDES[i]!.to }}>
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

        <div className="mt-10 flex items-center gap-3">
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
          <div className="ml-2 flex gap-2">
            {SLIDES.map((s, idx) => (
              <button
                key={s.image}
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
