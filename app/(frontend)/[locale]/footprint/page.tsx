import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

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
    "Mesuré au build du commit en cours.",
    "Measured at the build of the current commit.",
    "Misurato al build del commit corrente.",
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
    "Notre budget carbone par vue est ≤ 0,20 g CO₂e (cf. cahier des charges §7.2). On est dans le top 10 % du web mondial selon websitecarbon.com.",
    "Our per-view carbon budget is ≤ 0.20 gCO₂e (see specs §7.2). That puts us in the top 10 % of the web according to websitecarbon.com.",
    "Il nostro budget carbonio per vista è ≤ 0,20 gCO₂e (cfr. capitolato §7.2). Siamo nel top 10 % del web globale secondo websitecarbon.com.",
  ),
  s3_p2: tri(
    "Le budget est appliqué automatiquement en CI : si une PR fait dépasser le seuil, le build échoue. Le script qui le fait est dans scripts/measure-carbon.ts.",
    "The budget is enforced automatically in CI: if a PR pushes us over the threshold, the build fails. The enforcement script lives in scripts/measure-carbon.ts.",
    "Il budget è applicato automaticamente in CI: se una PR ci porta sopra la soglia, il build fallisce. Lo script di enforcement è in scripts/measure-carbon.ts.",
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

const PAGES = [
  { key: "s2_home" as const, kb: "121 kB", co2: "0,04 g CO₂" },
  { key: "s2_works" as const, kb: "120 kB", co2: "0,04 g CO₂" },
  { key: "s2_project" as const, kb: "121 kB", co2: "0,04 g CO₂" },
  { key: "s2_lab" as const, kb: "121 kB", co2: "0,04 g CO₂" },
  { key: "s2_studio" as const, kb: "121 kB", co2: "0,04 g CO₂" },
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
        {PAGES.map((p) => (
          <LegalRow
            key={p.key}
            label={T[p.key][l]}
            value={
              <span className="tabular">
                {p.kb} · <span className="text-fg">{p.co2}</span>
              </span>
            }
          />
        ))}
        <LegalRow label={T.s2_admin[l]} value={T.s2_admin_value[l]} />
      </LegalSection>

      <LegalSection number="03" title={T.s3[l]}>
        <p>{T.s3_p1[l]}</p>
        <p>{T.s3_p2[l]}</p>
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
