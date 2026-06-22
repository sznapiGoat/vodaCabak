"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Droplets,
  Flame,
  Bath,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Accent = "water" | "heat";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  points: string[];
  accent: Accent;
  span: string;
  image: string;
}

const SERVICES: Service[] = [
  {
    icon: Droplets,
    title: "Vodoinstalace",
    desc: "Kompletní rozvody studené a teplé vody, kanalizace a připojení spotřebičů. Lisované i pájené spoje s tlakovou zkouškou.",
    points: ["Rozvody vody", "Odpady a kanalizace", "Výměna baterií a ventilů"],
    accent: "water",
    span: "lg:col-span-3 lg:row-span-2",
    image: "/realizace/nemocnice-1.jpeg",
  },
  {
    icon: Flame,
    title: "Topenářské práce",
    desc: "Rozvody topení, otopná tělesa, podlahové topení a napojení kotlů.",
    points: ["Podlahové topení", "Radiátory", "Napojení kotlů"],
    accent: "heat",
    span: "lg:col-span-3",
    image: "/realizace/nemocnice-3.jpeg",
  },
  {
    icon: Bath,
    title: "Rekonstrukce koupelen",
    desc: "Kompletní přestavba koupelny od bouracích prací po finální obklad.",
    points: ["Sprchové kouty", "Obklady a dlažba"],
    accent: "water",
    span: "lg:col-span-2",
    image: "/realizace/bojler-2.jpeg",
  },
  {
    icon: Wrench,
    title: "Servis a havárie",
    desc: "Odstranění úniků, prasklých rozvodů a údržba otopné soustavy.",
    points: ["Úniky vody", "Odvzdušnění"],
    accent: "heat",
    span: "lg:col-span-1",
    image: "/realizace/vodarna-2.jpeg",
  },
];

function TiltCard({ service }: { service: Service }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 18,
  });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const Icon = service.icon;
  const isWater = service.accent === "water";

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl2 border border-edge bg-panel/60 p-6 backdrop-blur-sm [transform-style:preserve-3d]",
        "transition-shadow duration-300",
        isWater ? "hover:shadow-glow-water" : "hover:shadow-glow-heat",
        service.span
      )}
    >
      {/* Accent-aware background image bleed */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <img
          src={service.image}
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-25"
        />
        <div
          className={cn(
            "absolute inset-0",
            isWater
              ? "bg-gradient-to-br from-water/10 to-base/90"
              : "bg-gradient-to-br from-heat/10 to-base/90"
          )}
        />
      </div>

      <div
        className={cn(
          "mb-5 grid h-12 w-12 place-items-center rounded-xl border ring-1",
          isWater
            ? "border-water/30 bg-water/10 text-water ring-water/10"
            : "border-heat/30 bg-heat/10 text-heat ring-heat/10"
        )}
        style={{ transform: "translateZ(40px)" }}
      >
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </div>

      <h3
        className="font-display text-xl font-semibold text-white"
        style={{ transform: "translateZ(30px)" }}
      >
        {service.title}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
        {service.desc}
      </p>

      <ul className="mt-auto flex flex-wrap gap-2 pt-5">
        {service.points.map((p) => (
          <li
            key={p}
            className={cn(
              "rounded-full border px-3 py-1 text-xs",
              isWater
                ? "border-water/20 bg-water/5 text-water-soft"
                : "border-heat/20 bg-heat/5 text-heat-soft"
            )}
          >
            {p}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="sluzby" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-water">
            Co dělám
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            Dvě řemesla, jeden spolehlivý parťák
          </h2>
          <p className="mt-4 text-slate-400">
            Voda v odstínu cyan, topení v odstínu oranžové. Najeďte na kartu a
            uvidíte, čím se zabývám nejvíc.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-4 [perspective:1200px] md:grid-cols-2 lg:grid-cols-6"
          style={{ gridAutoRows: "minmax(0, auto)" }}
        >
          {SERVICES.map((s) => (
            <TiltCard key={s.title} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
