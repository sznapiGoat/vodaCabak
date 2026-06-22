"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden pt-[68px]"
    >
      {/* Fire + water slow-motion mesh gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -left-[10%] top-[8%] h-[42rem] w-[42rem] animate-mesh-water rounded-full bg-water/25 blur-[120px]" />
        <div className="absolute right-[-8%] top-[20%] h-[40rem] w-[40rem] animate-mesh-heat rounded-full bg-heat/20 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[34rem] w-[34rem] animate-mesh-water rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-base/10 via-base/40 to-base" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 py-16 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="flex flex-col justify-center lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-edge bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-water opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-water" />
            </span>
            Volné termíny ve Vsetíně a okolí
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl font-bold leading-[1.04] tracking-tight text-white md:text-6xl"
          >
            Voda, která{" "}
            <span className="bg-gradient-to-r from-water-soft to-water bg-clip-text text-transparent">
              teče
            </span>
            ,<br className="hidden md:block" /> a topení, které{" "}
            <span className="bg-gradient-to-r from-heat-soft to-heat bg-clip-text text-transparent">
              hřeje
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg"
          >
            Marek Čabák. Vodoinstalatérské a topenářské práce s precizními
            lisovanými spoji. Čistá práce, jasná cena, termín, který platí.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg" variant="water">
              <a href="#poptavka">
                Nezávazná poptávka
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="tel:+420731200845">
                <Phone className="h-4 w-4" strokeWidth={2} />
                +420 731 200 845
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-400"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-water" /> Záruka na práci
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-heat" /> Vsetín a okolí do 30 km
            </span>
          </motion.div>
        </div>

        {/* Visual: real plumbing/heating photo with dual-glow frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative overflow-hidden rounded-xl2 border border-edge shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            <img
              src="/realizace/nemocnice-1.jpeg"
              alt="Reálná zakázka: výměna degradovaného potrubí ve Vsetínské nemocnici"
              className="h-[420px] w-full object-cover md:h-[560px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-water/30 bg-base/70 p-3 backdrop-blur-md">
                <p className="font-display text-xl font-semibold text-water">
                  15+
                </p>
                <p className="text-xs text-slate-400">let praxe v oboru</p>
              </div>
              <div className="rounded-lg border border-heat/30 bg-base/70 p-3 backdrop-blur-md">
                <p className="font-display text-xl font-semibold text-heat">
                  100 %
                </p>
                <p className="text-xs text-slate-400">tlakové zkoušky spojů</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
