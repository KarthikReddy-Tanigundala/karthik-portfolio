import { Nav } from "@/components/ui/nav";
import { LensProvider } from "@/components/ui/lens-provider";
import { Hero } from "@/components/sections/hero";
import { Numbers } from "@/components/sections/numbers";
import { Work } from "@/components/sections/work";
import { Toolkit } from "@/components/sections/toolkit";
import { Experience } from "@/components/sections/experience";
import { HowIWork } from "@/components/sections/how-i-work";
import { AskAI } from "@/components/sections/ask-ai";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <LensProvider>
      <Nav />
      <main>
        <Hero />
        <Numbers />
        <Work />
        <Toolkit />
        <Experience />
        <HowIWork />
        <AskAI />
        <Contact />
      </main>
      <Footer />
    </LensProvider>
  );
}
