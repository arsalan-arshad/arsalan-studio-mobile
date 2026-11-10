import { useRouter } from "expo-router";
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
import { experience } from "../../src/data/experience";
import { pastServices, studioFraming } from "../../src/data/studio";
import { colors } from "../../src/theme";

export default function WorkScreen() {
  const router = useRouter();
  const salesforce = caseStudies.filter((c) => c.category === "Salesforce");
  const other = caseStudies.filter((c) => c.category !== "Salesforce");

  function Row({ item }: { item: (typeof caseStudies)[number] }) {
    const icon = getBrandIcon(item.id);

    return (
      <View style={styles.row}>
        <Pressable onPress={() => router.push(`/work/${item.id}`)}>
          <View style={styles.heading}>
            {icon ? (
              <Image source={icon} style={styles.icon} resizeMode="contain" />
            ) : (
              <View style={[styles.icon, styles.iconFallback]} />
            )}
            <View style={styles.headingText}>
              <View style={styles.meta}>
                <Text style={styles.cat}>{item.category}</Text>
                <Text style={styles.status}>{item.status}</Text>
              </View>
              <Text style={styles.name}>{item.title}</Text>
            </View>
          </View>
          <Text style={styles.blurb}>{item.blurb}</Text>
          <Text style={styles.know}>Know more →</Text>
        </Pressable>
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
              <Text style={styles.link}>Demo</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Case studies</Text>
      <Text style={styles.sub}>
        Tap a title for the full case study. GitHub / Live / Demo stay separate.
        Open source (MIT) where noted — PRs welcome.
      </Text>

      <Text style={styles.section}>Salesforce · full suite</Text>
      {salesforce.map((item) => (
        <Row key={item.id} item={item} />
      ))}

      <Text style={styles.section}>Shopify & other</Text>
      {other.map((item) => (
        <Row key={item.id} item={item} />
      ))}

      <Text style={[styles.title, { marginTop: 28 }]}>Jobs & experience</Text>
      <Text style={styles.sub}>Worker history from the resume — not hiring.</Text>

      <View style={styles.studioCard}>
        <Text style={styles.studioHeadline}>{studioFraming.headline}</Text>
        <Text style={styles.blurb}>{studioFraming.body}</Text>
        {studioFraming.bullets.map((b) => (
          <Text key={b} style={styles.bullet}>
            · {b}
          </Text>
        ))}
        {pastServices.map((service) => (
          <View key={service.title} style={styles.serviceBlock}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.blurb}>{service.body}</Text>
          </View>
        ))}
        <Pressable
          onPress={() => Linking.openURL("https://clutch.co/profile/digitize-turf")}
        >
          <Text style={styles.link}>Clutch · Digitize Turf →</Text>
        </Pressable>
      </View>

      {experience.map((job) => (
        <View key={job.id} style={styles.row}>
          <Text style={styles.status}>{job.period}</Text>
          <Text style={styles.name}>{job.title}</Text>
          <Text style={styles.org}>{job.org}</Text>
          <Text style={styles.blurb}>{job.detail}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 48 },
  title: { color: colors.ink, fontSize: 28, fontWeight: "700", letterSpacing: -0.5 },
  sub: { marginTop: 8, marginBottom: 12, color: colors.muted, fontSize: 14, lineHeight: 20 },
  section: {
    marginTop: 16,
    marginBottom: 4,
    color: colors.sage,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  row: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingVertical: 16,
  },
  studioCard: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
    backgroundColor: colors.elevated,
  },
  studioHeadline: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  bullet: { marginTop: 6, color: colors.ink, fontSize: 13, lineHeight: 19 },
  serviceBlock: { marginTop: 12 },
  serviceTitle: { color: colors.ink, fontSize: 14, fontWeight: "700" },
  heading: { flexDirection: "row", alignItems: "center", gap: 12 },
  headingText: { flex: 1, minWidth: 0 },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.elevated,
  },
  iconFallback: { borderWidth: 1, borderColor: colors.line },
  meta: { flexDirection: "row", gap: 10, marginBottom: 4 },
  cat: { color: colors.sage, fontSize: 11, textTransform: "uppercase", letterSpacing: 1 },
  status: { color: colors.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 1 },
  name: { color: colors.ink, fontSize: 18, fontWeight: "700" },
  org: { marginTop: 2, color: colors.ink, opacity: 0.8, fontSize: 14, fontWeight: "500" },
  blurb: { marginTop: 8, color: colors.muted, fontSize: 14, lineHeight: 20 },
  know: { marginTop: 10, color: colors.accent, fontWeight: "700", fontSize: 14 },
  links: { flexDirection: "row", flexWrap: "wrap", gap: 14, marginTop: 8 },
  link: { marginTop: 12, color: colors.accent, fontSize: 13, fontWeight: "700" },
});
