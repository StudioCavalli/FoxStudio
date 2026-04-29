import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/home/Hero";
import { Index } from "@/components/home/Index";
import { MarqueeBand } from "@/components/home/MarqueeBand";
import { StatsBand } from "@/components/home/StatsBand";
import { ContactTeaser, JournalTeaser, LabTeaser, StudioTeaser } from "@/components/home/Teasers";

type Args = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Args) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <MarqueeBand />
      <Index />
      <StatsBand />
      <LabTeaser />
      <StudioTeaser />
      <JournalTeaser />
      <ContactTeaser />
    </>
  );
}
