/**
 * Seed data for the Journal — 7 articles anchored on real projects and
 * lab experiments. Each piece is a workshop note: a problem, a method, a
 * result. No marketing, no recap.
 *
 * Each article has localized title + lead + body (plain text, converted
 * to Payload Lexical JSON at seed time). Tag picked among the editorial
 * options of the JournalArticles collection.
 */

import type { Locale } from "./projects";

export type JournalArticleSeed = {
  slug: string;
  title: Record<Locale, string>;
  lead: Record<Locale, string>;
  body: Record<Locale, string[]>; // paragraphs
  tag: "perf" | "3d" | "tooling" | "opinion" | "process";
  readingTimeMinutes: number;
  publishedAt: string; // ISO
};

const tri = <T>(fr: T, en: T, it: T): Record<Locale, T> => ({ fr, en, it });

export const JOURNAL_ARTICLES: JournalArticleSeed[] = [
  {
    slug: "faire-petrir-un-robot",
    title: tri(
      "Faire pétrir un robot",
      "Teaching a robot to knead",
      "Insegnare a un robot a impastare",
    ),
    lead: tri(
      "Trois mois sur NonnoRobot. Voilà ce que la pâte nous a appris sur la planification d'actions en boucle fermée.",
      "Three months on NonnoRobot. Here's what dough taught us about closed-loop action planning.",
      "Tre mesi su NonnoRobot. Ecco cosa l'impasto ci ha insegnato sulla pianificazione d'azione a ciclo chiuso.",
    ),
    body: tri(
      [
        "On a commencé en pensant que pétrir était un problème de force. C'est en réalité un problème de feedback. La pâte ne te dit pas ce qu'elle attend de toi — tu le découvres en la touchant.",
        "On a vectorisé 47 recettes pour donner au robot une mémoire de gestes. Au début, il pétrissait toutes les pâtes pareil. Puis il a commencé à différencier — une pizza demande de la fermeté, des pâtes longues demandent de la souplesse. Les embeddings multimodaux ont fait le travail qu'on attendait d'un transformer.",
        "Conclusion : la latence vision-action plafonne à 120 ms quand on cache les embeddings côté Redis. Au-delà, le robot anticipe au lieu de réagir, ce qui est exactement ce qu'on voulait.",
      ],
      [
        "We started thinking kneading was a force problem. It's actually a feedback problem. The dough doesn't tell you what it expects — you find out by touching it.",
        "We vectorised 47 recipes to give the robot a gesture memory. At first it kneaded every dough the same. Then it started to differentiate — a pizza wants firmness, long pasta wants softness. Multimodal embeddings did the work we expected from a transformer.",
        "Takeaway: vision-to-action latency caps at 120 ms when embeddings are cached on the Redis side. Below that, the robot anticipates instead of reacts — which is exactly what we wanted.",
      ],
      [
        "Abbiamo iniziato pensando che impastare fosse un problema di forza. In realtà è un problema di feedback. L'impasto non ti dice cosa si aspetta — lo scopri toccandolo.",
        "Abbiamo vettorializzato 47 ricette per dare al robot una memoria dei gesti. All'inizio impastava tutto allo stesso modo. Poi ha iniziato a differenziare — una pizza vuole fermezza, la pasta lunga vuole morbidezza. Gli embedding multimodali hanno fatto il lavoro che ci aspettavamo da un transformer.",
        "Conclusione: la latenza visione-azione si stabilizza a 120 ms quando gli embedding sono cacheati lato Redis. Sotto quella soglia, il robot anticipa invece di reagire — esattamente quello che volevamo.",
      ],
    ),
    tag: "process",
    readingTimeMinutes: 8,
    publishedAt: "2026-04-22T09:00:00.000Z",
  },

  {
    slug: "llm-14ko-ce-qui-rentre",
    title: tri(
      "LLM à 14 ko : ce qui rentre, ce qui ne rentre pas",
      "Edge LLM at 14 ko: what fits, what doesn't",
      "LLM edge a 14 ko: cosa entra, cosa no",
    ),
    lead: tri(
      "On a benchmarké un petit modèle ONNX + WebGPU sur un ThinkPad de 2019. Verdict : oui, c'est jouable. Non, ce n'est pas magique.",
      "We benchmarked a small ONNX + WebGPU model on a 2019 ThinkPad. Verdict: yes, it's doable. No, it's not magic.",
      "Abbiamo benchmarkato un piccolo modello ONNX + WebGPU su un ThinkPad del 2019. Verdetto: sì, è fattibile. No, non è magia.",
    ),
    body: tri(
      [
        "L'expérience exp_001 cible un cas précis : faire tourner un classificateur de texte de moins de 50 millions de paramètres entièrement côté navigateur, sans aucun appel serveur. ONNX runtime quantifié en INT8, WebGPU pour le compute, et un loader qui télécharge le poids une fois par session.",
        "Sur un ThinkPad T490 (CPU Intel i5-8265U, GPU intégré UHD 620), on tient la cible — 740 ms de latence médiane sur 1000 inférences. Sur un MacBook Air M2 c'est 90 ms. Le facteur 8 est entièrement attribuable au GPU.",
        "Ce qui ne rentre pas : tout ce qui demande de la génération autoregressive longue. Au-delà de 200 tokens, l'attention quadratique fait exploser la mémoire. Donc oui pour la classification, le tagging, la complétion courte. Non pour le chat ouvert.",
      ],
      [
        "Experiment exp_001 targets a precise case: running a text classifier under 50 million parameters fully in the browser, no server call. INT8-quantised ONNX runtime, WebGPU for compute, and a loader that fetches weights once per session.",
        "On a ThinkPad T490 (Intel i5-8265U, integrated UHD 620), we hit the target — 740 ms median latency over 1000 inferences. On a MacBook Air M2 it's 90 ms. The 8x factor is entirely attributable to the GPU.",
        "What doesn't fit: anything requiring long autoregressive generation. Past 200 tokens, quadratic attention blows up memory. So yes to classification, tagging, short completion. No to open-ended chat.",
      ],
      [
        "L'esperimento exp_001 mira a un caso preciso: far girare un classificatore di testo sotto i 50 milioni di parametri interamente nel browser, senza alcuna chiamata server. ONNX runtime quantizzato in INT8, WebGPU per il compute, e un loader che scarica i pesi una volta per sessione.",
        "Su un ThinkPad T490 (CPU Intel i5-8265U, GPU integrata UHD 620), centriamo l'obiettivo — 740 ms di latenza mediana su 1000 inferenze. Su un MacBook Air M2 sono 90 ms. Il fattore 8 è interamente attribuibile alla GPU.",
        "Cosa non entra: qualsiasi cosa richieda generazione autoregressiva lunga. Oltre 200 token, l'attenzione quadratica fa esplodere la memoria. Quindi sì alla classificazione, al tagging, al completamento breve. No alla chat aperta.",
      ],
    ),
    tag: "perf",
    readingTimeMinutes: 6,
    publishedAt: "2026-04-08T09:00:00.000Z",
  },

  {
    slug: "voix-sans-transcription",
    title: tri(
      "Détecter le déclin cognitif sans transcrire la voix",
      "Cognitive decline detection without transcribing voice",
      "Rilevare il declino cognitivo senza trascrivere la voce",
    ),
    lead: tri(
      "Pourquoi Memoria refuse de garder une seule ligne de transcription, et comment on extrait quand même 7 indicateurs cognitifs.",
      "Why Memoria refuses to keep a single line of transcript, and how we still extract 7 cognitive markers.",
      "Perché Memoria rifiuta di conservare anche una sola riga di trascrizione, e come estraiamo comunque 7 marcatori cognitivi.",
    ),
    body: tri(
      [
        "Une transcription de senior, c'est un document intime. On peut y lire qui il a aimé, ce qu'il regrette, comment il pense. Le stocker, c'est trahir un contrat moral, même avec consentement signé.",
        "Donc on ne stocke pas. La transcription tourne en mémoire 30 secondes — le temps d'extraire les features (rythme syllabique, richesse lexicale, taux d'hésitation, ratio mots-pleins/mots-outils, ...) — puis elle disparaît. Seules les features persistent, sous forme de séries temporelles agrégées par jour.",
        "Sept indicateurs suffisent pour repérer un changement à six mois. Le secret n'est pas dans le modèle — il est dans la régularité du signal. Quand on parle 5 minutes par jour à la même voix, les variations ressortent.",
      ],
      [
        "A senior's transcript is an intimate document. You can read who they loved, what they regret, how they think. Storing it betrays a moral contract, even with signed consent.",
        "So we don't store it. The transcript lives in memory for 30 seconds — long enough to extract features (syllable rate, lexical richness, hesitation ratio, content/function-word ratio, ...) — then it's gone. Only the features persist, as daily-aggregated time series.",
        "Seven indicators are enough to spot a six-month drift. The secret isn't in the model — it's in signal regularity. When you talk for 5 minutes a day to the same voice, variations stand out.",
      ],
      [
        "Una trascrizione di una persona anziana è un documento intimo. Vi si può leggere chi ha amato, cosa rimpiange, come pensa. Conservarla è tradire un contratto morale, anche con consenso firmato.",
        "Quindi non conserviamo. La trascrizione vive in memoria 30 secondi — il tempo di estrarre le feature (ritmo sillabico, ricchezza lessicale, tasso di esitazione, rapporto parole-piene/parole-strumenti, ...) — poi sparisce. Solo le feature persistono, come serie temporali aggregate per giorno.",
        "Sette indicatori bastano per individuare un cambiamento a sei mesi. Il segreto non sta nel modello — sta nella regolarità del segnale. Quando si parla 5 minuti al giorno alla stessa voce, le variazioni emergono.",
      ],
    ),
    tag: "opinion",
    readingTimeMinutes: 7,
    publishedAt: "2026-03-25T09:00:00.000Z",
  },

  {
    slug: "validateur-phygital-sans-tracking",
    title: tri(
      "Vérifier qu'un enfant a couru, sans le tracker",
      "Verifying a kid actually ran, without tracking them",
      "Verificare che un bambino abbia davvero corso, senza tracciarlo",
    ),
    lead: tri(
      "L'expérience exp_004 valide les quêtes Kidverse en monde réel. Aucune donnée ne quitte l'appareil. Comment c'est possible.",
      "Experiment exp_004 validates Kidverse real-world quests. No data leaves the device. How that's possible.",
      "L'esperimento exp_004 valida le missioni Kidverse nel mondo reale. Nessun dato lascia il dispositivo. Ecco come è possibile.",
    ),
    body: tri(
      [
        "Le pari de Kidverse : tu poses ton téléphone, tu fais quelque chose dans le monde réel, l'app vérifie, tu gagnes des atomes. Pour vérifier on a besoin de la caméra, du micro, des capteurs. Pour rester éthique on n'a le droit de rien stocker.",
        "Solution : la fusion de capteurs tourne entièrement en local, sur un modèle compact embarqué. La caméra capture, le modèle classifie « jardinage en cours / pas en cours », l'app prend la décision, jette l'image. Idem pour l'audio (lecture à voix haute), pour l'accéléromètre (course), pour la géoloc (visite d'un lieu).",
        "Le résultat : zéro octet d'image ne transite vers nos serveurs. Le seul truc qu'on log, c'est « quête validée à 14h22 » et ça ne dit rien de spécifique sur l'enfant.",
      ],
      [
        "Kidverse's bet: put the phone down, do something in the real world, the app verifies, you earn atoms. Verifying needs camera, mic, sensors. Staying ethical means storing nothing.",
        'Solution: sensor fusion runs entirely locally, on a compact on-device model. Camera captures, model classifies "gardening / not gardening", app decides, image discarded. Same for audio (reading aloud), accelerometer (running), geolocation (visiting a place).',
        'Result: zero image bytes ever transit to our servers. The only log is "quest validated at 14:22" — which says nothing specific about the kid.',
      ],
      [
        "La scommessa di Kidverse: posa il telefono, fai qualcosa nel mondo reale, l'app verifica, guadagni atomi. Per verificare servono camera, microfono, sensori. Per restare etici non si memorizza nulla.",
        "Soluzione: la sensor fusion gira interamente in locale, su un modello compatto embedded. La camera cattura, il modello classifica \"giardinaggio in corso / non in corso\", l'app decide, l'immagine viene scartata. Lo stesso per l'audio (lettura ad alta voce), l'accelerometro (corsa), la geolocalizzazione (visita di un luogo).",
        'Risultato: zero byte di immagine transitano verso i nostri server. L\'unica cosa loggata è "missione validata alle 14:22" — che non dice nulla di specifico sul bambino.',
      ],
    ),
    tag: "process",
    readingTimeMinutes: 6,
    publishedAt: "2026-03-04T09:00:00.000Z",
  },

  {
    slug: "routage-edge-bas-carbone",
    title: tri(
      "Routage edge bas-carbone : 6 mois de mesures",
      "Carbon-aware edge routing: 6 months of measurements",
      "Routing edge a basse emissioni: 6 mesi di misure",
    ),
    lead: tri(
      "L'expérience exp_005 choisit la région la moins carbonée à chaque requête. Voilà ce qu'on a appris en lisant les flux RTE et ENTSO-E pendant 180 jours.",
      "Experiment exp_005 picks the lowest-carbon region per request. Here's what we learned reading RTE and ENTSO-E feeds for 180 days.",
      "L'esperimento exp_005 sceglie la regione a minor impatto carbonico per richiesta. Ecco cosa abbiamo imparato leggendo i flussi RTE e ENTSO-E per 180 giorni.",
    ),
    body: tri(
      [
        "On a déployé une edge function qui consulte trois flux d'intensité électrique (RTE pour la France, ENTSO-E pour l'UE, NESO pour le UK) et qui choisit dynamiquement la région la moins carbonée pour servir une requête, à condition qu'elle soit dans la latence acceptable.",
        "Sur 180 jours d'observation, l'écart entre la région la plus chère (CO₂ par kWh) et la moins chère atteint régulièrement un facteur 4 — typiquement la nuit en France (nucléaire dominant) versus l'après-midi en Allemagne (charbon de pointe).",
        "Le gain réel sur l'empreinte d'une visite de notre site est faible — on parle de 15-20 % en moyenne — mais multiplié par des millions de requêtes, ça devient quelque chose. Le code de l'expérience est sur GitHub. La conclusion technique : ça ne coûte rien à intégrer si l'app tolère un saut de 50-100 ms de latence.",
      ],
      [
        "We deployed an edge function that reads three electrical-grid intensity feeds (RTE for France, ENTSO-E for the EU, NESO for the UK) and dynamically picks the lowest-carbon region to serve a request, provided it's within acceptable latency.",
        "Over 180 days of observation, the gap between the dirtiest region (CO₂ per kWh) and the cleanest regularly reaches a factor of 4 — typically night-time France (nuclear-dominant) versus afternoon Germany (peak coal).",
        "Actual saving on a single visit's footprint is low — 15-20 % on average — but multiplied by millions of requests, it adds up. The experiment's code is on GitHub. Technical takeaway: it costs nothing to integrate if the app tolerates a 50-100 ms latency bump.",
      ],
      [
        "Abbiamo distribuito una edge function che legge tre flussi di intensità elettrica (RTE per la Francia, ENTSO-E per l'UE, NESO per il UK) e sceglie dinamicamente la regione a minor impatto carbonico per servire una richiesta, purché sia in latenza accettabile.",
        "Su 180 giorni di osservazione, lo scarto tra la regione più sporca (CO₂ per kWh) e la più pulita raggiunge regolarmente un fattore 4 — tipicamente Francia di notte (nucleare dominante) contro Germania di pomeriggio (picco carbone).",
        "Il guadagno reale sull'impronta di una singola visita è basso — 15-20 % in media — ma moltiplicato per milioni di richieste, conta. Il codice dell'esperimento è su GitHub. Conclusione tecnica: non costa nulla integrare se l'app tollera 50-100 ms di latenza in più.",
      ],
    ),
    tag: "process",
    readingTimeMinutes: 9,
    publishedAt: "2026-02-18T09:00:00.000Z",
  },

  {
    slug: "crdt-p2p-ce-qui-casse",
    title: tri(
      "Synchro CRDT en P2P : ce qui marche, ce qui casse",
      "P2P CRDT sync: what works, what breaks",
      "Sync CRDT in P2P: cosa funziona, cosa si rompe",
    ),
    lead: tri(
      "Six mois sur exp_006. WebRTC + Yjs sans serveur d'autorité, et les pièges qu'on n'avait pas anticipés.",
      "Six months on exp_006. WebRTC + Yjs with no authority server, and the gotchas we hadn't anticipated.",
      "Sei mesi su exp_006. WebRTC + Yjs senza server di autorità, e le trappole che non avevamo previsto.",
    ),
    body: tri(
      [
        "L'idée : pourquoi avoir un serveur d'autorité pour synchroniser un document collaboratif quand WebRTC permet du peer-to-peer direct ? On a construit l'expérience sur Yjs, qui résout les conflits déterministiquement, et on a fait passer tous les états par un mesh DataChannel.",
        "Ce qui marche : la collaboration synchrone à 2-3 utilisateurs en même réseau local. Latence sub-50 ms, pas de serveur à payer, pas de point de défaillance central. Pour un usage type studio créatif (designers + dev sur un même brief), c'est nickel.",
        "Ce qui casse : NAT traversal, hot-reload de pair, et surtout l'historique. Sans serveur, comment un nouveau venu rattrape le document si tous les pairs précédents sont déconnectés ? On a fini par ajouter un signaling server passif qui héberge un snapshot — donc plus tout à fait peer-to-peer, mais plus tout à fait client-serveur non plus.",
      ],
      [
        "The idea: why have an authority server syncing a collaborative document when WebRTC allows direct peer-to-peer? We built the experiment on Yjs, which resolves conflicts deterministically, and routed all state through a DataChannel mesh.",
        "What works: synchronous collaboration with 2-3 users on the same local network. Sub-50 ms latency, no server to pay for, no central failure point. For a creative-studio use case (designers + devs on the same brief), it's clean.",
        "What breaks: NAT traversal, peer hot-reload, and especially history. Without a server, how does a newcomer catch up on the document if all previous peers are disconnected? We ended up adding a passive signaling server that hosts a snapshot — so not quite peer-to-peer anymore, but not quite client-server either.",
      ],
      [
        "L'idea: perché avere un server di autorità per sincronizzare un documento collaborativo quando WebRTC permette il peer-to-peer diretto? Abbiamo costruito l'esperimento su Yjs, che risolve i conflitti deterministicamente, e abbiamo fatto passare tutti gli stati attraverso un mesh DataChannel.",
        "Cosa funziona: collaborazione sincrona con 2-3 utenti sulla stessa rete locale. Latenza sub-50 ms, niente server da pagare, nessun punto di guasto centrale. Per un caso d'uso tipo studio creativo (designer + dev sullo stesso brief), pulito.",
        "Cosa si rompe: NAT traversal, hot-reload di un peer, e soprattutto la storia. Senza server, come fa un nuovo arrivato a recuperare il documento se tutti i peer precedenti sono disconnessi? Abbiamo finito per aggiungere un signaling server passivo che ospita uno snapshot — quindi non proprio più peer-to-peer, ma neanche più client-server.",
      ],
    ),
    tag: "tooling",
    readingTimeMinutes: 10,
    publishedAt: "2026-02-02T09:00:00.000Z",
  },

  {
    slug: "landing-8ko-sans-frustration",
    title: tri(
      "Une landing à 8 ko sans frustrer le visiteur",
      "An 8 ko landing page without frustrating the visitor",
      "Una landing da 8 ko senza frustrare il visitatore",
    ),
    lead: tri(
      "L'expérience exp_007 prouve qu'on peut faire une vraie page premium en HTML+CSS uniquement, sous 8 kilo-octets gzip. Mais à quel prix ?",
      "Experiment exp_007 proves you can build a real premium page in HTML+CSS only, under 8 kilobytes gzip. But at what cost?",
      "L'esperimento exp_007 prova che si può fare una vera pagina premium in solo HTML+CSS, sotto gli 8 kilobyte gzip. Ma a quale prezzo?",
    ),
    body: tri(
      [
        "Le défi : pas un seul kilo-octet de JavaScript, pas une seule polyfill, pas un seul script tiers. La page doit charger en moins de 200 ms, scroller en 60 fps, avoir des animations propres au scroll, supporter le responsive, et tenir sous 8 ko gzip.",
        "Ce qu'on a pu faire : layout grid, animations CSS scroll-driven (Chrome 115+, fallback gracieux), formulaires natifs avec validation HTML5, dark mode via prefers-color-scheme. La typographie est variable, sous-réglée, woff2. Les images sont AVIF inline ou en background-image.",
        "Ce qu'on n'a pas pu faire : modaux d'inscription avec animation, carrousels d'images interactifs, comparateurs, calculateurs. Pour ça on a besoin de JS. Mais 80 % des landings n'ont pas besoin de ça — on est juste habitués à mettre du JS partout par habitude.",
      ],
      [
        "The challenge: not one kilobyte of JavaScript, not one polyfill, not one third-party script. The page must load in under 200 ms, scroll at 60 fps, have clean scroll-driven animations, support responsive, and stay under 8 ko gzip.",
        "What we could do: grid layout, CSS scroll-driven animations (Chrome 115+, graceful fallback), native forms with HTML5 validation, dark mode via prefers-color-scheme. Typography is variable, subsetted, woff2. Images are inline AVIF or background-image.",
        "What we couldn't do: animated signup modals, interactive image carousels, comparators, calculators. For those, JS is needed. But 80 % of landing pages don't need this — we just default to shipping JS by habit.",
      ],
      [
        "La sfida: nemmeno un kilobyte di JavaScript, nemmeno una polyfill, nemmeno uno script di terze parti. La pagina deve caricare in meno di 200 ms, scrollare a 60 fps, avere animazioni pulite legate allo scroll, supportare il responsive e restare sotto 8 ko gzip.",
        "Cosa abbiamo potuto fare: layout a griglia, animazioni CSS scroll-driven (Chrome 115+, fallback graceful), form nativi con validazione HTML5, dark mode via prefers-color-scheme. La tipografia è variabile, sottosettata, woff2. Le immagini sono AVIF inline o background-image.",
        "Cosa non abbiamo potuto fare: modali di registrazione animati, caroselli di immagini interattivi, comparatori, calcolatori. Per questi serve JS. Ma l'80 % delle landing page non ne hanno bisogno — semplicemente spediamo JS per abitudine.",
      ],
    ),
    tag: "perf",
    readingTimeMinutes: 7,
    publishedAt: "2026-01-14T09:00:00.000Z",
  },
];
