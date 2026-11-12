export type PresenceLink = {
  id: string;
  label: string;
  href: string;
  note?: string;
};

export const presenceLinks: PresenceLink[] = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/arsalan.dev/", note: "Personal" },
  { id: "github", label: "GitHub", href: "https://www.github.com/arsalan-arshad" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/arsalandev" },
  { id: "toptal", label: "Toptal", href: "https://www.toptal.com/developers/resume/arsalan-arshad" },
  { id: "upwork", label: "Upwork", href: "https://www.upwork.com/freelancers/~016f6b130756ef1f1d" },
  { id: "fiverr", label: "Fiverr", href: "https://www.fiverr.com/s/BbbENqW" },
  {
    id: "clutch",
    label: "Clutch",
    href: "https://clutch.co/profile/arsalan-arshad",
    note: "Verified client reviews · Arsalan Arshad",
  },
  {
    id: "nana",
    label: "Nana Says",
    href: "https://www.instagram.com/nanadotsays/",
    note: "AI character · Stockroom Studio",
  },
  {
    id: "pallet",
    label: "Pallet the Robot",
    href: "https://www.instagram.com/pallet.the.robot/",
    note: "AI character · Stockroom Studio",
  },
  {
    id: "hub",
    label: "Influencer Hub",
    href: "https://influencer.arsalandev.studio/",
    note: "Live app · Stockroom Studio",
  },
];
