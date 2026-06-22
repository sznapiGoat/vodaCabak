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
    <main className="relative min-h-[100dvh] overflow-x-clip">
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
