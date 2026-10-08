import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Tools from "@/components/Tools";
import Moments from "@/components/Moments";
import Compare from "@/components/Compare";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Tools />
        <Moments />
        <Compare />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
