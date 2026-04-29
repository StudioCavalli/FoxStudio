import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/visual/SectionHeader";

type Locale = "fr" | "en" | "it";
type Args = { params: Promise<{ locale: string }> };

const tri = <T,>(fr: T, en: T, it: T): Record<Locale, T> => ({ fr, en, it });

const T = {
  label: tri("Ombrys", "Ombrys", "Ombrys"),
  meta: tri("Collectif partenaire", "Partner collective", "Collettivo partner"),
  title: tri(
    "Pourquoi nous travaillons avec Ombrys.",
    "Why we work with Ombrys.",
    "Perché lavoriamo con Ombrys.",
  ),
  intro: tri(
    "Ombrys est un collectif documentaire qui publie des dossiers civiques rigoureux — sources citées, signatures cryptographiques, délibération collective avant publication. FoxStudio fournit l'infrastructure technique. Cette page explique ce que nous partageons, et ce que nous ne partageons pas.",
    "Ombrys is a documentary collective that publishes rigorous civic case files — cited sources, cryptographic signatures, collective deliberation before publication. FoxStudio supplies the technical infrastructure. This page explains what we share, and what we do not.",
    "Ombrys è un collettivo documentario che pubblica dossier civici rigorosi — fonti citate, firme crittografiche, deliberazione collettiva prima della pubblicazione. FoxStudio fornisce l'infrastruttura tecnica. Questa pagina spiega cosa condividiamo, e cosa no.",
  ),

  s1: tri("Le collectif", "The collective", "Il collettivo"),
  s1_p1: tri(
    "Ombrys s'est formé autour d'un constat simple : il existe des dossiers d'intérêt public qu'aucune institution ne ferme et qu'aucune institution ne rouvre. Pas par malveillance — par inertie. Le collectif documente ces dossiers selon une procédure publique : signalement chiffré, vérification de source, investigation en binôme, délibération à deux relecteurs indépendants, publication signée.",
    "Ombrys formed around a simple observation: certain public-interest case files are neither closed nor reopened by any institution. Not by malice — by inertia. The collective documents these files using a public procedure: encrypted intake, source verification, two-person investigation, deliberation by two independent reviewers, signed publication.",
    "Ombrys è nato attorno a una constatazione semplice: esistono dossier di interesse pubblico che nessuna istituzione chiude e che nessuna istituzione riapre davvero. Non per malafede — per inerzia. Il collettivo documenta questi dossier secondo una procedura pubblica: segnalazione cifrata, verifica della fonte, indagine in coppia, deliberazione a due revisori indipendenti, pubblicazione firmata.",
  ),
  s1_p2: tri(
    "La méthode et la charte sont versionnées sur GitHub (StudioCavalli/OmbrysWeb). Toute évolution passe par PR et délibération collective.",
    "The method and the charter are versioned on GitHub (StudioCavalli/OmbrysWeb). Any change goes through PR and collective deliberation.",
    "Il metodo e la carta sono versionati su GitHub (StudioCavalli/OmbrysWeb). Ogni evoluzione passa per PR e deliberazione collettiva.",
  ),

  s2: tri(
    "Ce que nous partageons (méthodologie)",
    "What we share (methodology)",
    "Cosa condividiamo (metodologia)",
  ),
  s2_p1: tri(
    "Sources avant convictions, traçabilité par signature cryptographique, refus du doxxing, distinction stricte entre fonction publique et personne privée. Ces principes sont les nôtres aussi — et ils se voient dans la façon dont le code est livré : commits signés, builds reproductibles, dépendances auditées, CI publique.",
    "Sources before convictions, traceability via cryptographic signature, refusal of doxxing, strict distinction between public role and private individual. We hold these principles too — and you can see them in how the code ships: signed commits, reproducible builds, audited dependencies, public CI.",
    "Fonti prima delle convinzioni, tracciabilità tramite firma crittografica, rifiuto del doxxing, distinzione netta tra ruolo pubblico e individuo privato. Sono anche i nostri principi — e si vedono nel modo in cui spediamo il codice: commit firmati, build riproducibili, dipendenze controllate, CI pubblica.",
  ),
  s2_p2: tri(
    "On peut résumer ainsi : une affirmation sans source citée n'est pas publiable, et un changement sans procédure n'est pas légitime. C'est vrai pour leurs articles, c'est vrai pour notre code.",
    "It boils down to this: a claim without a cited source isn't publishable, and a change without process isn't legitimate. True for their articles, true for our code.",
    "Si riassume così: un'affermazione senza fonte citata non è pubblicabile, e un cambiamento senza procedura non è legittimo. Vero per i loro articoli, vero per il nostro codice.",
  ),

  s3: tri("Ce que FoxStudio livre", "What FoxStudio delivers", "Cosa FoxStudio fornisce"),
  s3_p1: tri(
    "Le site public (Next.js + Payload, signé Ed25519 à la publication), les canaux de signalement chiffrés, le pipeline de stockage avec metadata minimisée, l'audit des dépendances et la chaîne de build. Bref : la plomberie technique qui rend leur méthode applicable à grande échelle, sans sacrifier la rigueur.",
    "The public site (Next.js + Payload, Ed25519-signed on publish), the encrypted intake channels, the storage pipeline with metadata minimisation, dependency auditing, and the build chain. The technical plumbing that scales their method without giving up rigour.",
    "Il sito pubblico (Next.js + Payload, firmato Ed25519 alla pubblicazione), i canali di segnalazione cifrati, la pipeline di storage con metadata minimizzati, l'audit delle dipendenze e la catena di build. Insomma: l'idraulica tecnica che rende il loro metodo applicabile su scala senza rinunciare al rigore.",
  ),
  s3_p2: tri(
    "Notre intervention s'arrête à l'infrastructure. Nous n'intervenons pas dans la rédaction, la délibération, ni le choix des dossiers — c'est leur prérogative et leur responsabilité.",
    "Our involvement stops at infrastructure. We don't take part in writing, deliberation, or case selection — those are their prerogative and their responsibility.",
    "Il nostro intervento si ferma all'infrastruttura. Non interveniamo nella redazione, nella deliberazione, né nella scelta dei dossier — è la loro prerogativa e la loro responsabilità.",
  ),

  s4: tri("Ce que nous ne sommes pas", "What we are not", "Cosa non siamo"),
  s4_p1: tri(
    "FoxStudio n'est pas un mouvement militant et ne se substitue pas à la presse, à la justice, ni aux institutions. Nous sommes un studio de R&D technique, basé à Cannes, qui livre des outils dont des partenaires comme Ombrys ont besoin pour faire leur travail correctement.",
    "FoxStudio is not an activist organisation and does not substitute for the press, the courts, or public institutions. We are an R&D studio, based in Cannes, building the tools partners like Ombrys need to do their work properly.",
    "FoxStudio non è un'organizzazione militante e non si sostituisce alla stampa, alla giustizia, né alle istituzioni. Siamo uno studio di R&D tecnico, con base a Cannes, che fornisce gli strumenti di cui partner come Ombrys hanno bisogno per fare il loro lavoro correttamente.",
  ),
  s4_p2: tri(
    "Travailler avec eux, c'est s'engager sur un standard méthodologique — pas signer un manifeste. Cette nuance compte.",
    "Working with them is a methodological commitment — not signing a manifesto. The distinction matters.",
    "Lavorare con loro significa impegnarsi su uno standard metodologico — non firmare un manifesto. La sfumatura conta.",
  ),

  visit: tri("Visiter ombrys.foxcase.fr", "Visit ombrys.foxcase.fr", "Visita ombrys.foxcase.fr"),
} as const;

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  return {
    title: `${T.label[l]} — ${T.meta[l]}`,
    description: T.intro[l],
  };
}

export default async function OmbrysPage({ params }: Args) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  return (
    <article className="pt-[var(--spacing-9)] pb-[var(--spacing-12)]">
      <Container>
        <SectionHeader number="00" label={T.label[l]} meta={T.meta[l]} />

        <h1 className="mt-[var(--spacing-6)] mb-[var(--spacing-7)] font-[var(--font-display)] font-medium leading-[0.92] tracking-[-0.03em] text-[clamp(48px,8vw,144px)]">
          {T.title[l]}
        </h1>

        <p className="mb-[var(--spacing-9)] max-w-[60ch] font-[var(--font-display)] leading-[var(--leading-snug)] tracking-[var(--tracking-display)] text-[clamp(20px,2vw,28px)] text-fg-secondary">
          {T.intro[l]}
        </p>

        <div className="space-y-[var(--spacing-9)]">
          <Section number="01" title={T.s1[l]}>
            <p>{T.s1_p1[l]}</p>
            <p>{T.s1_p2[l]}</p>
          </Section>

          <Section number="02" title={T.s2[l]}>
            <p>{T.s2_p1[l]}</p>
            <p>{T.s2_p2[l]}</p>
          </Section>

          <Section number="03" title={T.s3[l]}>
            <p>{T.s3_p1[l]}</p>
            <p>{T.s3_p2[l]}</p>
          </Section>

          <Section number="04" title={T.s4[l]}>
            <p>{T.s4_p1[l]}</p>
            <p>{T.s4_p2[l]}</p>
          </Section>
        </div>

        <div className="mt-[var(--spacing-10)] flex justify-end border-t border-border pt-[var(--spacing-5)]">
          <ArrowLink href="https://ombrys.foxcase.fr" external>
            {T.visit[l]}
          </ArrowLink>
        </div>
      </Container>
    </article>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <header className="mb-[var(--spacing-5)] flex items-baseline gap-[var(--spacing-3)] border-t border-fg pt-[var(--spacing-3)] font-[var(--font-mono)] text-[var(--text-mono-s)] uppercase tracking-[var(--tracking-mono)]">
        <span className="tabular text-fg">{number}</span>
        <span aria-hidden className="text-fg-tertiary">
          ▸
        </span>
        <span className="text-fg">{title}</span>
      </header>
      <div className="grid gap-[var(--spacing-7)] md:grid-cols-[1fr_2fr]">
        <div />
        <div className="max-w-[65ch] space-y-[var(--spacing-4)] text-[var(--text-body-l)] leading-[var(--leading-relaxed)] text-fg">
          {children}
        </div>
      </div>
    </section>
  );
}
