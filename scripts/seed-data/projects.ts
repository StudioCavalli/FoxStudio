/**
 * Seed data for the 12 FoxStudio projects.
 * Source: README.md of each repo under github.com/StudioCavalli.
 *
 * Each project carries non-localized fields (slug, year, stack, state)
 * plus localized fields in fr/en/it (name when meaningful, summary,
 * context, approach, results.label). The seed script writes EN first
 * then payload.update for FR and IT.
 */

export type Locale = "fr" | "en" | "it";

export type ResultMetric = {
  value: string;
  label: Record<Locale, string>;
};

export type ProjectSeed = {
  number: string;
  slug: string;
  /** Brand name — usually identical across locales. */
  name: Record<Locale, string>;
  /** One-liner shown in /works index. */
  summary: Record<Locale, string>;
  /** Act 1 of /works/[slug]: the why. Paragraphs separated by a blank line. */
  context: Record<Locale, string>;
  /** Act 2 of /works/[slug]: the how. Paragraphs separated by a blank line. */
  approach: Record<Locale, string>;
  year: number;
  state: "live" | "wip" | "archived";
  stack: { tech: string }[];
  /** Optional partners: { name, url }. */
  partners?: { name: string; url?: string }[];
  /** Three signature metrics for the project page. */
  results: ResultMetric[];
  /** GitHub repo (without the org prefix). Used for "view source" links. */
  repo: string;
};

const tri = (fr: string, en: string, it: string): Record<Locale, string> => ({ fr, en, it });

export const PROJECTS: ProjectSeed[] = [
  {
    number: "001",
    slug: "nonno-robot",
    repo: "NonnoRobot",
    name: tri("NonnoRobot", "NonnoRobot", "NonnoRobot"),
    summary: tri(
      "Chef robotique piloté par IA — pizza et pâtes faites maison, du pétrissage au dressage.",
      "AI-powered robotic chef cooking pizza and pasta from scratch — kneading, plating, the lot.",
      "Chef robotico guidato dall'IA — pizza e pasta fatte in casa, dall'impasto all'impiattamento.",
    ),
    context: tri(
      "Un robot ne sait pas pétrir. Il sait suivre une trajectoire, appliquer une force, mesurer une résistance. Le pétrissage demande tout ça simultanément, avec un retour tactile en boucle fermée. C'est un problème ouvert depuis vingt ans.\n\nNonnoRobot est notre tentative : utiliser une recette comme ancrage symbolique, une caméra comme oracle visuel, et un transformer comme planificateur d'actions. Pas une démo en chambre froide — un robot capable de produire une pizza margherita comestible en moins de douze minutes.",
      "A robot doesn't know how to knead. It knows how to follow a trajectory, apply force, measure resistance. Kneading requires all three at once, with closed-loop tactile feedback. The problem has been open for twenty years.\n\nNonnoRobot is our attempt: use a recipe as symbolic anchor, a camera as visual oracle, and a transformer as action planner. Not a demo in a cold lab — a robot that can produce an edible margherita in under twelve minutes.",
      "Un robot non sa impastare. Sa seguire una traiettoria, applicare una forza, misurare una resistenza. L'impasto richiede tutto questo simultaneamente, con un feedback tattile a ciclo chiuso. È un problema aperto da vent'anni.\n\nNonnoRobot è il nostro tentativo: usare una ricetta come ancoraggio simbolico, una camera come oracolo visivo e un transformer come pianificatore d'azione. Non una demo in laboratorio — un robot capace di produrre una margherita commestibile in meno di dodici minuti.",
    ),
    approach: tri(
      "On vectorise 47 recettes (étapes, ingrédients, gestes) et on les indexe avec un embedding multimodal qui combine texte et image. Au moment de cuisiner, le robot retrouve la recette la plus proche du brief utilisateur, génère un plan d'actions ROS 2, et exécute pas à pas en re-vérifiant l'état après chaque étape.\n\nLa stack tient en onze services Docker : FastAPI pour l'orchestration, ROS 2 Jazzy pour le contrôle moteur, PyTorch pour la vision, Postgres pour le journal, Redis pour les états transitoires. Le tout pilotable depuis un dashboard Next.js — utile en démo, indispensable en debug.",
      "We vectorise 47 recipes (steps, ingredients, gestures) and index them with a multimodal embedding combining text and image. At cook time, the robot retrieves the recipe closest to the user brief, generates a ROS 2 action plan, and executes step by step, re-checking state after each one.\n\nThe stack runs across eleven Docker services: FastAPI for orchestration, ROS 2 Jazzy for motor control, PyTorch for vision, Postgres for the journal, Redis for transient state. Everything controllable from a Next.js dashboard — useful in demos, essential in debugging.",
      "Vettorizziamo 47 ricette (passaggi, ingredienti, gesti) e le indicizziamo con un embedding multimodale che combina testo e immagine. Al momento di cucinare, il robot recupera la ricetta più vicina al brief utente, genera un piano d'azione ROS 2 ed esegue passo per passo, ricontrollando lo stato dopo ognuno.\n\nLo stack gira su undici servizi Docker: FastAPI per l'orchestrazione, ROS 2 Jazzy per il controllo motore, PyTorch per la visione, Postgres per il journal, Redis per gli stati transitori. Tutto pilotabile da una dashboard Next.js — utile nelle demo, indispensabile in debug.",
    ),
    year: 2026,
    state: "wip",
    stack: [
      { tech: "FastAPI" },
      { tech: "ROS 2 Jazzy" },
      { tech: "PyTorch" },
      { tech: "Next.js 15" },
      { tech: "Postgres 16" },
      { tech: "Redis" },
      { tech: "Docker" },
    ],
    results: [
      {
        value: "11",
        label: tri("services orchestrés", "services orchestrated", "servizi orchestrati"),
      },
      {
        value: "47",
        label: tri("recettes vectorisées", "vectorised recipes", "ricette vettorializzate"),
      },
      {
        value: "120 ms",
        label: tri("latence vision-action", "vision-to-action latency", "latenza visione-azione"),
      },
    ],
  },

  {
    number: "002",
    slug: "memoria",
    repo: "Memoria",
    name: tri("Memoria", "Memoria", "Memoria"),
    summary: tri(
      "IA biographique pour seniors 80+. Compagnon vocal qui recueille les souvenirs de vie et veille sur les premiers signes de déclin cognitif.",
      "Biographical AI for seniors 80+. A voice companion that collects life memories and watches for early signs of cognitive decline.",
      "IA biografica per anziani 80+. Compagno vocale che raccoglie i ricordi di vita e veglia sui primi segni di declino cognitivo.",
    ),
    context: tri(
      "À 85 ans, on n'apprend pas une nouvelle interface. On répond quand on est interpellé. Les outils numériques pour seniors confondent souvent dignité et simplification — ils traitent l'aîné comme un enfant.\n\nMemoria fait l'inverse. Une tablette, un bouton. Une voix bienveillante qui pose une question par jour. Les souvenirs récoltés sont mis en forme et envoyés en gazette hebdomadaire à la famille. Et discrètement, en arrière-plan, on écoute le rythme, le vocabulaire, les hésitations — pour repérer ce qu'un médecin verrait à six mois de distance.",
      "At 85, you don't learn a new interface. You answer when called. Digital tools for seniors often confuse dignity with simplification — they treat the elder like a child.\n\nMemoria does the opposite. A tablet, one button. A kind voice that asks one question a day. Memories gathered are typeset and sent as a weekly Gazette to the family. And quietly, in the background, we listen to rhythm, vocabulary, hesitations — to spot what a doctor would notice six months apart.",
      "A 85 anni non si impara una nuova interfaccia. Si risponde quando si è interpellati. Gli strumenti digitali per anziani confondono spesso dignità con semplificazione — trattano l'anziano come un bambino.\n\nMemoria fa il contrario. Un tablet, un pulsante. Una voce benevola che pone una domanda al giorno. I ricordi raccolti vengono impaginati e inviati come gazzetta settimanale alla famiglia. E discretamente, in sottofondo, ascoltiamo ritmo, vocabolario, esitazioni — per individuare ciò che un medico vedrebbe a sei mesi di distanza.",
    ),
    approach: tri(
      "Côté tablette : React Native + NativeWind, une seule view, un gros bouton. Aucun menu, aucun écran de réglage visible — tout se règle côté famille.\n\nCôté serveur : un pipeline FastAPI qui transcrit, analyse, archive. La gazette est mise en forme en HTML+CSS print-ready, envoyée par email. La sentinelle cognitive tourne en local sur les transcriptions, sans transcription brute persistée — uniquement des features extraites (rythme syllabique, richesse lexicale, taux d'hésitation).\n\nLe dashboard famille (Next.js 15) montre les souvenirs, les alertes, et un timeline cognitif lisible pour qui n'est pas neurologue.",
      "On the tablet: React Native + NativeWind, a single view, one big button. No menu, no visible settings — everything is configured family-side.\n\nOn the server: a FastAPI pipeline that transcribes, analyses, archives. The Gazette is laid out in print-ready HTML+CSS, sent by email. The cognitive sentinel runs locally on transcripts, with no raw transcript persisted — only extracted features (syllable rate, lexical richness, hesitation rate).\n\nThe family dashboard (Next.js 15) shows memories, alerts, and a cognitive timeline readable by non-neurologists.",
      "Lato tablet: React Native + NativeWind, una sola view, un grande pulsante. Nessun menu, nessuna impostazione visibile — tutto si configura lato famiglia.\n\nLato server: un pipeline FastAPI che trascrive, analizza, archivia. La gazzetta è impaginata in HTML+CSS print-ready, inviata via email. La sentinella cognitiva gira in locale sulle trascrizioni, senza trascrizione grezza persistita — solo feature estratte (ritmo sillabico, ricchezza lessicale, tasso di esitazione).\n\nLa dashboard famiglia (Next.js 15) mostra ricordi, allerte e una timeline cognitiva leggibile per chi non è neurologo.",
    ),
    year: 2026,
    state: "live",
    partners: [{ name: "CCI Nice Côte d'Azur", url: "https://cote-azur.cci.fr" }],
    stack: [
      { tech: "FastAPI" },
      { tech: "Postgres" },
      { tech: "React Native" },
      { tech: "Next.js 15" },
      { tech: "Tailwind v4" },
    ],
    results: [
      {
        value: "1 200",
        label: tri("souvenirs collectés", "memories collected", "ricordi raccolti"),
      },
      {
        value: "7",
        label: tri(
          "indicateurs cognitifs suivis",
          "cognitive markers tracked",
          "marcatori cognitivi monitorati",
        ),
      },
      {
        value: "AMI",
        label: tri("Silver Économie 2026", "Silver Economy 2026 call", "bando Silver Economy 2026"),
      },
    ],
  },

  {
    number: "003",
    slug: "kidverse",
    repo: "KidVerse",
    name: tri("Kidverse", "Kidverse", "Kidverse"),
    summary: tri(
      "App phygitale pour enfants 3–15 ans. La première qui les récompense quand ils posent le téléphone et passent à l'action dans le monde réel.",
      "Phygital app for kids 3–15. The first that rewards them when they put the phone down and act in the real world.",
      "App phygital per bambini 3–15. La prima che li ricompensa quando posano il telefono e agiscono nel mondo reale.",
    ),
    context: tri(
      "On parle beaucoup de temps d'écran et jamais de quoi le remplacer. Les apps « éducatives » empilent les badges pour garder l'enfant scotché — c'est la même mécanique que TikTok avec un vernis pédagogique.\n\nKidverse retourne le contrat. La récompense ne s'obtient pas EN utilisant l'app, mais APRÈS, dans le monde réel. Tu fais une quête (jardiner, dessiner, courir, lire à voix haute) ; l'app vérifie que tu l'as faite ; tu gagnes des atomes, monnaie de l'univers. Plus tu poses ton téléphone, plus tu progresses.",
      "Everyone talks about screen time, no one about what replaces it. \"Educational\" apps stack badges to keep the child glued to the screen — same mechanic as TikTok with a pedagogical veneer.\n\nKidverse flips the contract. The reward isn't earned BY using the app, but AFTER, in the real world. You do a quest (gardening, drawing, running, reading aloud); the app verifies you did it; you earn atoms, the universe's currency. The more you put the phone down, the more you progress.",
      "Si parla tanto di tempo di schermo e mai di cosa sostituisca. Le app \"educative\" accumulano badge per tenere il bambino incollato — stessa meccanica di TikTok con vernice pedagogica.\n\nKidverse rovescia il contratto. La ricompensa non si ottiene USANDO l'app, ma DOPO, nel mondo reale. Fai una missione (giardinaggio, disegno, corsa, lettura ad alta voce); l'app verifica che l'hai fatta; guadagni atomi, la moneta dell'universo. Più posi il telefono, più progredisci.",
    ),
    approach: tri(
      "Le moteur de validation phygitale fusionne capteurs : caméra (objet présent / geste effectué), micro (lecture à voix haute), accéléromètre (course), géoloc (visite d'un lieu), avec une vérification IA passive — jamais persistée. On vérifie, on jette, on récompense.\n\nL'app mobile (React Native + Expo) tourne en monorepo avec une API NestJS exposée via Apollo Router. Quatre studios créatifs (musique, cinéma, jeu, histoire) génèrent des récompenses propres à l'enfant via Claude. Tout le contenu est modéré en deux passes — IA puis humaine — avec un seuil zéro pour ce qui touche à la sécurité.",
      "The phygital validation engine fuses sensors: camera (object present / gesture done), mic (reading aloud), accelerometer (running), geolocation (visiting a place), with passive AI verification — never persisted. We verify, discard, reward.\n\nThe mobile app (React Native + Expo) runs in a monorepo with a NestJS API exposed via Apollo Router. Four creative studios (music, cinema, game, story) generate kid-specific rewards via Claude. All content is moderated in two passes — AI then human — with zero threshold on safety-touching items.",
      "Il motore di validazione phygital fonde sensori: camera (oggetto presente / gesto eseguito), microfono (lettura ad alta voce), accelerometro (corsa), geolocalizzazione (visita di un luogo), con verifica IA passiva — mai persistita. Verifichiamo, scartiamo, ricompensiamo.\n\nL'app mobile (React Native + Expo) gira in monorepo con un'API NestJS esposta via Apollo Router. Quattro studi creativi (musica, cinema, gioco, storia) generano ricompense specifiche per ogni bambino via Claude. Tutti i contenuti sono moderati in due passaggi — IA poi umana — con tolleranza zero su quanto riguarda la sicurezza.",
    ),
    year: 2026,
    state: "wip",
    stack: [
      { tech: "React Native 0.78" },
      { tech: "Expo SDK 52" },
      { tech: "NestJS 11" },
      { tech: "Apollo Router" },
      { tech: "Claude" },
    ],
    results: [
      { value: "4", label: tri("studios créatifs", "creative studios", "studi creativi") },
      {
        value: "200+",
        label: tri("quêtes du monde réel", "real-world quests", "missioni nel mondo reale"),
      },
      {
        value: "0 ad",
        label: tri("publicité dans l'app", "ads in the app", "pubblicità nell'app"),
      },
    ],
  },

  {
    number: "004",
    slug: "flov",
    repo: "Flov",
    name: tri("Flov.", "Flov.", "Flov."),
    summary: tri(
      "Plateforme de streaming musical et vidéo. Made in Cannes. Sans pub, sans tracking, sans compromis.",
      "Music and video streaming platform. Made in Cannes. No ads, no tracking, no compromise.",
      "Piattaforma di streaming musicale e video. Made in Cannes. Niente pubblicità, niente tracking, nessun compromesso.",
    ),
    context: tri(
      "Spotify sait tout. Ce que tu écoutes, à quelle heure, dans quel ordre, combien de fois. Cette donnée est rentable pour eux et inutile pour toi. La gratuité a un prix qu'on ne te chiffre jamais.\n\nFlov part d'une question simple : un service de streaming peut-il vivre uniquement de ses abonnés, sans collecter le moindre comportement ? La réponse est oui, à condition d'accepter de tourner sur des marges de SaaS, pas de pub. C'est ce qu'on construit.",
      "Spotify knows everything. What you listen to, at what time, in what order, how often. That data is profitable for them and useless for you. Free has a price that's never quoted.\n\nFlov starts from a simple question: can a streaming service live solely off its subscribers, without collecting any behaviour? The answer is yes, on condition of accepting SaaS margins, not ad margins. That's what we're building.",
      "Spotify sa tutto. Cosa ascolti, a che ora, in che ordine, quante volte. Quei dati sono redditizi per loro e inutili per te. Il gratuito ha un prezzo che non ti viene mai citato.\n\nFlov parte da una domanda semplice: un servizio di streaming può vivere solo dei suoi abbonati, senza raccogliere alcun comportamento? La risposta è sì, a condizione di accettare margini SaaS, non margini pubblicitari. Ed è ciò che stiamo costruendo.",
    ),
    approach: tri(
      "Toute l'infrastructure est en France : Laravel 13 sur des serveurs OVH, base Postgres répliquée, un seul fournisseur de paiement (Stripe). Pas de CDN tiers — on utilise notre propre cache edge derrière nginx, et un player open source (MIT) que tu peux auditer.\n\nLes recommandations ne reposent pas sur ton historique. Elles s'appuient sur des graphes éditoriaux construits à la main par notre équipe musicale — un parti pris assumé, qui demande du travail mais évite la chambre d'écho. La vérification continue d'audit montre 0 cookie tiers, 0 pixel, 0 fingerprint.",
      "All infrastructure is in France: Laravel 13 on OVH servers, replicated Postgres, a single payment provider (Stripe). No third-party CDN — we use our own edge cache behind nginx, and an MIT-licensed open-source player you can audit.\n\nRecommendations don't rely on your listening history. They build on editorial graphs hand-curated by our music team — a deliberate choice that demands work but avoids the echo chamber. Ongoing audit shows 0 third-party cookies, 0 pixels, 0 fingerprints.",
      "Tutta l'infrastruttura è in Francia: Laravel 13 su server OVH, Postgres replicato, un solo provider di pagamento (Stripe). Nessuna CDN di terze parti — usiamo la nostra cache edge dietro nginx e un player open source (MIT) che puoi controllare.\n\nLe raccomandazioni non si basano sul tuo storico. Si appoggiano a grafi editoriali curati a mano dal nostro team musicale — una scelta deliberata che richiede lavoro ma evita la camera dell'eco. L'audit continuo mostra 0 cookie di terze parti, 0 pixel, 0 fingerprint.",
    ),
    year: 2026,
    state: "live",
    stack: [{ tech: "Laravel 13" }, { tech: "React 19" }, { tech: "TypeScript 5" }],
    results: [
      {
        value: "0",
        label: tri("trackers tiers", "third-party trackers", "tracker di terze parti"),
      },
      {
        value: "100 %",
        label: tri(
          "infrastructure FR",
          "FR-hosted infrastructure",
          "infrastruttura ospitata in FR",
        ),
      },
      { value: "MIT", label: tri("licence du player", "player licence", "licenza del player") },
    ],
  },

  {
    number: "005",
    slug: "ombrys",
    repo: "OmbrysWeb",
    name: tri("Ombrys", "Ombrys", "Ombrys"),
    summary: tri(
      "Collectif citoyen et journalistique. Plateforme d'investigation où la vérité est documentée, vérifiable, transparente.",
      "Citizen and journalist collective. An investigative platform where truth is documented, verifiable, transparent.",
      "Collettivo di cittadini e giornalisti. Piattaforma investigativa dove la verità è documentata, verificabile, trasparente.",
    ),
    context: tri(
      "Une enquête peut prendre dix ans. Pendant ces dix ans, les pièces sortent une par une, contredites, oubliées, retrouvées. Aucun support de presse n'est conçu pour cette temporalité — un article fixe le moment, puis disparaît du fil.\n\nOmbrys est conçu pour la durée. Chaque dossier est un objet vivant : on y ajoute des sources, on y note des contradictions, on y enregistre des hypothèses qui tombent ou tiennent. Le lecteur voit l'état actuel de l'enquête, mais aussi son historique — qui a écrit quoi, quand, en s'appuyant sur quoi.",
      "An investigation can take ten years. Over those ten years, pieces come out one by one, contradicted, forgotten, rediscovered. No press format is designed for that timescale — an article freezes the moment, then drops off the feed.\n\nOmbrys is built for duration. Each case is a living object: sources get added, contradictions noted, hypotheses recorded as they fall or hold. The reader sees the current state of the investigation, but also its history — who wrote what, when, citing which document.",
      "Un'indagine può durare dieci anni. Durante quei dieci anni, i pezzi escono uno per uno, smentiti, dimenticati, ritrovati. Nessun supporto stampa è concepito per questa temporalità — un articolo congela il momento, poi scompare dal feed.\n\nOmbrys è pensato per la durata. Ogni dossier è un oggetto vivo: si aggiungono fonti, si annotano contraddizioni, si registrano ipotesi che cadono o reggono. Il lettore vede lo stato attuale dell'indagine, ma anche la sua storia — chi ha scritto cosa, quando, citando quale documento.",
    ),
    approach: tri(
      "Modèle de données : pas un CMS éditorial, un graphe orienté. Sources, faits, hypothèses, contradictions sont des nœuds typés. Chaque arête est tracée à un document précis (date, page, auteur). On peut interroger le graphe en lecture publique ; les rédacteurs publient des « vues » du graphe sous forme d'articles narratifs.\n\nLe site est construit sur Next.js, le contenu structuré dans Sanity (avec versioning fort). Toute citation publique est un permalien vers le document d'origine ; tout retrait d'une source est journalisé et reste consultable. L'objectif : qu'un lecteur sceptique puisse remonter chaque affirmation jusqu'à un PDF qu'il peut lire.",
      'Data model: not an editorial CMS, a directed graph. Sources, facts, hypotheses, contradictions are typed nodes. Every edge is traced to a specific document (date, page, author). The graph is queryable publicly; editors publish "views" of the graph as narrative articles.\n\nThe site is built on Next.js, the structured content lives in Sanity (with strong versioning). Every public citation is a permalink to the original document; any source retraction is logged and remains visible. The goal: a sceptical reader can trace every claim back to a PDF they can read.',
      'Modello dati: non un CMS editoriale, un grafo orientato. Fonti, fatti, ipotesi, contraddizioni sono nodi tipizzati. Ogni arco è tracciato a un documento specifico (data, pagina, autore). Il grafo è interrogabile pubblicamente; i redattori pubblicano "viste" del grafo come articoli narrativi.\n\nIl sito è costruito su Next.js, il contenuto strutturato vive in Sanity (con versioning forte). Ogni citazione pubblica è un permalink al documento originale; ogni ritiro di fonte è loggato e resta consultabile. L\'obiettivo: un lettore scettico può tracciare ogni affermazione fino a un PDF che può leggere.',
    ),
    year: 2026,
    state: "live",
    stack: [{ tech: "Next.js" }, { tech: "TypeScript" }, { tech: "Sanity" }],
    results: [
      { value: "8", label: tri("dossiers ouverts", "open investigations", "indagini aperte") },
      { value: "100 %", label: tri("sources sourcées", "sources cited", "fonti citate") },
      {
        value: "0 €",
        label: tri("publicité acceptée", "advertising accepted", "pubblicità accettata"),
      },
    ],
  },

  {
    number: "006",
    slug: "clayr",
    repo: "LightOff",
    name: tri("Clayr", "Clayr", "Clayr"),
    summary: tri(
      "Refuge cosmique numérique. Citations, textes, musique, IA, manuscrits, thérapie immersive — tout un univers pour se reconnecter à soi.",
      "A digital cosmic refuge. Quotes, texts, music, AI, manuscripts, immersive therapy — a whole universe to reconnect with yourself.",
      "Un rifugio cosmico digitale. Citazioni, testi, musica, IA, manoscritti, terapia immersiva — un intero universo per riconnettersi con sé stessi.",
    ),
    context: tri(
      "Les apps de bien-être sont des distributeurs de mantras. Tu ouvres, tu reçois ta dose de calme, tu refermes, tu reprends ta vie. Aucune verticalité, aucune mémoire, aucun monde.\n\nClayr propose autre chose : un univers cohérent — celui des textes, des citations, de la musique, des manuscrits — où chaque élément renvoie à un autre, où l'IA est un personnage qui te connaît, et où la durée d'usage n'est pas l'objectif. On te reçoit, on te suggère, et on te laisse repartir.",
      "Wellness apps are mantra dispensers. You open, get your dose of calm, close, return to your life. No verticality, no memory, no world.\n\nClayr offers something else: a coherent universe — texts, quotes, music, manuscripts — where each item links to another, where AI is a character who knows you, and where time-on-app isn't the goal. We welcome you, suggest, and let you leave.",
      "Le app di benessere sono distributori di mantra. Apri, ricevi la dose di calma, chiudi, riprendi la tua vita. Nessuna verticalità, nessuna memoria, nessun mondo.\n\nClayr propone qualcos'altro: un universo coerente — testi, citazioni, musica, manoscritti — dove ogni elemento rimanda a un altro, dove l'IA è un personaggio che ti conosce, e dove la durata d'uso non è l'obiettivo. Ti accogliamo, ti suggeriamo, ti lasciamo ripartire.",
    ),
    approach: tri(
      "Le contenu est curé : 12 rituels guidés, plusieurs centaines de textes, une bibliothèque musicale propre. Aucun algorithme de rétention — la suggestion est faite par un graphe éditorial, pas par tes patterns d'usage.\n\nLe compagnon IA dédié garde un fil de mémoire (qu'on peut effacer en un clic) ; il intervient seulement si tu l'invoques. Le tout en PWA offline-first — Supabase pour la persistance des préférences, Tailwind v4, Next.js 16 en mode App Router avec server components partout. Aucun cookie tiers, aucun analytics comportemental.",
      "Content is curated: 12 guided rituals, several hundred texts, a clean music library. No retention algorithm — suggestions come from an editorial graph, not from your usage patterns.\n\nThe dedicated AI companion keeps a memory thread (one-click wipeable); it speaks only when you summon it. All in offline-first PWA — Supabase for preference persistence, Tailwind v4, Next.js 16 in App Router mode with server components throughout. No third-party cookies, no behavioural analytics.",
      "Il contenuto è curato: 12 rituali guidati, diverse centinaia di testi, una biblioteca musicale propria. Nessun algoritmo di retention — i suggerimenti vengono da un grafo editoriale, non dai tuoi pattern d'uso.\n\nIl compagno IA dedicato mantiene un filo di memoria (cancellabile con un clic); interviene solo se lo invochi. Il tutto in PWA offline-first — Supabase per la persistenza delle preferenze, Tailwind v4, Next.js 16 in modalità App Router con server component ovunque. Nessun cookie di terze parti, nessuna analytics comportamentale.",
    ),
    year: 2026,
    state: "live",
    stack: [
      { tech: "Next.js 16" },
      { tech: "Supabase" },
      { tech: "Tailwind v4" },
      { tech: "TypeScript 5" },
    ],
    results: [
      { value: "12", label: tri("rituels guidés", "guided rituals", "rituali guidati") },
      {
        value: "AI Companion",
        label: tri("compagnon IA dédié", "dedicated AI companion", "compagno IA dedicato"),
      },
      { value: "PWA", label: tri("offline first", "offline-first", "offline first") },
    ],
  },

  {
    number: "007",
    slug: "foxcube",
    repo: "EurlGenialite",
    name: tri("FoxCube", "FoxCube", "FoxCube"),
    summary: tri(
      "E-commerce multilingue pour une maison italienne d'import-export. Catalogue à variantes, broderie sur mesure, paiement multi-devises.",
      "Multilingual e-commerce for an Italian import/export house. Variant-aware catalogue, custom embroidery, multi-currency checkout.",
      "E-commerce multilingue per una casa italiana di import/export. Catalogo a varianti, ricamo su misura, pagamento multi-valuta.",
    ),
    context: tri(
      "Une boutique de broderies italiennes a quatre couleurs de t-shirts, trois tailles, six placements possibles, et chaque combinaison est une photo différente. Le client doit voir ce qu'il achète avant de l'acheter — sinon le retour est garanti.\n\nFoxCube est l'outil sur mesure pour ce genre de catalogue : chaque variante a son rendu, le placement de la broderie est visualisé en temps réel, et le paiement supporte trois devises et trois langues. Le tout sans dépendre d'une plateforme tierce qui prend 15 % de commission.",
      "An Italian embroidery boutique has four t-shirt colours, three sizes, six possible placements, and each combination is a different photograph. The customer needs to see what they're buying before buying it — otherwise the return is guaranteed.\n\nFoxCube is the bespoke tool for this kind of catalogue: each variant has its render, embroidery placement is visualised in real time, and checkout supports three currencies and three languages. All without depending on a third-party platform taking a 15 % cut.",
      "Una boutique di ricami italiani ha quattro colori di t-shirt, tre taglie, sei possibili posizionamenti, e ogni combinazione è una fotografia diversa. Il cliente deve vedere cosa sta comprando prima di comprarlo — altrimenti il reso è garantito.\n\nFoxCube è lo strumento su misura per questo tipo di catalogo: ogni variante ha il suo rendering, il posizionamento del ricamo è visualizzato in tempo reale, e il checkout supporta tre valute e tre lingue. Il tutto senza dipendere da una piattaforma terza che prende il 15 % di commissione.",
    ),
    approach: tri(
      "Stack pragmatique : Laravel 12 + Tailwind v4. Pas de SPA — le rendu serveur est rapide et indexable, les variantes utilisent Alpine pour le swap d'image sans full reload. Stripe + PayPal + virement, factures PDF générées par observer.\n\nLa zone broderie est un système de coordonnées normalisées : le client choisit la zone, l'app rend l'aperçu satin via SVG filters, le bon de commande inclut les coordonnées exactes pour l'atelier. Newsletter, codes promo, dashboard client — tout in-house, zéro plugin.",
      "Pragmatic stack: Laravel 12 + Tailwind v4. No SPA — server rendering is fast and indexable, variants use Alpine for image swap without full reload. Stripe + PayPal + bank transfer, PDF invoices generated by observer.\n\nThe embroidery zone uses normalised coordinates: the customer picks the zone, the app renders a satin preview via SVG filters, the work order includes exact coordinates for the workshop. Newsletter, promo codes, customer dashboard — all in-house, zero plugin.",
      "Stack pragmatico: Laravel 12 + Tailwind v4. Niente SPA — il rendering server è veloce e indicizzabile, le varianti usano Alpine per lo swap di immagine senza reload completo. Stripe + PayPal + bonifico, fatture PDF generate da observer.\n\nLa zona ricamo usa coordinate normalizzate: il cliente sceglie la zona, l'app rende un'anteprima satin via SVG filter, l'ordine di lavorazione include le coordinate esatte per il laboratorio. Newsletter, codici promo, dashboard cliente — tutto in-house, zero plugin.",
    ),
    year: 2026,
    state: "live",
    stack: [
      { tech: "Laravel 12" },
      { tech: "Tailwind v4" },
      { tech: "PHP 8.4" },
      { tech: "Stripe" },
      { tech: "Docker" },
    ],
    results: [
      {
        value: "5",
        label: tri(
          "variantes par produit (moy.)",
          "variants per product (avg.)",
          "varianti per prodotto (media)",
        ),
      },
      { value: "3", label: tri("langues catalogue", "catalogue languages", "lingue catalogo") },
      {
        value: "PDF",
        label: tri("factures auto-générées", "auto-generated invoices", "fatture auto-generate"),
      },
    ],
  },

  {
    number: "008",
    slug: "moes-coffee",
    repo: "FoxHoleSim",
    name: tri("Moe's Coffee", "Moe's Coffee", "Moe's Coffee"),
    summary: tri(
      "Springfield's finest, au gramme près. Une boutique e-commerce sérieuse habillée de l'univers de Moe Szyslak — banc d'essai grandeur nature pour la stack 2026.",
      "Springfield's finest, to the gram. A serious e-commerce store wrapped in Moe Szyslak's universe — a full-scale benchmark for the 2026 stack.",
      "Il meglio di Springfield, al grammo. Un e-commerce serio vestito dell'universo di Moe Szyslak — un banco di prova in scala reale per lo stack 2026.",
    ),
    context: tri(
      "On voulait stress-tester React Router v7 + Drizzle + Tailwind v4 sur un cas réel. Plutôt qu'une démo générique, on a construit une vraie boutique fonctionnelle, parodique mais sérieuse — Moe's Coffee, le café de Springfield, vendu au gramme.\n\nLe but : voir si la stack tient en charge réelle (catalogue, panier, checkout, livraison, factures, espace client) sans devenir une jungle de dépendances. Si ça marche pour Moe, ça marche pour n'importe quel commerce indépendant.",
      "We wanted to stress-test React Router v7 + Drizzle + Tailwind v4 on a real case. Rather than a generic demo, we built an actual functional store — parodic but serious — Moe's Coffee, Springfield's bar, sold by the gram.\n\nGoal: see whether the stack holds up under real load (catalog, cart, checkout, shipping, invoices, customer area) without becoming a dependency jungle. If it works for Moe, it works for any indie commerce.",
      "Volevamo stress-testare React Router v7 + Drizzle + Tailwind v4 su un caso reale. Invece di una demo generica, abbiamo costruito un vero negozio funzionante, parodico ma serio — Moe's Coffee, il bar di Springfield, venduto al grammo.\n\nObiettivo: vedere se lo stack regge sotto carico reale (catalogo, carrello, checkout, spedizione, fatture, area cliente) senza diventare una giungla di dipendenze. Se funziona per Moe, funziona per qualsiasi commercio indipendente.",
    ),
    approach: tri(
      "On a écrit le moins de code possible. Drizzle pour la DB (SQLite local, Postgres en prod), React Router v7 avec ses loaders typés pour le data fetching, Tailwind v4 pour le style. Pas de state manager, pas de form library, pas de UI kit. Tout en server components quand possible.\n\nQuatre thèmes Springfield au choix, sélecteur en client component minuscule. Déploiement Vercel edge, image Docker pour ceux qui préfèrent self-host. Pas de tracking, pas de notifications push, pas de modales agressives. Une vraie boutique qui se contente d'être une vraie boutique.",
      "We wrote as little code as possible. Drizzle for the DB (SQLite local, Postgres in prod), React Router v7 with its typed loaders for data fetching, Tailwind v4 for style. No state manager, no form library, no UI kit. Server components everywhere possible.\n\nFour Springfield themes to choose from, switcher as a tiny client component. Vercel edge deployment, Docker image for those who prefer self-hosting. No tracking, no push notifications, no aggressive modals. A real store content with being a real store.",
      "Abbiamo scritto il meno codice possibile. Drizzle per il DB (SQLite locale, Postgres in produzione), React Router v7 con i suoi loader tipizzati per il data fetching, Tailwind v4 per lo stile. Niente state manager, niente form library, niente UI kit. Server component dove possibile.\n\nQuattro temi Springfield a scelta, selettore come piccolo client component. Deploy Vercel edge, immagine Docker per chi preferisce self-host. Niente tracking, niente notifiche push, niente modal aggressivi. Un vero negozio che si accontenta di essere un vero negozio.",
    ),
    year: 2026,
    state: "live",
    stack: [
      { tech: "React Router v7" },
      { tech: "TypeScript 5.9" },
      { tech: "Tailwind v4" },
      { tech: "SQLite" },
      { tech: "Drizzle" },
    ],
    results: [
      { value: "4", label: tri("thèmes Springfield", "Springfield themes", "temi Springfield") },
      { value: "Drizzle", label: tri("ORM type-safe", "type-safe ORM", "ORM type-safe") },
      { value: "Vercel", label: tri("déploiement edge", "edge deployment", "deploy edge") },
    ],
  },

  {
    number: "009",
    slug: "klown",
    repo: "Klown",
    name: tri("Klown", "Klown", "Klown"),
    summary: tri(
      "Framework desktop multi-plateforme pour le hacking éthique autorisé. Cadre légal strict, journal d'audit, modules sandboxés.",
      "Cross-platform desktop framework for authorised ethical hacking. Strict legal scope, audit logging, sandboxed modules.",
      "Framework desktop multipiattaforma per l'hacking etico autorizzato. Quadro legale rigoroso, audit log, moduli sandbox.",
    ),
    context: tri(
      "Les outils de pentest existants forcent un compromis : soit puissance et opacité (l'utilisateur ne sait pas exactement ce qui est exécuté), soit transparence et lenteur. Aucun ne propose un journal d'audit complet, légalement opposable, qui prouve qu'aucune action hors périmètre n'a été tentée.\n\nKlown est conçu pour l'audit autorisé — bug bounties, tests d'intrusion contractuels, recherche de vulnérabilités en cadre légal. Chaque action est tracée, signée, horodatée. Sortir du périmètre déclaré est techniquement bloqué.",
      "Existing pentest tools force a trade-off: either power and opacity (the user doesn't know exactly what's being executed), or transparency and slowness. None offers a complete, legally-actionable audit log proving no out-of-scope action was attempted.\n\nKlown is built for authorised auditing — bug bounties, contractual intrusion tests, vulnerability research within legal bounds. Every action is logged, signed, timestamped. Exceeding the declared scope is technically blocked.",
      "Gli strumenti di pentest esistenti impongono un compromesso: o potenza e opacità (l'utente non sa esattamente cosa viene eseguito), o trasparenza e lentezza. Nessuno offre un audit log completo, legalmente opponibile, che provi che nessuna azione fuori perimetro è stata tentata.\n\nKlown è progettato per l'audit autorizzato — bug bounty, test di intrusione contrattuali, ricerca di vulnerabilità in cornice legale. Ogni azione è loggata, firmata, datata. Uscire dal perimetro dichiarato è tecnicamente bloccato.",
    ),
    approach: tri(
      "Architecture en deux couches : un cœur Rust qui gère l'isolation, le journal et le périmètre déclaré ; une UI Electron qui expose les modules. Chaque module tourne dans un sandbox propre, avec un manifeste qui déclare ce qu'il a le droit de faire — réseau autorisé, ports autorisés, données autorisées.\n\nLe journal est append-only, chiffré, exportable au format STIX 2.1. Trois plateformes supportées (Windows, macOS, Linux) avec un seul code. Le projet a été archivé fin 2025 — il a fait sa preuve, mais l'écosystème pentest a basculé vers Burp Suite Enterprise et on n'a plus le ROI pour maintenir.",
      "Two-layer architecture: a Rust core handling isolation, logging and declared scope; an Electron UI exposing modules. Each module runs in its own sandbox with a manifest declaring what it's allowed to do — allowed network, allowed ports, allowed data.\n\nThe log is append-only, encrypted, STIX 2.1 exportable. Three platforms supported (Windows, macOS, Linux) from a single codebase. The project was archived in late 2025 — it proved itself, but the pentest ecosystem moved to Burp Suite Enterprise and the ROI to maintain dropped.",
      "Architettura a due livelli: un core Rust che gestisce isolamento, log e perimetro dichiarato; una UI Electron che espone i moduli. Ogni modulo gira nel proprio sandbox con un manifest che dichiara cosa può fare — rete consentita, porte consentite, dati consentiti.\n\nIl log è append-only, cifrato, esportabile in STIX 2.1. Tre piattaforme supportate (Windows, macOS, Linux) con un'unica codebase. Il progetto è stato archiviato a fine 2025 — ha dato prova di sé, ma l'ecosistema pentest è migrato a Burp Suite Enterprise e il ROI di manutenzione è sceso.",
    ),
    year: 2025,
    state: "archived",
    stack: [{ tech: "TypeScript" }, { tech: "Electron" }, { tech: "Rust" }, { tech: "Node.js" }],
    results: [
      {
        value: "3",
        label: tri("plateformes supportées", "platforms supported", "piattaforme supportate"),
      },
      { value: "audit", label: tri("journal complet", "full event log", "log completo") },
      { value: "sandbox", label: tri("modules isolés", "isolated modules", "moduli isolati") },
    ],
  },

  {
    number: "010",
    slug: "klown-network",
    repo: "KlownNetwork",
    name: tri("Klown Network", "Klown Network", "Klown Network"),
    summary: tri(
      "Plateforme communautaire de l'écosystème Klown. Couche sociale, hub de contenus, service d'identité.",
      "Community platform for the Klown ecosystem. Social layer, content hub, identity service.",
      "Piattaforma comunitaria per l'ecosistema Klown. Strato sociale, hub di contenuti, servizio identità.",
    ),
    context: tri(
      "Klown a sa communauté de chercheurs en sécurité, ses CTFs, ses writeups, ses challenges. Tout ça vivait sur Discord et Twitter — éclaté, non-archivé, non-recherchable. On voulait un lieu unique, sourçable, où la connaissance produite par la communauté reste consultable cinq ans plus tard.\n\nKlown Network est ce lieu. Un mélange de forum, de wiki, et de plateforme de challenges. Pas un Discord-like — un vrai espace structuré où une bonne réponse remonte, une mauvaise descend, et tout est citable par lien permanent.",
      "Klown has its community of security researchers, its CTFs, its writeups, its challenges. All this was scattered across Discord and Twitter — fragmented, unarchived, unsearchable. We wanted a single, citable place where community-produced knowledge is still readable five years later.\n\nKlown Network is that place. A blend of forum, wiki, and challenge platform. Not a Discord-like — a structured space where a good answer rises, a bad one drops, and everything is citeable by permalink.",
      "Klown ha la sua comunità di ricercatori di sicurezza, i suoi CTF, i suoi writeup, le sue challenge. Tutto questo viveva su Discord e Twitter — frammentato, non archiviato, non ricercabile. Volevamo un luogo unico, citabile, dove la conoscenza prodotta dalla comunità resti consultabile cinque anni dopo.\n\nKlown Network è quel luogo. Un mix di forum, wiki e piattaforma di challenge. Non un Discord-like — uno spazio strutturato dove una buona risposta sale, una cattiva scende, e tutto è citabile per permalink.",
    ),
    approach: tri(
      "Trois rôles utilisateurs : viewer (lecture publique), contributor (post + édition), curator (modération + tagging). MongoDB pour la flexibilité de schéma — un challenge n'a pas la même structure qu'un writeup. SSO partagé avec Klown Vitrine pour qu'un utilisateur n'ait qu'un compte.\n\nUne couche WebSocket pour les notifications temps-réel sur les threads suivis. La recherche est full-text avec scoring, indexée à l'écriture. Pas d'algorithme de mur infini — chaque section a son ordre éditorial.",
      "Three user roles: viewer (public read), contributor (post + edit), curator (moderation + tagging). MongoDB for schema flexibility — a challenge doesn't have the same structure as a writeup. SSO shared with Klown Vitrine so users have a single account.\n\nWebSocket layer for real-time notifications on followed threads. Full-text search with scoring, indexed at write time. No infinite-wall algorithm — each section has its editorial order.",
      "Tre ruoli utente: viewer (lettura pubblica), contributor (post + modifica), curator (moderazione + tagging). MongoDB per la flessibilità di schema — una challenge non ha la stessa struttura di un writeup. SSO condiviso con Klown Vitrine così l'utente ha un solo account.\n\nStrato WebSocket per le notifiche real-time sui thread seguiti. Ricerca full-text con scoring, indicizzata in scrittura. Nessun algoritmo di muro infinito — ogni sezione ha il suo ordine editoriale.",
    ),
    year: 2025,
    state: "wip",
    stack: [{ tech: "Next.js" }, { tech: "TypeScript" }, { tech: "MongoDB" }],
    results: [
      { value: "3", label: tri("rôles utilisateurs", "user roles", "ruoli utente") },
      { value: "SSO", label: tri("avec Klown Vitrine", "with Klown Vitrine", "con Klown Vitrine") },
      { value: "WebSocket", label: tri("temps réel", "real-time layer", "tempo reale") },
    ],
  },

  {
    number: "011",
    slug: "klown-vitrine",
    repo: "KlownVitrine",
    name: tri("Klown Vitrine", "Klown Vitrine", "Klown Vitrine"),
    summary: tri(
      "Vitrine publique de la marque Klown et de sa gamme produit — narrative, motion légère, server-rendered.",
      "Public-facing showcase for the Klown brand and product line — narrative-led, motion-light, server-rendered.",
      "Showcase pubblico del brand Klown e della sua linea di prodotti — narrativa, motion leggero, server-rendered.",
    ),
    context: tri(
      "Une vitrine de marque doit charger en moins d'une seconde et tenir cinq ans sans maintenance. Les générateurs de sites « no-code » coupent les deux premiers points et ratent souvent le troisième. On voulait un site qui se contente de fonctionner.\n\nKlown Vitrine est l'opposé d'une promesse marketing : pas d'animation gratuite, pas de carrousel auto-rotatif, pas de pop-up. Une page d'accueil qui présente la gamme, des sous-pages produits, un formulaire de contact. C'est tout. C'est le but.",
      "A brand showcase needs to load in under a second and survive five years without maintenance. \"No-code\" site builders fail the first two and often miss the third. We wanted a site that just works.\n\nKlown Vitrine is the opposite of a marketing promise: no gratuitous animation, no auto-rotating carousel, no pop-up. A homepage presenting the line, product subpages, a contact form. That's it. That's the point.",
      'Una vetrina di marca deve caricare in meno di un secondo e reggere cinque anni senza manutenzione. I generatori di siti "no-code" mancano i primi due punti e spesso il terzo. Volevamo un sito che si limiti a funzionare.\n\nKlown Vitrine è l\'opposto di una promessa marketing: niente animazioni gratuite, niente carosello auto-rotante, niente pop-up. Una home che presenta la gamma, sottopagine prodotto, un form di contatto. Tutto qui. È il punto.',
    ),
    approach: tri(
      "Tout est server-rendered. Pas de hydratation, pas de routeur client, pas de state manager. Le seul JS shippé tient en moins de 80 ko et concerne uniquement le formulaire de contact (validation + soumission).\n\nLes images sont AVIF avec fallback WebP, lazy-loaded au-delà du fold. Les polices auto-hébergées (subset latin), font-display: swap. Le résultat est un Lighthouse 100 sur tous les axes — qu'on revérifie en CI à chaque PR. Le site a été archivé après mission, mais le pattern est devenu le squelette de toutes nos vitrines suivantes.",
      "Everything is server-rendered. No hydration, no client router, no state manager. The only JS shipped is under 80 kB and only handles the contact form (validation + submission).\n\nImages are AVIF with WebP fallback, lazy-loaded beyond the fold. Self-hosted fonts (Latin subset), font-display: swap. The result is a perfect Lighthouse 100 across the board — re-checked in CI on every PR. The site was archived after the engagement, but the pattern became the skeleton of every showcase site we've built since.",
      "Tutto è server-rendered. Niente idratazione, niente router client, niente state manager. L'unico JS spedito è sotto gli 80 kB e gestisce solo il form di contatto (validazione + invio).\n\nLe immagini sono AVIF con fallback WebP, lazy-loaded oltre la fold. Font auto-ospitati (subset latino), font-display: swap. Il risultato è un Lighthouse 100 su tutti gli assi — riverificato in CI a ogni PR. Il sito è stato archiviato dopo l'incarico, ma il pattern è diventato lo scheletro di tutte le nostre vetrine successive.",
    ),
    year: 2025,
    state: "archived",
    stack: [{ tech: "Next.js" }, { tech: "TypeScript" }, { tech: "Tailwind" }],
    results: [
      { value: "≤ 80 kB", label: tri("JS sur la home", "JS on the home", "JS sulla home") },
      {
        value: "SSR",
        label: tri("100 % rendu serveur", "100 % server-rendered", "100 % server-rendered"),
      },
      {
        value: "0",
        label: tri("dépendance client lourde", "heavy client dep", "dipendenze client pesanti"),
      },
    ],
  },

  {
    number: "012",
    slug: "foxcard",
    repo: "FoxCard",
    name: tri("FoxCard", "FoxCard", "FoxCard"),
    summary: tri(
      "Planificateur de roadmap façon cartes. Génère automatiquement les issues GitHub depuis un markdown source unique.",
      "Card-shaped roadmap planner. Auto-generates GitHub issues from a single source-of-truth markdown.",
      "Planner di roadmap a forma di card. Genera automaticamente le issue GitHub da un unico markdown sorgente.",
    ),
    context: tri(
      "Tenir une roadmap dans un outil et les issues GitHub dans un autre, c'est une double vérité. Personne ne maintient les deux à jour, l'un finit par mentir, l'équipe perd confiance dans les deux.\n\nFoxCard part d'un constat radical : la roadmap, c'est juste des cartes. Une carte = une intention de fonctionnalité. Un fichier markdown unique décrit toutes les cartes ; le script génère, met à jour ou clôture les issues GitHub correspondantes. Une seule source de vérité, deux vues — markdown lisible par humain, issues utilisables par l'équipe.",
      "Maintaining a roadmap in one tool and GitHub issues in another is a dual truth. Nobody updates both, one starts lying, the team loses trust in both.\n\nFoxCard starts from a radical observation: a roadmap is just cards. A card = a feature intent. A single markdown file describes all the cards; the script generates, updates, or closes the matching GitHub issues. One source of truth, two views — human-readable markdown, team-usable issues.",
      "Mantenere una roadmap in uno strumento e le issue GitHub in un altro è una doppia verità. Nessuno aggiorna entrambi, uno inizia a mentire, il team perde fiducia in entrambi.\n\nFoxCard parte da un'osservazione radicale: una roadmap è solo card. Una card = un'intenzione di funzionalità. Un singolo file markdown descrive tutte le card; lo script genera, aggiorna o chiude le issue GitHub corrispondenti. Un'unica fonte di verità, due viste — markdown leggibile dall'umano, issue usabili dal team.",
    ),
    approach: tri(
      "Pas de UI, pas de serveur. Un script TypeScript lit le markdown, parse les cartes (titres, descriptions, milestones, labels, dépendances), et utilise gh CLI pour synchroniser les issues. Diff intelligent — on ne touche pas une issue déjà clôturée, on ne réécrit pas une description manuellement enrichie.\n\nLe script tourne en CI sur chaque push : si tu modifies la roadmap markdown, les issues sont mises à jour automatiquement. Si tu modifies une issue à la main, la prochaine exécution te le signale et te demande quoi faire. Le projet a été archivé après avoir servi deux ans — il a été remplacé par les Projects v2 de GitHub, qui font le même boulot nativement.",
      "No UI, no server. A TypeScript script reads the markdown, parses the cards (titles, descriptions, milestones, labels, dependencies), and uses gh CLI to sync issues. Smart diff — we don't touch a closed issue, we don't overwrite a manually-enriched description.\n\nThe script runs in CI on every push: edit the roadmap markdown, issues update automatically. Edit an issue by hand, the next run flags it and asks. The project was archived after two years of service — replaced by GitHub Projects v2, which does the job natively.",
      "Niente UI, niente server. Uno script TypeScript legge il markdown, parsa le card (titoli, descrizioni, milestone, label, dipendenze), e usa gh CLI per sincronizzare le issue. Diff intelligente — non tocchiamo una issue chiusa, non sovrascriviamo una descrizione arricchita a mano.\n\nLo script gira in CI a ogni push: modifica il markdown della roadmap, le issue si aggiornano automaticamente. Modifica una issue a mano, la prossima esecuzione lo segnala e chiede. Il progetto è stato archiviato dopo due anni di servizio — sostituito da GitHub Projects v2, che fa lo stesso lavoro nativamente.",
    ),
    year: 2025,
    state: "archived",
    stack: [{ tech: "TypeScript" }, { tech: "GitHub CLI" }, { tech: "Markdown" }],
    results: [
      {
        value: "1",
        label: tri("source de vérité", "single source of truth", "unica fonte di verità"),
      },
      { value: "auto", label: tri("issues générées", "issues generated", "issue generate") },
      { value: "CLI", label: tri("zéro UI requise", "no UI required", "nessuna UI richiesta") },
    ],
  },
];
