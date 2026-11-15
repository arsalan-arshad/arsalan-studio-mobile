import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CaseStudyCategoryTabs } from "../../src/components/CaseStudyCategoryTabs";
import { parseWorkCategory } from "../../src/data/caseStudies";
import { colors } from "../../src/theme";

export default function WorkScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const initial = parseWorkCategory(category) ?? undefined;

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>Featured work</Text>
      <Text style={styles.title}>Case studies & launches</Text>
      <Text style={styles.sub}>
        Open-source by default — MIT where noted, open for PRs. Tap Know more
        for the full case study; GitHub / Live / Demo / YouTube stay as separate
        actions.
      </Text>

      <CaseStudyCategoryTabs
        mode="full"
        initialCategory={category}
        onCategoryChange={(key) => {
          router.setParams({ category: key });
        }}
      />

      <View style={styles.footerLinks}>
        <Link href="/job-history" asChild>
          <Pressable>
            <Text style={styles.footerLink}>Job history →</Text>
          </Pressable>
        </Link>
        {initial ? (
          <Text style={styles.hint}>Showing {initial} category</Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 48 },
  eyebrow: {
    color: colors.accent,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  title: {
    marginTop: 8,
    color: colors.ink,
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  sub: {
    marginTop: 8,
    marginBottom: 12,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  footerLinks: { marginTop: 28, gap: 8 },
  footerLink: { color: colors.accent, fontWeight: "700", fontSize: 14 },
  hint: { color: colors.muted, fontSize: 12 },
});
