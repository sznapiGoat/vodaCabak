"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const ITEMS = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+420 731 200 845",
    href: "tel:+420731200845",
    accent: "water" as const,
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "vodotopo-cabak@seznam.cz",
    href: "mailto:vodotopo-cabak@seznam.cz",
    accent: "heat" as const,
  },
  {
    icon: MapPin,
    label: "Adresa",
    value: "Horní Jasenka 175, 755 01 Vsetín",
    href: "https://maps.google.com/?q=Horní+Jasenka+175+Vsetín",
    accent: "water" as const,
  },
  {
    icon: Clock,
    label: "Dostupnost",
    value: "Po–So dle domluvy, havárie i mimo",
    accent: "heat" as const,
  },
];

export function Contact() {
  return (
    <section id="kontakt" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="overflow-hidden rounded-xl2 border border-edge bg-panel/50">
          <div className="grid lg:grid-cols-2">
            {/* Left: details */}
            <div className="p-8 md:p-12">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-water/30 bg-water/5 px-3.5 py-1.5 text-xs text-water">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-water opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-water" />
                </span>
                Aktivní region · Vsetín a okolí
              </div>

              <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                Pojďme to spravit
              </h2>
              <p className="mt-4 max-w-md text-slate-400">
                Zavolejte, napište nebo využijte poptávkový formulář. Domluvíme
                prohlídku a navrhnu řešení na míru vašemu objektu.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {ITEMS.map((it) => {
                  const Icon = it.icon;
                  const isWater = it.accent === "water";
                  const inner = (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="flex items-start gap-3 rounded-xl border border-edge bg-white/[0.02] p-4 transition-colors hover:border-slate-600"
                    >
                      <span
                        className={
                          isWater
                            ? "grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-water/30 bg-water/10 text-water"
                            : "grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-heat/30 bg-heat/10 text-heat"
                        }
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs uppercase tracking-wide text-slate-500">
                          {it.label}
                        </span>
                        <span className="mt-0.5 block break-words text-sm font-medium text-slate-100">
                          {it.value}
                        </span>
                      </span>
                    </motion.div>
                  );
                  return it.href ? (
                    <a key={it.label} href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      {inner}
                    </a>
                  ) : (
                    <div key={it.label}>{inner}</div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="water">
                  <a href="tel:+420731200845">
                    <Phone className="h-4 w-4" />
                    Zavolat
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#poptavka">Vyplnit poptávku</a>
                </Button>
              </div>
            </div>

            {/* Right: stylized service-radius panel (self-contained, no external map) */}
            <div className="relative min-h-[320px] overflow-hidden border-t border-edge lg:border-l lg:border-t-0">
              <div className="absolute inset-0 bg-gradient-to-br from-water/[0.06] via-transparent to-heat/[0.05]" />
              <div className="absolute inset-0 bg-grid opacity-50" />

              {/* concentric range rings around the pin */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {[120, 220, 320].map((size) => (
                  <span
                    key={size}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-water/15"
                    style={{ width: size, height: size }}
                  />
                ))}
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-slate-600 [transform:translate(-50%,-50%)_translateY(-172px)]">
                  do 30 km
                </span>
                <span className="relative flex h-5 w-5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-water opacity-60" />
                  <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-water text-zinc-950">
                    <MapPin className="h-3 w-3" />
                  </span>
                </span>
              </div>

              <a
                href="https://maps.google.com/?q=Horní+Jasenka+175+Vsetín"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-5 left-5 rounded-lg border border-edge bg-base/80 px-4 py-3 backdrop-blur-md transition-colors hover:border-water/50"
              >
                <p className="font-display text-sm font-semibold text-white">
                  Horní Jasenka, Vsetín
                </p>
                <p className="text-xs text-slate-400">
                  Dojezd po celém Vsetínsku a okolí · otevřít mapu
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
