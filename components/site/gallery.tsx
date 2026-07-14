"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Photo = { src: string; caption: string };

type Project = {
  title: string;
  blurb: string;
  reference?: boolean;
  accent: "water" | "heat";
  photos: Photo[];
};

const PROJECTS: Project[] = [
  {
    title: "Vsetínská nemocnice — výměna degradovaného potrubí",
    blurb:
      "Kompletní výměna zkorodovaných páteřních rozvodů v technických prostorách nemocnice.",
    reference: true,
    accent: "water",
    photos: [
      {
        src: "/realizace/nemocnice-1.jpeg",
        caption: "Zkorodované rozvody před výměnou",
      },
      {
        src: "/realizace/nemocnice-2.jpeg",
        caption: "Páteřní rozvody v technické chodbě",
      },
    ],
  },
  {
    title: "Bojlery a zanesené rozvody",
    blurb:
      "Čištění zásobníků teplé vody a výměna potrubí zaneseného vodním kamenem.",
    accent: "heat",
    photos: [
      {
        src: "/realizace/nemocnice-3.jpeg",
        caption: "Zanesený zásobník teplé vody",
      },
      {
        src: "/realizace/vodarna-2.jpeg",
        caption: "Potrubí zanesené vodním kamenem, řez",
      },
      {
        src: "/realizace/bojler-1.jpeg",
        caption: "Vodní kámen vytěžený z rozvodů",
      },
    ],
  },
  {
    title: "Koupelny, baterie a domácí vodárny",
    blurb:
      "Rekonstrukce koupelen, výměny baterií a instalace domácích vodáren.",
    accent: "water",
    photos: [
      {
        src: "/realizace/bojler-2.jpeg",
        caption: "Sprchový kout po rekonstrukci",
      },
      { src: "/realizace/bojler-3.jpeg", caption: "Nová páková baterie" },
      {
        src: "/realizace/vodarna-1.jpeg",
        caption: "Štěpán při výměně domácí vodárny",
      },
    ],
  },
];

const ALL_PHOTOS: Photo[] = PROJECTS.flatMap((p) => p.photos);

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : ALL_PHOTOS[activeIndex];

  const shift = useCallback((dir: 1 | -1) => {
    setActiveIndex((i) =>
      i === null ? i : (i + dir + ALL_PHOTOS.length) % ALL_PHOTOS.length
    );
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") shift(-1);
      if (e.key === "ArrowRight") shift(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, shift]);

  return (
    <section id="galerie" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-water">
            Realizace
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            Skutečné zakázky, skutečné fotky
          </h2>
          <p className="mt-4 text-slate-400">
            Výběr z dokončených prací. Od páteřních rozvodů ve Vsetínské
            nemocnici po koncové baterie v bytech.
          </p>
        </div>

        <div className="space-y-14">
          {PROJECTS.map((project) => (
            <div key={project.title}>
              <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <h3 className="font-display text-xl font-semibold text-white">
                  {project.title}
                </h3>
                {project.reference && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-water/40 bg-water/10 px-3 py-1 text-xs font-medium text-water">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Reference
                  </span>
                )}
              </div>
              <p className="mb-6 max-w-2xl text-sm text-slate-400">
                {project.blurb}
              </p>

              <div
                className={cn(
                  "grid grid-cols-2 gap-3 sm:gap-4",
                  project.photos.length === 2
                    ? "lg:grid-cols-2"
                    : "lg:grid-cols-3"
                )}
              >
                {project.photos.map((photo, i) => (
                  <motion.button
                    key={photo.src}
                    type="button"
                    onClick={() =>
                      setActiveIndex(
                        ALL_PHOTOS.findIndex((p) => p.src === photo.src)
                      )
                    }
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={cn(
                      "group relative overflow-hidden rounded-xl2 border border-edge bg-panel text-left",
                      project.photos.length === 2
                        ? "aspect-[4/3]"
                        : "aspect-[4/5]"
                    )}
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base via-base/10 to-transparent opacity-90" />
                    <div
                      className={cn(
                        "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                        project.accent === "water"
                          ? "ring-2 ring-inset ring-water/50"
                          : "ring-2 ring-inset ring-heat/50"
                      )}
                    />
                    <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-base/60 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                      <ZoomIn className="h-4 w-4" />
                    </span>
                    <span className="absolute inset-x-3 bottom-3 text-sm font-medium text-slate-100">
                      {photo.caption}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={!!active}
        onOpenChange={(o) => !o && setActiveIndex(null)}
      >
        <DialogContent className="max-w-3xl p-3">
          <DialogTitle className="sr-only">
            {active?.caption ?? "Fotografie zakázky"}
          </DialogTitle>
          {active && (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={active.src}
                alt={active.caption}
                className="max-h-[78vh] w-full object-contain"
              />
              <button
                type="button"
                aria-label="Předchozí fotka"
                onClick={() => shift(-1)}
                className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-base/70 text-white backdrop-blur-md transition-colors hover:border-water/60"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Další fotka"
                onClick={() => shift(1)}
                className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-base/70 text-white backdrop-blur-md transition-colors hover:border-water/60"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <p className="px-1 pb-1 pt-3 text-center text-sm text-slate-400">
                {active.caption}
                <span className="ml-2 text-slate-600">
                  {(activeIndex ?? 0) + 1} / {ALL_PHOTOS.length}
                </span>
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
