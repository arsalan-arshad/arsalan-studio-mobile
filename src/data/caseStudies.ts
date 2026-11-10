export type CaseStudy = {
  id: string;
  title: string;
  category: "Shopify" | "Salesforce" | "Other";
  status: string;
  blurb: string;
  githubUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  demoUrl?: string;
  demoLabel?: string;
  youtubeUrl?: string;
  youtubeLabel?: string;
};

const WEB = process.env.EXPO_PUBLIC_API_URL ?? "https://arsalandev.studio";

export const caseStudies: CaseStudy[] = [
  {
    id: "ai-forecast",
    title: "AI Forecast Agent",
    category: "Shopify",
    status: "Live",
    blurb: "Deterministic inventory math + grounded AI. Live on App Store.",
    githubUrl: "https://github.com/arsalan-arshad/Ai-Agent-Shopify-App",
    liveUrl: "https://apps.shopify.com/ai-forecast-agent",
    liveLabel: "Live",
  },
  {
    id: "protocols",
    title: "Practitioner Protocols",
    category: "Shopify",
    status: "Coming soon",
    blurb: "Protocols by link/QR with one-tap add-to-cart.",
    githubUrl: "https://github.com/arsalan-arshad/practitioner-protocols",
    demoUrl: "https://practitioner-protocols-production.up.railway.app/demo",
    demoLabel: "Demo",
    youtubeUrl: "https://www.youtube.com/watch?v=m0nlmLj-RKE",
  },
  {
    id: "pipeline",
    title: "Pipeline-Aware Forecast",
    category: "Shopify",
    status: "Coming soon",
    blurb: "Salesforce pipeline as forward demand in Shopify forecasts.",
    githubUrl: "https://github.com/arsalan-arshad/pipeline-aware-forecast",
    youtubeUrl: "https://www.youtube.com/watch?v=DpOLWprYx7g",
  },
  {
    id: "bridge",
    title: "Bridge Core Recipes",
    category: "Shopify",
    status: "Coming soon",
    blurb: "Narrow Shopify → Salesforce recipes on a small shared core.",
    githubUrl: "https://github.com/arsalan-arshad/bridge-recipes",
    youtubeUrl: "https://www.youtube.com/watch?v=vGMt_7cxuKg",
  },
  {
    id: "mcp",
    title: "Inventory MCP Server",
    category: "Shopify",
    status: "Released",
    blurb:
      "v0.2.3 — deterministic inventory MCP for AI assistants. Local or hosted BYOK.",
    githubUrl: "https://github.com/arsalan-arshad/shopify-inventory-mcp",
    liveUrl: "https://shopify-inventory-mcp-production-e5fd.up.railway.app/",
    liveLabel: "Live",
  },
  {
    id: "smart-cloner",
    title: "Smart Record Cloner",
    category: "Salesforce",
    status: "Released",
    blurb: "Deep clone 2GP with interactive demo.",
    githubUrl: "https://github.com/arsalan-arshad/smart-record-cloner",
    liveUrl:
      "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tg7000000V6E1AAK",
    liveLabel: "Install",
    demoUrl: `${WEB}/demos/salesforce/01-smart-record-cloner.html`,
  },
  {
    id: "flow-toast",
    title: "Clean Flow Toast & Alerts",
    category: "Salesforce",
    status: "Released",
    blurb: "Flow UI supercharger — audio, confetti, sticky toasts.",
    githubUrl: "https://github.com/arsalan-arshad/clean-flow-toast-alerts",
    liveUrl:
      "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tg7000000WDVBAA4",
    liveLabel: "Install",
    demoUrl: `${WEB}/demos/salesforce/02-clean-flow-toast-alerts.html`,
  },
  {
    id: "file-viewer",
    title: "Universal Quick File Viewer",
    category: "Salesforce",
    status: "Released",
    blurb: "Gallery, lightbox, bulk ZIP, Agentforce summarizer.",
    githubUrl: "https://github.com/arsalan-arshad/universal-quick-file-viewer",
    liveUrl:
      "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tg7000000WDi5AAG",
    liveLabel: "Install",
    demoUrl: `${WEB}/demos/salesforce/03-universal-quick-file-viewer.html`,
  },
  {
    id: "sf-connector",
    title: "Shopify ↔ Salesforce Connector",
    category: "Salesforce",
    status: "Released",
    blurb: "Zero per-task fees. HMAC webhooks + DLQ.",
    githubUrl: "https://github.com/arsalan-arshad/shopify-salesforce-connector",
    liveUrl:
      "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tg7000000XZWrAAO",
    liveLabel: "Install",
    demoUrl: `${WEB}/demos/salesforce/04-shopify-salesforce-connector.html`,
  },
  {
    id: "forecast-bridge",
    title: "Shopify AI Forecast Bridge",
    category: "Salesforce",
    status: "Released",
    blurb: "WMA stockouts + BYOK inventory agent in Salesforce.",
    githubUrl: "https://github.com/arsalan-arshad/shopify-ai-forecast-bridge",
    liveUrl:
      "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tg7000000YxVVAA0",
    liveLabel: "Install",
    demoUrl: `${WEB}/demos/salesforce/05-shopify-ai-forecast-bridge.html`,
  },
  {
    id: "urdu-nlu",
    title: "Urdu Business NLU",
    category: "Other",
    status: "Completed",
    blurb: "MIT library: Urdu/Roman-Urdu messages → validated records.",
    githubUrl: "https://github.com/arsalan-arshad/urdu-business-nlu",
    liveUrl: "https://www.npmjs.com/package/urdu-business-nlu",
    liveLabel: "Live",
  },
  {
    id: "hub",
    title: "Influencer Hub",
    category: "Other",
    status: "Live",
    blurb: "Stockroom Studio hub for AI influencer characters.",
    liveUrl: "https://influencer-hub-production-23f6.up.railway.app/",
    liveLabel: "Live",
  },
  {
    id: "sme",
    title: "SME Automation Services",
    category: "Other",
    status: "Coming soon / launching",
    blurb: "Fixed-scope WhatsApp / ERP / commerce automation.",
  },
  {
    id: "eu-ai-act",
    title: "EU AI Act Checker",
    category: "Other",
    status: "Coming soon",
    blurb:
      "Open scanner for public-site AI Act transparency basics + paid audit report. Technical check, not legal advice.",
    githubUrl: "https://github.com/arsalan-arshad/ai-act-check",
  },
  {
    id: "freight",
    title: "Freight Exceptions",
    category: "Other",
    status: "Coming soon",
    blurb:
      "Deterministic exception rules for small brokers/3PLs — AI extracts and drafts; humans approve.",
    githubUrl: "https://github.com/arsalan-arshad/freight-exceptions",
  },
];
