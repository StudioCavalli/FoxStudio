import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { getTeamMembers } from "@/lib/data/team";

type Locale = "fr" | "en" | "it";
type Args = { params: Promise<{ locale: string }> };

const tri = <T,>(fr: T, en: T, it: T): Record<Locale, T> => ({ fr, en, it });

const T = {
  label: tri("Équipe", "Team", "Team"),
  title: tri(
    "Deux fondateurs.\nUn studio.",
    "Two founders.\nOne studio.",
    "Due fondatori.\nUno studio.",
  ),
  intro: tri(
    "On est deux pour l'instant — un à Cannes, un à Paris. Assez petits pour que chaque projet ait un visage. Volontairement.",
    "Two of us for now — one in Cannes, one in Paris. Small enough that every project has a face. By choice.",
    "Siamo in due per ora — uno a Cannes, uno a Parigi. Abbastanza piccoli perché ogni progetto abbia un volto. Per scelta.",
  ),
  founders: tri("Fondateurs", "Founders", "Fondatori"),
  basedIn: tri("Basé à", "Based in", "Con base a"),
  countSingle: tri("1 membre", "1 member", "1 membro"),
  countPlural: tri("{n} membres", "{n} members", "{n} membri"),
} as const;

/**
 * Per-photo crop focus. Defaults to "center" — overridden when a photo's
 * subject sits off the geometric centre (e.g. landscape framing with the
 * subject on the left third).
 */
function photoFocus(slug: string): string {
  // Christopher: source image pre-cropped (top 64 %) to remove the belt /
  // hands area. The remaining frame is wider than the square container
  // (~2.34:1), so only horizontal centring matters.
  if (slug === "christopher") return "30% center";
  return "center";
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  return { title: T.label[l], description: T.intro[l] };
}

export default async function TeamPage({ params }: Args) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const members = await getTeamMembers(l);
  const tNav = await getTranslations("Nav");
  // We currently only seed two founders. The count copy is generic so it
  // scales as the team grows.
  const count =
    members.length === 1
      ? T.countSingle[l]
      : T.countPlural[l].replace("{n}", String(members.length));

  return (
    <article className="pt-[var(--spacing-9)] pb-[var(--spacing-12)]">
      <Container>
        <SectionHeader number="01" label={T.label[l]} meta={count} />

        <h1 className="mt-[var(--spacing-6)] mb-[var(--spacing-7)] font-[var(--font-display)] font-medium leading-[0.92] tracking-[-0.03em] text-[clamp(48px,8vw,144px)] whitespace-pre-line">
          {T.title[l]}
        </h1>

        <p className="mb-[var(--spacing-10)] max-w-[60ch] font-[var(--font-display)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[clamp(20px,2vw,28px)] text-[var(--color-fg-secondary)]">
          {T.intro[l]}
        </p>
      </Container>

      {/* Founders section — full-bleed alternating rows */}
      <section className="border-t border-[var(--color-border)]">
        <Container>
          <header className="border-b border-[var(--color-border)] py-[var(--spacing-3)]">
            <span className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
              {T.founders[l]} · {members.length}
            </span>
          </header>
        </Container>

        {members.map((member, idx) => {
          // Version suffix busts Next/Image's optimised cache when the source
          // file is recropped without renaming. Bump on every photo update.
          const photo = `/team/${member.photoSlug}.jpg?v=3`;
          const isOdd = idx % 2 === 1;
          return (
            <Container key={member.id}>
              <div
                className={`grid gap-[var(--spacing-7)] border-b border-[var(--color-border)] py-[var(--spacing-9)] md:gap-[var(--spacing-9)] md:py-[var(--spacing-11)] ${
                  isOdd ? "md:grid-cols-[2fr_1fr]" : "md:grid-cols-[1fr_2fr]"
                }`}
              >
                {/* Photo (order swapped on odd rows) */}
                <figure
                  className={`relative aspect-square w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)] ${
                    isOdd ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <Image
                    src={photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale transition duration-[var(--duration-base)] hover:grayscale-0"
                    style={{ objectPosition: photoFocus(member.photoSlug) }}
                    priority={idx === 0}
                  />
                  <figcaption className="pointer-events-none absolute right-[var(--spacing-3)] bottom-[var(--spacing-3)] left-[var(--spacing-3)] flex items-baseline justify-between font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg)] mix-blend-difference">
                    <span>
                      0{idx + 1} ▸ {member.photoSlug}
                    </span>
                    {member.location && (
                      <span>
                        {T.basedIn[l]} {member.location}
                      </span>
                    )}
                  </figcaption>
                </figure>

                <div
                  className={`flex flex-col justify-center ${isOdd ? "md:order-1" : "md:order-2"}`}
                >
                  <p className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                    {member.role}
                  </p>

                  <h2 className="mt-[var(--spacing-4)] font-[var(--font-display)] font-medium leading-[0.92] tracking-[-0.03em] text-[clamp(40px,6vw,112px)]">
                    {member.name}
                  </h2>

                  {member.bio && (
                    <p className="mt-[var(--spacing-6)] max-w-[55ch] text-[var(--text-body-l)] leading-[var(--leading-relaxed)] text-[var(--color-fg)]">
                      {member.bio}
                    </p>
                  )}

                  {member.links.length > 0 && (
                    <ul className="mt-[var(--spacing-7)] flex flex-wrap gap-[var(--spacing-5)] font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)]">
                      {member.links.map((link) => (
                        <li key={link.url}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="underline underline-offset-[6px] hover:text-[var(--color-fg-secondary)]"
                          >
                            {link.label} ↗
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Container>
          );
        })}
      </section>

      {/* Footer breadcrumb */}
      <Container>
        <p className="mt-[var(--spacing-9)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-tertiary)]">
          ▸ {tNav("studio")} · {tNav("works")} · {tNav("contact")}
        </p>
      </Container>
    </article>
  );
}
