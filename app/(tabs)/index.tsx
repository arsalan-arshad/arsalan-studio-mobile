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
import { getBrandIcon } from "../../src/data/brandAssets";
import { caseStudies } from "../../src/data/caseStudies";
import { presenceLinks } from "../../src/data/links";
import { colors } from "../../src/theme";

const FEATURED_IDS = [
  "ai-forecast",
  "protocols",
  "mcp",
  "smart-cloner",
  "hub",
  "proposal-guard",
];

export default function HomeScreen() {
  const router = useRouter();
  const featured = FEATURED_IDS.map((id) => caseStudies.find((c) => c.id === id)).filter(
    Boolean,
  ) as typeof caseStudies;

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.heroBrand}>
        <Image
          source={require("../../assets/brand-mark.png")}
          style={styles.mark}
          accessibilityLabel="Arsalan Studio mark"
        />
        <View style={styles.heroText}>
          <Text style={styles.eyebrow}>Marketplace · Sole builder</Text>
          <Text style={styles.brand}>Arsalan Arshad</Text>
        </View>
      </View>
      <Text style={styles.lead}>
        One builder. Clear offers. Daily conversation until it ships. Inquire
        here — keep the thread alive in Messages.
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
        const icon = getBrandIcon(item.id);
        const hasLinks = Boolean(
          item.demoUrl || item.youtubeUrl || item.liveUrl || item.githubUrl,
        );
        return (
          <View key={item.id} style={styles.feature}>
            <Pressable
              style={styles.featureRow}
              onPress={() => router.push(`/work/${item.id}`)}
            >
              {icon ? (
                <Image source={icon} style={styles.featureIcon} resizeMode="contain" />
              ) : null}
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
        {presenceLinks.slice(0, 6).map((link) => (
          <Pressable
            key={link.id}
            style={styles.chip}
            onPress={() => Linking.openURL(link.href)}
          >
            <Text style={styles.chipText}>{link.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.section}>How I build</Text>
      <Text style={styles.studioNote}>
        AI-powered orchestrator: Cursor · Claude · Antigravity — human-owned
        delivery with daily collaboration.
      </Text>

      <Text style={styles.note}>
        Short name: Arsalan · Package: studio.arsalan.app · arsalandev.studio
      </Text>
      <Text style={styles.studioNote}>
        Verified reviews on Clutch under Arsalan Arshad. Digitize Turf was an
        earlier personal brand name — craft from that chapter, marketplace under
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
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.bg,
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
  seeAll: { marginBottom: 8, paddingVertical: 4 },
  seeAllText: { color: colors.accent, fontWeight: "700", fontSize: 14 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.elevated,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  chipText: { color: colors.ink, fontSize: 13, fontWeight: "500" },
  note: { marginTop: 24, color: colors.muted, fontSize: 12 },
  studioNote: { marginTop: 8, color: colors.muted, fontSize: 12, lineHeight: 18 },
});
