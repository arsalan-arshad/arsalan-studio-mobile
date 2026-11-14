import { Link, useRouter } from "expo-router";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CaseStudyMedia } from "../../src/components/CaseStudyMedia";
import { brandMark } from "../../src/data/brandAssets";
import { caseStudies } from "../../src/data/caseStudies";
import { buildTools } from "../../src/data/studio";
import { presenceLinks } from "../../src/data/links";
import { reviewStats, reviews } from "../../src/data/reviews";
import { brand } from "../../src/lib/brand";
import { colors } from "../../src/theme";

const FEATURED_IDS = [
  "ai-forecast",
  "protocols",
  "mcp",
  "smart-cloner",
  "hub",
  "proposal-guard",
];

const HOME_PRESENCE_IDS = [
  "instagram",
  "github",
  "linkedin",
  "toptal",
  "upwork",
  "fiverr",
  "clutch",
];

export default function HomeScreen() {
  const router = useRouter();
  const featured = FEATURED_IDS.map((id) => caseStudies.find((c) => c.id === id)).filter(
    Boolean,
  ) as typeof caseStudies;
  const homePresence = HOME_PRESENCE_IDS.map((id) =>
    presenceLinks.find((l) => l.id === id),
  ).filter(Boolean) as typeof presenceLinks;
  const clutchReviews = reviews.filter((r) => r.source === "clutch");

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.heroBrand}>
        <Image
          source={brandMark}
          style={styles.mark}
          accessibilityLabel={`${brand.name} Studio mark`}
        />
        <View style={styles.heroText}>
          <Text style={styles.eyebrow}>Marketplace · Sole builder</Text>
          <Text style={styles.brand}>{brand.name}</Text>
        </View>
      </View>
      <Text style={styles.lead}>
        {brand.tagline} Shopify, Salesforce, mobile, web, and automation —
        inquire here, keep the thread alive in Messages.
      </Text>
      <View style={styles.row}>
        <Link href="/contact" asChild>
          <Pressable style={styles.primary}>
            <Text style={styles.primaryText}>Get started</Text>
          </Pressable>
        </Link>
        <Link href="/offers" asChild>
          <Pressable style={styles.ghost}>
            <Text style={styles.ghostText}>See offers</Text>
          </Pressable>
        </Link>
      </View>

      <Text style={styles.section}>Featured work</Text>
      {featured.map((item) => {
        const hasLinks = Boolean(
          item.demoUrl || item.youtubeUrl || item.liveUrl || item.githubUrl,
        );
        return (
          <View key={item.id} style={styles.feature}>
            <Pressable
              style={styles.featureRow}
              onPress={() => router.push(`/work/${item.id}`)}
            >
              <CaseStudyMedia id={item.id} variant="icon" />
              <View style={styles.featureCopy}>
                <Text style={styles.featureStatus}>{item.status}</Text>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureBlurb} numberOfLines={2}>
                  {item.blurb}
                </Text>
              </View>
            </Pressable>
            {hasLinks ? (
              <View style={styles.featureLinks}>
                {item.demoUrl ? (
                  <Pressable onPress={() => Linking.openURL(item.demoUrl!)}>
                    <Text style={styles.featureLink}>
                      {item.demoLabel ?? "Demo"}
                    </Text>
                  </Pressable>
                ) : null}
                {item.youtubeUrl ? (
                  <Pressable onPress={() => Linking.openURL(item.youtubeUrl!)}>
                    <Text style={styles.featureLink}>
                      {item.youtubeLabel ?? "YouTube"}
                    </Text>
                  </Pressable>
                ) : null}
                {item.liveUrl ? (
                  <Pressable onPress={() => Linking.openURL(item.liveUrl!)}>
                    <Text style={styles.featureLink}>
                      {item.liveLabel ?? "Live"}
                    </Text>
                  </Pressable>
                ) : null}
                {item.githubUrl ? (
                  <Pressable onPress={() => Linking.openURL(item.githubUrl!)}>
                    <Text style={styles.featureLink}>GitHub</Text>
                  </Pressable>
                ) : null}
              </View>
            ) : null}
            {item.installGuide ? (
              <View style={styles.installGuide}>
                <Text style={styles.installTitle}>{item.installGuide.title}</Text>
                <Text style={styles.installBody}>{item.installGuide.body}</Text>
                <Text selectable style={styles.installUrl}>
                  {item.installGuide.urlExample}
                </Text>
              </View>
            ) : null}
          </View>
        );
      })}
      <Link href="/work" asChild>
        <Pressable style={styles.seeAll}>
          <Text style={styles.seeAllText}>See all case studies →</Text>
        </Pressable>
      </Link>

      <Text style={styles.section}>Also live on</Text>
      <View style={styles.chips}>
        {homePresence.map((link) => (
          <Pressable
            key={link.id}
            style={styles.chip}
            onPress={() => Linking.openURL(link.href)}
          >
            {link.id === "clutch" ? (
              <Image source={brand.clutchIcon} style={styles.chipIcon} />
            ) : null}
            <Text style={styles.chipText}>{link.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.section}>Reviews</Text>
      <Pressable
        style={styles.clutchRow}
        onPress={() => Linking.openURL(reviewStats.clutchHref)}
      >
        <Image
          source={brand.clutchIcon}
          style={styles.clutchIcon}
          accessibilityLabel={`${brand.name} on Clutch`}
        />
        <Text style={styles.reviewStats}>
          Clutch {reviewStats.clutchAverage.toFixed(1)}★ · {reviewStats.clutchCount}{" "}
          reviews · {brand.name}
        </Text>
      </Pressable>
      {clutchReviews.map((r) => (
        <Pressable
          key={r.id}
          style={styles.reviewCard}
          onPress={() => Linking.openURL(r.href)}
        >
          <Text style={styles.reviewQuote} numberOfLines={4}>
            “{r.quote}”
          </Text>
          <Text style={styles.reviewMeta}>
            {r.author}
            {r.company ? ` · ${r.company}` : ""} · Clutch
          </Text>
        </Pressable>
      ))}
      <Pressable onPress={() => Linking.openURL(reviewStats.fiverrHref)}>
        <Text style={styles.featureLink}>Fiverr profile →</Text>
      </Pressable>

      <Text style={styles.section}>How I build</Text>
      <Text style={styles.studioNote}>
        AI-powered orchestrator with human-owned delivery and daily
        collaboration.
      </Text>
      {buildTools.map((tool) => (
        <View key={tool.id} style={styles.toolRow}>
          <Text style={styles.toolName}>{tool.name}</Text>
          <Text style={styles.toolBlurb}>{tool.blurb}</Text>
        </View>
      ))}

      <Text style={styles.note}>
        Short name: {brand.shortName} · Package: {brand.packageId} · {brand.domain}
      </Text>
      <Text style={styles.studioNote}>
        Clutch is under {brand.name} (same app icon). {brand.pastBrand.name} was
        an earlier brand name only — craft from that chapter, marketplace under
        this studio.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 48 },
  heroBrand: { flexDirection: "row", alignItems: "center", gap: 14 },
  mark: { width: 56, height: 56, borderRadius: 12 },
  heroText: { flex: 1, minWidth: 0 },
  eyebrow: {
    color: colors.accent,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  brand: {
    marginTop: 4,
    color: colors.ink,
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -1,
    lineHeight: 36,
  },
  lead: {
    marginTop: 16,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 28 },
  primary: {
    backgroundColor: colors.accent,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 4,
  },
  primaryText: { color: colors.onAccent, fontWeight: "700" },
  ghost: {
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 4,
    backgroundColor: colors.elevated,
  },
  ghostText: { color: colors.ink, fontWeight: "600" },
  section: {
    marginTop: 36,
    marginBottom: 10,
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  feature: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.elevated,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
  },
  featureCopy: { flex: 1, minWidth: 0 },
  featureStatus: {
    color: colors.accent,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  featureTitle: { marginTop: 2, color: colors.ink, fontSize: 16, fontWeight: "700" },
  featureBlurb: { marginTop: 4, color: colors.muted, fontSize: 13, lineHeight: 18 },
  featureLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    paddingHorizontal: 14,
    paddingBottom: 12,
  },
  featureLink: { color: colors.accent, fontSize: 13, fontWeight: "700" },
  installGuide: {
    marginHorizontal: 14,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    backgroundColor: colors.bg,
  },
  installTitle: { color: colors.ink, fontWeight: "700", fontSize: 12 },
  installBody: { marginTop: 4, color: colors.muted, fontSize: 12, lineHeight: 17 },
  installUrl: { marginTop: 8, color: colors.accent, fontSize: 11, lineHeight: 16 },
  seeAll: { marginBottom: 8, paddingVertical: 4 },
  seeAllText: { color: colors.accent, fontWeight: "700", fontSize: 14 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.elevated,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  chipIcon: { width: 16, height: 16, borderRadius: 3 },
  chipText: { color: colors.ink, fontSize: 13, fontWeight: "500" },
  note: { marginTop: 24, color: colors.muted, fontSize: 12 },
  studioNote: { marginTop: 8, color: colors.muted, fontSize: 12, lineHeight: 18 },
  clutchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  clutchIcon: { width: 36, height: 36, borderRadius: 8 },
  reviewStats: {
    flex: 1,
    color: colors.ink,
    fontWeight: "700",
    fontSize: 14,
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.elevated,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  reviewQuote: { color: colors.ink, fontSize: 13, lineHeight: 19 },
  reviewMeta: { marginTop: 8, color: colors.muted, fontSize: 12 },
  toolRow: { marginBottom: 10 },
  toolName: { color: colors.ink, fontWeight: "700", fontSize: 14 },
  toolBlurb: { marginTop: 2, color: colors.muted, fontSize: 13, lineHeight: 18 },
});
