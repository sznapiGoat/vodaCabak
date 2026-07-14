"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  Flame,
  Bath,
  Wrench,
  Home,
  Building2,
  Store,
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Accent = "water" | "heat";
type Option = { id: string; label: string; icon: LucideIcon; accent: Accent };

const SERVICES: Option[] = [
  { id: "voda", label: "Vodoinstalace", icon: Droplets, accent: "water" },
  { id: "topeni", label: "Topení", icon: Flame, accent: "heat" },
  { id: "koupelna", label: "Rekonstrukce koupelny", icon: Bath, accent: "water" },
  { id: "servis", label: "Servis / havárie", icon: Wrench, accent: "heat" },
];

const PROPERTIES: Option[] = [
  { id: "byt", label: "Byt", icon: Building2, accent: "water" },
  { id: "dum", label: "Rodinný dům", icon: Home, accent: "heat" },
  { id: "provozovna", label: "Provozovna", icon: Store, accent: "water" },
];

const STEPS = ["Služba", "Objekt", "Kontakt"];

export function Configurator() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [property, setProperty] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", note: "" });
  const [done, setDone] = useState(false);

  const canNext =
    (step === 0 && service) || (step === 1 && property) || step === 2;

  const accent: Accent =
    SERVICES.find((s) => s.id === service)?.accent ?? "water";

  function submit() {
    const svc = SERVICES.find((s) => s.id === service)?.label ?? "";
    const prop = PROPERTIES.find((p) => p.id === property)?.label ?? "";
    const subject = encodeURIComponent(`Poptávka: ${svc} (${prop})`);
    const body = encodeURIComponent(
      `Služba: ${svc}\nObjekt: ${prop}\nJméno: ${form.name}\nTelefon: ${form.phone}\nPoznámka: ${form.note}`
    );
    // open the user's mail client with a prefilled message
    window.location.href = `mailto:vodotopo-cabak@seznam.cz?subject=${subject}&body=${body}`;
    setDone(true);
  }

  return (
    <section id="poptavka" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-heat">
              Nezávazná poptávka
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Sestavte poptávku ve třech krocích
            </h2>
            <p className="mt-4 text-slate-400">
              Vyberte službu a typ objektu, nechte kontakt. Ozvu se obvykle týž
              den a domluvíme prohlídku.
            </p>

            <ol className="mt-8 space-y-3">
              {STEPS.map((s, i) => (
                <li
                  key={s}
                  className={cn(
                    "flex items-center gap-3 text-sm transition-colors",
                    i === step
                      ? "text-white"
                      : i < step
                      ? "text-slate-300"
                      : "text-slate-500"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold",
                      i < step
                        ? "border-water/50 bg-water/10 text-water"
                        : i === step
                        ? "border-water bg-water text-zinc-950"
                        : "border-edge"
                    )}
                  >
                    {i < step ? "✓" : i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-xl2 border border-edge bg-panel/60 p-6 backdrop-blur-sm md:p-8">
              {/* progress bar */}
              <div className="mb-7 h-1 w-full overflow-hidden rounded-full bg-edge">
                <motion.div
                  className={cn(
                    "h-full rounded-full",
                    accent === "water" ? "bg-water" : "bg-heat"
                  )}
                  animate={{ width: `${((step + 1) / 3) * 100}%` }}
                  transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {step === 0 && (
                    <div>
                      <h3 className="mb-5 font-display text-lg font-semibold text-white">
                        Jakou práci potřebujete?
                      </h3>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {SERVICES.map((o) => (
                          <SelectCard
                            key={o.id}
                            option={o}
                            active={service === o.id}
                            onClick={() => setService(o.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <h3 className="mb-5 font-display text-lg font-semibold text-white">
                        O jaký objekt jde?
                      </h3>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {PROPERTIES.map((o) => (
                          <SelectCard
                            key={o.id}
                            option={o}
                            active={property === o.id}
                            onClick={() => setProperty(o.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (form.name && form.phone) submit();
                      }}
                    >
                      <h3 className="mb-5 font-display text-lg font-semibold text-white">
                        Kam se vám mám ozvat?
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="name">Jméno</Label>
                          <Input
                            id="name"
                            autoComplete="name"
                            placeholder="Jan Novák"
                            value={form.name}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="phone">Telefon</Label>
                          <Input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="+420 …"
                            value={form.phone}
                            onChange={(e) =>
                              setForm({ ...form, phone: e.target.value })
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-2 sm:col-span-2">
                          <Label htmlFor="note">Krátký popis (nepovinné)</Label>
                          <Input
                            id="note"
                            placeholder="Např. výměna baterie a odpadu v koupelně"
                            value={form.note}
                            onChange={(e) =>
                              setForm({ ...form, note: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </form>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* nav */}
              <div className="mt-8 flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className={cn(step === 0 && "pointer-events-none opacity-0")}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Zpět
                </Button>

                {step < 2 ? (
                  <Button
                    variant={accent}
                    disabled={!canNext}
                    onClick={() => setStep((s) => Math.min(2, s + 1))}
                  >
                    Pokračovat
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant={accent}
                    disabled={!form.name || !form.phone}
                    onClick={submit}
                  >
                    Odeslat poptávku
                    <Send className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={done} onOpenChange={setDone}>
        <DialogContent>
          <div className="mb-1 grid h-12 w-12 place-items-center rounded-full bg-water/10 text-water">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <DialogTitle>Poptávka je připravená</DialogTitle>
          <DialogDescription>
            Otevřel se váš e-mailový klient s předvyplněnou zprávou. Stačí ji
            odeslat na vodotopo-cabak@seznam.cz. Můžete mi také rovnou zavolat na
            +420 731 200 845.
          </DialogDescription>
          <Button asChild className="mt-2">
            <a href="tel:+420731200845">Zavolat hned</a>
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function SelectCard({
  option,
  active,
  onClick,
}: {
  option: Option;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = option.icon;
  const isWater = option.accent === "water";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 active:translate-y-[1px]",
        active
          ? isWater
            ? "border-water/60 bg-water/10 shadow-glow-water"
            : "border-heat/60 bg-heat/10 shadow-glow-heat"
          : "border-edge bg-white/[0.02] hover:border-slate-600"
      )}
    >
      <span
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-lg border",
          active
            ? isWater
              ? "border-water/40 bg-water/15 text-water"
              : "border-heat/40 bg-heat/15 text-heat"
            : "border-edge text-slate-400 group-hover:text-slate-200"
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <span
        className={cn(
          "text-sm font-medium",
          active ? "text-white" : "text-slate-300"
        )}
      >
        {option.label}
      </span>
    </button>
  );
}
