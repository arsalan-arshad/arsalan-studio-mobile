import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getBrandBanner, getBrandIcon } from "../../src/data/brandAssets";
import { caseStudies } from "../../src/data/caseStudies";
import { details } from "../../src/data/caseStudyDetails";
import { colors } from "../../src/theme";

export default function WorkDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const item = caseStudies.find((c) => c.id === id);
  const detail = id ? details[id] : undefined;
  const icon = id ? getBrandIcon(id) : undefined;
  const banner = id ? getBrandBanner(id) : undefined;

  if (!item) {
    return (
      <View style={styles.root}>
        <Text style={styles.title}>Not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: item.title,
          headerBackTitle: "Work",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <ScrollView style={styles.root} contentContainerStyle={styles.content}>
        {banner ? (
          <View style={styles.bannerFrame}>
            <Image source={banner} style={styles.banner} resizeMode="contain" />
          </View>
        ) : icon ? (
          <View style={styles.heading}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
            <View style={styles.headingText}>
              <Text style={styles.status}>{item.status}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.headingText}>
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
        {banner ? <Text style={styles.status}>{item.status}</Text> : null}
        <Text style={styles.blurb}>{detail?.summary ?? item.blurb}</Text>

        <Text style={styles.h2}>Problem → Solution</Text>
        <Text style={styles.label}>Problem</Text>
        <Text style={styles.body}>{detail?.problem ?? "See web case study."}</Text>
        <Text style={[styles.label, { marginTop: 12 }]}>Solution</Text>
        <Text style={styles.body}>{detail?.solution ?? item.blurb}</Text>

        <Text style={styles.h2}>Who it’s for</Text>
        <Text style={styles.body}>{detail?.audience ?? "—"}</Text>

        {detail?.usage?.length ? (
          <>
            <Text style={styles.h2}>Usage</Text>
            {detail.usage.map((step, i) => (
              <Text key={step} style={styles.bullet}>
                {i + 1}. {step}
              </Text>
            ))}
          </>
        ) : null}

        <Text style={styles.h2}>Key features</Text>
        {(detail?.features ?? []).map((f) => (
          <Text key={f} style={styles.bullet}>
            · {f}
          </Text>
        ))}

        {(detail?.results ?? []).map((block) => (
          <View key={block.title}>
            <Text style={styles.h2}>{block.title}</Text>
            {block.intro ? <Text style={styles.body}>{block.intro}</Text> : null}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator
              style={styles.tableScroll}
              contentContainerStyle={styles.tableScrollContent}
            >
              <View>
                <View style={styles.tableRow}>
                  {block.columns.map((col) => (
                    <Text key={col} style={[styles.tableCell, styles.tableHead]}>
                      {col}
                    </Text>
                  ))}
                </View>
                {block.rows.map((row) => (
                  <View key={row.join("|")} style={styles.tableRow}>
                    {row.map((cell, i) => (
                      <Text
                        key={`${row[0]}-${block.columns[i]}`}
                        style={styles.tableCell}
                      >
                        {cell}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
            {block.bullets?.map((b) => (
              <Text key={b} style={styles.bullet}>
                · {b}
              </Text>
            ))}
            {block.footnote ? (
              <Text style={[styles.body, { marginTop: 8 }]}>{block.footnote}</Text>
            ) : null}
            {block.link ? (
              <Pressable
                onPress={() => Linking.openURL(block.link!.href)}
                style={{ marginTop: 8 }}
              >
                <Text style={styles.link}>{block.link.label} →</Text>
              </Pressable>
            ) : null}
          </View>
        ))}

        <Text style={styles.h2}>Open source</Text>
        <Text style={styles.body}>
          {detail?.openSource ??
            "Open source where noted (MIT). Pull requests welcome on public repos."}
        </Text>
        {detail?.buildingNote ? (
          <Text style={[styles.body, { marginTop: 8 }]}>{detail.buildingNote}</Text>
        ) : null}

        <View style={styles.actions}>
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
              <Text style={styles.link}>{item.youtubeLabel ?? "YouTube"}</Text>
            </Pressable>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 48 },
  bannerFrame: {
    width: "100%",
    aspectRatio: 1600 / 420,
    maxHeight: 180,
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    backgroundColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  heading: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 4 },
  headingText: { flex: 1, minWidth: 0 },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.elevated,
  },
  status: {
    color: colors.accent,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: {
    marginTop: 4,
    color: colors.ink,
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  blurb: { marginTop: 10, color: colors.muted, fontSize: 15, lineHeight: 22 },
  h2: {
    marginTop: 24,
    marginBottom: 8,
    color: colors.ink,
    fontSize: 17,
    fontWeight: "700",
  },
  label: { color: colors.ink, fontWeight: "600", fontSize: 13 },
  body: { marginTop: 4, color: colors.muted, fontSize: 14, lineHeight: 21 },
  bullet: { color: colors.ink, fontSize: 14, lineHeight: 22, marginTop: 4 },
  tableScroll: { marginTop: 10, marginBottom: 4 },
  tableScrollContent: { paddingRight: 16 },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  tableCell: {
    width: 140,
    paddingVertical: 8,
    paddingHorizontal: 8,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  tableHead: { color: colors.ink, fontWeight: "700" },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 28 },
  link: { color: colors.accent, fontWeight: "700", fontSize: 14 },
});
