"use client";

import { motion } from "framer-motion";
import { PhoneCall, ClipboardList, Hammer, BadgeCheck } from "lucide-react";

const STEPS = [
  {
    icon: PhoneCall,
    title: "Ozvete se",
    body: "Zavoláte nebo vyplníte poptávku. Probereme, co potřebujete, a domluvíme prohlídku.",
  },
  {
    icon: ClipboardList,
    title: "Návrh a cena",
    body: "Na místě zaměřím rozsah prací a připravím jasnou kalkulaci bez skrytých položek.",
  },
  {
    icon: Hammer,
    title: "Realizace",
    body: "Pracuji čistě a v dohodnutém termínu. Spoje lisuji a tlakuji, ať máte jistotu.",
  },
  {
    icon: BadgeCheck,
    title: "Předání",
    body: "Dílo předám uklizené, vysvětlím obsluhu a dám záruku na odvedenou práci.",
  },
];

export function Process() {
  return (
    <section id="postup" className="relative border-y border-edge/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-water">
            Jak to probíhá
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            Čtyři kroky od telefonu k hotovému dílu
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl2 border border-edge bg-edge md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative bg-panel/70 p-7"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-display text-5xl font-bold text-edge transition-colors group-hover:text-water/40">
                    0{i + 1}
                  </span>
                  <Icon className="h-6 w-6 text-slate-500 transition-colors group-hover:text-water" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {s.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
