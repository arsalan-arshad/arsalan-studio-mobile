/** Studio framing — aligned with web `src/data/studio.ts`. */

export const pastServices = [
  {
    title: "Mobile apps",
    body: "React Native, iOS, Android, and Flutter — Fastlane / store pipelines, AR and social products, startup and education apps.",
  },
  {
    title: "Web & studio products",
    body: "React / Next.js surfaces, Shopify and Salesforce packages, and cloud backends for remote clients worldwide.",
  },
  {
    title: "Integrations & cloud",
    body: "AWS, GCP, Azure, Firebase — secure credentials, CI/CD, and systems that stay operable.",
  },
] as const;

/** Value props — text-only on mobile (web uses Digitize Turf SVG icons). */
export const studioPrinciples = [
  { id: "clean", name: "Clean code" },
  { id: "oop", name: "Solid architecture" },
  { id: "response", name: "Fast response" },
  { id: "value", name: "Clear value" },
  { id: "availability", name: "Daily collaboration" },
  { id: "cloud", name: "Cloud-ready delivery" },
] as const;

export const studioSkills = [
  { id: "react", name: "React / RN" },
  { id: "ts", name: "TypeScript" },
  { id: "node", name: "Node.js" },
  { id: "next", name: "Next.js" },
  { id: "nest", name: "NestJS" },
  { id: "flutter", name: "Flutter" },
  { id: "ios", name: "iOS" },
  { id: "android", name: "Android" },
  { id: "aws", name: "AWS" },
  { id: "gcp", name: "GCP" },
  { id: "azure", name: "Azure" },
  { id: "firebase", name: "Firebase" },
  { id: "docker", name: "Docker" },
  { id: "figma", name: "Figma" },
] as const;

export const buildTools = [
  {
    id: "cursor",
    name: "Cursor",
    blurb: "AI-native IDE for fast, reviewed implementation.",
  },
  {
    id: "claude",
    name: "Claude",
    blurb: "Deep reasoning, specs, and careful code review in the loop.",
  },
  {
    id: "antigravity",
    name: "Antigravity",
    blurb: "Orchestration layer across agents, tasks, and delivery cadence.",
  },
] as const;
