import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegalLayout, LegalRow, LegalSection } from "@/components/legal/LegalLayout";
import { SITE } from "@/lib/site";

type Locale = "fr" | "en" | "it";
type Args = { params: Promise<{ locale: string }> };

const tri = <T,>(fr: T, en: T, it: T): Record<Locale, T> => ({ fr, en, it });

const T = {
  label: tri("Mentions", "Legal", "Note legali"),
  title: tri("Mentions légales.", "Legal mentions.", "Note legali."),
  intro: tri(
    "Tout ce qui est exigé par le droit français, dit le plus directement possible.",
    "Everything required by French law, said as plainly as possible.",
    "Tutto ciò che è richiesto dalla legge francese, detto nel modo più diretto possibile.",
  ),

  s1: tri("Édition", "Publisher", "Editore"),
  s1_publisher: tri("Éditeur", "Publisher", "Editore"),
  s1_form: tri("Forme juridique", "Legal form", "Forma giuridica"),
  s1_address: tri("Adresse", "Address", "Indirizzo"),
  s1_siret: tri("SIRET", "SIRET", "SIRET"),
  s1_siren: tri("SIREN", "SIREN", "SIREN"),
  s1_ape: tri("Code APE", "APE code", "Codice APE"),
  s1_vat: tri("TVA intracommunautaire", "VAT number", "Partita IVA"),
  s1_contact: tri("Contact", "Contact", "Contatto"),
  s1_director: tri(
    "Directeur de la publication",
    "Publication director",
    "Direttore della pubblicazione",
  ),
  s1_publisher_value: tri(
    "FoxStudio — marque commerciale de FoxCase, exploitée par Christopher Cavalli.",
    "FoxStudio — trade name of FoxCase, operated by Christopher Cavalli.",
    "FoxStudio — denominazione commerciale di FoxCase, gestita da Christopher Cavalli.",
  ),
  s1_form_value: tri(
    "Entrepreneur Individuel (EI). Immatriculé le 7 novembre 2025.",
    "French sole trader (EI). Registered on November 7, 2025.",
    "Imprenditore individuale (EI). Registrato il 7 novembre 2025.",
  ),
  s1_address_value: tri(
    "45 Boulevard de la Croisette, 06400 Cannes, France",
    "45 Boulevard de la Croisette, 06400 Cannes, France",
    "45 Boulevard de la Croisette, 06400 Cannes, Francia",
  ),
  s1_siret_value: tri("834 802 407 00033", "834 802 407 00033", "834 802 407 00033"),
  s1_siren_value: tri("834 802 407", "834 802 407", "834 802 407"),
  s1_ape_value: tri(
    "6201Z — Programmation informatique",
    "6201Z — Computer programming",
    "6201Z — Programmazione informatica",
  ),
  s1_vat_value: tri("FR26834802407", "FR26834802407", "FR26834802407"),
  s1_director_value: tri("Christopher Cavalli", "Christopher Cavalli", "Christopher Cavalli"),

  s2: tri("Hébergement", "Hosting", "Hosting"),
  s2_app: tri("Application", "Application", "Applicazione"),
  s2_app_value: tri(
    "Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Région Paris (cdg1).",
    "Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Paris region (cdg1).",
    "Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Regione Parigi (cdg1).",
  ),
  s2_media: tri("Médias", "Media", "Media"),
  s2_media_value: tri(
    "Vercel Blob — Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
    "Vercel Blob — Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
    "Vercel Blob — Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
  ),
  s2_db: tri("Base de données", "Database", "Database"),
  s2_db_value: tri(
    "Neon Inc. — 209 Havemeyer St 3, Brooklyn, NY 11211, USA. Région us-east-1 (N. Virginia).",
    "Neon Inc. — 209 Havemeyer St 3, Brooklyn, NY 11211, USA. us-east-1 region (N. Virginia).",
    "Neon Inc. — 209 Havemeyer St 3, Brooklyn, NY 11211, USA. Regione us-east-1 (Virginia del Nord).",
  ),

  s3: tri("Propriété intellectuelle", "Intellectual property", "Proprietà intellettuale"),
  s3_p1: tri(
    "L'ensemble du site est la propriété de FoxStudio, sauf mention contraire. Le contenu éditorial est publié sous licence CC BY-NC 4.0 — vous pouvez le citer et le partager à des fins non commerciales en attribuant la source.",
    "The site is the property of FoxStudio unless otherwise stated. Editorial content is licensed under CC BY-NC 4.0 — you may quote and share it for non-commercial purposes with attribution.",
    "L'intero sito è di proprietà di FoxStudio salvo diversa indicazione. I contenuti editoriali sono pubblicati sotto licenza CC BY-NC 4.0 — potete citarli e condividerli a fini non commerciali con attribuzione.",
  ),
  s3_p2: tri(
    "Le code source du site est ouvert sur github.com/StudioCavalli/FoxStudio (à confirmer post-lancement).",
    "The source code of the site is open at github.com/StudioCavalli/FoxStudio (to be confirmed post-launch).",
    "Il codice sorgente del sito è aperto su github.com/StudioCavalli/FoxStudio (da confermare dopo il lancio).",
  ),
  s3_p3: tri(
    "Les marques et logos cités appartiennent à leurs propriétaires respectifs.",
    "Trademarks and logos cited are the property of their respective owners.",
    "I marchi e loghi citati appartengono ai rispettivi proprietari.",
  ),

  s4: tri("Crédits techniques", "Technical credits", "Crediti tecnici"),
  s4_fonts: tri("Polices", "Typefaces", "Caratteri"),
  s4_fonts_value: tri(
    "Geist Sans + Geist Mono (Vercel, OFL).",
    "Geist Sans + Geist Mono (Vercel, OFL).",
    "Geist Sans + Geist Mono (Vercel, OFL).",
  ),
  s4_stack: tri("Stack", "Stack", "Stack"),
  s4_stack_value: tri(
    "Next.js 15, React 19, Payload v3, Tailwind v4, Lenis, Three.js.",
    "Next.js 15, React 19, Payload v3, Tailwind v4, Lenis, Three.js.",
    "Next.js 15, React 19, Payload v3, Tailwind v4, Lenis, Three.js.",
  ),
  s4_design: tri("Design", "Design", "Design"),
  s4_design_value: tri(
    "FoxStudio (in-house). Patterns SVG procéduraux générés sur place.",
    "FoxStudio (in-house). Procedural SVG patterns generated on the fly.",
    "FoxStudio (in-house). Pattern SVG procedurali generati al volo.",
  ),
} as const;

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  return { title: T.title[l].replace(".", ""), description: T.intro[l] };
}

export default async function MentionsPage({ params }: Args) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  return (
    <LegalLayout
      number="01"
      label={T.label[l]}
      title={T.title[l]}
      intro={T.intro[l]}
      meta={`v${SITE.version} · ${new Date().toISOString().slice(0, 10)}`}
    >
      <LegalSection number="01" title={T.s1[l]}>
        <LegalRow label={T.s1_publisher[l]} value={T.s1_publisher_value[l]} />
        <LegalRow label={T.s1_form[l]} value={T.s1_form_value[l]} />
        <LegalRow label={T.s1_address[l]} value={T.s1_address_value[l]} />
        <LegalRow label={T.s1_siret[l]} value={T.s1_siret_value[l]} />
        <LegalRow label={T.s1_siren[l]} value={T.s1_siren_value[l]} />
        <LegalRow label={T.s1_ape[l]} value={T.s1_ape_value[l]} />
        <LegalRow label={T.s1_vat[l]} value={T.s1_vat_value[l]} />
        <LegalRow label={T.s1_director[l]} value={T.s1_director_value[l]} />
        <LegalRow
          label={T.s1_contact[l]}
          value={
            <a href={`mailto:${SITE.contact.email}`} className="underline underline-offset-[6px]">
              {SITE.contact.email}
            </a>
          }
        />
      </LegalSection>

      <LegalSection number="02" title={T.s2[l]}>
        <LegalRow label={T.s2_app[l]} value={T.s2_app_value[l]} />
        <LegalRow label={T.s2_media[l]} value={T.s2_media_value[l]} />
        <LegalRow label={T.s2_db[l]} value={T.s2_db_value[l]} />
      </LegalSection>

      <LegalSection number="03" title={T.s3[l]}>
        <p>{T.s3_p1[l]}</p>
        <p>{T.s3_p2[l]}</p>
        <p>{T.s3_p3[l]}</p>
      </LegalSection>

      <LegalSection number="04" title={T.s4[l]}>
        <LegalRow label={T.s4_fonts[l]} value={T.s4_fonts_value[l]} />
        <LegalRow label={T.s4_stack[l]} value={T.s4_stack_value[l]} />
        <LegalRow label={T.s4_design[l]} value={T.s4_design_value[l]} />
      </LegalSection>
    </LegalLayout>
  );
}
