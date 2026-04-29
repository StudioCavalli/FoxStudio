import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { RouteFootprints } from "@/components/footprint/RouteFootprints";
import { LegalLayout, LegalRow, LegalSection } from "@/components/legal/LegalLayout";

type Locale = "fr" | "en" | "it";
type Args = { params: Promise<{ locale: string }> };

const tri = <T,>(fr: T, en: T, it: T): Record<Locale, T> => ({ fr, en, it });

const T = {
  label: tri("Empreinte", "Footprint", "Impronta"),
  title: tri("Le coût de cette page.", "What this page costs.", "Il costo di questa pagina."),
  intro: tri(
    "On annonce un budget carbone, on le mesure, on l'expose. Pas de greenwashing, pas de moyenne sur l'année — la vraie empreinte par vue.",
    "We announce a carbon budget, measure it, and put it on the page. No greenwashing, no yearly average — the real footprint, per view.",
    "Annunciamo un budget carbonio, lo misuriamo, lo esponiamo. Niente greenwashing, niente media annuale — la vera impronta, per vista.",
  ),

  s1: tri("Méthodologie", "Methodology", "Metodologia"),
  s1_p1: tri(
    "On utilise le modèle Sustainable Web Design (SWD) v3 simplifié : 0,81 kWh par gigaoctet transféré, multiplié par l'intensité moyenne du réseau électrique mondial (442 g CO₂e / kWh). Ça donne ≈ 358 g CO₂e par gigaoctet, soit 3,33 × 10⁻⁷ g CO₂e par octet.",
    "We use the Sustainable Web Design (SWD) v3 simplified model: 0.81 kWh per gigabyte transferred, times the global average grid intensity (442 gCO₂e / kWh). That works out to ≈ 358 gCO₂e per gigabyte, or 3.33 × 10⁻⁷ gCO₂e per byte.",
    "Usiamo il modello Sustainable Web Design (SWD) v3 semplificato: 0,81 kWh per gigabyte trasferito, moltiplicato per l'intensità media della rete elettrica globale (442 gCO₂e / kWh). Risulta in ≈ 358 gCO₂e per gigabyte, ovvero 3,33 × 10⁻⁷ gCO₂e per byte.",
  ),
  s1_p2: tri(
    "On mesure côté serveur au moment du build : la somme des chunks gzip réellement chargés par chaque page. C'est conservateur (on suppose que tout est servi froid, sans cache navigateur).",
    "We measure server-side at build time: the sum of gzip chunks actually loaded by each page. It's conservative (we assume everything is served cold, no browser cache).",
    "Misuriamo lato server al momento della build: la somma dei chunk gzip effettivamente caricati da ogni pagina. È conservativa (supponiamo che tutto sia servito a freddo, senza cache del browser).",
  ),

  s2: tri("Mesures actuelles", "Current measurements", "Misure attuali"),
  s2_intro: tri(
    "Mesuré dans ton navigateur, à l'instant — fetch des routes + assets liés, somme des octets, conversion via le coefficient SWD v3 (3,33 × 10⁻⁷ g CO₂e / octet).",
    "Measured in your browser right now — fetching each route + linked assets, summing bytes, converting via the SWD v3 coefficient (3.33 × 10⁻⁷ gCO₂e / byte).",
    "Misurato nel tuo browser ora — fetch di ogni route + asset collegati, somma byte, conversione tramite il coefficiente SWD v3 (3,33 × 10⁻⁷ gCO₂e / byte).",
  ),
  s2_home: tri("Home /", "Home /", "Home /"),
  s2_works: tri("Works /works", "Works /works", "Works /works"),
  s2_project: tri("Projet /works/[slug]", "Project /works/[slug]", "Progetto /works/[slug]"),
  s2_lab: tri("Lab /lab", "Lab /lab", "Lab /lab"),
  s2_studio: tri("Studio /studio", "Studio /studio", "Studio /studio"),
  s2_admin: tri("Admin CMS /admin", "Admin CMS /admin", "Admin CMS /admin"),
  s2_admin_value: tri(
    "735 kB · réservé à l'équipe éditoriale, exclu du budget public.",
    "735 kB · reserved for the editorial team, excluded from the public budget.",
    "735 kB · riservato al team editoriale, escluso dal budget pubblico.",
  ),

  s3: tri("Budget", "Budget", "Budget"),
  s3_p1: tri(
    "Notre cible est ≤ 0,20 g CO₂e par vue (cahier des charges §7.2). Les valeurs réelles sont dans la section précédente — mesurées dans ton navigateur, pas estimées par un tiers.",
    "Our target is ≤ 0.20 gCO₂e per view (specs §7.2). Real values sit in the section above — measured in your browser, not estimated by a third party.",
    "Il nostro obiettivo è ≤ 0,20 gCO₂e per vista (capitolato §7.2). I valori reali sono nella sezione sopra — misurati nel tuo browser, non stimati da un terzo.",
  ),
  s3_p2: tri(
    "Pour comparer, la médiane d'une page web en 2024 transfère ≈ 2,5 Mo (HTTP Archive), soit ≈ 0,83 g CO₂e par vue — environ quatre fois notre cible.",
    "For context, the 2024 web page median transfers ≈ 2.5 MB (HTTP Archive), roughly 0.83 gCO₂e per view — about four times our target.",
    "Per riferimento, la mediana di una pagina web nel 2024 trasferisce ≈ 2,5 MB (HTTP Archive), circa 0,83 gCO₂e per vista — circa quattro volte il nostro obiettivo.",
  ),
  s3_p3: tri(
    "Le budget est appliqué en CI : sur chaque PR, le workflow `Performance` lance `scripts/measure-carbon.ts` qui calcule le poids gzip des chunks de la home et exit 1 si ça dépasse 0,20 g. Vérifiable dans `.github/workflows/perf.yml`.",
    "The budget is enforced in CI: on every PR, the `Performance` workflow runs `scripts/measure-carbon.ts`, which gzips the home chunks and exits 1 over 0.20 g. See `.github/workflows/perf.yml`.",
    "Il budget è applicato in CI: su ogni PR, il workflow `Performance` lancia `scripts/measure-carbon.ts` che calcola il peso gzip dei chunk della home ed esce con 1 se supera 0,20 g. Vedi `.github/workflows/perf.yml`.",
  ),

  s4: tri("Hébergement", "Hosting", "Hosting"),
  s4_app: tri("Application", "Application", "Applicazione"),
  s4_app_value: tri(
    "Vercel — région cdg1 (Paris). Pas certifié bas carbone, compensé par un budget transfert agressif et un edge cache global.",
    "Vercel — cdg1 region (Paris). Not certified low-carbon, offset by an aggressive transfer budget and global edge cache.",
    "Vercel — regione cdg1 (Parigi). Non certificato a basso carbonio, compensato da un budget di trasferimento aggressivo e cache edge globale.",
  ),
  s4_media: tri("Médias", "Media", "Media"),
  s4_media_value: tri(
    "Cloudflare R2 — réseau bas-carbone certifié, zéro frais d'egress (donc zéro incitation à déplacer la charge ailleurs).",
    "Cloudflare R2 — certified low-carbon network, zero egress fees (therefore zero incentive to push load elsewhere).",
    "Cloudflare R2 — rete a basso carbonio certificata, zero costi di egress (quindi zero incentivi a spostare il carico altrove).",
  ),
  s4_db: tri("Base de données", "Database", "Database"),
  s4_db_value: tri(
    "Vercel Postgres ou Neon, eu-central-1 (Frankfurt). Allumée à la demande (serverless cold start ~ 200 ms).",
    "Vercel Postgres or Neon, eu-central-1 (Frankfurt). On-demand wake-up (serverless cold start ~ 200 ms).",
    "Vercel Postgres o Neon, eu-central-1 (Francoforte). Avvio su richiesta (serverless cold start ~ 200 ms).",
  ),

  s5: tri("Au-delà du transfert", "Beyond transfer", "Oltre al trasferimento"),
  s5_p1: tri(
    "Le modèle SWD ne couvre que la phase d'usage (réseau + appareil + datacenter). On ne mesure pas — pour l'instant — la fabrication des terminaux côté visiteur, ni l'amortissement matériel des serveurs. Notre estimation est donc plancher.",
    "The SWD model only covers the use phase (network + device + datacenter). We don't measure — for now — manufacturing of visitor devices, nor server hardware amortisation. Our estimate is therefore a floor.",
    "Il modello SWD copre solo la fase d'uso (rete + dispositivo + datacenter). Non misuriamo — per ora — la fabbricazione dei dispositivi del visitatore, né l'ammortamento dell'hardware dei server. La nostra stima è quindi un minimo.",
  ),
  s5_p2: tri(
    "Pour réduire encore : assets statiques cachés agressivement, dynamic imports systématiques, dark mode par défaut (économie OLED), zéro autoplay vidéo. Tout est documenté dans CDC §7.",
    "To go further: assets cached aggressively, dynamic imports systematic, dark mode by default (OLED savings), zero video autoplay. It's all documented in specs §7.",
    "Per andare oltre: asset memorizzati nella cache in modo aggressivo, dynamic import sistematici, dark mode di default (risparmio OLED), zero autoplay video. Tutto documentato nelle specs §7.",
  ),
} as const;

/**
 * Routes whose footprint we want to display in the table.
 * Paths are locale-relative — the client component prepends the active
 * locale at runtime so /works actually fetches /fr/works (or /en/works).
 */
const ROUTE_DEFS = [
  { key: "s2_home" as const, path: "" },
  { key: "s2_works" as const, path: "/works" },
  { key: "s2_project" as const, path: "/works/memoria" },
  { key: "s2_lab" as const, path: "/lab" },
  { key: "s2_studio" as const, path: "/studio" },
];

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  return { title: T.label[l], description: T.intro[l] };
}

export default async function FootprintPage({ params }: Args) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  return (
    <LegalLayout
      number="03"
      label={T.label[l]}
      title={T.title[l]}
      intro={T.intro[l]}
      meta="≤ 0,20 g CO₂ / view"
    >
      <LegalSection number="01" title={T.s1[l]}>
        <p>{T.s1_p1[l]}</p>
        <p>{T.s1_p2[l]}</p>
      </LegalSection>

      <LegalSection number="02" title={T.s2[l]}>
        <p className="text-fg-secondary">{T.s2_intro[l]}</p>
        <RouteFootprints
          routes={ROUTE_DEFS.map((r) => ({
            path: `/${l}${r.path}` || `/${l}`,
            label: T[r.key][l],
          }))}
        />
        <LegalRow label={T.s2_admin[l]} value={T.s2_admin_value[l]} />
      </LegalSection>

      <LegalSection number="03" title={T.s3[l]}>
        <p>{T.s3_p1[l]}</p>
        <p>{T.s3_p2[l]}</p>
        <p>{T.s3_p3[l]}</p>
      </LegalSection>

      <LegalSection number="04" title={T.s4[l]}>
        <LegalRow label={T.s4_app[l]} value={T.s4_app_value[l]} />
        <LegalRow label={T.s4_media[l]} value={T.s4_media_value[l]} />
        <LegalRow label={T.s4_db[l]} value={T.s4_db_value[l]} />
      </LegalSection>

      <LegalSection number="05" title={T.s5[l]}>
        <p>{T.s5_p1[l]}</p>
        <p>{T.s5_p2[l]}</p>
      </LegalSection>
    </LegalLayout>
  );
}
