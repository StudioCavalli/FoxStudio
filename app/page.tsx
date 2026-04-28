import { Hero } from "@/components/home/Hero";
import { Index } from "@/components/home/Index";
import { ContactTeaser, JournalTeaser, LabTeaser, StudioTeaser } from "@/components/home/Teasers";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Index />
      <LabTeaser />
      <StudioTeaser />
      <JournalTeaser />
      <ContactTeaser />
    </>
  );
}
