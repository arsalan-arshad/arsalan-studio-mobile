/** Condensed case study bodies for mobile detail — mirrors web honesty. */
export type MobileDetail = {
  id: string;
  summary: string;
  problem: string;
  solution: string;
  audience: string;
  features: string[];
  openSource: string;
  buildingNote?: string;
};

export const details: Record<string, MobileDetail> = {
  "ai-forecast": {
    id: "ai-forecast",
    summary:
      "Shopify inventory forecasts with auditable math + BYOK AI that explains snapshots.",
    problem: "Many “AI” inventory apps invent numbers behind a chatbot.",
    solution:
      "Deterministic WMA/reorder engine; AI grounded on server-built snapshots. Live on App Store. MIT.",
    audience: "Shopify merchants needing trustworthy stockout signals.",
    features: ["WMA + reorder math", "BYOK Gemini/Claude", "Encrypted keys", "MIT PRs welcome"],
    openSource: "MIT — https://github.com/arsalan-arshad/Ai-Agent-Shopify-App",
  },
  pipeline: {
    id: "pipeline",
    summary: "Fold Salesforce wholesale pipeline into Shopify forecasts.",
    problem: "Retail history ignores open wholesale deals until stock breaks.",
    solution: "Weighted pipeline demand + three scenarios; SF read-only. Early development.",
    audience: "Hybrid D2C + wholesale brands.",
    features: ["Three scenarios", "SKU matching panel", "MIT"],
    openSource: "MIT — github.com/arsalan-arshad/pipeline-aware-forecast",
    buildingNote: "Not installable yet — engine tested locally.",
  },
  bridge: {
    id: "bridge",
    summary: "Shopify → Salesforce recipes on a small durable core.",
    problem: "Full sync floods CRM; Zapier charges per task.",
    solution: "Signed webhooks, queue, dry-run, kill switch. Developer preview.",
    audience: "Teams wanting useful signals, not mirrors.",
    features: ["Dry-run", "DLQ replay", "Privacy webhooks"],
    openSource: "MIT — PRs welcome when repo is linked publicly.",
    buildingNote: "Not production-deployed yet.",
  },
  protocols: {
    id: "protocols",
    summary: "Practitioner product protocols via link/QR; one-tap cart add.",
    problem: "Clinic recommendations get lost; brands lack attribution.",
    solution: "Zero-PII protocols, share tokens, storefront Add all. Strong test suite; Railway live.",
    audience: "Professional / wellness brands on Shopify.",
    features: ["QR/link share", "Zero PII barrier", "Attribution counters"],
    openSource: "MIT — open for PRs.",
  },
  mcp: {
    id: "mcp",
    summary: "MCP server for deterministic inventory forecasts (local or hosted).",
    problem: "Assistants guess reorder numbers.",
    solution: "Four tools; BYOK Shopify headers on hosted Railway endpoint. Released v0.2.x.",
    audience: "Devs using AI assistants with Shopify Admin data.",
    features: ["list_at_risk_skus", "get_sku_forecast", "explain_forecast_inputs"],
    openSource: "MIT — github.com/arsalan-arshad/shopify-inventory-mcp",
  },
  "smart-cloner": {
    id: "smart-cloner",
    summary: "Salesforce deep clone with date shift, child tagging, Flow/Agentforce.",
    problem: "Native clone is awkward for related trees.",
    solution: "LWC + Apex DeepCloneService with savepoints. 2GP released.",
    audience: "Admins & Agentforce builders.",
    features: ["Date shift", "Invocable action", "Interactive demo"],
    openSource: "MIT — github.com/arsalan-arshad/smart-record-cloner",
  },
  "flow-toast": {
    id: "flow-toast",
    summary: "Rich Flow toasts, audio, confetti, Platform Events.",
    problem: "Flows lack rich native toast UX.",
    solution: "LWC + event listener package. 2GP released.",
    audience: "Flow admins/developers.",
    features: ["Web Audio", "Sticky toasts", "Demo HTML"],
    openSource: "MIT — github.com/arsalan-arshad/clean-flow-toast-alerts",
  },
  "file-viewer": {
    id: "file-viewer",
    summary: "Record-page gallery, lightbox, bulk ZIP, drag-drop upload.",
    problem: "File UX on records is fragmented.",
    solution: "LWC package with bulk ZIP. 2GP released.",
    audience: "Sales/service teams on record pages.",
    features: ["Lightbox", "Bulk ZIP", "Uploader"],
    openSource: "MIT — github.com/arsalan-arshad/universal-quick-file-viewer",
  },
  "sf-connector": {
    id: "sf-connector",
    summary: "Shopify ↔ Salesforce signals without per-task fees.",
    problem: "Sync tax or CRM floods.",
    solution: "HMAC webhooks, DLQ, mapping LWC. 2GP released.",
    audience: "Hybrid commerce + Salesforce teams.",
    features: ["HMAC", "DLQ", "Mapping UI"],
    openSource: "MIT — github.com/arsalan-arshad/shopify-salesforce-connector",
  },
  "forecast-bridge": {
    id: "forecast-bridge",
    summary: "Inventory intelligence inside Salesforce + BYOK chat.",
    problem: "Wholesale deals ignore storefront stockouts.",
    solution: "WMA in SF + opportunity stock checks. 2GP released.",
    audience: "SF sales/ops vs Shopify stock.",
    features: ["Dashboard", "BYOK chat", "Deal protection"],
    openSource: "MIT — github.com/arsalan-arshad/shopify-ai-forecast-bridge",
  },
  "urdu-nlu": {
    id: "urdu-nlu",
    summary: "Urdu/Roman-Urdu business NLU library with deterministic validator.",
    problem: "Messy chat orders become wrong quantities.",
    solution: "Rules-only propose/validate/route. npm + GitHub.",
    audience: "Builders of chat/ERP tools.",
    features: ["Offline rules path", "Gold eval set", "Confirm over wrong numbers"],
    openSource: "MIT library · CC-BY-4.0 eval — PRs welcome",
  },
  hub: {
    id: "hub",
    summary: "Stockroom Studio hub for AI influencer characters.",
    problem: "Need a simple attributed landing for AI character bios.",
    solution: "Node hub, signup volume, click stats. Labeled AI characters.",
    audience: "Instagram visitors from Nana / Pallet.",
    features: ["Campaign tags", "App cards", "Privacy page"],
    openSource: "Hub is ops surface; linked product repos stay MIT.",
  },
  "proposal-guard": {
    id: "proposal-guard",
    summary:
      "Deterministic, offline scope-creep checker for proposals and SOWs — quotes the sentence, names the rule, suggests a fill-in-the-blanks fix.",
    problem:
      "Proposal wording quietly invites extra work: “etc.”, unlimited revisions, approvals with no deadline, unpaid cloud bills.",
    solution:
      "Fixed TypeScript rules (no model): SCOPE-01, TIME-03, HOST-02, REVISE-04. Offline, stores nothing. Not legal advice.",
    audience: "Freelancers and small studios checking drafts before send.",
    features: [
      "Quoted finding + why + blanked suggestion",
      "CLI, library, local MCP",
      "Live Railway demo",
      "MIT + published evaluation misses",
    ],
    openSource: "MIT — https://github.com/arsalan-arshad/proposal-guard",
  },
  sme: {
    id: "sme",
    summary: "Fixed-scope SME automation services (hypotheses).",
    problem: "SMEs want finished automation, not tools.",
    solution: "Scoped offers + MIT recipes intent. Being validated.",
    audience: "Distributors/retailers/hybrid merchants.",
    features: ["Honest exclusions", "Open recipes (planned)"],
    openSource: "MIT recipes when published.",
    buildingNote: "No clients yet — conversation-first.",
  },
  "eu-ai-act": {
    id: "eu-ai-act",
    summary:
      "Open scanner for public-site AI Act transparency basics + optional paid audit report.",
    problem:
      "Site owners need a technical transparency check — without pretending it is legal advice.",
    solution:
      "Public GitHub scanner (ai-act-check) for disclosure basics; paid report path when demand is clear.",
    audience: "Site operators and agencies needing a technical checklist.",
    features: ["Technical check framing", "Not legal advice", "Public GitHub"],
    openSource: "MIT — github.com/arsalan-arshad/ai-act-check",
    buildingNote: "Repo is public; marketplace listing / paid report still coming soon.",
  },
  freight: {
    id: "freight",
    summary:
      "Deterministic shipment-exception rules for small brokers/3PLs; AI drafts, humans approve.",
    problem: "Exception handling is manual and error-prone for small brokers.",
    solution: "Rules first; AI only extracts/drafts; humans approve.",
    audience: "Small freight brokers and 3PLs.",
    features: ["Rules-first design", "Human approval loop", "Public GitHub"],
    openSource: "MIT — github.com/arsalan-arshad/freight-exceptions",
    buildingNote: "Repo is public; production broker product still gated on conversations.",
  },
};
