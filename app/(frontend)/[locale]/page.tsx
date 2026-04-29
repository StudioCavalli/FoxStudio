import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/home/Hero";
import { Index } from "@/components/home/Index";
import { MarqueeBand } from "@/components/home/MarqueeBand";
import { StatsBand } from "@/components/home/StatsBand";
import { ContactTeaser, JournalTeaser, LabTeaser, StudioTeaser } from "@/components/home/Teasers";
import { LdJson } from "@/components/seo/LdJson";
import type { Locale } from "@/i18n/routing";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";

type Args = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Args) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  return (
    <>
      <LdJson data={[organizationSchema(), websiteSchema(l)]} />
      <Hero />
      <MarqueeBand />
      <Index locale={l} />
      <StatsBand />
      <LabTeaser />
      <StudioTeaser />
      <JournalTeaser locale={l} />
      <ContactTeaser />
    </>
  );
}
