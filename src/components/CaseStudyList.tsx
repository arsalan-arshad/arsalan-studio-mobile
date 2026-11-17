import { useRouter } from "expo-router";
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { CaseStudy } from "../data/caseStudies";
import { InstallGuideUrl } from "../lib/linkify";
import { colors } from "../theme";
import { CaseStudyMedia } from "./CaseStudyMedia";

/** List-row case study — icon only (no banner). Banners belong on detail. */
export function CaseStudyListItem({ item }: { item: CaseStudy }) {
  const router = useRouter();
  const hasLinks = Boolean(
    item.demoUrl ||
      item.youtubeUrl ||
      item.liveUrl ||
      item.githubUrl ||
      item.npmUrl,
  );

  return (
    <View style={styles.row}>
      <Pressable
        style={styles.main}
        onPress={() => router.push(`/work/${item.id}`)}
      >
        <CaseStudyMedia id={item.id} variant="icon" />
        <View style={styles.copy}>
          <View style={styles.meta}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
          <Text style={styles.blurb}>{item.blurb}</Text>
          <Text style={styles.know}>Know more →</Text>
        </View>
      </Pressable>
      {hasLinks ? (
        <View style={styles.links}>
          {item.githubUrl ? (
            <Pressable onPress={() => Linking.openURL(item.githubUrl!)}>
              <Text style={styles.link}>GitHub</Text>
            </Pressable>
          ) : null}
          {item.liveUrl ? (
            <Pressable onPress={() => Linking.openURL(item.liveUrl!)}>
              <Text style={styles.link}>{item.liveLabel ?? "Live"}</Text>
            </Pressable>
          ) : null}
          {item.demoUrl ? (
            <Pressable onPress={() => Linking.openURL(item.demoUrl!)}>
              <Text style={styles.link}>{item.demoLabel ?? "Demo"}</Text>
            </Pressable>
          ) : null}
          {item.youtubeUrl ? (
            <Pressable onPress={() => Linking.openURL(item.youtubeUrl!)}>
              <Text style={styles.link}>
                {item.youtubeLabel ?? "YouTube"}
              </Text>
            </Pressable>
          ) : null}
          {item.npmUrl ? (
            <Pressable onPress={() => Linking.openURL(item.npmUrl!)}>
              <Text style={styles.link}>npm</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
      {item.installGuide ? (
        <View style={styles.installGuide}>
          <Text style={styles.installTitle}>{item.installGuide.title}</Text>
          <Text style={styles.installBody}>{item.installGuide.body}</Text>
          <InstallGuideUrl
            url={item.installGuide.urlExample}
            style={styles.installUrl}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingVertical: 14,
  },
  main: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  copy: { flex: 1, minWidth: 0 },
  meta: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 8 },
  title: { color: colors.ink, fontSize: 16, fontWeight: "700" },
  status: {
    color: colors.accent,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  blurb: { marginTop: 6, color: colors.muted, fontSize: 13, lineHeight: 18 },
  know: { marginTop: 8, color: colors.accent, fontWeight: "700", fontSize: 13 },
  links: { flexDirection: "row", flexWrap: "wrap", gap: 14, marginTop: 10 },
  link: { color: colors.accent, fontSize: 13, fontWeight: "700" },
  installGuide: {
    marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    backgroundColor: colors.elevated,
  },
  installTitle: { color: colors.ink, fontWeight: "700", fontSize: 12 },
  installBody: { marginTop: 4, color: colors.muted, fontSize: 12, lineHeight: 17 },
  installUrl: { marginTop: 8, color: colors.accent, fontSize: 11, lineHeight: 16 },
});
