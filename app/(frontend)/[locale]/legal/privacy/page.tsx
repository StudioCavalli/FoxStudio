import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegalLayout, LegalRow, LegalSection } from "@/components/legal/LegalLayout";
import { SITE } from "@/lib/site";

type Locale = "fr" | "en" | "it";
type Args = { params: Promise<{ locale: string }> };

const tri = <T,>(fr: T, en: T, it: T): Record<Locale, T> => ({ fr, en, it });

const T = {
  label: tri("Confidentialité", "Privacy", "Privacy"),
  title: tri("On ne vous suit pas.", "We don't track you.", "Non vi seguiamo."),
  intro: tri(
    "Pas de cookie analytique. Pas de pixel tiers. Pas de fingerprinting. Voici ce qu'on collecte, et seulement ça.",
    "No analytics cookie. No third-party pixel. No fingerprinting. Here's what we collect — and only that.",
    "Nessun cookie analitico. Nessun pixel di terze parti. Nessun fingerprinting. Ecco cosa raccogliamo, e solo questo.",
  ),

  s1: tri("Engagement", "Commitment", "Impegno"),
  s1_p1: tri(
    "Naviguer sur ce site n'envoie aucune donnée vers un service tiers à votre insu. Pas de Google Analytics, pas de Facebook Pixel, pas de Hotjar, pas de fingerprinting comportemental.",
    "Browsing this site sends no data to a third-party service without your knowledge. No Google Analytics, no Facebook Pixel, no Hotjar, no behavioural fingerprinting.",
    "Navigare in questo sito non invia alcun dato a servizi di terze parti a vostra insaputa. Niente Google Analytics, niente Facebook Pixel, niente Hotjar, niente fingerprinting comportamentale.",
  ),
  s1_p2: tri(
    "Le seul cookie déposé est techniquement nécessaire (préférence de langue, choisie par vous via le commutateur du header). Il expire à la fin de la session si vous ne l'utilisez pas.",
    "The only cookie set is strictly necessary (language preference, chosen by you via the header switch). It expires at session end if unused.",
    "L'unico cookie impostato è strettamente necessario (preferenza lingua, scelta da voi tramite il selettore dell'header). Scade al termine della sessione se non usato.",
  ),

  s2: tri("Ce qu'on collecte", "What we collect", "Cosa raccogliamo"),
  s2_form: tri("Formulaire de contact", "Contact form", "Modulo di contatto"),
  s2_form_value: tri(
    "Nom, email, et le contenu de votre message. Stockés dans notre boîte mail (Resend) le temps de vous répondre.",
    "Name, email, and the content of your message. Stored in our inbox (Resend) for as long as needed to reply.",
    "Nome, email e il contenuto del messaggio. Memorizzati nella nostra casella mail (Resend) per il tempo necessario a rispondere.",
  ),
  s2_audience: tri("Audience", "Analytics", "Statistiche"),
  s2_audience_value: tri(
    "Plausible Analytics — sans cookie, agrégé, anonyme. Aucune donnée personnelle n'est collectée. Hébergé en UE.",
    "Plausible Analytics — cookieless, aggregated, anonymous. No personal data is collected. EU-hosted.",
    "Plausible Analytics — senza cookie, aggregato, anonimo. Nessun dato personale raccolto. Hosting in UE.",
  ),
  s2_perf: tri("Vitals", "Vitals", "Vitals"),
  s2_perf_value: tri(
    "Vercel Speed Insights — métriques de performance Web Vitals, sans identifiant utilisateur, agrégées par page.",
    "Vercel Speed Insights — Web Vitals performance metrics, without user identifier, aggregated by page.",
    "Vercel Speed Insights — metriche di performance Web Vitals, senza identificativo utente, aggregate per pagina.",
  ),

  s3: tri("Vos droits (RGPD)", "Your rights (GDPR)", "I vostri diritti (GDPR)"),
  s3_p1: tri(
    "Vous disposez d'un droit d'accès, de rectification, de suppression, de portabilité, et d'opposition concernant vos données personnelles.",
    "You have the right to access, rectify, erase, port, and object to processing of your personal data.",
    "Avete il diritto di accesso, rettifica, cancellazione, portabilità e opposizione al trattamento dei vostri dati personali.",
  ),
  s3_p2: tri(
    "Pour exercer ces droits, écrivez à hello@foxstudio.fr. On vous répond en moins de 30 jours, en pratique sous 72 h.",
    "To exercise these rights, write to hello@foxstudio.fr. We reply within 30 days at most — in practice under 72 hours.",
    "Per esercitare questi diritti, scrivete a hello@foxstudio.fr. Rispondiamo entro 30 giorni al massimo — in pratica entro 72 ore.",
  ),
  s3_p3: tri(
    "Vous pouvez aussi déposer une réclamation auprès de la CNIL (cnil.fr).",
    "You may also file a complaint with the French data protection authority (cnil.fr) or your local equivalent.",
    "Potete anche presentare un reclamo all'autorità francese di protezione dei dati (cnil.fr) o all'equivalente locale.",
  ),

  s4: tri("Conservation", "Retention", "Conservazione"),
  s4_emails: tri("Emails de contact", "Contact emails", "Email di contatto"),
  s4_emails_value: tri(
    "Conservés tant que la relation est active. Suppression automatique après 24 mois sans interaction.",
    "Kept as long as the relationship is active. Auto-deleted after 24 months without interaction.",
    "Conservate finché la relazione è attiva. Cancellazione automatica dopo 24 mesi senza interazione.",
  ),
  s4_logs: tri("Logs serveur", "Server logs", "Log del server"),
  s4_logs_value: tri(
    "30 jours, anonymisés au-delà. Utilisés exclusivement pour la sécurité et le débogage.",
    "30 days, anonymised beyond. Used solely for security and debugging.",
    "30 giorni, anonimizzati oltre. Usati esclusivamente per sicurezza e debugging.",
  ),
} as const;

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  return { title: T.label[l], description: T.intro[l] };
}

export default async function PrivacyPage({ params }: Args) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  return (
    <LegalLayout
      number="02"
      label={T.label[l]}
      title={T.title[l]}
      intro={T.intro[l]}
      meta={`RGPD · ${new Date().toISOString().slice(0, 10)}`}
    >
      <LegalSection number="01" title={T.s1[l]}>
        <p>{T.s1_p1[l]}</p>
        <p>{T.s1_p2[l]}</p>
      </LegalSection>

      <LegalSection number="02" title={T.s2[l]}>
        <LegalRow label={T.s2_form[l]} value={T.s2_form_value[l]} />
        <LegalRow label={T.s2_audience[l]} value={T.s2_audience_value[l]} />
        <LegalRow label={T.s2_perf[l]} value={T.s2_perf_value[l]} />
      </LegalSection>

      <LegalSection number="03" title={T.s3[l]}>
        <p>{T.s3_p1[l]}</p>
        <p>
          {T.s3_p2[l].split("hello@foxstudio.fr")[0]}
          <a href={`mailto:${SITE.contact.email}`} className="underline underline-offset-[6px]">
            {SITE.contact.email}
          </a>
          {T.s3_p2[l].split("hello@foxstudio.fr")[1]}
        </p>
        <p className="text-[var(--color-fg-secondary)]">{T.s3_p3[l]}</p>
      </LegalSection>

      <LegalSection number="04" title={T.s4[l]}>
        <LegalRow label={T.s4_emails[l]} value={T.s4_emails_value[l]} />
        <LegalRow label={T.s4_logs[l]} value={T.s4_logs_value[l]} />
      </LegalSection>
    </LegalLayout>
  );
}
