import { Navbar } from "@/components/navigation/navbar";
import { Hero } from "@/components/sections/hero";
import { Service } from "@/components/sections/service";
import { Experience } from "@/components/sections/experience";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Service />
      <Experience />
    </main>
  );
}