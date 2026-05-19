import { Nav } from "@/components/ui/nav";
import { Hero } from "@/components/sections/hero";
import { Pitch } from "@/components/sections/pitch";
import { Numbers } from "@/components/sections/numbers";
import { SelectedWork } from "@/components/sections/selected-work";
import { HowIWork } from "@/components/sections/how-i-work";
import { Background } from "@/components/sections/background";
import { Currently } from "@/components/sections/currently";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Pitch />
        <Numbers />
        <SelectedWork />
        <HowIWork />
        <Background />
        <Currently />
        <Contact />
      </main>
      <Footer />
    </>
  );
}