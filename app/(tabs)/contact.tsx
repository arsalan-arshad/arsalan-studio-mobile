import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { projectNeeds } from "../../src/data/inquiryOptions";
import { getApiBase } from "../../src/lib/api";
import { colors } from "../../src/theme";

export default function ContactScreen() {
  const params = useLocalSearchParams<{ need?: string; offer?: string }>();
  const seed = params.need ?? params.offer ?? "";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [needs, setNeeds] = useState<string[]>(seed ? [seed] : []);
  const [otherText, setOtherText] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  function toggleNeed(id: string) {
    setNeeds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id],
    );
  }

  async function submit() {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert("Missing fields", "Name, email, and brief are required.");
      return;
    }
    setSending(true);
    try {
      const api = getApiBase();
      const res = await fetch(`${api}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          needs,
          otherNeed: otherText,
          message,
        }),
      });
      if (!res.ok) throw new Error("fail");
      Alert.alert("Sent", "Inquiry received. Sign in for in-app messaging.");
      setName("");
      setEmail("");
      setCompany("");
      setNeeds([]);
      setOtherText("");
      setMessage("");
    } catch {
      Alert.alert(
        "Could not send",
        `Is the web API running at ${getApiBase()}? You can still email arsalanarshad.dev@gmail.com.`,
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Contact</Text>
      <Text style={styles.sub}>Marketplace brief — no account required.</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor={colors.muted}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.muted}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Company / project (optional)"
        placeholderTextColor={colors.muted}
        value={company}
        onChangeText={setCompany}
      />
      <Text style={styles.label}>What do you need? (multi-select)</Text>
      <View style={styles.chips}>
        {projectNeeds.map((o) => (
          <Pressable
            key={o.id}
            onPress={() => toggleNeed(o.id)}
            style={[styles.chip, needs.includes(o.id) && styles.chipOn]}
          >
            <Text
              style={[styles.chipText, needs.includes(o.id) && styles.chipTextOn]}
            >
              {o.label}
            </Text>
          </Pressable>
        ))}
      </View>
      {needs.includes("other") ? (
        <TextInput
          style={styles.input}
          placeholder="Describe the other need…"
          placeholderTextColor={colors.muted}
          value={otherText}
          onChangeText={setOtherText}
        />
      ) : null}
      <TextInput
        style={[styles.input, styles.area]}
        placeholder="Brief — goals, constraints, links"
        placeholderTextColor={colors.muted}
        multiline
        value={message}
        onChangeText={setMessage}
      />
      <Pressable style={styles.primary} onPress={submit} disabled={sending}>
        <Text style={styles.primaryText}>
          {sending ? "Sending…" : "Send inquiry"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 48 },
  title: { color: colors.ink, fontSize: 28, fontWeight: "700" },
  sub: { marginTop: 8, marginBottom: 20, color: colors.muted, fontSize: 14 },
  label: { marginBottom: 8, color: colors.muted, fontSize: 13 },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 4,
    padding: 14,
    color: colors.ink,
    marginBottom: 12,
    backgroundColor: colors.elevated,
  },
  area: { minHeight: 120, textAlignVertical: "top" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  chip: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.elevated,
  },
  chipOn: {
    borderColor: colors.accent,
    backgroundColor: colors.accentWash,
  },
  chipText: { color: colors.muted, fontSize: 12 },
  chipTextOn: { color: colors.accentSoft, fontWeight: "600" },
  primary: {
    marginTop: 8,
    backgroundColor: colors.accent,
    padding: 14,
    borderRadius: 4,
    alignItems: "center",
  },
  primaryText: { color: colors.onAccent, fontWeight: "700" },
});
