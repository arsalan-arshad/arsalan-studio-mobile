export type Offer = {
  id: string;
  name: string;
  forWho: string;
  includes: string[];
  startingPoint: string;
  cta: string;
};

export const offers: Offer[] = [
  {
    id: "shopify-app",
    name: "I can bring a Shopify app to life",
    forWho: "Merchants needing real Admin apps — not GPT wrappers.",
    includes: [
      "Deterministic cores where numbers matter",
      "BYOK AI that explains, never invents",
      "App Store or self-host; open-source friendly",
    ],
    startingPoint: "Send a problem brief or blueprint.",
    cta: "Start conversation",
  },
  {
    id: "salesforce-package",
    name: "I can ship Salesforce packages & bridges",
    forWho: "Teams needing 2GP utilities or Shopify ↔ SF signals.",
    includes: [
      "LWC + Apex, unlocked 2GP",
      "HMAC webhooks, mapping UI",
      "Interactive demos for stakeholders",
    ],
    startingPoint: "Describe the object / Flow / signal.",
    cta: "Start conversation",
  },
  {
    id: "mobile-web",
    name: "I can deliver mobile & web products",
    forWho: "Founders needing Expo/RN or Next.js with a real API.",
    includes: [
      "Auth-gated messaging patterns",
      "Store-prep / CI habits",
      "Daily progress chat",
    ],
    startingPoint: "Name the first three screens.",
    cta: "Start conversation",
  },
  {
    id: "retainer",
    name: "I can stay on as daily collaboration",
    forWho: "Operators wanting a sole engineer on a weekly cadence.",
    includes: [
      "Living backlog + daily check-ins",
      "Fixed-scope slices",
      "Open-source recipes when reusable",
    ],
    startingPoint: "Book discovery; lock cadence first.",
    cta: "Start conversation",
  },
];
