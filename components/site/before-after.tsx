"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";

// TODO: swap these for a REAL matched pair — the SAME spot photographed
// before and after the work. Until then these are illustrative shots from
// two different jobs, so the slider shows contrast, not one transformation.
const BEFORE = {
  src: "/realizace/nemocnice-1.jpeg",
  alt: "Před: zkorodované a degradované potrubí",
};
const AFTER = {
  src: "/realizace/bojler-3.jpeg",
  alt: "Po: čistá nová instalace s novou pákovou baterií",
};

export function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [width, setWidth] = useState(0);
  const dragging = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, pct)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragging.current) setFromClientX(e.clientX);
    };
    const up = () => (dragging.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  return (
    <section id="realizace" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-heat">
              Před a po
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
              Z degradovaného potrubí čistá nová instalace
            </h2>
          </div>
          <p className="text-slate-400 lg:col-span-4">
            Přetáhněte posuvník a porovnejte stav, který přebírám, s výsledkem,
            který předávám. Ilustrační fotky ze dvou různých zakázek.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-xl2 border border-edge md:aspect-[16/8]"
          onPointerDown={(e) => {
            dragging.current = true;
            setFromClientX(e.clientX);
          }}
        >
          {/* AFTER (full, underneath) */}
          <img
            src={AFTER.src}
            alt={AFTER.alt}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-water/40 bg-base/70 px-3 py-1 text-xs text-water backdrop-blur-md">
            Po
          </div>

          {/* BEFORE (clipped) */}
          <div
            className="absolute inset-0 h-full overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            <img
              src={BEFORE.src}
              alt={BEFORE.alt}
              className="absolute inset-0 h-full max-w-none object-cover"
              style={{ width: width || "100%" }}
              draggable={false}
            />
            <div className="absolute inset-0 bg-base/30 mix-blend-multiply" />
            <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-heat/40 bg-base/70 px-3 py-1 text-xs text-heat backdrop-blur-md">
              Před
            </div>
          </div>

          {/* Handle — focusable slider, arrow keys move it */}
          <div
            className="absolute inset-y-0 z-10 w-0.5 bg-white/80"
            style={{ left: `${pos}%` }}
          >
            <motion.button
              type="button"
              role="slider"
              aria-label="Porovnání před a po"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                  e.preventDefault();
                  setPos((p) => Math.max(2, p - 4));
                } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                  e.preventDefault();
                  setPos((p) => Math.min(98, p + 4));
                }
              }}
              whileTap={{ scale: 0.92 }}
              className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-white/30 bg-base/80 text-white shadow-glow-water backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-water/60"
            >
              <MoveHorizontal className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
