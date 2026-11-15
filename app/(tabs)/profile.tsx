import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GoogleSignInButton } from "../../src/components/GoogleSignInButton";
import { studioFaqs } from "../../src/data/faqs";
import { presenceLinks } from "../../src/data/links";
import { useAuth } from "../../src/lib/AuthContext";
import { brand } from "../../src/lib/brand";
import { getApiBase } from "../../src/lib/api";
import { colors } from "../../src/theme";

export default function ProfileScreen() {
  const { user, loading, isAdmin, isSubAdmin, login, register, logout } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit() {
    setBusy(true);
    setError("");
    try {
      if (mode === "login") await login(email.trim(), password);
      else await register(name.trim(), email.trim(), password);
      setPassword("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Auth failed");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <View style={[styles.root, styles.center]}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>
        {isAdmin ? "Admin account" : isSubAdmin ? "Support account" : "Account"}
      </Text>
      <Text style={styles.title}>Profile</Text>

      {user ? (
        <View style={styles.box}>
          <Text style={styles.boxTitle}>{user.name}</Text>
          <Text style={styles.boxBody}>
            {user.email}
            {"\n"}
            Role:{" "}
            {isAdmin
              ? "Admin (studio inbox)"
              : isSubAdmin
                ? "Support (inquiries — no client chat)"
                : "Client"}
            {"\n"}
            API: {getApiBase()}
          </Text>
          <Pressable style={styles.primary} onPress={() => logout()}>
            <Text style={styles.primaryText}>Log out</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.box}>
          <Text style={styles.boxTitle}>
            {mode === "login" ? "Log in" : "Create account"}
          </Text>
          {mode === "signup" ? (
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={colors.muted}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.muted}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder={
              mode === "signup"
                ? "Password (10+, upper, lower, number, special)"
                : "Password"
            }
            placeholderTextColor={colors.muted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {mode === "signup" ? (
            <Text style={styles.hint}>
              Min 10 characters with uppercase, lowercase, a number, and a
              special character.
            </Text>
          ) : (
            <Text style={styles.hint}>
              Forgot password? Reset on the website (arsalandev.studio).
            </Text>
          )}
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Pressable style={styles.primary} onPress={onSubmit} disabled={busy}>
            <Text style={styles.primaryText}>
              {busy ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
            </Text>
          </Pressable>
          <GoogleSignInButton
            disabled={busy}
            onError={(msg) => setError(msg)}
          />
          <Pressable
            style={styles.ghost}
            onPress={() => setMode(mode === "login" ? "signup" : "login")}
          >
            <Text style={styles.ghostText}>
              {mode === "login" ? "Need an account? Sign up" : "Have an account? Log in"}
            </Text>
          </Pressable>
        </View>
      )}

      <View style={[styles.box, { marginTop: 12 }]}>
        <Text style={styles.boxTitle}>Studio note</Text>
        <Text style={styles.boxBody}>
          Clutch is under {brand.name} at {brand.domain} (same app icon).{" "}
          {brand.pastBrand.name} was an earlier brand name only — not an agency.
        </Text>
        <Pressable style={styles.clutchRow} onPress={() => Linking.openURL(brand.clutch)}>
          <Image
            source={brand.clutchIcon}
            style={styles.clutchIcon}
            accessibilityLabel={`${brand.name} on Clutch`}
          />
          <Text style={styles.linkInline}>Clutch reviews · {brand.name}</Text>
        </Pressable>
        <Link href="/job-history" asChild>
          <Pressable>
            <Text style={styles.link}>Job history →</Text>
          </Pressable>
        </Link>
        <Pressable onPress={() => Linking.openURL(brand.privacyUrl)}>
          <Text style={styles.link}>Privacy Policy →</Text>
        </Pressable>
      </View>

      <Text style={styles.section}>FAQ</Text>
      {studioFaqs.map((faq) => (
        <View key={faq.id} style={styles.faqBlock}>
          <Text style={styles.faqQ}>{faq.question}</Text>
          <Text style={styles.faqA}>{faq.answer}</Text>
        </View>
      ))}

      <Text style={styles.section}>Presence</Text>
      {presenceLinks.map((link) => (
        <Pressable
          key={link.id}
          style={styles.linkRow}
          onPress={() => Linking.openURL(link.href)}
        >
          <View style={styles.linkLabelRow}>
            {link.id === "clutch" ? (
              <Image source={brand.clutchIcon} style={styles.presenceIcon} />
            ) : null}
            <Text style={styles.linkLabel}>{link.label}</Text>
          </View>
          {link.note ? <Text style={styles.linkNote}>{link.note}</Text> : null}
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  center: { alignItems: "center", justifyContent: "center" },
  content: { padding: 24, paddingBottom: 48 },
  eyebrow: {
    color: colors.accent,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  title: { marginTop: 8, color: colors.ink, fontSize: 28, fontWeight: "700" },
  box: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
    borderRadius: 4,
    backgroundColor: colors.elevated,
  },
  boxTitle: { color: colors.ink, fontWeight: "700", fontSize: 16 },
  boxBody: { marginTop: 8, color: colors.muted, fontSize: 13, lineHeight: 19 },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.ink,
    backgroundColor: colors.bg,
  },
  hint: { marginTop: 8, color: colors.muted, fontSize: 12, lineHeight: 17 },
  error: { marginTop: 8, color: colors.danger, fontSize: 13 },
  primary: {
    marginTop: 14,
    backgroundColor: colors.accent,
    padding: 14,
    borderRadius: 4,
    alignItems: "center",
  },
  primaryText: { color: colors.onAccent, fontWeight: "700" },
  ghost: {
    marginTop: 10,
    padding: 10,
    alignItems: "center",
  },
  ghostText: { color: colors.accent, fontWeight: "600", fontSize: 13 },
  link: { marginTop: 10, color: colors.accent, fontWeight: "600", fontSize: 14 },
  clutchRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  clutchIcon: { width: 32, height: 32, borderRadius: 8 },
  linkInline: { color: colors.accent, fontWeight: "600", fontSize: 14 },
  linkLabelRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  presenceIcon: { width: 22, height: 22, borderRadius: 5 },
  section: {
    marginTop: 28,
    marginBottom: 8,
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  linkRow: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingVertical: 14,
  },
  linkLabel: { color: colors.ink, fontWeight: "600", fontSize: 15 },
  linkNote: { marginTop: 4, color: colors.muted, fontSize: 12 },
  faqBlock: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingVertical: 12,
  },
  faqQ: { color: colors.ink, fontWeight: "700", fontSize: 14 },
  faqA: { marginTop: 6, color: colors.muted, fontSize: 13, lineHeight: 19 },
});
