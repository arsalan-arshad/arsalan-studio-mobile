import { Stack } from "expo-router";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  experience,
  experienceIntro,
  resumePdfHref,
} from "../src/data/experience";
import { colors } from "../src/theme";

export default function JobHistoryScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Job history",
          headerBackTitle: "Back",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <ScrollView style={styles.root} contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>Experience</Text>
        <Text style={styles.title}>Jobs & worker history</Text>
        <Text style={styles.intro}>{experienceIntro}</Text>

        <View style={styles.resumeRow}>
          <Pressable
            style={styles.primary}
            onPress={() => Linking.openURL(resumePdfHref)}
          >
            <Text style={styles.primaryText}>Open resume PDF</Text>
          </Pressable>
          <Pressable
            style={styles.ghost}
            onPress={() => Linking.openURL(resumePdfHref)}
          >
            <Text style={styles.ghostText}>Download / view</Text>
          </Pressable>
        </View>

        <Text style={styles.h2}>Roles from the resume</Text>
        {experience.map((job) => (
          <View key={job.id} style={styles.job}>
            <Text style={styles.period}>{job.period}</Text>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.org}>{job.org}</Text>
            {job.highlights?.length ? (
              <View style={styles.highlights}>
                {job.highlights.map((label) => (
                  <View key={label} style={styles.highlightChip}>
                    <Text style={styles.highlightText}>{label}</Text>
                  </View>
                ))}
              </View>
            ) : null}
            <Text style={styles.detail}>{job.detail}</Text>
            {job.bullets.map((bullet) => (
              <Text key={bullet} style={styles.bullet}>
                · {bullet}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </>
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
  intro: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  resumeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },
  primary: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  primaryText: { color: colors.onAccent, fontWeight: "700", fontSize: 13 },
  ghost: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.elevated,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  ghostText: { color: colors.ink, fontWeight: "600", fontSize: 13 },
  h2: {
    marginTop: 32,
    marginBottom: 8,
    color: colors.ink,
    fontSize: 18,
    fontWeight: "700",
  },
  job: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingVertical: 18,
  },
  period: {
    color: colors.accent,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  jobTitle: {
    marginTop: 6,
    color: colors.ink,
    fontSize: 18,
    fontWeight: "700",
  },
  org: {
    marginTop: 2,
    color: colors.ink,
    opacity: 0.85,
    fontSize: 14,
    fontWeight: "500",
  },
  highlights: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  highlightChip: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.elevated,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
  },
  highlightText: {
    color: colors.muted,
    fontSize: 10,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  detail: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  bullet: {
    marginTop: 6,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },
});
