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
import { CaseStudyCategoryTabs } from "../../src/components/CaseStudyCategoryTabs";
import { brandMark } from "../../src/data/brandAssets";
import { presenceLinks } from "../../src/data/links";
import { offers } from "../../src/data/offers";
import { reviewStats, reviews } from "../../src/data/reviews";
import {
  buildTools,
  pastServices,
  studioPrinciples,
  studioSkills,
} from "../../src/data/studio";
import { brand } from "../../src/lib/brand";
import { colors } from "../../src/theme";

const HOME_PRESENCE_IDS = [
  "toptal",
  "upwork",
  "fiverr",
  "clutch",
  "github",
  "linkedin",
] as const;

export default function HomeScreen() {
  const router = useRouter();
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
          <Text style={styles.eyebrow}>Independent studio, one engineer</Text>
          <Text style={styles.brand}>{brand.name}</Text>
        </View>
      </View>
      <Text style={styles.headline}>
        Mobile, Web Apps, Shopify, and Salesforce, with Principle AI built in,
        by one engineer.
      </Text>
      <Text style={styles.lead}>
        Eight years of mobile, web and cloud delivery for startups and teams in
        the US, UK and Europe. Fixed scope, written exclusions, acceptance
        tests, and daily progress from me, not a team you never meet.
      </Text>
      <View style={styles.row}>
        <Link href="/contact" asChild>
          <Pressable style={styles.primary}>
            <Text style={styles.primaryText}>Send your project brief</Text>
          </Pressable>
        </Link>
        <Link href="/work" asChild>
          <Pressable style={styles.ghost}>
            <Text style={styles.ghostText}>See the work</Text>
          </Pressable>
        </Link>
      </View>

      <Text style={styles.section}>Offers</Text>
      <Text style={styles.sectionTitle}>What I build</Text>
      <Text style={styles.sectionLead}>
        Fixed scope client work — outcomes and craft, not a SKU menu. You work
        with me directly. Most product work is open source (MIT) when we publish
        recipes.
      </Text>
      {offers.slice(0, 2).map((offer) => (
        <View key={offer.id} style={styles.offerCard}>
          <Text style={styles.offerName}>{offer.name}</Text>
          <Text style={styles.offerFor}>
            <Text style={styles.offerForLabel}>For: </Text>
            {offer.forWho}
          </Text>
        </View>
      ))}
      <Link href="/offers" asChild>
        <Pressable style={styles.seeAll}>
          <Text style={styles.seeAllText}>View all offers →</Text>
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
            <Text style={styles.chipText}>
              {link.id === "clutch" ? "Clutch" : link.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.studioDomain}>Studio · {brand.domain}</Text>

      <Text style={styles.section}>Featured work</Text>
      <Text style={styles.sectionTitle}>Case studies & launches</Text>
      <Text style={styles.sectionLead}>
        Open-source by default — MIT where noted, open for PRs. Tap Know more
        for the full case study; GitHub / Live / Demo / YouTube stay as separate
        actions.
      </Text>
      <CaseStudyCategoryTabs
        mode="home"
        onViewMore={(key) =>
          router.push({ pathname: "/work", params: { category: key } })
        }
      />
      <Link href="/work" asChild>
        <Pressable style={styles.seeAll}>
          <Text style={styles.seeAllText}>View all work →</Text>
        </Pressable>
      </Link>

      <Text style={styles.section}>Studio</Text>
      <View style={styles.servicesRow}>
        {pastServices.map((service) => (
          <View key={service.title} style={styles.serviceCol}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.serviceBody}>{service.body}</Text>
          </View>
        ))}
      </View>
      <View style={styles.chips}>
        {studioPrinciples.map((item) => (
          <View key={item.id} style={styles.principleChip}>
            <Text style={styles.principleText}>{item.name}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.skillsLabel}>Skills carried into this studio</Text>
      <View style={styles.chips}>
        {studioSkills.map((skill) => (
          <View key={skill.id} style={styles.skillChip}>
            <Text style={styles.skillText}>{skill.name}</Text>
          </View>
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
          Clutch {reviewStats.clutchAverage.toFixed(1)}★ ·{" "}
          {reviewStats.clutchCount} reviews · {brand.name}
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
        <Text style={styles.featureLink}>
          Fiverr profile → {reviewStats.fiverrReviewCount}+ reviews
        </Text>
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

      <Link href="/job-history" asChild>
        <Pressable style={[styles.seeAll, { marginTop: 28 }]}>
          <Text style={styles.seeAllText}>Job history →</Text>
        </Pressable>
      </Link>

      <Text style={styles.note}>
        Short name: {brand.shortName} · Package: {brand.packageId} ·{" "}
        {brand.domain}
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
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.8,
    lineHeight: 32,
  },
  headline: {
    marginTop: 16,
    color: colors.ink,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.4,
    lineHeight: 28,
  },
  lead: {
    marginTop: 12,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 24 },
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
    marginBottom: 6,
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  sectionLead: {
    marginTop: 8,
    marginBottom: 8,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  offerCard: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingVertical: 14,
  },
  offerName: { color: colors.ink, fontSize: 16, fontWeight: "700" },
  offerFor: { marginTop: 6, color: colors.muted, fontSize: 13, lineHeight: 18 },
  offerForLabel: { color: colors.accent, fontWeight: "600" },
  seeAll: { marginTop: 8, paddingVertical: 4 },
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
  studioDomain: { marginTop: 10, color: colors.muted, fontSize: 12 },
  servicesRow: { gap: 14, marginBottom: 14 },
  serviceCol: {
    borderLeftWidth: 2,
    borderLeftColor: colors.accent,
    paddingLeft: 12,
  },
  serviceTitle: { color: colors.ink, fontSize: 14, fontWeight: "700" },
  serviceBody: { marginTop: 4, color: colors.muted, fontSize: 13, lineHeight: 18 },
  principleChip: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.elevated,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  },
  principleText: { color: colors.ink, fontSize: 12, fontWeight: "600" },
  skillsLabel: {
    marginTop: 16,
    marginBottom: 8,
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  skillChip: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.elevated,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 4,
  },
  skillText: { color: colors.muted, fontSize: 12 },
  note: { marginTop: 24, color: colors.muted, fontSize: 12 },
  studioNote: { marginTop: 4, marginBottom: 10, color: colors.muted, fontSize: 13, lineHeight: 18 },
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
  featureLink: { color: colors.accent, fontSize: 13, fontWeight: "700" },
  toolRow: { marginBottom: 10 },
  toolName: { color: colors.ink, fontWeight: "700", fontSize: 14 },
  toolBlurb: { marginTop: 2, color: colors.muted, fontSize: 13, lineHeight: 18 },
});
