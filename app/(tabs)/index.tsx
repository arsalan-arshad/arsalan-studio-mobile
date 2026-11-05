import { Link } from "expo-router";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { presenceLinks } from "../../src/data/links";
import { colors } from "../../src/theme";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>Marketplace · Sole builder</Text>
      <Text style={styles.brand}>Arsalan Arshad</Text>
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
        Formerly Digitize Turf (Clutch). Brand is now this studio — mobile/web
        craft from that chapter, marketplace under Arsalan Arshad.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 48 },
  eyebrow: {
    color: colors.accent,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  brand: {
    marginTop: 12,
    color: colors.ink,
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: -1,
    lineHeight: 44,
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
  primaryText: { color: "#f8faf9", fontWeight: "700" },
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
