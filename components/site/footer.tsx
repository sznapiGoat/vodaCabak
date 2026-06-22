import { Droplets, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-edge bg-base/80">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-water/20 to-heat/20 ring-1 ring-edge">
                <Droplets className="h-[18px] w-[18px] text-water" strokeWidth={2} />
              </span>
              <span className="font-display text-[15px] font-semibold text-white">
                Vodo-Topo Čabák
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Vodoinstalatérské a topenářské práce ve Vsetíně a okolí. Marek
              Čabák. Čistá práce, jasná cena.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-500">
              Kontakt
            </p>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <a href="tel:+420731200845" className="inline-flex items-center gap-2 hover:text-water">
                  <Phone className="h-4 w-4 text-water" /> +420 731 200 845
                </a>
              </li>
              <li>
                <a href="mailto:vodotopo-cabak@seznam.cz" className="inline-flex items-center gap-2 hover:text-water">
                  <Mail className="h-4 w-4 text-heat" /> vodotopo-cabak@seznam.cz
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-water" /> Horní Jasenka 175, Vsetín
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-500">
              Služby
            </p>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#sluzby" className="hover:text-white">Vodoinstalace</a></li>
              <li><a href="#sluzby" className="hover:text-white">Topenářské práce</a></li>
              <li><a href="#sluzby" className="hover:text-white">Rekonstrukce koupelen</a></li>
              <li><a href="#poptavka" className="hover:text-white">Nezávazná poptávka</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-edge pt-6 text-xs text-slate-600 sm:flex-row">
          <p>© {new Date().getFullYear()} Vodo-Topo Čabák · Vsetín</p>
          <p>Voda v cyan, topení v oranžové.</p>
        </div>
      </div>
    </footer>
  );
}
