/** Brand constants — keep in sync with web `src/lib/brand.ts`. */
export const brand = {
  name: "Arsalan Arshad",
  shortName: "Arsalan",
  tagline:
    "Shopify and Salesforce apps, mobile and web products — built and shipped by one engineer.",
  email: "arsalanarshad.dev@gmail.com",
  domain: "arsalandev.studio",
  packageId: "studio.arsalan.app",
  expoSlug: "arsalan-studio",
  host: "Railway",
  siteUrl: "https://arsalandev.studio",
  privacyUrl: "https://arsalandev.studio/privacy",
  clutch: "https://clutch.co/profile/arsalan-arshad",
  /** Same mark uploaded on Clutch — mobile app icon */
  clutchIcon: require("../../assets/icon.png") as number,
  pastBrand: {
    name: "Digitize Turf",
  },
} as const;
