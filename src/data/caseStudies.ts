export type CaseStudyCategory = "ai" | "shopify" | "salesforce" | "other";

export type CaseStudy = {
  id: string;
  title: string;
  category: CaseStudyCategory;
  status: string;
  blurb: string;
  /** Manual pin within a category (lower = earlier). */
  listOrder?: number;
  githubUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  npmUrl?: string;
  demoUrl?: string;
  demoLabel?: string;
  installGuide?: {
    title: string;
    body: string;
    urlExample: string;
  };
  youtubeUrl?: string;
  youtubeLabel?: string;
};

const WEB = process.env.EXPO_PUBLIC_API_URL ?? "https://arsalandev.studio";

/** Content aligned with web `src/data/caseStudies.ts` (mobile keeps local ids). */
export const caseStudies: CaseStudy[] = [
  {
    id: "pathwise",
    title: "Pathwise",
    category: "ai",
    status: "Released",
    blurb:
      "Query planner for RAG and agent pipelines — declare your quality SLA; Pathwise picks the cheapest plan per request. Open-source TypeScript SDK.",
    githubUrl: "https://github.com/arsalan-arshad/pathwise",
    npmUrl: "https://www.npmjs.com/package/@arsalandev/pathwise",
  },
  {
    id: "gatekeeper",
    title: "Gatekeeper",
    category: "ai",
    status: "Live",
    blurb:
      "Open-source AI principal — your front door for inbound requests. Plain-English rules, double-opt-in intros, public ledger reputation. AGPL.",
    liveUrl: "https://gatekeeper.arsalandev.studio/",
    liveLabel: "Live",
    githubUrl: "https://github.com/arsalan-arshad/gatekeeper",
  },
  {
    id: "ai-forecast",
    title: "AI Forecast Agent",
    category: "shopify",
    status: "Live",
    listOrder: 1,
    blurb:
      "Deterministic inventory math + grounded AI co-pilot. Live on the Shopify App Store. BYOK Gemini/Claude.",
    githubUrl: "https://github.com/arsalan-arshad/Ai-Agent-Shopify-App",
    liveUrl: "https://apps.shopify.com/ai-forecast-agent",
    liveLabel: "Live",
    youtubeUrl: "https://www.youtube.com/watch?v=-QAu-qkicjQ",
  },
  {
    id: "protocols",
    title: "Practitioner Protocols",
    category: "shopify",
    status: "Released",
    listOrder: 2,
    blurb:
      "Professionals share product protocols by link/QR with one-tap add-to-cart and attribution. Shopify limited distribution — install via the usage guide (not on the public App Store yet).",
    githubUrl: "https://github.com/arsalan-arshad/practitioner-protocols",
    demoUrl: "https://practitioner.arsalandev.studio/demo",
    demoLabel: "Demo",
    installGuide: {
      title: "Guide: App usage",
      body: "Shopify has this app in limited distribution (not on the public App Store yet). Open this URL and replace [STORE-NAME] with your shop subdomain:",
      urlExample:
        "https://practitioner.arsalandev.studio/api/auth?shop=[STORE-NAME].myshopify.com",
    },
    liveUrl: "https://practitioner.arsalandev.studio/",
    liveLabel: "Live",
    youtubeUrl: "https://www.youtube.com/watch?v=m0nlmLj-RKE",
  },
  {
    id: "pipeline",
    title: "Pipeline-Aware Forecast",
    category: "shopify",
    status: "Pending Shopify",
    blurb:
      "Salesforce pipeline becomes forward demand in Shopify forecasting — the connective tissue most stacks skip. Pending Shopify review / App Store listing.",
    githubUrl: "https://github.com/arsalan-arshad/pipeline-aware-forecast",
    youtubeUrl: "https://www.youtube.com/watch?v=DpOLWprYx7g",
  },
  {
    id: "bridge",
    title: "Bridge Core Recipes",
    category: "shopify",
    status: "Pending Shopify",
    blurb:
      "Small shared core + narrow Shopify → Salesforce recipes instead of a bloated horizontal sync. Pending Shopify review / App Store listing.",
    githubUrl: "https://github.com/arsalan-arshad/bridge-recipes",
    youtubeUrl: "https://www.youtube.com/watch?v=vGMt_7cxuKg",
  },
  {
    id: "mcp",
    title: "Inventory MCP Server",
    category: "shopify",
    status: "Released",
    blurb:
      "Open-source MCP (v0.2.3): deterministic inventory forecasts for any AI assistant — local stdio or hosted Streamable HTTP. BYOK Shopify headers; numbers the model can explain, not invent.",
    githubUrl: "https://github.com/arsalan-arshad/shopify-inventory-mcp",
    liveUrl: "https://shopify-mcp.arsalandev.studio/",
    liveLabel: "Live",
  },
  {
    id: "smart-cloner",
    title: "Smart Record Cloner",
    category: "salesforce",
    status: "Released",
    blurb:
      "Deep clone utility with smart date shifting, child tagging, and Agentforce-ready invocable actions. AppExchange in review.",
    githubUrl: "https://github.com/arsalan-arshad/smart-record-cloner",
    liveUrl:
      "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tg7000000V6E1AAK",
    liveLabel: "Install",
    demoUrl: `${WEB}/demos/salesforce/01-smart-record-cloner.html`,
    demoLabel: "Demo",
  },
  {
    id: "flow-toast",
    title: "Clean Flow Toast & Alerts",
    category: "salesforce",
    status: "Released",
    blurb:
      "Flow UI supercharger — Web Audio cues, confetti particles, sticky actionable toasts, platform events.",
    githubUrl: "https://github.com/arsalan-arshad/clean-flow-toast-alerts",
    liveUrl:
      "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tg7000000WDVBAA4",
    liveLabel: "Install",
    demoUrl: `${WEB}/demos/salesforce/02-clean-flow-toast-alerts.html`,
    demoLabel: "Demo",
  },
  {
    id: "file-viewer",
    title: "Universal Quick File Viewer",
    category: "salesforce",
    status: "Released",
    blurb:
      "Record-page LWC gallery, lightbox, bulk ZIP download, drag-and-drop upload, Agentforce summarizer.",
    githubUrl: "https://github.com/arsalan-arshad/universal-quick-file-viewer",
    liveUrl:
      "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tg7000000WDi5AAG",
    liveLabel: "Install",
    demoUrl: `${WEB}/demos/salesforce/03-universal-quick-file-viewer.html`,
    demoLabel: "Demo",
  },
  {
    id: "sf-connector",
    title: "Shopify ↔ Salesforce Connector",
    category: "salesforce",
    status: "Released",
    blurb:
      "Zero per-task fees. HMAC webhooks, DLQ retries, custom metadata mapping LWC in Setup.",
    githubUrl: "https://github.com/arsalan-arshad/shopify-salesforce-connector",
    liveUrl:
      "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tg7000000XZWrAAO",
    liveLabel: "Install",
    demoUrl: `${WEB}/demos/salesforce/04-shopify-salesforce-connector.html`,
    demoLabel: "Demo",
  },
  {
    id: "forecast-bridge",
    title: "Shopify AI Forecast Bridge",
    category: "salesforce",
    status: "Released",
    blurb:
      "WMA stockout math in Salesforce + conversational inventory agent (BYOK) with opportunity stock checks.",
    githubUrl: "https://github.com/arsalan-arshad/shopify-ai-forecast-bridge",
    liveUrl:
      "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tg7000000YxVVAA0",
    liveLabel: "Install",
    demoUrl: `${WEB}/demos/salesforce/05-shopify-ai-forecast-bridge.html`,
    demoLabel: "Demo",
  },
  {
    id: "urdu-nlu",
    title: "Urdu Business NLU",
    category: "other",
    status: "Completed",
    blurb:
      "MIT TypeScript library: informal Urdu / Roman-Urdu business messages → validated structured records. Published on npm.",
    githubUrl: "https://github.com/arsalan-arshad/urdu-business-nlu",
    npmUrl: "https://www.npmjs.com/package/urdu-business-nlu",
    liveUrl: "https://www.npmjs.com/package/urdu-business-nlu",
    liveLabel: "npm",
  },
  {
    id: "hub",
    title: "Influencer Hub",
    category: "other",
    status: "Live",
    blurb:
      "Stockroom Studio hub for AI influencer characters (Nana Says, Pallet the Robot) — labeled as AI, not human creators.",
    liveUrl: "https://influencer.arsalandev.studio/",
    liveLabel: "Live",
    githubUrl: "https://github.com/arsalan-arshad/Influencer-hub",
  },
  {
    id: "proposal-guard",
    title: "Proposal Guard",
    category: "other",
    status: "Live",
    blurb:
      "Deterministic, offline scope-creep checker for proposals and SOWs — quotes the risky sentence, names the rule, suggests a fill-in-the-blanks fix. Not legal advice.",
    liveUrl: "https://proposal-guard.arsalandev.studio/",
    liveLabel: "Live",
    npmUrl: "https://www.npmjs.com/package/proposal-guard",
    githubUrl: "https://github.com/arsalan-arshad/proposal-guard",
  },
  {
    id: "sme",
    title: "SME Automation Services",
    category: "other",
    status: "Coming soon",
    blurb:
      "Fixed-scope WhatsApp / ERP / Shopify / Salesforce automation with open-source recipes and honest exclusions.",
  },
  {
    id: "eu-ai-act",
    title: "EU AI Act Checker",
    category: "other",
    status: "Coming soon",
    blurb:
      "Open scanner for public-site AI Act transparency basics + paid audit report. Technical check, not legal advice.",
    githubUrl: "https://github.com/arsalan-arshad/ai-act-check",
  },
  {
    id: "freight",
    title: "Freight Exceptions",
    category: "other",
    status: "Coming soon",
    blurb:
      "Deterministic exception rules for small brokers/3PLs — AI extracts and drafts; humans approve.",
    githubUrl: "https://github.com/arsalan-arshad/freight-exceptions",
  },
];

export const categoryKeys: CaseStudyCategory[] = [
  "ai",
  "shopify",
  "salesforce",
  "other",
];

export const categoryLabel: Record<CaseStudyCategory, string> = {
  ai: "AI",
  shopify: "Shopify",
  salesforce: "Salesforce",
  other: "Libraries",
};

const statusRank: Record<string, number> = {
  Live: 0,
  Released: 1,
  Completed: 1,
  "Pending Shopify": 2,
  "Coming soon": 3,
};

const STATUS_SORT_BASE = 100;

export function sortCaseStudiesByStatus(studies: CaseStudy[]): CaseStudy[] {
  return [...studies].sort((a, b) => {
    const aKey = a.listOrder ?? STATUS_SORT_BASE + (statusRank[a.status] ?? 9);
    const bKey = b.listOrder ?? STATUS_SORT_BASE + (statusRank[b.status] ?? 9);
    return aKey - bKey;
  });
}

export function studiesByCategory(category: CaseStudyCategory) {
  return sortCaseStudiesByStatus(
    caseStudies.filter((c) => c.category === category),
  );
}

export function parseWorkCategory(
  value: string | string[] | undefined,
): CaseStudyCategory | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return null;
  return categoryKeys.includes(raw as CaseStudyCategory)
    ? (raw as CaseStudyCategory)
    : null;
}

export function panelEyebrow(
  key: CaseStudyCategory,
  count: number,
): string | undefined {
  if (key === "salesforce") return `Full suite · ${count} packages`;
  if (key === "other") return "npm · hosted · open source";
  return undefined;
}
