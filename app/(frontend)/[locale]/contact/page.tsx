import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import type { ContactType } from "@/lib/contact/actions";
import { SITE } from "@/lib/site";

type Args = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
};

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return {
    title: t("title"),
    description: t("intro"),
  };
}

const VALID_TYPES = ["incubator", "company", "talent"] as const;

function isContactType(value: string | undefined): value is ContactType {
  return !!value && (VALID_TYPES as readonly string[]).includes(value);
}

export default async function ContactPage({ params, searchParams }: Args) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { type } = await searchParams;

  const t = await getTranslations("Contact");
  const selectedType: ContactType | undefined = isContactType(type) ? type : undefined;

  if (selectedType) {
    return <ContactPicked type={selectedType} />;
  }

  return (
    <section className="pt-[var(--spacing-9)] pb-[var(--spacing-12)]">
      <Container>
        <MonoLabel number="01">{t("label")}</MonoLabel>

        <h1 className="mt-[var(--spacing-6)] mb-[var(--spacing-3)] font-[var(--font-display)] font-medium text-[var(--text-display-l)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] md:text-[var(--text-display-xl)]">
          {t("title")}
        </h1>
        <p className="mb-[var(--spacing-9)] max-w-[60ch] text-[var(--color-fg-secondary)]">
          {t("intro")}
        </p>

        <ul className="grid gap-[var(--spacing-4)] md:grid-cols-3">
          {VALID_TYPES.map((doorType, i) => (
            <li key={doorType}>
              <a
                href={`/${locale}/contact?type=${doorType}`}
                className="group flex h-full flex-col justify-between border border-[var(--color-border)] p-[var(--spacing-6)] transition-colors duration-[var(--duration-fast)] hover:border-[var(--color-border-strong)]"
              >
                <div>
                  <p className="font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-[var(--spacing-3)] font-[var(--font-display)] text-[var(--text-heading)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] md:text-[var(--text-display-m)]">
                    {t(`door.${doorType}.title`)}
                  </p>
                  <p className="mt-[var(--spacing-3)] text-[var(--color-fg-secondary)]">
                    {t(`door.${doorType}.body`)}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="mt-[var(--spacing-7)] font-[var(--font-mono)] text-[var(--text-mono-m)] uppercase tracking-[var(--tracking-mono)]"
                >
                  {t("openDoor")} ▸
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-[var(--spacing-9)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)] text-[var(--color-fg-secondary)]">
          {t("orDirect")}{" "}
          <a
            href={`mailto:${SITE.contact.email}`}
            className="text-[var(--color-fg)] underline underline-offset-[6px]"
          >
            {SITE.contact.email}
          </a>
        </p>
      </Container>
    </section>
  );
}

async function ContactPicked({ type }: { type: ContactType }) {
  const t = await getTranslations("Contact");

  return (
    <section className="pt-[var(--spacing-9)] pb-[var(--spacing-12)]">
      <Container>
        <MonoLabel number="01">{t(`door.${type}.title`)}</MonoLabel>

        <h1 className="mt-[var(--spacing-6)] mb-[var(--spacing-3)] font-[var(--font-display)] font-medium text-[var(--text-display-m)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] md:text-[var(--text-display-l)]">
          {t(`door.${type}.title`)}
        </h1>
        <p className="mb-[var(--spacing-9)] max-w-[60ch] text-[var(--color-fg-secondary)]">
          {t(`door.${type}.body`)}
        </p>

        <div className="max-w-[640px]">
          <ContactForm type={type} />
        </div>
      </Container>
    </section>
  );
}
