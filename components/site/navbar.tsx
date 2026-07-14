"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#sluzby", label: "Služby" },
  { href: "#realizace", label: "Před a po" },
  { href: "#galerie", label: "Realizace" },
  { href: "#postup", label: "Postup" },
  { href: "#poptavka", label: "Poptávka" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-edge/80 bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-water/20 to-heat/20 ring-1 ring-edge">
            <Droplets className="h-[18px] w-[18px] text-water" strokeWidth={2} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-semibold tracking-tight text-white">
              Vodo-Topo Čabák
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Voda · Topení · Vsetín
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button asChild size="sm" className="h-10 px-5">
            <a href="tel:+420731200845">
              <Phone className="h-4 w-4" strokeWidth={2} />
              731 200 845
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:+420731200845"
            aria-label="Zavolat +420 731 200 845"
            className="grid h-10 w-10 place-items-center rounded-lg bg-water text-zinc-950 shadow-glow-water"
          >
            <Phone className="h-[18px] w-[18px]" strokeWidth={2} />
          </a>
          <button
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-edge text-slate-200"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-edge bg-base/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-slate-200 hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <Button asChild className="mt-2">
                <a href="tel:+420731200845">
                  <Phone className="h-4 w-4" />
                  Zavolat 731 200 845
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
