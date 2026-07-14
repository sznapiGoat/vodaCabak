import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { BeforeAfter } from "@/components/site/before-after";
import { Gallery } from "@/components/site/gallery";
import { Process } from "@/components/site/process";
import { Configurator } from "@/components/site/configurator";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <main id="obsah" className="relative min-h-[100dvh] overflow-x-clip">
      <a
        href="#sluzby"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-water focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-zinc-950"
      >
        Přeskočit na obsah
      </a>
      <Navbar />
      <Hero />
      <Services />
      <BeforeAfter />
      <Gallery />
      <Process />
      <Configurator />
      <Contact />
      <Footer />
    </main>
  );
}
